---
name: zenderu-ad-pipeline
description: Pipeline maestro y generador de anuncios de alto rendimiento para Zenderu (Inner Tech). Define los 8 templates oficiales (AD_01 a AD_08), generación de imágenes conceptuales 3D con Nano Banana (Gemini 3.1 Flash Image), generación/edición de video con ComfyUI (Railway), y postproducción automatizada (recorte, estabilización, subtítulos quemados en #62D177, cortinillas oficiales de intro/outro y masterización -16 LUFS).
---

# 🎬 Zenderu Ad Production Pipeline (Inner Tech)

Manual operativo para la creación, generación y postproducción automatizada de anuncios de video para Zenderu.

---

## 🏛️ Los 8 Formatos Oficiales Aprobados

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
- Nodos personalizados:
  - `gemini_omni_direct`: Edición y generación de clips de hasta 10s con Gemini Omni Flash vía AI Studio.
  - `Kling Motion Control`: Transferencia de movimiento de video guía a imagen fija.
  - `Runway Act-Two`: Transferencia de actuación facial y corporal.

---

## 🛠️ Postproducción y Montaje Automatizado (`creative/`)

### 1. Recorte y Estabilización
- Recorte a cuadro exacto con filtros `trim`/`atrim` de FFmpeg.
- Estabilización con `creative/clips/stabilize.py` (trípode virtual sin vibraciones).

### 2. Sincronización Labial
- Cuando Omni re-locuta el audio, se usa `creative/clips/align2.py` para sincronizar la voz original con el nuevo movimiento de labios sin alterar el tono.

### 3. Subtítulos Sociales Quemados
- Generados con `creative/clips/subtitles.py` en formato `.ass`.
- Ubicados en el tercio inferior (y ~ 75%).
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
# 1. Ver catálogo de los 8 templates
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

