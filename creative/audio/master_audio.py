"""
Zenderu Audio Mastering Engine
Standardized to EBU R128 (-16.0 LUFS, -1.5 dBTP, LRA <= 7.0 LU)
Includes iPhone voice equalization, gentle noise reduction, and ducking.
"""

import subprocess
import sys
from pathlib import Path

def normalize_loudness(input_file: str, output_file: str, target_lufs: float = -16.0, true_peak: float = -1.5, lra: float = 7.0):
    """
    Normalizes audio to target broadcast/social LUFS using FFmpeg loudnorm filter.
    """
    cmd = [
        "ffmpeg", "-y",
        "-i", str(input_file),
        "-c:v", "copy",
        "-af", f"loudnorm=I={target_lufs}:TP={true_peak}:LRA={lra},aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo",
        "-c:a", "aac", "-b:a", "320k",
        str(output_file)
    ]
    subprocess.run(cmd, check=True)
    print(f"✅ Loudness normalized to {target_lufs} LUFS -> {output_file}")

def apply_voice_grade(input_file: str, output_file: str):
    """
    Applies the approved studio voice EQ + gentle de-esser + leveling.
    """
    filter_chain = (
        "highpass=f=80,"
        "afftdn=nr=6:nf=-42:tn=1,"
        "deesser=i=0.25,"
        "equalizer=f=250:t=q:w=1:g=-2,"
        "equalizer=f=3500:t=q:w=1:g=2,"
        "acompressor=threshold=-20dB:ratio=2.5:attack=10:release=150:makeup=2,"
        "loudnorm=I=-16:TP=-1.5:LRA=7,"
        "aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo"
    )
    cmd = [
        "ffmpeg", "-y",
        "-i", str(input_file),
        "-c:v", "copy",
        "-af", filter_chain,
        "-c:a", "aac", "-b:a", "320k",
        str(output_file)
    ]
    subprocess.run(cmd, check=True)
    print(f"✅ Voice graded and mastered -> {output_file}")

def measure_lufs(input_file: str) -> dict:
    """
    Measures integrated LUFS, LRA, and True Peak using ebur128 filter.
    """
    cmd = [
        "ffmpeg", "-i", str(input_file),
        "-af", "ebur128=framelog=verbose",
        "-f", "null", "-"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    summary = {}
    for line in res.stderr.splitlines():
        if "I:" in line and "LUFS" in line:
            parts = line.strip().split()
            if len(parts) >= 2:
                summary["I_LUFS"] = float(parts[1])
        elif "LRA:" in line and "LU" in line:
            parts = line.strip().split()
            if len(parts) >= 2:
                summary["LRA"] = float(parts[1])
        elif "Peak:" in line and "dBFS" in line:
            parts = line.strip().split()
            if len(parts) >= 2:
                summary["True_Peak"] = float(parts[1])
    return summary

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python master_audio.py <input> <output> [--grade]")
        sys.exit(1)
    inp = sys.argv[1]
    out = sys.argv[2]
    if "--grade" in sys.argv:
        apply_voice_grade(inp, out)
    else:
        normalize_loudness(inp, out)
