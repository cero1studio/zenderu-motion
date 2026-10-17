import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent
REPO_DIR = BASE_DIR.parent
HANDOFF_DIR = REPO_DIR / "zenderu_handoff"
MOTION_DIR = REPO_DIR
DRIVE_DIR = Path("/Users/javiermayorga/Library/CloudStorage/GoogleDrive-javier@cerouno.digital/Mi unidad/Zenderu_Marketing_Ads")

DOWNLOADS_DIR = Path.home() / "Downloads"

# Brand Colors (Inner Tech / Zenderu)
COLOR_BG_DEEP = "#0f0c21"
COLOR_BG_CARD = "#17122b"
COLOR_PURPLE_MATTE = "#252151"
COLOR_MINT_NEON = "#62d177"
COLOR_TEXT_PRIMARY = "#ffffff"
COLOR_TEXT_MUTED = "#a5a2c4"

# Audio Standards (EBU R128 Broadcast & Social)
TARGET_LUFS = -16.0
MAX_TRUE_PEAK = -1.5
MAX_LRA = 7.0

# Video Standards
VIDEO_WIDTH = 1080
VIDEO_HEIGHT = 1920
ASPECT_RATIO = "9:16"
FPS = 30
VIDEO_CODEC = "libx264"
AUDIO_CODEC = "aac"
AUDIO_BITRATE = "320k"

# Unified Assets Directories
ASSETS_DIR = BASE_DIR / "assets"
BRANDING_DIR = ASSETS_DIR / "branding"
SFX_DIR = ASSETS_DIR / "audio_sfx"
ICONS_3D_DIR = ASSETS_DIR / "3d_icons"
BG_DIR = ASSETS_DIR / "backgrounds"
HTML_MOTION_DIR = BASE_DIR / "html_motion"

# Pre-rendered Brand Bumpers (Instant Assembly)
INTRO_OFFICIAL = DRIVE_DIR / "Recursos/Video/01_Intro_Oficial_LogoReveal_1080x1920.mp4"
OUTRO_OFFICIAL = DRIVE_DIR / "Recursos/Video/02_Outro_Oficial_Promo5Min_1080x1920.mp4"
STING_OFFICIAL = DRIVE_DIR / "Recursos/Video/03_Sting_Cortinilla_1080x1920.mp4"

# Audio Assets
AMBIENT_BG = DRIVE_DIR / "Recursos/Audio/ambient_bg.mp3"
SFX_CALL_CONNECTED = SFX_DIR / "call_connected.wav"
SFX_TIP_RECEIVED = SFX_DIR / "tip_received.wav"
SFX_CHAT_MESSAGE = SFX_DIR / "chat_message.wav"

# Python Environments
MUSICGEN_PYTHON = MOTION_DIR / "scripts/musicgen/venv/bin/python3"

