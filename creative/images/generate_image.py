"""
Zenderu Image Generation Engine (Inner Tech Aesthetic)
Generates brand-compliant conceptual 3D renders using Gemini / Imagen / ComfyUI.
Aesthetic standards:
- Dark background (#0f0c21 or #0a0818)
- Matte purple silhouette (#252151)
- Luminous neon mint accent (#62d177)
- Zero generic fantasy clichés, zero cheesy tarot cards.
- Clean architectural or cosmic geometry.
"""

import os
import sys
from pathlib import Path

STYLE_PRESETS = {
    "conceptual_path": (
        "Minimalist 3D architectural render, deep void background #0f0c21, "
        "a clean faceless humanoid silhouette in matte deep purple #252151 walking thoughtfully, "
        "a sharp geometric glowing neon mint beam #62d177 emerging from their steps like a metaphysical path, "
        "subtle volumetric glow, ultra clean Octane render, no noise, cinematic lighting, 8k resolution, vertical 9:16."
    ),
    "tangled_thoughts": (
        "Minimalist 3D scene, dark deep indigo space #0a0818, "
        "a matte purple silhouette #252151 standing in contemplation, "
        "abstract glowing neon mint threads #62d177 floating and untangling smoothly in midair above, "
        "serene atmosphere, mathematical precision, matte texture, clean shadows, vertical 9:16."
    ),
    "clarity_portal": (
        "Minimalist modern interior with cosmic geometry, matte purple #252151 monolith, "
        "soft neon mint #62d177 ambient light edge, a silhouette gazing toward an open serene horizon, "
        "peaceful clarity, inner tech aesthetic, high-end design, vertical 9:16."
    ),
    "expert_anselmo_office": (
        "Warm, modern minimalist study room at twilight, dark wood and matte slate finishes, "
        "subtle glowing neon mint accent line on a desk device, serene depth of field, cinematic 9:16."
    )
}

try:
    from .presets import BATTLE_TESTED_PROMPTS
except ImportError:
    try:
        from presets import BATTLE_TESTED_PROMPTS
    except ImportError:
        BATTLE_TESTED_PROMPTS = {}

def get_all_presets():
    merged = dict(STYLE_PRESETS)
    for k, v in BATTLE_TESTED_PROMPTS.items():
        merged[k] = v.get("prompt", "")
    return merged

def build_prompt(preset_name: str, extra_guidance: str = "") -> str:
    all_presets = get_all_presets()
    base = all_presets.get(preset_name, STYLE_PRESETS["conceptual_path"])
    if extra_guidance:
        return f"{base} {extra_guidance}"
    return base

def list_presets():
    return list(get_all_presets().keys())

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--list":
        for k, v in get_all_presets().items():
            print(f"\n[{k}]:\n{v}")
    else:
        preset = sys.argv[1] if len(sys.argv) > 1 else "conceptual_figura_camino"
        print(f"Generated prompt for preset '{preset}':\n")
        print(build_prompt(preset))

