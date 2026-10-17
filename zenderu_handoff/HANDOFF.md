# Traspaso: Zenderu + ComfyUI en Railway

Resumen para continuar el trabajo en otro agente (Antigravity). **No contiene claves**: las API keys
viven como variables en Railway y no se deben pegar en chats ni en archivos.

---

## 1. Contexto y preferencias del usuario

- Usuario: Javier Anselmo Mayorga ("Anselmo Quantum"), guía y fundador de **Zenderu**, una app
  latinoamericana de guía espiritual y psicológica que conecta a usuarios con "Guías" por chat y llamada.
  Escribe en español informal y rápido, con muchos errores de tipeo: hay que interpretar la intención.
- **Ahorro de créditos primero:** cerrar todos los requisitos y revisar los insumos antes de gastar;
  hacer 1 prueba y recién después el lote; 720p por defecto; nunca lanzar ráfagas en paralelo (ver §4).
- **Lo que más rindió:** el anuncio **conceptual** (figura morada sin rostro, estilo ilustración
  Zenderu, de la incertidumbre a la claridad, camino verde) superó por mucho a los realistas. Para
  campañas nuevas, el estilo conceptual va por defecto.
- Posicionamiento de Anselmo: **interpretación de arquetipos, NO tarot**. Su madre usaba tarot; él
  no quiere decir que lo usa.
- La pantalla de cierre (CTA) y los subtítulos los hace él. Los videos se entregan sin eso.
- Quiere resultados que se vean reales, verticales para redes, y respuestas cortas.

## 2. Infraestructura

| Cosa | Valor |
|---|---|
| Repo | `https://github.com/cero1studio/comfyui-railway` (fork de ComfyUI), rama `master`. Local: `~/Documents/ComfyUI` |
| Railway | Cuenta **cero1studio@gmail.com** → proyecto **`selfless-bravery`** → entorno `production` |
| URL pública | `https://comfyui-production-52d3.up.railway.app` |
| Deploy | Conectado a GitHub (push a `master` → deploy). También sirve `railway up` |
| Hardware | **Solo CPU** (sin GPU). Toda la generación va por APIs en la nube |
| Volumen | `comfyui-volume` montado en `/root/ComfyUI`, **pero la app corre en `/app`**: `/app/input` y `/app/output` se **borran en cada deploy** |
| Variables | `GOOGLE_API_KEY` (AI Studio, facturación prepaga). Se leen con `railway variables` |

Conectarse:
```bash
railway logout && railway login          # con cero1studio@gmail.com
railway link                             # selfless-bravery / production / servicio de ComfyUI
railway ssh
```
(Al 2026-10-16 el CLI de la Mac tenía sesión con otra cuenta, `artecohogar601@…`, que no ve este proyecto.)

### Dockerfile (resumen)
`python:3.10-slim` → torch **CPU** fijado (`torch==2.11.0 torchvision==0.26.0 torchaudio==2.11.0`,
`--extra-index-url https://download.pytorch.org/whl/cpu`) **antes** de `requirements.txt` →
clona ComfyUI-Manager y `jqy-yo/comfyui-gemini-nodes` → `CMD python main.py --listen 0.0.0.0 --port $PORT --cpu`.
Historial de arreglos: torch se pisaba por el orden de instalación; `--index-url` excluía PyPI (usar
`--extra-index-url`); cu121 era muy viejo para `comfy-kitchen`; Railway no tiene GPU, por eso CPU.

### Nodos propios (en `custom_nodes/`, agregados a git con force-add porque `/custom_nodes/` está en .gitignore)
- **`gemini_omni_direct`**: "Gemini Omni Video Generator (Direct API)". Video con Gemini Omni Flash
  vía Interactions API, cobrado a `GOOGLE_API_KEY` (sin el recargo de comfy.org).
  `aspect_ratio` se manda solo si el task no es `edit`/`extend`. `OUTPUT_NODE = True`.
  **Bug conocido sin arreglar:** la descarga por URI (1080p/4k) usa `GET /v1beta/files/{id}?alt=media`,
  que devuelve error 400. Lo correcto es `GET /v1beta/files/{id}:download?alt=media`.
- **`gemini_image_direct`**: "Gemini Image Generator (Direct API)" (Nano Banana: `gemini-3.1-flash-image`)
  con `resolution` 1K/2K/4K y `thinking_level`.

