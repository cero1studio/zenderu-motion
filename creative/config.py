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

# Platform safe zones for 1080x1920: Reels/TikTok UI covers the bottom ~35% and the right-side
# button column. Keep subtitles and key text inside: top 14%, bottom 35%, sides >= 6%.
SAFE_TOP_PX = 270
SAFE_BOTTOM_PX = 672
SAFE_SIDE_PX = 120

# Export presets (width, height). 9:16 is the master; 4:5 for feed placements.
EXPORT_PRESETS = {
    "9x16": (1080, 1920),
    "4x5": (1080, 1350),
    "1x1": (1080, 1080),
}

# Paid generation list prices, USD per second of output (verified on the providers' pricing
# pages, 2026-10). Used by estimate_cost() for the confirm-before-spending rule.
GENERATION_PRICES_USD_PER_S = {
    "gemini_omni_720p": 0.10,        # Google AI Studio direct
    "gemini_omni_1080p": 0.15,
    "runway_act_two": 0.05,          # Runway Dev API, 5 credits/s at $0.01
    "runway_app_performance": 0.27,  # Runway web app, ~17 credits/s with Pro credits
    "kling_motion_720p": 0.126,      # Kling API and comfy.org (same list price)
    "kling_motion_1080p": 0.168,
    "runway_aleph2": 0.28,
}
IMAGE_PRICES_USD = {"nano_banana_1k": 0.034, "nano_banana_2k": 0.05, "nano_banana_4k": 0.113}
COST_CONFIRM_THRESHOLD_USD = 1.00


def estimate_cost(model: str, seconds: float = 0.0, images: int = 0) -> float:
    if model in IMAGE_PRICES_USD:
        return round(IMAGE_PRICES_USD[model] * images, 3)
    return round(GENERATION_PRICES_USD_PER_S[model] * seconds, 3)

