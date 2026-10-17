"""
Zenderu Subtitle & Typography Engine
Generates and burns high-retention social subtitles (TikTok/Reels format):
- Bottom-centered, just above the Reels/TikTok UI safe zone (config.SAFE_BOTTOM_PX / SAFE_SIDE_PX)
- Clean Poppins / Inter bold font
- Base text in bright white, active keywords highlighted in Neon Mint (#62D177)
- Subtle deep purple/black drop shadow & outline for legibility over any background

Burning needs an ffmpeg built with libass (the `ass` filter). The Homebrew ffmpeg on the
studio Mac does not have it; burn captions in Remotion instead, or use an ffmpeg with libass.
"""

import subprocess
import sys
from pathlib import Path
from typing import List, Dict, Any

_PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
if str(_PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(_PROJECT_ROOT))

from creative.config import SAFE_BOTTOM_PX, SAFE_SIDE_PX

def create_ass_subtitles(
    segments: List[Dict[str, Any]],
    output_ass: str,
    font_name: str = "Poppins",
    font_size: int = 56,
    highlight_color_bgr: str = "62D177", # BGR: &H0077D162
    primary_color_bgr: str = "FFFFFF",   # BGR: &H00FFFFFF
    margin_v: int = SAFE_BOTTOM_PX,
    margin_h: int = SAFE_SIDE_PX,
):
    """
    Generates an Advanced SubStation Alpha (.ass) file with Zenderu styling.
    """
    ass_header = f"""[Script Info]
Title: Zenderu Social Subtitles
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.601
PlayResX: 1080
PlayResY: 1920

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,{font_name},{font_size},&H00{primary_color_bgr},&H000000FF,&H00120C0F,&H80000000,1,0,0,0,100,100,1,0,1,5,3,2,{margin_h},{margin_h},{margin_v},1
Style: Highlight,{font_name},{font_size + 4},&H0077D162,&H000000FF,&H00120C0F,&H80000000,1,0,0,0,100,100,1,0,1,6,4,2,{margin_h},{margin_h},{margin_v},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    events = []
    for seg in segments:
        start_str = format_ass_time(seg["start"])
        end_str = format_ass_time(seg["end"])
        text = seg["text"]
        # If words with highlights are provided:
        if "highlight_word" in seg and seg["highlight_word"]:
            hw = seg["highlight_word"]
            styled_text = text.replace(hw, f"{{\\rHighlight}}{hw}{{\\rDefault}}")
        else:
            styled_text = text
        events.append(f"Dialogue: 0,{start_str},{end_str},Default,,0,0,0,,{styled_text}")

    Path(output_ass).write_text(ass_header + "\n".join(events) + "\n", encoding="utf-8")
    print(f"✅ Generated ASS subtitle file: {output_ass}")

def format_ass_time(seconds: float) -> str:
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    cs = int((seconds - int(seconds)) * 100)
    return f"{h}:{m:02d}:{s:02d}.{cs:02d}"

def burn_subtitles_into_video(input_video: str, ass_path: str, output_video: str):
    """
    Burns .ass subtitles into the video stream with FFmpeg.
    """
    filters = subprocess.run(["ffmpeg", "-hide_banner", "-filters"], capture_output=True, text=True).stdout
    if not any(line.split()[1:2] == ["ass"] for line in filters.splitlines()):
        raise RuntimeError("This ffmpeg has no libass ('ass' filter): burn the captions in Remotion or use an ffmpeg built with libass.")
    cmd = [
        "ffmpeg", "-y",
        "-i", str(input_video),
        "-vf", f"ass={str(ass_path)}",
        "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
        "-c:a", "copy",
        str(output_video)
    ]
    subprocess.run(cmd, check=True)
    print(f"✅ Subtitles burned successfully: {output_video}")

if __name__ == "__main__":
    import sys
    print("Zenderu Subtitle Engine ready.")
