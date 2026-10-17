# 🎬 Arquitectura de Producción Audiovisual & Creative Studio (`creative/`)

Este documento constituye la **referencia técnica y arquitectónica canónica** del sistema de producción creativa, generación publicitaria y pipelines audiovisuales de Zenderu. Define las reglas de marca, prompts de IA, conexión con ComfyUI en Railway, templates HTML animados y estándares de masterización.

---

## 🏛️ 1. Identidad de Marca: "Inner Tech" & Sadhguru Moderno

### 1.1 Tesis y Posicionamiento
Zenderu NO es un sitio de esoterismo tradicional, brujería, videncia o adivinación barata. Zenderu es una plataforma de **bienestar interior, claridad mental y orientación estratégica**, donde personas en momentos de encrucijada o sobrepensamiento conectan con un **Guía Zenderu** para decodificar patrones emocionales, arquetipos y tomar decisiones con certeza.

### 1.2 Léxico Obligatorio vs Léxico Prohibido
| Prohibido (NUNCA usar en UI, copy o ads) | Obligatorio (Términos oficiales de marca) |
|---|---|
| Experto, vidente, tarotista, brujo, adivino | **Guía**, **Guía Zenderu** |
| Futuro garantizado, te devolveré a tu ex, hechizo | **Claridad, lectura de arquetipos, reconocimiento de patrones** |
| Cartas del tarot, bola de cristal, magia negra | **Herramientas de enfoque, sintonía, mapa interior** |
| Chat barato, minutos de saldo | **Espacio confidencial, Zens (token oficial)** |

### 1.3 Paleta Cromática Oficial (Inner Tech)
* **Fondo Espacio Profundo:** `#0a0818` / `#06011a` / `#0f0c21`
* **Siluetas 3D Mate (sin rostro):** `#252151`
* **Luz y Acentos Neón:** `#62d177` (Verde Menta Neón, luminosidad y certeza)
* **Textos Secundarios / Lavanda:** `#8b85b2` / `#a5a2c4`
* **Contenedores de Tarjetas:** `#120e2e` / `#1b1642` con bordes sutiles `rgba(255, 255, 255, 0.08)`

---

## 📐 2. Catálogo Maestro de Templates Publicitarios

Todos los guiones y metadatos residen en [`creative/templates/`](creative/templates/) y se ejecutan con [`creative/generator.py`](creative/generator.py).

| ID | Nombre del Template | Formato Visual | Hook Psicológico | Solución & CTA |
|---|---|---|---|---|
| **AD_01** | UGC Testimonial / Story | Selfie auténtica cámara frontal | *"Hay cosas que no le puedes contar ni a tu mejor amiga..."* | Consulta privada en tiempo real con un Guía. |
| **AD_02** | Animado Conceptual | Silueta 3D mate + camino verde neón | *"Cuando repites el mismo tropiezo una y otra vez..."* | Reconocimiento de patrones inconscientes. |
| **AD_03** | UGC Conversación WhatsApp | Mockup animado de chat con burbujas | *"Eran las 2:00 AM y necesitaba una respuesta real ya."* | Respuesta en menos de 30 segundos en chat confidencial. |
| **AD_04** | UGC Escribiendo y Borrando | Pantalla iOS escribiendo y borrando texto | *"¿Cuántas veces escribiste un mensaje que nunca enviaste?"* | Desahogo sin juicios con un Guía que te escucha. |
| **AD_05** | **Animado Señal en el Camino** ⭐ | 3D mate + camino sinuoso + Outro oficial | *"No estás confundido por falta de opciones..."* | **El más efectivo (Best Performer):** Claridad inmediata + ¡5 Minutos Gratis! |
| **AD_06** | AI vs Guía Humano | Pantalla dividida (IA robótica vs Guía) | *"La IA analiza datos fríos, pero no entiende tu alma."* | Empatía humana real vs respuestas algorítmicas sin corazón. |
| **AD_07** | Anselmo Quantum Quote | Anselmo en estudio sobrio a cámara | *"Tu vida no está trabada, tu algoritmo de decisiones sí."* | Decodificación arquetípica de patrones. |
| **AD_08** | Anselmo Emocional Quote | Anselmo en primer plano cinematográfico | *"Dejar ir no es perder, es recuperar el espacio para elegir."* | Confrontación serena y reencuadre existencial. |
| **AD_09** | IA Responde, No Escucha | Conceptual: figura morada + ventana de chat azul fría → Guía de luz verde | *"Le preguntaste todo… y te respondió todo."* | Compañía real vs respuesta sintética. Versión conceptual de AD_06 (sin producir). |

> **Aprendizaje clave (ver [`creative/RESULTADOS.md`](creative/RESULTADOS.md)):** los formatos conceptuales (AD_02, AD_05) rinden mucho más que los realistas (UGC, Anselmo con IA). Producir primero en conceptual.

---

## 🧭 2.1 Documentos operativos

* [`creative/RESULTADOS.md`](creative/RESULTADOS.md): rendimiento por anuncio y aprendizajes.
* [`creative/PERSONAJE.md`](creative/PERSONAJE.md): biblia del personaje conceptual y la Guía verde.
* [`creative/GUION_Y_ANIMACION.md`](creative/GUION_Y_ANIMACION.md): método de guion, planos, edición y animación de personajes.
* [`creative/CHECKLIST_PAUTA.md`](creative/CHECKLIST_PAUTA.md): revisión antes de publicar.
* [`creative/comfyui/workflows/README.md`](creative/comfyui/workflows/README.md): workflows de ComfyUI en formato API.
* [`zenderu_handoff/HANDOFF.md`](zenderu_handoff/HANDOFF.md): historia técnica, límites de cada API y pendientes.

