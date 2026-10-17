# Contexto para agentes — zenderu-motion

Estudio de producción de anuncios de video de **Zenderu** (app latinoamericana que conecta usuarios con
**Guías** por chat y llamada, para claridad y autoconocimiento). Este repo tiene dos partes:

- **Remotion** (`src/`, `remotion.config.ts`): composiciones de anuncios, intro, sting, outro y lower thirds.
- **`creative/`**: pipeline en Python con templates de guion, generación de imagen y video (Gemini vía
  ComfyUI en Railway), post-producción, audio y entregas a Google Drive.

La web de Zenderu es otro repo (`Zenderuweb`). No mezclar.

## Leer primero
1. `creative/README.md`: manual operativo y comandos.
2. `CREATIVE-PIPELINE.md`: marca, templates, prompts e infraestructura.
3. `creative/RESULTADOS.md`: qué rindió (lo conceptual le gana por lejos a lo realista).
4. `creative/GUION_Y_ANIMACION.md`: cómo escribir guiones, elegir planos y animar personajes fieles a Zenderu.
5. `zenderu_handoff/HANDOFF.md`: historia técnica, límites verificados de cada API y pendientes.
6. `.agents/skills/zenderu-ad-pipeline/SKILL.md`: la skill del pipeline.

## Reglas
- **Ahorro de créditos (obligatorio):** cerrar requisitos y revisar insumos → cotizar con
  `python3 creative/generator.py --estimate <modelo> <segundos>` → **1 prueba** → aprobación del
  usuario → resto, de a 1–2 por vez. 720p por defecto. Nada de ráfagas en paralelo.
- **Conceptual primero:** figura morada sin rostro + Guía de luz verde + camino curvo (`creative/PERSONAJE.md`).
- **Léxico:** "Guía" / "Guía Zenderu". Nunca "experto", "vidente" ni "tarotista". Anselmo es intérprete
  de arquetipos, **no** tarotista.
- **Antes de publicar:** `creative/CHECKLIST_PAUTA.md`. Sin marcas ajenas, sin prometer terapia, con línea
  de crisis y con consentimiento para voces clonadas y caras reales.
- **Claves:** nunca en archivos ni en el chat. Van en `.env` (plantilla: `.env.example`) o en las variables
  de Railway. Leerlas sin imprimirlas.
- Los subtítulos y la pantalla de cierre los decide el usuario. Entregar sin ellos si no los pidió.
- El usuario escribe rápido y con errores de tipeo: interpretar la intención y responder corto.

## Infraestructura
- ComfyUI: `https://comfyui-production-52d3.up.railway.app`. Railway: cuenta `cero1studio@gmail.com`,
  proyecto `selfless-bravery`, entorno `production`. Solo CPU. `/app/input` y `/app/output` se borran en
  cada deploy. Repo del servidor: `github.com/cero1studio/comfyui-railway`.
- Nodos propios: `gemini_omni_direct` y `gemini_image_direct` (cobran a `GOOGLE_API_KEY`). Partner
  (Kling Motion Control, Runway): créditos de comfy.org. Workflows: `creative/comfyui/workflows/`.
- Entregables aprobados: Google Drive `Mi unidad/Zenderu_Marketing_Ads` (symlink `ads_aprobados`).

## Trampas conocidas
- El ffmpeg de la Mac no tiene `libass`, `vidstab` ni `drawtext`. Subtítulos en Remotion; estabilizar con
  `creative/clips/stabilize.py` (OpenCV).
- Gemini Omni: `edit` no cambia la proporción, solo acepta clips de ≤10 s, re-locuta el audio
  (re-sincronizar con `creative/clips/align2.py`), no acepta imágenes de personas reconocibles, y cada toma
  puede variar el look de una persona real.
- Cortar con los filtros `trim`/`atrim` y unir con el filtro `concat`. Con `-ss` antes de `-i` y el concat
  demuxer en `-c copy` se acumula desfase de audio y video.
- En zsh, `$2:end` se interpreta como modificador: usar `${2}`.
- Los jueces de lip sync con LLM no son confiables (muestrean ~1 fps).

## Comandos
```bash
npm run dev                                   # Remotion Studio
npx remotion render <Composition> out/x.mp4   # render
python3 creative/generator.py --list          # templates
python3 creative/generator.py AD_09           # guion + prompts + costo
python3 creative/assemble_ad.py body.mp4 -o final.mp4
```
