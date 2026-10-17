"""
Zenderu Scriptwriting Engine (Guiones de Alto Rendimiento)
Implements master copy rules from zenderu-copy-ux-auditor and zenderu-ads:
- No fortune-telling clichés, no superstition, no tarot words.
- Modern 'Inner Tech' philosophy: Pattern recognition, metaphysical algorithm, archetypes, clarity.
- Terminology: Always 'Guía Zenderu' (never 'experto' or 'vidente').
- Structured 3-Act Narrative:
    1. Act 1: Existential / life hook (0s - 3.75s)
    2. Act 2: The epiphany / reframing (3.75s - 7.50s)
    3. Act 3: The guide recommendation (7.50s - 10.70s)
    4. Outro: 5 Minutos Gratis promo + live consultation (10.70s - 16.70s)
"""

import json
from pathlib import Path
from typing import Dict, Any, List

TEMPLATES = {
    "conceptual_senal": {
        "title": "La Señal en el Camino (Conceptual / Animado)",
        "archetype": "Patrones & Desbloqueo",
        "style": "conceptual_matte_purple_neon",
        "scenes": [
            {
                "id": 1,
                "start": 0.0,
                "end": 3.75,
                "text": "¿Sientes que estás atrapado en un ciclo que no entiendes?",
                "visual_prompt": "Minimalist matte purple silhouette #252151 walking in an infinite dark geometric void #0f0c21, faint tangled threads above head, subtle neon mint luminescence #62d177"
            },
            {
                "id": 2,
                "start": 3.75,
                "end": 7.50,
                "text": "No es mala suerte, es una señal que no has aprendido a leer.",
                "visual_prompt": "Matte purple silhouette pauses as geometric neon mint luminous path #62d177 emerges from beneath feet, untangling the chaos into organized lines"
            },
            {
                "id": 3,
                "start": 7.50,
                "end": 10.70,
                "text": "Un Guía Zenderu puede ayudarte a encontrar el camino.",
                "visual_prompt": "Wide perspective of the silhouette walking steadily along a glowing mint green beam toward a serene modern beacon of light, ultra clean 3D render"
            }
        ],
        "outro": {
            "start": 10.70,
            "end": 16.70,
            "heading": "Habla en tiempo real y encuentra la respuesta que necesitas.",
            "promo": "¡5 Minutos Gratis!",
            "subpromo": "Para tu primera consulta",
            "cta": "Quiero mis minutos gratis",
            "url": "zenderu.com/gratis"
        }
    },
    "anselmo_algoritmo": {
        "title": "El Algoritmo de tus Decisiones (Anselmo)",
        "archetype": "Arquetipos & Claridad Mental",
        "style": "expert_direct_camera",
        "scenes": [
            {
                "id": 1,
                "start": 0.0,
                "end": 4.0,
                "text": "Sigues tomando la misma decisión esperando un resultado diferente.",
                "visual_prompt": "Anselmo in his modern studio, warm ambient light, engaging eye contact, direct to camera"
            },
            {
                "id": 2,
                "start": 4.0,
                "end": 7.5,
                "text": "Tu mente tiene un patrón inconsciente. Cuando lo descifras, todo cambia.",
                "visual_prompt": "Anselmo gesturing with precision, gentle confident expression, soft depth of field"
            },
            {
                "id": 3,
                "start": 7.5,
                "end": 11.0,
                "text": "Conversemos en vivo ahora mismo en Zenderu.",
                "visual_prompt": "Anselmo inviting tone, pointing subtly toward live interface"
            }
        ],
        "outro": {
            "start": 11.0,
            "end": 17.0,
            "heading": "Habla en vivo con Anselmo o cualquier Guía Zenderu.",
            "promo": "¡5 Minutos Gratis!",
            "subpromo": "Para tu primera consulta",
            "cta": "Hablar en vivo ahora",
            "url": "zenderu.com/gratis"
        }
    },
    "carmen_intuicion": {
        "title": "La Respuesta que ya Conoces (Carmen)",
        "archetype": "Intuición & Claridad Emocional",
        "style": "expert_direct_camera",
        "scenes": [
            {
                "id": 1,
                "start": 0.0,
                "end": 3.8,
                "text": "A veces no necesitas que te digan qué hacer, sino confirmar lo que ya intuyes.",
                "visual_prompt": "Carmen in a warm serene setting, compassionate eye contact, soft natural lighting"
            },
            {
                "id": 2,
                "start": 3.8,
                "end": 7.5,
                "text": "Una mirada externa sin prejuicios te da la claridad que el ruido diario te quita.",
                "visual_prompt": "Carmen smiling reassuringly, authentic presence"
            },
            {
                "id": 3,
                "start": 7.5,
                "end": 10.8,
                "text": "Estoy lista en Zenderu para escucharte y encontrar el norte.",
                "visual_prompt": "Carmen inviting gesture"
            }
        ],
        "outro": {
            "start": 10.8,
            "end": 16.8,
            "heading": "Conecta en vivo por chat o llamada de audio.",
            "promo": "¡5 Minutos Gratis!",
            "subpromo": "Para tu primera consulta",
            "cta": "Iniciar mi consulta",
            "url": "zenderu.com/gratis"
        }
    }
}

def get_script(template_name: str) -> Dict[str, Any]:
    if template_name not in TEMPLATES:
        raise ValueError(f"Template '{template_name}' not found. Available: {list(TEMPLATES.keys())}")
    return TEMPLATES[template_name]

def list_templates() -> List[str]:
    return list(TEMPLATES.keys())

def export_script_to_json(template_name: str, output_path: str):
    script = get_script(template_name)
    Path(output_path).write_text(json.dumps(script, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Exported script to {output_path}")

if __name__ == "__main__":
    import sys
    name = sys.argv[1] if len(sys.argv) > 1 else "conceptual_senal"
    print(json.dumps(get_script(name), indent=2, ensure_ascii=False))
