"""
Zenderu ComfyUI Client
Connects directly to the ComfyUI instance on Railway (or localhost)
Enables queueing video generation workflows with gemini_omni_direct, Kling, and Runway.

Partner nodes (Kling, Runway, native Gemini) bill the comfy.org account whose key is sent per
request: set COMFY_ORG_API_KEY in the environment and it goes in extra_data automatically.
Uploaded inputs land in /app/input, which is wiped on every Railway deploy.
"""

import json
import os
import uuid
import urllib.request
import urllib.parse
import time
from pathlib import Path
from typing import Dict, Any, Optional

DEFAULT_SERVER_URL = "https://comfyui-production-52d3.up.railway.app"

class ComfyUIClient:
    def __init__(self, server_url: str = DEFAULT_SERVER_URL):
        self.server_url = server_url.rstrip("/")

    def check_health(self) -> bool:
        try:
            req = urllib.request.Request(f"{self.server_url}/system_stats")
            with urllib.request.urlopen(req, timeout=8) as response:
                return response.status == 200
        except Exception as e:
            print(f"ComfyUI Health check error: {e}")
            return False

    def queue_prompt(self, workflow: Dict[str, Any], client_id: str = "zenderu_creative") -> Dict[str, Any]:
        """
        Submits a prompt/workflow JSON to ComfyUI.
        """
        body = {"prompt": workflow, "client_id": client_id}
        if os.environ.get("COMFY_ORG_API_KEY"):
            body["extra_data"] = {"api_key_comfy_org": os.environ["COMFY_ORG_API_KEY"]}
        req = urllib.request.Request(
            f"{self.server_url}/prompt",
            data=json.dumps(body).encode("utf-8"),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            return json.loads(response.read().decode("utf-8"))

    def upload_input(self, path: str) -> str:
        """Uploads an image or video to ComfyUI's input folder; returns the stored filename."""
        p = Path(path)
        boundary = uuid.uuid4().hex
        data = (f"--{boundary}\r\nContent-Disposition: form-data; name=\"image\"; filename=\"{p.name}\"\r\n"
                f"Content-Type: application/octet-stream\r\n\r\n").encode() + p.read_bytes() + \
               f"\r\n--{boundary}\r\nContent-Disposition: form-data; name=\"overwrite\"\r\n\r\ntrue\r\n--{boundary}--\r\n".encode()
        req = urllib.request.Request(f"{self.server_url}/upload/image", data=data,
                                     headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
        with urllib.request.urlopen(req, timeout=300) as response:
            return json.loads(response.read().decode("utf-8"))["name"]

    def get_history(self, prompt_id: str) -> Dict[str, Any]:
        """
        Retrieves execution history and output filenames for a given prompt_id.
        """
        req = urllib.request.Request(f"{self.server_url}/history/{prompt_id}")
        with urllib.request.urlopen(req, timeout=15) as response:
            return json.loads(response.read().decode("utf-8"))

    def download_output(self, filename: str, subfolder: str = "", dest_path: str = "/tmp") -> Path:
        """
        Downloads a generated image or video from ComfyUI /view endpoint.
        """
        query = urllib.parse.urlencode({"filename": filename, "subfolder": subfolder, "type": "output"})
        url = f"{self.server_url}/view?{query}"
        dest = Path(dest_path) / filename
        urllib.request.urlretrieve(url, str(dest))
        print(f"✅ Downloaded ComfyUI asset: {dest}")
        return dest

    def wait_for_completion(self, prompt_id: str, timeout_s: int = 300, poll_interval: int = 5) -> Optional[Dict[str, Any]]:
        """
        Polls ComfyUI history until prompt completes.
        """
        t0 = time.time()
        print(f"Waiting for ComfyUI task {prompt_id} to finish...")
        while time.time() - t0 < timeout_s:
            history = self.get_history(prompt_id)
            if prompt_id in history:
                print(f"✅ Task {prompt_id} completed!")
                return history[prompt_id]
            time.sleep(poll_interval)
        print(f"⚠️ Task {prompt_id} timed out after {timeout_s}s")
        return None

if __name__ == "__main__":
    client = ComfyUIClient()
    online = client.check_health()
    print(f"ComfyUI on Railway ({client.server_url}): {'🟢 ONLINE' if online else '🔴 OFFLINE'}")
