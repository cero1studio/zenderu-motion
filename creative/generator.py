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
  - AD_09: IA Responde, No Escucha (Conceptual)

Templates with a "production" block print an estimated cost; quote any run with:
  python3 creative/generator.py --estimate gemini_omni_720p 30
"""

import argparse
import json
import sys
from pathlib import Path

_PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(_PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(_PROJECT_ROOT))

from creative.config import COST_CONFIRM_THRESHOLD_USD, GENERATION_PRICES_USD_PER_S, IMAGE_PRICES_USD, estimate_cost

TEMPLATES_DIR = Path(__file__).resolve().parent / "templates"


def production_cost(tmpl):
    """Sum the template's production plan: [{"model": ..., "seconds": n} | {"model": ..., "images": n}]."""
    return round(sum(estimate_cost(p["model"], p.get("seconds", 0), p.get("images", 0)) for p in tmpl.get("production", [])), 2)

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
    parser.add_argument("--estimate", nargs=2, metavar=("MODEL", "AMOUNT"),
                        help="Quote a run: seconds of video, or number of images for nano_banana_* models")

    args = parser.parse_args()

    if args.estimate:
        model, amount = args.estimate[0], float(args.estimate[1])
        if model not in GENERATION_PRICES_USD_PER_S and model not in IMAGE_PRICES_USD:
            sys.exit(f"Modelo desconocido. Opciones: {sorted([*GENERATION_PRICES_USD_PER_S, *IMAGE_PRICES_USD])}")
        usd = estimate_cost(model, seconds=amount, images=int(amount))
        flag = " ⚠️ supera el umbral: confirmar antes de generar" if usd > COST_CONFIRM_THRESHOLD_USD else ""
        print(f"{model} x {amount:g} ≈ USD {usd:.2f}{flag}")
    elif args.list or not args.template:
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
            if tmpl.get("hook_variants"):
                print("🧪 GANCHOS A/B:")
                for h in tmpl["hook_variants"]:
                    print(f"   - {h}")
                print()
            if "nano_banana_prompts" in tmpl:
                print("🎨 PROMPTS PARA NANO BANANA (GEMINI 3.1 FLASH IMAGE):")
                for k, v in tmpl["nano_banana_prompts"].items():
                    print(f"   [{k}]: {v}")
            if tmpl.get("production"):
                usd = production_cost(tmpl)
                flag = " ⚠️ confirmar antes de generar" if usd > COST_CONFIRM_THRESHOLD_USD else ""
                print(f"\n💰 COSTO ESTIMADO DE GENERACIÓN: ≈ USD {usd:.2f}{flag}")
            print("=======================================================\n")
