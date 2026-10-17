"""
Zenderu ComfyUI Client
Connects directly to the ComfyUI instance on Railway (or localhost)
Enables queueing video generation workflows with gemini_omni_direct, Kling, and Runway.
"""

import json
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
        payload = json.dumps({"prompt": workflow, "client_id": client_id}).encode("utf-8")
        req = urllib.request.Request(
            f"{self.server_url}/prompt",
            data=payload,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            return json.loads(response.read().decode("utf-8"))

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
