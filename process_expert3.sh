#!/bin/bash
# 1. Start Whisper transcription
source venv_vision/bin/activate
whisper public/expert3/expert3_audio.wav --language es --model base --output_dir public/expert3/ &
WHISPER_PID=$!

# 2. Generate BGM with MusicGen (run in virtual env)
source scripts/musicgen/venv/bin/activate
python3 scripts/musicgen/generate_bgm.py "Ethereal ambient background music, soft pads, gentle acoustic guitar, mystical, relaxing, feminine, warm" public/expert3/expert3_bgm_base.wav 30 &
MUSIC_PID=$!

wait $WHISPER_PID
echo "Whisper finished"

wait $MUSIC_PID
echo "MusicGen finished"

# 3. Loop the BGM to 80s
ffmpeg -y -stream_loop 8 -i public/expert3/expert3_bgm_base.wav -c copy public/expert3/expert3_bgm_full.wav
echo "BGM looped"
