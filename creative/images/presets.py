"""
Zenderu Image & Video Generation Presets (Battle-Tested Prompts from PROMPTS.md)
Recovered from production sessions for Gemini 3.1 Flash Image (Nano Banana) and Gemini Omni Flash.
"""

BATTLE_TESTED_PROMPTS = {
    # 1. El formato ganador: Anuncio conceptual
    "conceptual_figura_camino": {
        "model": "gemini-3.1-flash-image",
        "description": "Figura morada mate sin rostro caminando sobre camino verde de ladrillos neón.",
        "prompt": (
            "In the exact same illustration style, material and color palette as the reference images "
            "(smooth matte translucent purple-indigo gradient humanoid figure, no facial features, "
            "deep navy-black starry background #06011A, glowing mint-green accents #62D177): "
            "show the figure standing up and beginning to walk forward along the glowing green brick path, "
            "which now stretches further into the distance, with more of the dark landscape gently revealed around it. "
            "Vertical 9:16 composition, generous negative space at the top for text."
        ),
        "negative_prompt": "text, logos, UI, realistic humans, facial features, cars, literal roads, fantasy magic, zodiac wheels"
    },
    "conceptual_camino_serpenteante": {
        "model": "gemini-3.1-flash-image",
        "description": "Camino curvado en S con baldosas de ladrillo luminoso y costuras brillantes.",
        "prompt": (
            "Smooth matte translucent purple-indigo gradient humanoid figure (#4D3990 to #563A9D, rim light #D2B4E1), "
            "no facial features, deep navy-black background #06011A, glowing mint-green accents #62D177: "
            "a winding, curving green brick path (serpentine S-shape) with rounded brick-tile texture and glowing seams, "
            "leading smoothly toward a serene luminous horizon. Clean 3D render, vertical 9:16."
        )
    },
    
    # 2. Anuncio realista: Privacidad / No puedo contarle a nadie
    "ugc_latina_introspectiva": {
        "model": "gemini-3.1-flash-image",
        "description": "Retrato realista de mujer latina en su habitación de noche, introspectiva frente al celular.",
        "prompt": (
            "A realistic, warm, natural photo portrait of a Latina woman, 28-32 years old, light-to-medium brown skin tone, "
            "long dark wavy hair, calm and thoughtful expression (not sad, not smiling, just present and introspective), "
            "wearing a simple cozy oversized sweater, soft warm indoor lighting at night, lying propped up in bed with pillows, "
            "looking down slightly at something off-frame (as if at her phone). "
            "Cinematic, shallow depth of field, photographic realism, not illustrated or stylized. Vertical 9:16 composition."
        )
    },
    "ugc_manos_celular_noche": {
        "model": "gemini-3.1-flash-image",
        "description": "Primer plano de manos sosteniendo celular en la cama de noche con resplandor suave.",
        "prompt": (
            "A realistic photo of a woman's hands holding a smartphone at night in bed, soft warm lamp light and blue screen glow "
            "on her hands, cozy blanket visible. The phone screen displays a dark-mode spiritual/psychological guidance app "
            "with a clean guide profile card, rating stars, and a neon mint green action button. "
            "Vertical 9:16 photo, shallow depth of field, warm cinematic tone."
        )
    },
    "ugc_llamada_activa_altavoz": {
        "model": "gemini-3.1-flash-image",
        "description": "Celular apoyado en la almohada en altavoz durante una consulta en vivo con Guía Zenderu.",
        "prompt": (
            "A realistic photo of a Latina woman propped up in bed with a relaxed, peaceful expression, simple oversized sweater. "
            "Her phone is propped upright against a pillow on speakerphone, screen showing an audio call-in-progress interface: "
            "a circular avatar icon, a call timer '04:12', a speaker icon, dark UI with mint-green accent. "
            "Subtle soft green glow near the phone suggesting an active live connection. Vertical 9:16."
        )
    },

    # 3. Anselmo: Estudio, oficina y placa limpia para Omni Video Edit
    "anselmo_oficina_realista": {
        "model": "gemini-3.1-flash-image",
        "description": "Anselmo sentado en oficina moderna elegante con camisa negra y repisa de nogal.",
        "prompt": (
            "Using the exact same real person in the reference photo (same bald head, same thick dark beard and mustache shape, "
            "same facial structure, same ear piercings, same skin tone, same build) — generate a new, realistic, high-quality vertical photo of him. "
            "Keep his face completely recognizable and unaltered in likeness. This must look like a REAL, unedited photograph: "
            "no glowing particles, no magical effects. Medium shot (waist-up), sitting in a modern office chair at his desk, "
            "relaxed confident posture, looking calmly at the camera. Tasteful modern office: wood desk, walnut bookshelf, green plant in soft blur, "
            "warm natural window light mixed with subtle cool purple accent light from a lamp. Simple solid dark button-up shirt. Vertical 9:16."
        )
    },
    "anselmo_fondo_vacio_placa": {
        "model": "gemini-3.1-flash-image",
        "description": "Placa limpia de fondo de oficina (sin persona) para usar como fondo en Gemini Omni Edit.",
        "prompt": (
            "Using the office in the reference photo as the style guide, create a realistic photo of that same office background "
            "with NO person and NO chair in frame: the view a webcam would see behind someone sitting at a desk. "
            "Directly in the center: a dark walnut bookshelf with books and a few small objects; on the right a tall green plant; "
            "on the left a floor lamp giving a soft, subtle cool purple accent glow on the wall; warm natural window light from the left. "
            "Light warm-gray wall. Eye-level camera, straight-on, shallow depth of field with background softly out of focus. "
            "Real photograph, natural colors, no text, no logos. Vertical 9:16."
        )
    },

    # 4. Gemini Omni Flash (Video Edit Prompts)
    "omni_edit_cambio_fondo_oficina": {
        "model": "gemini-omni-1.1-flash",
        "description": "Prompt de edición de video Omni: cambia fondo a oficina moderna, camisa negra y quita barras negras.",
        "prompt": (
            "Replace the background behind the man with the modern office shown in reference: walnut bookshelf directly behind him, "
            "green plant, and floor lamp with soft purple glow, warm natural window light. He sits in a black high-back office chair. "
            "Change his shirt to a plain solid black button-up shirt. Fill the entire vertical 9:16 frame with no black bars. "
            "Remove all on-screen text, captions, lower-third graphics and logos. "
            "Keep his face, expressions, lip movements, hand gestures, voice and audio completely untouched in a continuous shot."
        )
    }
}

def get_preset(name: str) -> dict:
    if name not in BATTLE_TESTED_PROMPTS:
        raise ValueError(f"Preset '{name}' not found. Available: {list(BATTLE_TESTED_PROMPTS.keys())}")
    return BATTLE_TESTED_PROMPTS[name]

def list_presets():
    return list(BATTLE_TESTED_PROMPTS.keys())
