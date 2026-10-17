"""
Zenderu ComfyUI Remote SSH & Cloud Bridge
Enables seamless execution and asset synchronization with the ComfyUI instance on Railway:
- Direct SSH command execution via Railway CLI
- Listing remote generated clips and frames in /app/output
- Fast asset downloading (via ComfyUI /view API or SSH fallback)
- Real-time cloud status monitoring
"""

import argparse
import json
import os
import subprocess
import sys
import urllib.request
import urllib.parse
from pathlib import Path

# Project root path
_PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
COMFYUI_URL = "https://comfyui-production-52d3.up.railway.app"
DEFAULT_OUTPUT_DIR = _PROJECT_ROOT / "creative" / "output"

def run_ssh_command(cmd: str) -> str:
    """Runs a shell command inside the ComfyUI service on Railway via railway ssh."""
    full_cmd = ["railway", "ssh", cmd]
    res = subprocess.run(full_cmd, capture_output=True, text=True)
    if res.returncode != 0 and "Connection to ssh.railway.com closed" not in res.stderr:
        raise RuntimeError(f"Railway SSH Error:\nSTDOUT: {res.stdout}\nSTDERR: {res.stderr}")
    return res.stdout

def check_status() -> dict:
    """Verifies both HTTP API and SSH connectivity to Railway ComfyUI."""
    status = {"http_api": False, "ssh": False, "url": COMFYUI_URL}
    try:
        req = urllib.request.Request(f"{COMFYUI_URL}/system_stats", headers={"User-Agent": "ZenderuCreative/1.0"})
        with urllib.request.urlopen(req, timeout=6) as resp:
            status["http_api"] = resp.status == 200
    except Exception as e:
        status["http_api_error"] = str(e)

    try:
        out = run_ssh_command("uname -a")
        if "Linux" in out:
            status["ssh"] = True
            status["os_info"] = out.strip().split("\n")[0]
    except Exception as e:
        status["ssh_error"] = str(e)

    return status

def list_remote_outputs() -> list:
    """Lists files generated in /app/output on Railway."""
    out = run_ssh_command("ls -la --time-style=+%Y-%m-%d_%H:%M /app/output")
    files = []
    for line in out.splitlines():
        parts = line.split()
        if len(parts) >= 7 and not parts[-1].startswith("."):
            filename = parts[-1]
            size = parts[4]
            date = parts[5]
            if filename != "_output_images_will_be_put_here":
                files.append({"filename": filename, "size": size, "date": date})
    return files

def download_file(filename: str, local_dest: Path = None) -> Path:
    """
    Downloads a generated video or image from ComfyUI output.
    Tries HTTP /view endpoint first (fastest), falls back to SSH stream.
    """
    if local_dest is None:
        DEFAULT_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        local_dest = DEFAULT_OUTPUT_DIR / filename

    local_dest.parent.mkdir(parents=True, exist_ok=True)
    url = f"{COMFYUI_URL}/view?filename={urllib.parse.quote(filename)}&type=output"

    try:
        print(f"📥 Descargando vía HTTP API: {filename}...")
        req = urllib.request.Request(url, headers={"User-Agent": "ZenderuCreative/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp, open(local_dest, "wb") as f:
            f.write(resp.read())
        print(f"✅ Descarga completa: {local_dest} ({local_dest.stat().st_size} bytes)")
        return local_dest
    except Exception as e:
        print(f"⚠️ Falló descarga HTTP ({e}). Intentando vía Railway SSH...")
        cmd = ["railway", "ssh", f"cat /app/output/{filename}"]
        with open(local_dest, "wb") as f:
            subprocess.run(cmd, stdout=f, check=True)
        print(f"✅ Descarga vía SSH completa: {local_dest} ({local_dest.stat().st_size} bytes)")
        return local_dest

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Zenderu ComfyUI Remote SSH Bridge")
    parser.add_argument("--status", action="store_true", help="Check HTTP and SSH status")
    parser.add_argument("--list-outputs", action="store_true", help="List generated files in /app/output")
    parser.add_argument("--download", type=str, help="Download a specific output filename")
    parser.add_argument("--exec", type=str, help="Execute a shell command inside Railway ComfyUI")

    args = parser.parse_args()

    if args.status:
        st = check_status()
        print("\n🌐 ESTADO DE CONEXIÓN CON COMFYUI RAILWAY:")
        print(f"- HTTP API ({st['url']}): {'🟢 Online' if st['http_api'] else '🔴 Offline'}")
        print(f"- SSH Direct Tunnel: {'🟢 Online' if st['ssh'] else '🔴 Offline'}")
        if st.get("os_info"):
            print(f"- Remote Host: {st['os_info']}")
        print()

    elif args.list_outputs:
        outputs = list_remote_outputs()
        print(f"\n📁 ARCHIVOS GENERADOS EN COMFYUI (/app/output) [{len(outputs)}]:")
        print(f"{'FECHA':<18} | {'TAMAÑO':<10} | {'NOMBRE'}")
        print("-" * 60)
        for item in sorted(outputs, key=lambda x: x["date"], reverse=True):
            print(f"{item['date']:<18} | {item['size']:<10} | {item['filename']}")
        print()

    elif args.download:
        download_file(args.download)

    elif args.exec:
        print(f"⚡ Ejecutando en Railway: {args.exec}\n")
        out = run_ssh_command(args.exec)
        print(out)

    else:
        parser.print_help()
