"""
Zenderu Master Ad Generator CLI
Allows selecting and launching any of the 8 approved ad templates:
  - AD_01: UGC Testimonial / Story
  - AD_02: Animado Conceptual (Inner Tech)
  - AD_03: UGC Conversación WhatsApp
  - AD_04: UGC Escribiendo y Borrando iOS
  - AD_05: Animado Señal en el Camino 5Min (Best Performer)
  - AD_06: AI vs Guía Humano
  - AD_07: Anselmo Quantum Quote
  - AD_08: Anselmo Emocional Quote
"""

import argparse
import json
import sys
from pathlib import Path

TEMPLATES_DIR = Path(__file__).resolve().parent / "templates"

def list_ad_templates():
    templates = []
    for f in sorted(TEMPLATES_DIR.glob("*.json")):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
            templates.append({
                "id": data.get("id"),
                "name": data.get("name"),
                "archetype": data.get("archetype"),
                "style": data.get("style"),
                "file": f.name
            })
        except Exception:
            pass
    return templates

def get_ad_template(template_id: str):
    t_id = template_id.upper()
    for f in TEMPLATES_DIR.glob("*.json"):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
            if data.get("id", "").upper() == t_id or t_id in f.stem.upper():
                return data
        except Exception:
            pass
    raise ValueError(f"Template '{template_id}' not found. Run with --list to see options.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Zenderu Master Ad Generator")
    parser.add_argument("template", nargs="?", help="Template ID (e.g. AD_01, AD_05) or name")
    parser.add_argument("--list", action="store_true", help="List all available ad templates")
    parser.add_argument("--json", action="store_true", help="Print raw template JSON")

    args = parser.parse_args()

    if args.list or not args.template:
        print("\n🎬 CATÁLOGO OFICIAL DE TEMPLATES PUBLICITARIOS (ZENDERU):")
        print("=" * 80)
        print(f"{'ID':<7} | {'NOMBRE':<35} | {'ARQUETIPO':<32}")
        print("-" * 80)
        for t in list_ad_templates():
            print(f"{t['id']:<7} | {t['name']:<35} | {t['archetype']:<32}")
        print("=" * 80)
        print("Uso: python3 creative/generator.py <ID> (ej: python3 creative/generator.py AD_05)\n")
    else:
        tmpl = get_ad_template(args.template)
        if args.json:
            print(json.dumps(tmpl, indent=2, ensure_ascii=False))
        else:
            print(f"\n=======================================================")
            print(f"🎬 {tmpl.get('id')}: {tmpl.get('name')}")
            print(f"   Arquetipo: {tmpl.get('archetype')}")
            print(f"   Estilo Visual: {tmpl.get('style')}")
            print(f"   Duración Sugerida: {tmpl.get('recommended_duration_s', 15)}s | Aspect Ratio: {tmpl.get('aspect_ratio', '9:16')}")
            print(f"=======================================================")
            print(f"📢 HOOK:\n   \"{tmpl.get('hook', 'N/A')}\"\n")
            print(f"💡 EPIFANÍA / REENCUADRE:\n   \"{tmpl.get('epiphany', 'N/A')}\"\n")
            print(f"🎯 CTA & OFERTA:\n   \"{tmpl.get('cta', 'N/A')}\"\n")
            if "nano_banana_prompts" in tmpl:
                print("🎨 PROMPTS PARA NANO BANANA (GEMINI 3.1 FLASH IMAGE):")
                for k, v in tmpl["nano_banana_prompts"].items():
                    print(f"   [{k}]: {v}")
            print("=======================================================\n")
