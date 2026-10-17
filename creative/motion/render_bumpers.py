"""
Zenderu Brand Bumpers & Cortinillas Engine
Manages Intro, Wipe (Sting), and Sequential Outro.
Can serve pre-rendered master videos instantly or invoke Remotion for dynamic renders.
"""

import subprocess
import shutil
from pathlib import Path
from creative.config import (
    MOTION_DIR, DRIVE_DIR, INTRO_OFFICIAL, OUTRO_OFFICIAL, STING_OFFICIAL
)

def get_bumper_path(bumper_type: str) -> Path:
    """
    Returns path to pre-rendered master bumper or checks drive.
    Options: 'intro', 'outro', 'sting', 'wipe'
    """
    b_map = {
        "intro": INTRO_OFFICIAL,
        "outro": OUTRO_OFFICIAL,
        "sting": STING_OFFICIAL,
        "wipe": STING_OFFICIAL
    }
    target = b_map.get(bumper_type.lower())
    if target and target.exists():
        return target
    
    # Fallback to local zenderu-motion out directory
    local_target = MOTION_DIR / f"out/{bumper_type}.mp4"
    if local_target.exists():
        return local_target
        
    raise FileNotFoundError(f"Bumper '{bumper_type}' not found at {target} or {local_target}")

def render_dynamic_remotion(composition_id: str, output_path: str):
    """
    Invokes Remotion in zenderu-motion to render dynamic composition.
    """
    cmd = ["npx", "remotion", "render", composition_id, str(output_path)]
    print(f"Rendering Remotion composition '{composition_id}' -> {output_path}...")
    subprocess.run(cmd, cwd=MOTION_DIR, check=True)
    print(f"✅ Remotion render complete: {output_path}")

if __name__ == "__main__":
    import sys
    b = sys.argv[1] if len(sys.argv) > 1 else "outro"
    try:
        path = get_bumper_path(b)
        print(f"Master bumper '{b}' found: {path} ({path.stat().st_size / 1024 / 1024:.2f} MB)")
    except Exception as e:
        print(f"Error: {e}")