### Nodos nativos útiles (cobran con créditos de comfy.org, con sesión en ComfyUI o `extra_data.api_key_comfy_org`)
- **Kling Motion Control** (foto + video de movimiento). kling-v3: USD 0,126/s std, 0,168/s pro;
  v2-6: 0,07/0,112. Hasta 30 s con la orientación tomada del video, hasta 10 s tomada de la foto.
- Runway (Gen-4, Aleph 2, texto a imagen) y Kling Avatar, lip sync, etc.

## 3. Lo que aprendimos de cada API (verificado en documentación oficial)

**Gemini Omni Flash (`gemini-omni-1.1-flash`)**
- Precio directo ≈ USD 0,10/s a 720p. Límite **4 pedidos/min** (Tier 1). El prepago puede quedar en
  negativo: el cobro llega con ~10 min de retraso (el 2026-10-09 quedó en −15.000 COP por lanzar 5 en paralelo).
- `edit`/`extend`: el video subido debe durar **≤10 s**. `edit` **no deja cambiar la proporción**:
  para salida vertical, mandar el clip recortado en cuadrado y con relleno negro hasta 9:16, y pedirle
  que rellene el negro (funcionó muy bien).
- **No admite edición de voz ni referencias de audio.** No acepta **imágenes** de personas reconocibles
  (en video sí edita personas reales). Para referencias de fondo, usar placas sin personas.
- **Re-locuta el audio** (TTS sintético) y mueve los labios a ese nuevo ritmo → hay que re-sincronizar
  la voz original con `tools/align2.py`. El modo `edit` conserva la cámara: los encuadres por texto
  (3/4, primer plano) no se respetan; los primeros planos se hacen con zoom en el montaje.
- Prompts que dictan lo que dice una persona real → `content_blocked`. Pedir solo "keep the original
  audio untouched".
- Cada `edit` puede variar bigote, cuello de camisa o expresividad: especificar todo explícitamente
  (camisa abotonada arriba, bigote natural corto, expresión tranquila) y revisar la consistencia entre tomas.

**Runway**: API de desarrollador con billetera propia (mínimo USD 10, USD 0,01 por crédito; los
créditos del plan web no sirven ahí). **Act-Two** = 5 créditos/s (USD 0,05/s), endpoint
`POST /v1/character_performance`, video de referencia de 3 a 30 s, `bodyControl`, `ratio 720:1280`.
En la app web, la transferencia de actuación cobró ~17 créditos/s (usa Kling Motion por debajo).
El MCP de Runway (`https://mcp.runwayml.com/mcp`) pidió plan Enterprise en la cuenta del usuario.

**Kling directo**: `https://api-singapore.klingai.com`, `Authorization: Bearer <api key>`,
`POST /motion-control/kling-3.0` (contents: prompt + image(url/base64) + video(**URL pública**)),
consulta con `GET /tasks?task_ids=`. Motion Control cuesta USD 0,126/s a 720p (mismo precio de lista
que comfy.org, así que no conviene un nodo directo salvo descuentos por paquete).

## 4. Herramientas (`tools/`)

| Script | Qué hace |
|---|---|
| `omni_edit.py` | Edit con Omni de un clip de ≤10 s con placa de fondo, look fijo, mirada a cámara y retoque mínimo |
| `align2.py` | Re-sincroniza la voz original con los labios de un clip de Omni (por frases y sin cambiar el tono) |
| `stabilize.py` | Estabilización con OpenCV siguiendo el fondo. `smooth=10 zoom=0` ≈ trípode |

Instalación de OpenCV (en un venv aparte):
`python3 -m venv venv && ./venv/bin/pip install opencv-python-headless numpy`.

ffmpeg de esta Mac (8.1.2): **no trae `vidstab` ni `drawtext`**. Sí trae `nlmeans hqdn3d cas
colorbalance curves vibrance afftdn anlmdn deesser acompressor loudnorm`.

**Gradeo "tipo iPhone" + limpieza de audio que se usó y aprobó:**
```
-vf "hqdn3d=2:1.5:4:3,scale=1080:1920:flags=lanczos,colorbalance=rs=0.015:bs=-0.015:rm=0.025:gm=0.008:bm=-0.025:rh=0.012:bh=-0.012,curves=all='0/0 0.12/0.10 0.5/0.53 0.88/0.91 1/1',eq=contrast=1.06:saturation=1.05:gamma=1.02,vibrance=intensity=0.10,cas=0.45"
-af "highpass=f=80,afftdn=nr=8:nf=-42:tn=1,deesser=i=0.3,equalizer=f=250:t=q:w=1:g=-2,equalizer=f=3500:t=q:w=1:g=2,acompressor=threshold=-20dB:ratio=2.5:attack=10:release=150:makeup=2,loudnorm=I=-14:TP=-1.5:LRA=9"
```
Ojo: `afftdn` fuerte deja la voz robótica; usarlo suave.

