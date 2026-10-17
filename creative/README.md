# 🎨 Zenderu Creative & Video Studio (`creative/`)

Suite unificada de producción audiovisual, marketing y generación publicitaria para Zenderu: guiones estratégicos, arte conceptual 3D, templates HTML animados, conexión con ComfyUI (HTTP + SSH en Railway), cortinillas oficiales (Intro, Wipe, Outro), subtítulos cinemáticos y masterización de audio para pauta publicitaria (Instagram Reels, TikTok, YouTube Shorts).

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
├── generator.py                   # Catálogo y lanzador de los 8 templates de anuncios
├── assemble_ad.py                 # Ensamble integral 1-click (normalización + bumpers + subs + drive)
├── PROMPTS.md                     # Catálogo de prompts probados en producción
│
├── assets/                        # ASSETS OFICIALES UNIFICADOS (Branding, 3D, Audio, Fondos)
│   ├── branding/                  # Logos blanco, color, SVG, guide_hero, zen token
│   ├── 3d_icons/                  # 22 íconos 3D transparentes (certeza, cosmos, mente, paralisis, etc.)
│   ├── backgrounds/               # Fondos 9:16 deep cosmos y universo
│   └── audio_sfx/                 # SFX oficiales de la app (chat_message, call_dialing, tip_received, etc.)
│
├── comfyui/                       # CONEXIÓN INTEGRAL COMFYUI RAILWAY
│   ├── client.py                  # API HTTP (queue prompt, monitor, /view downloader)
│   ├── remote_ssh.py              # Puente SSH directo con Railway (ejecutar, listar /app/output, sync)
│   └── workflows/                 # Workflows exportados para ComfyUI (Omni Direct, Kling, Image)
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
│   ├── subtitles.py               # Generación y quemado de subtítulos ASS dinámicos con highlight #62D177
│   ├── stabilize.py               # Estabilización vidstab en dos pasadas (trípode virtual)
│   ├── align2.py                  # Re-sincronización labial de voz con lipsync
│   └── omni_edit.py               # Asistente de preparación de clips para Gemini Omni
│
├── audio/                         # MOTOR DE AUDIO & MASTERIZACIÓN
│   └── master_audio.py            # Medición EBU R128 (-16 LUFS), EQ studio iPhone y ducking
│
├── images/                        # GENERADOR DE IMÁGENES NANO BANANA (GEMINI 3.1)
│   ├── generate_image.py          # CLI de prompts
│   └── presets.py                 # Biblioteca de prompts aprobados en producción
│
└── templates/                     # LOS 8 GUIONES Y ESTRUCTURAS OFICIALES (JSON)
    ├── ad_01_ugc_story.json
    ├── ad_02_animado_conceptual.json
    ├── ad_03_ugc_conversacion_ws.json
    ├── ad_04_ugc_escribiendo_borrando.json
    ├── ad_05_animado_senal_camino.json
    ├── ad_06_ai_vs_humano.json
    ├── ad_07_anselmo_quantum.json
    └── ad_08_anselmo_emocional.json
```

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

# Ejecutar comandos directamente en el servidor Railway
python3 creative/comfyui/remote_ssh.py --exec "nvidia-smi"
```

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
# Ver los 8 templates disponibles
python3 creative/generator.py --list

# Ver estructura completa de un template
python3 creative/generator.py AD_05
```

### 5. Ensamble Final de Anuncio en 1 Comando
Toma el clip de video del cuerpo, normaliza el audio a -16 LUFS (sin duplicar pistas de música), añade el Outro oficial de 6s con la promo "5 Minutos Gratis", genera subtítulos cinemáticos con highlights menta y sincroniza automáticamente a Google Drive y Descargas:

```bash
python3 creative/assemble_ad.py ruta/a/clip_cuerpo.mp4 -o final_ad.mp4
```
