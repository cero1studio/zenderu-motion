"""Edit a <=10 s clip with Gemini Omni Flash (Interactions API) using your own GOOGLE_API_KEY.

Usage: GOOGLE_API_KEY=... python3 omni_edit.py input.mp4 output.mp4 plate.png "camera/shot notes"

- task=edit keeps the input's aspect ratio (setting aspect_ratio is rejected), so pre-frame the input:
  for vertical output, crop a square around the person and pad it to 1080x1920 with black bars;
  the prompt asks Omni to fill the bars.
- plate.png = empty background reference (no people: Omni rejects images with recognizable people).
- Omni often re-voices speech (synthetic TTS) and moves the lips to that new timing. Lay the
  original voice back on with align2.py instead of trusting Omni's audio.
"""
import base64, os, sys, time
import requests

API = "https://generativelanguage.googleapis.com"
key = os.environ["GOOGLE_API_KEY"]
src, out, plate, shot = sys.argv[1], sys.argv[2], sys.argv[3], (sys.argv[4] if len(sys.argv) > 4 else "")

size = os.path.getsize(src)
init = requests.post(f"{API}/upload/v1beta/files", params={"key": key}, headers={
    "X-Goog-Upload-Protocol": "resumable", "X-Goog-Upload-Command": "start",
    "X-Goog-Upload-Header-Content-Length": str(size), "X-Goog-Upload-Header-Content-Type": "video/mp4",
    "Content-Type": "application/json"}, json={"file": {"display_name": os.path.basename(src)}})
if not init.ok:
    sys.exit(f"upload init failed {init.status_code}: {init.text[:300]}")
f = requests.post(init.headers["X-Goog-Upload-URL"], headers={"Content-Length": str(size), "X-Goog-Upload-Offset": "0",
                  "X-Goog-Upload-Command": "upload, finalize"}, data=open(src, "rb").read()).json()["file"]
while f.get("state") == "PROCESSING":
    time.sleep(4)
    f = requests.get(f"{API}/v1beta/{f['name']}", params={"key": key}).json()

prompt = ("The black areas at the top and bottom of the frame are empty: fill them so the whole vertical frame is one natural, "
          "real shot (office wall and bookshelf above him, his black shirt and torso below), with no black bars. "
          "Replace the background behind the man with the office shown in <IMAGE_REF_0>. He sits in a black high-back gaming office chair. "
          "His black shirt is fully buttoned up to the top button, collar closed. "
          "Remove all on-screen text, captions, lower-third graphics, logos and watermarks. "
          "Grooming: full, dense, dark black beard, freshly and neatly trimmed with clean lined-up edges, short natural mustache, "
          "black flesh-tunnel gauges in both earlobes, no tattoo on his neck. "
          "Subtle natural skin retouch: no oily shine, no under-eye dark circles, real skin texture. "
          "Eye contact: he looks directly into the camera lens the entire time; his eyes never look down as if reading. "
          "Calm, composed, natural expressions with few, small hand gestures. "
          "Keep his face shape, identity, lip movements, voice and audio exactly the same. "
          "Keep the original audio track and its timing completely untouched. Keep everything else the same. " + shot)
body = {"model": "gemini-omni-1.1-flash",
        "input": [{"type": "video", "uri": f["uri"]},
                  {"type": "image", "data": base64.b64encode(open(plate, "rb").read()).decode(), "mime_type": "image/png"},
                  {"type": "text", "text": prompt}],
        "generation_config": {"video_config": {"task": "edit"}},
        "response_format": {"type": "video", "resolution": "720p"}}
r = requests.post(f"{API}/v1beta/interactions", params={"key": key}, json=body, timeout=600)
if not r.ok:
    sys.exit(f"interaction {r.status_code}: {r.text[:500]}")
vid = next(c for s in r.json()["steps"] if s.get("type") == "model_output" for c in s["content"] if c.get("type") == "video")
if vid.get("data"):
    open(out, "wb").write(base64.b64decode(vid["data"]))
else:  # 1080p/4k come back as a Files API uri
    fid = vid["uri"].split("/files/")[1].split(":")[0]
    while requests.get(f"{API}/v1beta/files/{fid}", params={"key": key}).json().get("state") != "ACTIVE":
        time.sleep(5)
    open(out, "wb").write(requests.get(f"{API}/v1beta/files/{fid}:download", params={"key": key, "alt": "media"}, timeout=300).content)
print("saved", out)
