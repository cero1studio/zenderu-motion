"""
Zenderu Master Ad Assembler
Automates the full pipeline:
- Video body normalization & optional iPhone grade
- Audio normalization to -16 LUFS (no duplicate/clashing music layers!)
- Seamless concatenation with official Intro (3s) and/or Outro (6s Promo 5 Min)
- Synchronization of transitions and audio tails
- Automated export to local Downloads and Google Drive
"""

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path

# Ensure project root is in sys.path for direct CLI execution
_PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(_PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(_PROJECT_ROOT))

from creative.config import (
    INTRO_OFFICIAL, OUTRO_OFFICIAL, STING_OFFICIAL,
    DRIVE_DIR, DOWNLOADS_DIR, TARGET_LUFS, FPS, VIDEO_CODEC, AUDIO_CODEC, AUDIO_BITRATE
)
from creative.audio.master_audio import normalize_loudness, measure_lufs


def assemble_ad(
    body_video: str,
    output_path: str,
    include_intro: bool = False,
    include_outro: bool = True,
    outro_path: str = None,
    grade_iphone: bool = False,
    sync_to_drive: bool = True
):
    body_p = Path(body_video).resolve()
    if not body_p.exists():
        raise FileNotFoundError(f"Body video not found: {body_p}")
    
    out_p = Path(output_path).resolve()
    out_p.parent.mkdir(parents=True, exist_ok=True)
    temp_dir = Path("/tmp/zenderu_assemble")
    temp_dir.mkdir(parents=True, exist_ok=True)

    print(f"🎬 Starting Zenderu Ad Assembly: {body_p.name}")

    # 1. Prepare video body
    processed_body = temp_dir / "body_processed.mp4"
    vf_filters = [f"fps={FPS}", "setpts=PTS-STARTPTS"]
    if grade_iphone:
        vf_filters.extend([
            "hqdn3d=2:1.5:4:3",
            "scale=1080:1920:flags=lanczos",
            "colorbalance=rs=0.015:bs=-0.015:rm=0.025:gm=0.008:bm=-0.025:rh=0.012:bh=-0.012",
            "curves=all='0/0 0.12/0.10 0.5/0.53 0.88/0.91 1/1'",
            "eq=contrast=1.06:saturation=1.05:gamma=1.02",
            "vibrance=intensity=0.10",
            "cas=0.45"
        ])
    else:
        vf_filters.append("scale=1080:1920:flags=lanczos")

    # Audio: normalize to -16 LUFS without adding secondary overlapping music
    af_filters = [
        f"loudnorm=I={TARGET_LUFS}:TP=-1.5:LRA=7",
        "aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo",
        "asetpts=PTS-STARTPTS"
    ]

    cmd_prep = [
        "ffmpeg", "-y",
        "-i", str(body_p),
        "-vf", ",".join(vf_filters),
        "-af", ",".join(af_filters),
        "-c:v", VIDEO_CODEC, "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p",
        "-c:a", AUDIO_CODEC, "-b:a", AUDIO_BITRATE,
        str(processed_body)
    ]
    print("Normalizing body video & audio...")
    subprocess.run(cmd_prep, check=True)

    # 2. Build segments list
    segments = []
    if include_intro:
        intro_file = INTRO_OFFICIAL
        if not intro_file.exists():
            print(f"⚠️ Warning: Intro official not found at {intro_file}, skipping intro.")
        else:
            segments.append(intro_file)

    segments.append(processed_body)

    if include_outro:
        effective_outro = Path(outro_path) if outro_path else OUTRO_OFFICIAL
        if not effective_outro.exists():
            print(f"⚠️ Warning: Outro file not found at {effective_outro}, skipping outro.")
        else:
            segments.append(effective_outro)

    print(f"Assembling {len(segments)} segments...")

    # 3. Concatenate using single-pass filter_complex
    if len(segments) == 1:
        shutil.copyfile(processed_body, out_p)
    else:
        inputs = []
        filter_inputs_v = []
        filter_inputs_a = []
        for i, seg in enumerate(segments):
            inputs.extend(["-i", str(seg)])
            filter_inputs_v.append(f"[{i}:v]fps={FPS},scale=1080:1920,setpts=PTS-STARTPTS[v{i}]")
            filter_inputs_a.append(f"[{i}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,asetpts=PTS-STARTPTS[a{i}]")

        concat_v = "".join([f"[v{i}]" for i in range(len(segments))])
        concat_a = "".join([f"[a{i}]" for i in range(len(segments))])
        concat_filter = f"{concat_v}{concat_a}concat=n={len(segments)}:v=1:a=1[v][a]"

        filter_complex = "; ".join(filter_inputs_v + filter_inputs_a + [concat_filter])

        cmd_concat = [
            "ffmpeg", "-y",
            *inputs,
            "-filter_complex", filter_complex,
            "-map", "[v]", "-map", "[a]",
            "-c:v", VIDEO_CODEC, "-crf", "16", "-preset", "slow", "-pix_fmt", "yuv420p",
            "-c:a", AUDIO_CODEC, "-b:a", AUDIO_BITRATE,
            str(out_p)
        ]
        subprocess.run(cmd_concat, check=True)

    # 4. Measure final integrated loudness
    stats = measure_lufs(out_p)
    print(f"✅ Final video created: {out_p}")
    print(f"   Audio Loudness: {stats.get('I_LUFS', 'N/A')} LUFS (Target: {TARGET_LUFS})")
    print(f"   True Peak: {stats.get('True_Peak', 'N/A')} dBFS")

    # 5. Sync to Drive if requested
    if sync_to_drive and DRIVE_DIR.exists():
        drive_dest = DRIVE_DIR / out_p.name
        shutil.copyfile(out_p, drive_dest)
        print(f"🚀 Synced to Google Drive: {drive_dest}")

    # Copy to Downloads for easy preview
    if out_p.parent != DOWNLOADS_DIR:
        dl_dest = DOWNLOADS_DIR / out_p.name
        shutil.copyfile(out_p, dl_dest)
        print(f"💻 Copied to Downloads: {dl_dest}")

    return out_p

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Zenderu Ad Assembler")
    parser.add_argument("body", help="Path to main body video")
    parser.add_argument("-o", "--output", help="Output path", default="/tmp/zenderu_ad_final.mp4")
    parser.add_argument("--intro", action="store_true", help="Include 3s brand intro")
    parser.add_argument("--no-outro", action="store_true", help="Do not include outro")
    parser.add_argument("--outro-path", help="Custom outro video path")
    parser.add_argument("--grade", action="store_true", help="Apply iPhone color grade")
    parser.add_argument("--no-drive", action="store_true", help="Do not sync to Google Drive")

    args = parser.parse_args()
    assemble_ad(
        body_video=args.body,
        output_path=args.output,
        include_intro=args.intro,
        include_outro=not args.no_outro,
        outro_path=args.outro_path,
        grade_iphone=args.grade,
        sync_to_drive=not args.no_drive
    )
