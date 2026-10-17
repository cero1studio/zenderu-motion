# 🎨 Zenderu Creative & Video Studio (`creative/`)

Suite unificada de producción audiovisual, marketing y generación publicitaria para Zenderu: guiones estratégicos, arte conceptual 3D, templates HTML animados, conexión con ComfyUI (HTTP + SSH en Railway), cortinillas oficiales (Intro, Wipe, Outro), subtítulos cinemáticos y masterización de audio para pauta publicitaria (Instagram Reels, TikTok, YouTube Shorts).

Vive en el repo **`zenderu-motion`** (`github.com/cero1studio/zenderu-motion`), separado de la web (`Zenderuweb`).

## ⚠️ Antes de producir

1. **Revisar `RESULTADOS.md`.** Lo conceptual (figura morada + camino verde) rinde mucho más que lo realista: es el formato por defecto.
2. **Ahorro de créditos:** requisitos cerrados → cotizar (`python3 creative/generator.py --estimate <modelo> <segundos>`) → **1 prueba** → aprobación → lote. 720p por defecto, de a 1–2 generaciones (Omni permite 4/min, y el prepago se pasa a negativo si se lanzan muchas juntas).
3. **Personaje conceptual:** seguir `PERSONAJE.md` y usar sus referencias fijas. Para guion, planos y animación: `GUION_Y_ANIMACION.md`.
4. **Antes de publicar:** `CHECKLIST_PAUTA.md`.

---

## 🏛️ Filosofía y Reglas de Marca (Inner Tech)

- **Copywriting y Storytelling:**
  - De cara al usuario **NUNCA** decir "experto", "vidente" o "tarotista". Siempre usar **"Guía Zenderu"** o **"Guía"**.
  - Evitar clichés esotéricos tradicionales. La propuesta de Zenderu es de **autoconocimiento moderno, lectura de arquetipos, reconocimiento de patrones y claridad para la toma de decisiones**.
  - Estructura narrativa en 3 actos:
    1. **Acto 1 (Hook - 0s a 3.75s):** Fricción existencial o relacional ("¿Sientes que estás atrapado en un ciclo que no entiendes?").
    2. **Acto 2 (Epifanía - 3.75s a 7.50s):** Reencuadre ("No es mala suerte, es una señal que no has aprendido a leer").
    3. **Acto 3 (Solución - 7.50s a 10.70s):** Recomendación de conectar con un Guía Zenderu.
    4. **Outro Oficial (10.70s a 16.70s):** Promo ¡5 Minutos Gratis! en primera consulta + CTA + URL.

- **Identidad Visual (Inner Tech Palette):**
  - Fondo espacial profundo: `#0f0c21` / `#0a0818` / `#06011a`
  - Siluetas 3D mate sin rostro: `#252151`
  - Acentos y haces de luz: Verde Menta Neón `#62d177`
  - Textos secundarios / lavanda: `#a5a2c4` / `#8b85b2`
  - Aspect Ratio estándar: **9:16 vertical (1080x1920)** a **30 fps**.

- **Normas de Audio (EBU R128):**
  - Loudness integrado objetivo: **-16.0 LUFS** (±0.5 LUFS).
  - True Peak máximo: **-1.5 dBTP**.
  - Rango dinámico (LRA): `<= 7.0 LU`.
  - **Cero superposición de canciones:** Si el clip base ya tiene música de fondo propia, **nunca** agregar otra pista encima. Normalizar su pista limpia y enlazar suavemente con el Outro.

---

## 📂 Mapa de Estructura Unificada (`creative/`)

