# Guion y animación: el método Zenderu

Cómo pasar de una idea a un anuncio cinematográfico o animado que sea fiel a Zenderu. Complementa
`PERSONAJE.md` (cómo se ve el personaje), `PROMPTS.md` (prompts que funcionaron) y `CHECKLIST_PAUTA.md`.

## 1. Elegir la herramienta

| Tipo de anuncio | Herramienta | Costo |
|---|---|---|
| **Conceptual** (figura morada, Guía verde, camino). **Es el que más rinde** | Nano Banana (imágenes clave) + Gemini Omni (animación) | Bajo |
| Chats, notificaciones, pantalla de llamada, texto animado | **Remotion** (`src/`, sin IA) | Cero |
| Cine realista (actores generados) | Nano Banana + Omni `extend` | Medio/alto, y más riesgo de inconsistencia |
| Una persona real hablando (Guías) | Grabación real + `assemble_ad.py`; IA solo para fondo o ropa | Variable |

Combinar está bien. Por ejemplo, fondo y personaje conceptual con IA y la ventana de chat en Remotion encima.

## 2. Escribir el guion

**Estructura base (15–30 s):**
1. **Gancho, 0–3 s:** una tensión que el espectador reconozca como suya. Tiene que entenderse sin sonido.
2. **Giro, 3–8 s:** reencuadre ("no es mala suerte, es un patrón").
3. **Claridad, 8–20 s:** aparece la luz verde, el camino o el Guía. Se muestra, no se explica.
4. **Cierre:** outro oficial con la oferta de 5 minutos gratis.

**Reglas:**
- Una sola idea por anuncio. Frases de voz en off de 3 a 7 palabras.
- Mostrar en vez de decir: la emoción va en la postura (encogida → erguida) y en la luz (azul frío → verde cálido).
- El Guía acompaña, no rescata ni decide por la persona. Zenderu da claridad, no destino.
- Léxico y límites: ver `CHECKLIST_PAUTA.md` (Guía y nunca vidente, sin terapia, sin marcas ajenas).

**Formato del guion (storyboard):**

| Tiempo | Plano | Imagen / acción | Voz en off / texto | Sonido |
|---|---|---|---|---|
| 0–4 s | Plano general | Figura sentada frente a ventana azul fría | — | zumbido digital |

## 3. Lenguaje de planos y edición

- **Tamaños de plano:** general (contexto), medio (acción), primer plano (emoción), detalle (objeto clave).
  **Cambiar el tamaño en cada corte**: dos planos iguales seguidos se ven como un salto o un error.
- **Corte seco entre escenas distintas.** El fundido solo para indicar que pasa el tiempo o para cerrar.
- **Cortar en el movimiento** (un giro, un paso), no en un momento quieto.
- **L-cut:** el audio de la escena siguiente entra un poco antes que la imagen. Suaviza los cortes.
- **Plano continuo (`extend`)** solo cuando la historia necesita que la cámara siga sin cortar. Si no, cortes.
- Movimiento de cámara lento e intencional (push-in, órbita suave). Nada de movimientos rápidos en lo conceptual.

## 4. Animar personajes (paso a paso)

1. **Imagen clave aprobada.** Generarla con Nano Banana usando las referencias de `PERSONAJE.md`
   (`bg_zenderu.png`). Mostrársela al usuario **antes** de animar.
2. **Nuevas poses: editar, no regenerar.** Partir de la imagen aprobada con "Keep the character completely
   unchanged: exact same anatomy, proportions, material, colors… change only <X>".
3. **Animar** con Omni a partir del cuadro inicial:
   `<FIRST_FRAME> Animate this exact image, 6 seconds, single continuous shot, no cuts. Keep the illustration style, character and colors identical. <acción>. Sound: <ambiente>. No dialogue.`
4. **Transición A → B:** dar dos imágenes, la inicial y la final (`<FIRST_FRAME> <LAST_FRAME>`), y describir el paso.
5. **Plano largo:** `extend` sobre el video anterior (hasta 10 s por extensión, unos 40 s en total).
   **Cada extensión es un punto de control:** aprobarla antes de seguir. Si algo se descarta, volver al
   último punto bueno, porque todo lo que queda en la cadena se arrastra a las extensiones siguientes.
6. **Tiempos dentro de la toma:** `[0-3s] … [3-6s] …` o "después de 3 segundos…".
7. **Audio:** describirlo siempre ("Sound: soft warm ambient tone. No dialogue."). Si no, Omni inventa
   música o voces.

**Reglas de prompt para Omni** (según su documentación):
- "Single continuous shot / no cuts" cuando no se quieren cortes, porque por defecto hace varios planos.
- Para editar, prompts simples más "Keep everything else the same".
- Las instrucciones negativas van en el texto del prompt ("No text, no logos, no realistic humans").
- `edit` no cambia la proporción: armar el 9:16 antes.

## 5. Look de cine (realista)

- Frases que funcionaron: "raw handheld camera, heavy 35mm film grain, desaturated gritty indie-drama
  color grade, dirty frames, slow zoom in".
- **Anatomía:** agregar "anatomically natural and smooth movement, no unnatural twisting" (Omni llegó a
  girar una cabeza de forma imposible).
- **Bloqueos (`content_blocked`):** llanto + derrumbarse al piso + "alma/espíritu" se lee como crisis o
  autolesión. Usar acciones de pie, lenguaje concreto y nada místico. Tampoco dictarle a una persona real
  lo que tiene que decir.
- **Una sola escalera, un solo personaje, el mismo vestuario:** repetir en cada prompt los elementos de
  continuidad (ropa, lugar, luz).

## 6. Flujo con aprobación y costo

1. Guion en tabla → aprobación.
2. Imágenes clave (centavos: `--estimate nano_banana_2k 3`) → aprobación.
3. **Una toma de prueba** a 720p → aprobación.
4. Resto de las tomas, de a 1–2 → armado → `CHECKLIST_PAUTA.md` → registrar en `RESULTADOS.md`.

Ejemplo completo con guion, prompts de imagen, prompts de animación y costo: `templates/ad_09_ia_responde_no_escucha.json`.
