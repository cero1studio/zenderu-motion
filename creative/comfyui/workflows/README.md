# Workflows de ComfyUI (formato API)

Plantillas para encolar con `creative/comfyui/client.py`. **Todavía no se probaron contra el servidor**:
validar la primera vez con un caso chico.

| Archivo | Nodos | Cobra a |
|---|---|---|
| `gemini_omni_edit_api.json` | LoadVideo + LoadImage (placa sin personas) → `GeminiOmniVideoGenerator` (edit, 720p) | `GOOGLE_API_KEY` (variable de Railway) |
| `gemini_image_api.json` | LoadImage (referencia de estilo) → `GeminiImageGenerator` (2K, 9:16) → SaveImage | `GOOGLE_API_KEY` |
| `kling_motion_control_api.json` | LoadImage (personaje) + LoadVideo (actuación) → `KlingMotionControl` → SaveVideo | créditos de comfy.org (`COMFY_ORG_API_KEY`) |

Uso:

```python
import json
from creative.comfyui.client import ComfyUIClient

c = ComfyUIClient()
wf = json.load(open("creative/comfyui/workflows/kling_motion_control_api.json"))
wf["1"]["inputs"]["image"] = c.upload_input("personaje.png")
wf["2"]["inputs"]["file"] = c.upload_input("actuacion.mp4")
pid = c.queue_prompt(wf)["prompt_id"]
c.wait_for_completion(pid, timeout_s=900)
```

Reglas:
- Cotizar antes de lanzar: `python3 creative/generator.py --estimate kling_motion_720p 30`.
- Omni `edit`: clip de 10 s o menos, la proporción no se puede cambiar (armar el 9:16 antes con relleno
  negro), y la imagen de referencia no puede tener personas reconocibles.
- Kling: video de 3 a 30 s con `character_orientation=video` (hasta 10 s con `image`), toma continua sin cortes.
- `/app/input` y `/app/output` en Railway se borran en cada deploy: descargar los resultados enseguida.
