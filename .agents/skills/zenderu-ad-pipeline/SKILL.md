---
name: zenderu-ad-pipeline
description: Pipeline maestro y generador de anuncios de alto rendimiento para Zenderu (Inner Tech). Define los templates oficiales (AD_01 a AD_09), generación de imágenes conceptuales 3D con Nano Banana (Gemini 3.1 Flash Image), generación/edición de video con ComfyUI (Railway), y postproducción automatizada (recorte, estabilización, subtítulos en #62D177, cortinillas oficiales de intro/outro y masterización -16 LUFS).
---

# 🎬 Zenderu Ad Production Pipeline (Inner Tech)

Manual operativo para la creación, generación y postproducción automatizada de anuncios de video para Zenderu.

## Reglas que se aplican siempre

1. **Conceptual primero.** Lo conceptual (figura morada sin rostro + camino verde, AD_02/AD_05/AD_09) rinde mucho más que lo realista. Ver `creative/RESULTADOS.md`.
2. **Ahorro de créditos.** Cerrar requisitos y revisar insumos → cotizar con `python3 creative/generator.py --estimate <modelo> <segundos>` → 1 prueba → aprobación del usuario → resto, de a 1–2 por vez. 720p por defecto.
3. **Personaje consistente:** `creative/PERSONAJE.md`. Editar, no regenerar. Guion, planos y animación paso a paso: `creative/GUION_Y_ANIMACION.md`.
4. **Antes de publicar:** `creative/CHECKLIST_PAUTA.md`. Sin marcas ajenas, sin prometer terapia, con línea de crisis, con consentimiento para voces y caras reales.
5. **Nunca** escribir claves en archivos ni en el chat: van en `.env` (ver `.env.example`) o en las variables de Railway.

---

## 🏛️ Formatos Oficiales Aprobados

| ID | Nombre | Formato Visual | Enfoque / Arquetipo |
|---|---|---|---|
| **AD_01** | UGC Testimonial / Story | Cámara frontal selfie auténtica | Validación y desahogo confidencial sin juicios |
| **AD_02** | Animado Conceptual | Silueta morada 3D + haz menta neón | Reconocimiento de patrones inconscientes y desbloqueo |
| **AD_03** | UGC Conversación WhatsApp | Mockup de chat iPhone con burbujas | Inmediatez (respuesta en <30 seg) y cercanía |
| **AD_04** | UGC Escribiendo y Borrando | Pantalla de teclado iOS borrando texto | Confesión de pensamientos íntimos y superación del miedo |
| **AD_05** | **Animado Señal en el Camino** ⭐ | 3D mate + camino neón + Outro secuencial | **El más efectivo:** de la confusión a la claridad + 5 min gratis |
| **AD_06** | AI vs Guía Humano | Pantalla dividida (IA robótica vs Guía) | Empatía humana real vs respuestas algorítmicas frías |
| **AD_07** | Anselmo Quantum Quote | Anselmo a cámara en estudio cálido | Algoritmo de decisiones, arquetipos (NUNCA tarot) |
| **AD_08** | Anselmo Emocional Quote | Anselmo primer plano cinematográfico | Claridad psicológica profunda y reencuadre vital |
| **AD_09** | IA Responde, No Escucha | Conceptual: ventana de chat azul fría → Guía de luz verde → camino | Compañía real vs respuesta sintética (versión conceptual de AD_06, sin producir) |

---

## 🎨 Generación de Arte Visual con Nano Banana (Gemini 3.1 Flash Image)

Para los anuncios conceptuales y fondos de video:
- **Colores mandatorios:** Fondo espacio profundo (`#0f0c21` o `#0a0818`), silueta 3D mate sin rostro (`#252151`), acento luminiscente verde menta neón (`#62d177`).
- **Prompt base:**
  ```text
  Minimalist 3D architectural render, deep void background #0f0c21, clean faceless humanoid silhouette in matte deep purple #252151 walking thoughtfully, a sharp geometric glowing neon mint beam #62d177 emerging from their steps, subtle volumetric glow, clean Octane render, no noise, cinematic lighting, 8k resolution, vertical 9:16.
  ```

---

## ⚡ Generación de Video con ComfyUI (Railway)

- Conexión vía Railway CLI: `railway ssh` en el proyecto `selfless-bravery` o vía API HTTP en `https://comfyui-production-52d3.up.railway.app`.
- Nodos:
  - `gemini_omni_direct` (propio): edición y generación de clips de hasta 10 s con Gemini Omni Flash, cobrado a `GOOGLE_API_KEY`.
  - `gemini_image_direct` (propio): Nano Banana, cobrado a `GOOGLE_API_KEY`.
  - `Kling Motion Control` (nativo, partner): transferencia de movimiento de un video guía a una imagen fija. Cobra créditos de comfy.org (`COMFY_ORG_API_KEY`).
- **Runway Act-Two NO es un nodo de ComfyUI**: se usa en la web de Runway (~17 créditos/s) o por su API de desarrollador (`POST /v1/character_performance`, USD 0,05/s, 3–30 s por clip).
- Workflows listos en formato API: `creative/comfyui/workflows/` (ver su README).
- Límites de Omni: `edit` no cambia la proporción, no edita voz ni acepta referencias de audio, no acepta imágenes de personas reconocibles, y re-locuta el audio (usar `clips/align2.py` para volver a poner la voz original).

---

## 🛠️ Postproducción y Montaje Automatizado (`creative/`)

### 1. Recorte y Estabilización
- Recorte a cuadro exacto con filtros `trim`/`atrim` de FFmpeg.
- Estabilización con `creative/clips/stabilize.py` (trípode virtual sin vibraciones).

### 2. Sincronización Labial
- Cuando Omni re-locuta el audio, se usa `creative/clips/align2.py` para sincronizar la voz original con el nuevo movimiento de labios sin alterar el tono.

### 3. Subtítulos Sociales Quemados
- Generados con `creative/clips/subtitles.py` en formato `.ass`.
- Abajo y al centro, por encima de la zona que tapa la interfaz de Reels/TikTok (`config.SAFE_BOTTOM_PX` = 672 px, márgenes laterales de 120 px). Quemarlos requiere ffmpeg con libass, que la Mac del estudio no tiene: usar Remotion.
- Tipografía Poppins bold en blanco con palabras clave resaltadas en verde menta neón (`#62D177`) y sombra oscura para contraste sobre cualquier fondo.

### 4. Cortinillas Oficiales de Marca
- **Intro (3s):** `01_Intro_Oficial_LogoReveal_1080x1920.mp4` (revelación de logo con destello neón).
- **Wipe / Sting (1s):** `03_Sting_Cortinilla_1080x1920.mp4` (corte diagonal con sonido whoosh).
- **Outro Secuencial (6s):** `02_Outro_Oficial_Promo5Min_1080x1920.mp4` (Ilustración -> Titular -> Contador 0 a 5 con destello -> Botón CTA -> Logo y URL).

### 5. Masterización de Audio (EBU R128)
- **Loudness objetivo:** `-16.0 LUFS` (±0.5 LUFS), True Peak `-1.5 dBTP`.
- **Regla de oro:** Cero canciones duplicadas superpuestas. Si el cuerpo ya tiene música, se normaliza limpio y se empalma suavemente con el outro.
- **Fade out al unísono:** Las campanas y la música del outro se desvanecen juntos hasta el silencio en los últimos frames.

---

## 💻 Comandos Principales de la Suite

```bash
# 1. Ver catálogo de templates
python3 creative/generator.py --list

# 2. Ver guión, hooks y prompts de un template específico
python3 creative/generator.py AD_05

# 3. Ensamblar un clip con el Outro oficial y -16 LUFS
python3 creative/assemble_ad.py /ruta/a/video.mp4 -o ~/Downloads/Ad.mp4

# 4. Ensamblar con Intro + Outro + Gradeo iPhone
python3 creative/assemble_ad.py /ruta/a/video.mp4 --intro --grade -o ~/Downloads/Ad.mp4

# 5. Generar prompts para Nano Banana
python3 creative/images/generate_image.py conceptual_figura_camino

# 6. Conexión y descarga desde ComfyUI en Railway (HTTP + SSH)
python3 creative/comfyui/remote_ssh.py --status
python3 creative/comfyui/remote_ssh.py --list-outputs
python3 creative/comfyui/remote_ssh.py --download gemini_omni_clip.mp4

# 7. Servidor de preview de templates HTML animados (9:16)
python3 creative/html_motion/preview.py
```