---

## 🎨 3. Especificación de Prompts para Generación de Imágenes (Nano Banana)

La biblioteca completa de prompts probados vive en [`creative/PROMPTS.md`](creative/PROMPTS.md) y se consume vía [`creative/images/generate_image.py`](creative/images/generate_image.py).

### Reglas Clave de Generación
1. **Vertical 9:16 (1080x1920):** Siempre especificar composición vertical con espacio negativo superior para textos y subtítulos.
2. **Cero Clichés:** Prohibir explícitamente en el negative prompt: `text, logos, UI, realistic faces on 3D models, fantasy magic, tarot cards, glowing orbs, zodiac wheels`.
3. **Prompt Base para Ilustraciones 3D (Inner Tech):**
   ```text
   In the exact same illustration style, material and color palette as the reference images (smooth matte translucent purple-indigo gradient humanoid figure #252151, no facial features, deep navy-black starry background #06011A, glowing mint-green accents #62D177): show the figure standing up and walking forward along the glowing green brick path. Vertical 9:16 composition, generous negative space at the top.
   ```
4. **Prompt Base para UGC / Personas Reales:**
   ```text
   A realistic, warm, natural photo portrait of a Latina woman, 28-32 years old, calm and thoughtful introspective expression, cozy oversized sweater, soft warm indoor lighting at night in bed, looking down at smartphone with dark guidance app screen glowing softly. Cinematic shallow depth of field, photographic realism, vertical 9:16.
   ```
5. **Prompt Base para Anselmo (Placa Limpia de Oficina):**
   ```text
   Realistic photo of modern office background with NO person and NO chair in frame: dark walnut bookshelf, tall green plant, soft subtle purple accent floor lamp, warm natural window light. Eye-level, shallow depth of field softly out of focus, vertical 9:16.
   ```

---

## ☁️ 4. Infraestructura ComfyUI en Railway (`selfless-bravery`)

* **Servicio:** `comfyui` en Railway (`https://comfyui-production-52d3.up.railway.app`), cuenta `cero1studio@gmail.com`, proyecto `selfless-bravery`. Solo CPU; `/app/input` y `/app/output` se borran en cada deploy.
* **Protocolos:**
  1. **HTTP REST API:** `creative/comfyui/client.py` para encolar `/prompt`, revisar `/history` y descargar `/view`.
  2. **Túnel SSH Directo:** `creative/comfyui/remote_ssh.py` para monitoreo de estado, inspección en vivo de `/app/output`, ejecución remota y descarga de clips generados.
* **Comandos:**
  ```bash
  python3 creative/comfyui/remote_ssh.py --status
  python3 creative/comfyui/remote_ssh.py --list-outputs
  python3 creative/comfyui/remote_ssh.py --download gemini_omni_1791319707_90.mp4
  ```

---

## 📱 5. Studio de HTML Motion (Mockups 9:16 para Video)

Ubicado en [`creative/html_motion/`](creative/html_motion/). Permite renderizar y capturar animaciones web en vertical 1080x1920 con fidelidad perfecta al diseño de Zenderu.

* **Servidor interactivo:** `python3 creative/html_motion/preview.py` (abre en `http://localhost:3333`).
* **Plantillas:**
  * `templates/chat_consultation.html`: Mockup animado de chat interactivo (burbuja de cliente, indicador de tipeo, audionota con ecualizador animado, balance Zens).
  * `templates/call_interface.html`: Mockup animado de llamada de audio en vivo (avatar central, ondas pulsantes, timer en tiempo real y controles de llamada).
  * `templates/epiphany_quote.html`: Plantilla tipográfica de cita inspiracional con estrellas flotantes y highlight menta neón.

---

## 🎚️ 6. Post-producción Automatizada & Audio Broadcast

### 6.1 Estándar EBU R128
* **Loudness Integrado Objetivo:** `-16.0 LUFS` (±0.5 LUFS).
* **True Peak Máximo:** `-1.5 dBTP`.
* **Rango Dinámico (LRA):** `<= 7.0 LU`.
* **Regla Anti-Colisión:** Si el video del cuerpo ya contiene música de fondo integrada, **está estrictamente prohibido montar una segunda pista de música encima**. Se aísla y normaliza la pista base original para evitar choque auditivo.

### 6.2 Cortinillas Oficiales (Bumpers)
1. **Intro Oficial:** `01_Intro_Oficial_LogoReveal_1080x1920.mp4` (3.0s).
2. **Sting Wipe:** `03_Sting_Cortinilla_1080x1920.mp4` (1.0s).
3. **Outro Oficial:** `02_Outro_Oficial_Promo5Min_1080x1920.mp4` (6.0s con oferta ¡5 Minutos Gratis! + chimes y música atenuados suavemente hasta silencio absoluto en el segundo 5.7).

### 6.3 Ensamble Automatizado en 1 Clic
```bash
python3 creative/assemble_ad.py ruta/a/clip_cuerpo.mp4 -o final_ad.mp4
```
Este script:
1. Normaliza el audio a -16 LUFS EBU R128.
2. Une el cuerpo con el Outro oficial de 6s.
3. Sincroniza el resultado final automáticamente a Google Drive (`Mi unidad/Zenderu_Marketing_Ads`) y a `~/Downloads`.
