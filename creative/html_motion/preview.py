"""
Zenderu HTML Motion Preview Server
Serves the 9:16 broadcast templates locally for preview, inspection, and recording.
Usage:
    python3 creative/html_motion/preview.py
"""

import http.server
import socketserver
import webbrowser
from pathlib import Path

PORT = 3333
DIRECTORY = Path(__file__).resolve().parent

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

def start_server():
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"\n🎬 ZENDERU HTML MOTION STUDIO ACTIVO:")
        print(f"👉 URL: {url}")
        print(f"Presiona Ctrl+C para detener el servidor.\n")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        httpd.serve_forever()

if __name__ == "__main__":
    start_server()