```text
creative/
├── README.md                      # Este manual operativo integral
├── config.py                      # Configuración central (rutas, tokens de color, audio/video)
├── generator.py                   # Catálogo de templates + cotizador de costos (--estimate)
├── assemble_ad.py                 # Ensamble 1-click (normalización -16 LUFS + intro/outro + Drive). No quema subtítulos
├── PROMPTS.md                     # Catálogo de prompts probados en producción
├── RESULTADOS.md                  # Rendimiento de cada anuncio y aprendizajes (actualizar tras cada campaña)
├── PERSONAJE.md                   # Biblia del personaje conceptual (figura morada + Guía verde)
├── GUION_Y_ANIMACION.md           # Método: guion, planos, edición y animación de personajes paso a paso
├── CHECKLIST_PAUTA.md             # Revisión de marca, salud mental, derechos y técnica antes de pautar
│
├── assets/                        # ASSETS OFICIALES UNIFICADOS (Branding, 3D, Audio, Fondos)
│   ├── branding/                  # Logos blanco, color, SVG, guide_hero, zen token
│   ├── 3d_icons/                  # 22 íconos 3D transparentes (certeza, cosmos, mente, paralisis, etc.)
│   ├── backgrounds/               # Fondos 9:16 deep cosmos y universo
│   └── audio_sfx/                 # SFX oficiales de la app (chat_message, call_dialing, tip_received, etc.)
│
├── comfyui/                       # CONEXIÓN INTEGRAL COMFYUI RAILWAY
│   ├── client.py                  # API HTTP (subir input, encolar con key comfy.org, monitor, /view)
│   ├── remote_ssh.py              # Puente SSH directo con Railway (ejecutar, listar /app/output, sync)
│   └── workflows/                 # Workflows formato API: Omni edit, Nano Banana, Kling Motion (ver su README)
│
├── html_motion/                   # TEMPLATES HTML5 ANIMADOS (MOCKUPS & VIDEO EN 9:16)
│   ├── index.html                 # Studio interactivo de previsualización responsive
│   ├── preview.py                 # Servidor local de desarrollo (http://localhost:3333)
│   └── templates/                 # Plantillas 1080x1920 broadcast
│       ├── chat_consultation.html # Chat en vivo simulado (audionota, typing, Zens)
│       ├── call_interface.html    # Pantalla de llamada en altavoz (ondas pulsantes, timer)
│       └── epiphany_quote.html    # Cita epifanía Anselmo (estrellas flotantes, neón)
│
├── motion/                        # CORTINILLAS Y MOTION REMOTION
│   └── render_bumpers.py          # Acceso a Intro (3s), Wipe (1s) y Outro Oficial (6s Promo 5 Min)
│
├── clips/                         # HERRAMIENTAS DE VIDEO & POST-PRODUCCIÓN
│   ├── subtitles.py               # Subtítulos ASS con highlight #62D177 dentro de la zona segura (quemar requiere libass)
│   ├── stabilize.py               # Estabilización con OpenCV siguiendo el fondo (smooth 10 + zoom 0 ≈ trípode)
│   ├── align2.py                  # Re-sincroniza la voz ORIGINAL con los labios de un clip editado por Omni
│   └── omni_edit.py               # Edit con Gemini Omni (≤10 s, placa de fondo, look fijo, mirada a cámara)
│
├── audio/                         # MOTOR DE AUDIO & MASTERIZACIÓN
│   └── master_audio.py            # Medición EBU R128 (-16 LUFS), EQ studio iPhone y ducking
│
├── images/                        # GENERADOR DE IMÁGENES NANO BANANA (GEMINI 3.1)
│   ├── generate_image.py          # CLI de prompts
│   └── presets.py                 # Biblioteca de prompts aprobados en producción
│
└── templates/                     # GUIONES Y ESTRUCTURAS OFICIALES (JSON)
    ├── ad_01_ugc_story.json
    ├── ad_02_animado_conceptual.json
    ├── ad_03_ugc_whatsapp.json
    ├── ad_04_ugc_escribiendo.json
    ├── ad_05_animado_senal_camino.json      # ⭐ mejor rendimiento
    ├── ad_06_ai_vs_human.json
    ├── ad_07_anselmo_quantum.json
    ├── ad_08_anselmo_emocional.json
    └── ad_09_ia_responde_no_escucha.json    # AD_06 en versión conceptual (guion aprobado, sin producir)
```

Campos opcionales de un template: `hook_variants` (ganchos A/B) y `production` (plan de generación que `generator.py` cotiza, por ejemplo `[{"model": "gemini_omni_720p", "seconds": 20}]`).

### Requisitos locales
- `.env` a partir de `.env.example` (`GOOGLE_API_KEY`, `COMFY_ORG_API_KEY`, `RUNWAYML_API_SECRET`). Nunca commitear claves.
- `stabilize.py` necesita OpenCV en un venv: `python3 -m venv venv_vision && venv_vision/bin/pip install opencv-python-headless numpy`.
- El ffmpeg de Homebrew de la Mac del estudio **no trae `libass`, `vidstab` ni `drawtext`**. Para quemar subtítulos, hacerlo en Remotion o usar un ffmpeg compilado con libass.