**Trampas que ya costaron tiempo:**
- En zsh, `$2:end` se interpreta como modificador: usar `${2}` o scripts en Python.
- Para cortar al cuadro exacto, usar los filtros `trim`/`atrim` y no `-ss` antes de `-i`. Unir con el
  filtro `concat` (una sola pasada): el concat demuxer con `-c copy` acumuló desfase de audio y video.
- Los jueces de lip sync con LLM (Gemini viendo el video) **no son confiables**, porque muestrean ~1 fps.
  Para verificar: comparar envolventes de audio por ventanas o mirar a ojo.
- La carpeta temporal de la sesión se borra sola: guardar todo lo importante en `~/Documents` o `~/Downloads`.

## 5. Entregables (en `~/Downloads`)

- `runway_act_two/`: tramos para Runway (transferencia de actuación).
  `subir_video_2/` (foto en primer plano + `VIDEO_2.mp4`) y `subir_video_3/` (foto en plano medio +
  `VIDEO_3.mp4`). El video 1 ya lo generó el usuario en Runway (quedó bien).
  En las frases nuevas, los videos de actuación usan las tomas de Omni con mirada a cámara y la voz
  real re-sincronizada.
- `anselmo_original_editado.mp4`: original real sin nada de Wengo, con las 3 frases nuevas
  (horizontal, sincronizado, sin IA).
- `anselmo_heygen_entrenamiento.mp4`: 73 s continuos y limpios del video original (para entrenar avatares).
- `anselmo_zenderu_corto.mp4` (22 s) y `anselmo_zenderu_vertical_v3.mp4` (40 s): versiones con Omni.
  El usuario notó diferencias de look entre tomas (barba, cuello de camisa, cara más llena o más delgada).
- `2026_10_09_07_57_04_final.mp4`: video de una guía estabilizado, a 1080p, con color tipo iPhone y audio limpio.
- `1/2/3 anselmo.mp4`: las 3 frases nuevas grabadas por Anselmo (webcam, marca de agua de Descript abajo a la derecha).

Guion final del video de Anselmo: "Saludos, soy Anselmo." · "Desde mi infancia, guiado por la sabiduría de mi
madre, aprendí a interpretar arquetipos y conectar mundos." · Ingeniero… · Metafísica… · Esta búsqueda… ·
Consejos… · Hoy… · "Ofrezco un enfoque único que fusiona la interpretación de arquetipos con la habilidad de
descifrar algoritmos." · Explora… · Estoy aquí… · ¿Estás listo…? · "Te invito a mi espacio Zenderu a una
consulta transformadora." · "Ven, te espero."

`assets/`: `bg_zenderu.png`, `guide_hero.webp`, `logo_white.svg` (identidad visual), `anselmo_personaje_frente.png`
(personaje de frente, 720x1280, look alineado), `anselmo_oficina_retrato.png` (retrato en la oficina, de lado).

## 6. Pendientes

1. **Runway:** el usuario genera los videos 2 y 3 (cada uno con su foto). Después hay que unir los 3
   resultados en un solo video vertical con su voz original (el audio ya está dentro de cada video de
   actuación). Disimular con fundidos los saltos de los cortes internos.
2. **Campaña "Te responde. No te escucha."** (gente que usa la IA como psicólogo), **en versión conceptual**:
   figura morada + ventana de chat azul fría → muro de respuestas → apagón → nace una Guía de luz verde
   → camino verde de Zenderu. Empezar por 3 imágenes clave con Nano Banana usando `bg_zenderu`/`guide_hero`
   como referencia, pedir aprobación, y después video de prueba a 720p. En anuncios pagos no nombrar
   "ChatGPT", no prometer terapia y agregar una línea de crisis en la descripción.
3. Arreglar el bug de descarga por URI en `gemini_omni_direct` (§2).
4. **Rotar `GOOGLE_API_KEY`:** quedó expuesta en logs y errores durante la sesión. Rotarla en AI Studio
   y actualizarla en Railway.
5. Antiguo, en pausa: anuncio cinematográfico "pro" (pareja que discute → escalera → app → camino
   verde) hecho con cadena de `extend`. Los archivos intermedios estaban en la carpeta temporal y
   probablemente se perdieron. Si se retoma, rehacer en estilo conceptual.