---

## 🚀 Flujos de Trabajo y Comandos

### 1. ComfyUI en la Nube (Railway HTTP + SSH Direct)
El servicio corre en Railway bajo el proyecto `selfless-bravery` (`https://comfyui-production-52d3.up.railway.app`):

```bash
# Verificar estado de conexión HTTP y túnel SSH
python3 creative/comfyui/remote_ssh.py --status

# Listar todos los videos e imágenes generados en /app/output
python3 creative/comfyui/remote_ssh.py --list-outputs

# Descargar un clip generado directamente a creative/output/
python3 creative/comfyui/remote_ssh.py --download gemini_omni_1791319707_90.mp4

# Ejecutar comandos directamente en el servidor Railway (es solo CPU: no hay GPU)
python3 creative/comfyui/remote_ssh.py --exec "ls -la /app/output"
```

Notas del servidor:
- Cuenta de Railway **cero1studio@gmail.com**, proyecto `selfless-bravery`, entorno `production`. Para conectar: `railway login` → `railway link` → `railway ssh`.
- `/app/input` y `/app/output` **se borran en cada deploy**: descargar los resultados enseguida.
- Nodos propios: `gemini_omni_direct` y `gemini_image_direct` (cobran a `GOOGLE_API_KEY`). Los nodos partner (Kling Motion Control, Runway) cobran a comfy.org. **Runway Act-Two no existe como nodo de ComfyUI**: se usa desde la web o la API de Runway.
- Bug conocido en `gemini_omni_direct`: la descarga por URI (1080p/4K) usa `files/{id}?alt=media` y Google responde 400. Lo correcto es `files/{id}:download?alt=media`. En 720p no afecta, porque el video llega inline.

### 2. Studio de Mockups y HTML5 Animado (9:16)
Permite visualizar, interactuar y capturar animaciones broadcast de la interfaz de Zenderu para los anuncios:

```bash
# Iniciar el servidor local de previsualización (abre en http://localhost:3333)
python3 creative/html_motion/preview.py
```
* **Chat en Tiempo Real (`templates/chat_consultation.html`)**: Mensajes de cliente y guía, indicador de escritura ("Guía está escribiendo..."), audionota con ondas sonoras en verde menta y saldo de Zens.
* **Llamada en Vivo (`templates/call_interface.html`)**: Avatar central con pulsos expansivos, timer activo en vivo, medidor de voz y controles de llamada.
* **Cita Epifanía (`templates/epiphany_quote.html`)**: Fondo de cosmos con partículas animadas, cita en Outfit 800 y highlight en `#62D177`.

### 3. Generación de Arte con Nano Banana (Gemini 3.1)
```bash
# Listar todos los presets probados
python3 creative/images/generate_image.py --list

# Generar prompt de figura sobre sendero neón (AD_05)
python3 creative/images/generate_image.py conceptual_figura_camino

# Generar prompt de Anselmo en oficina moderna
python3 creative/images/generate_image.py anselmo_oficina_realista
```

### 4. Consultar Guiones y Templates Publicitarios
```bash
# Ver los templates disponibles
python3 creative/generator.py --list

# Ver estructura completa de un template (incluye ganchos A/B y costo estimado si los tiene)
python3 creative/generator.py AD_05

# Cotizar una generación antes de lanzarla
python3 creative/generator.py --estimate gemini_omni_720p 20
python3 creative/generator.py --estimate nano_banana_2k 3
```

### 5. Ensamble Final de Anuncio en 1 Comando
Toma el clip de video del cuerpo, normaliza el audio a -16 LUFS (sin duplicar pistas de música), añade el Outro oficial de 6s con la promo "5 Minutos Gratis" y sincroniza automáticamente a Google Drive y Descargas. **No quema subtítulos**: para eso usar `clips/subtitles.py` (requiere libass) o Remotion.

```bash
python3 creative/assemble_ad.py ruta/a/clip_cuerpo.mp4 -o final_ad.mp4
```
