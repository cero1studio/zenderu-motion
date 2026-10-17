# Biblia del personaje conceptual

Los anuncios conceptuales son los que mejor rinden (ver `RESULTADOS.md`). Su fuerza depende de que
**la figura sea siempre la misma**. Este documento la fija.

## La figura (el usuario)
- Humanoide abstracto, **sin rostro**: sin ojos, nariz, boca ni cejas. Sin género, edad ni etnia definidos.
- Anatomía simple y redondeada, extremidades suaves, cabeza levemente grande.
- Material **mate translúcido**, degradado violeta-índigo (`#252151`, rango `#4D3990`→`#563A9D`),
  luz de borde suave (`#D2B4E1`).
- Postura y emoción solo con el cuerpo: encogida (confusión) → erguida y caminando (claridad).

## La Guía
- Misma anatomía y estilo que la figura, pero hecha de **luz verde menta** `#62D177`, cálida y suave.
- Nunca tiene rostro ni rasgos humanos realistas. Acompaña al lado o un paso atrás, nunca "rescata"
  ni decide por la figura.

## El mundo
- Espacio profundo `#06011A` / `#0f0c21` con estrellas sutiles. Nada de ruedas zodiacales, cartas ni magia.
- El **camino verde curvo** (ladrillos con juntas luminosas, forma de S) es el símbolo de Zenderu:
  aparece cuando llega la claridad.
- Contraste narrativo: azul frío (confusión, ruido, respuestas vacías) → verde cálido (claridad, compañía).

## Referencias fijas
- `assets/backgrounds/bg_zenderu.png`: figura sentada + camino. Es la referencia principal de estilo.
- `assets/branding/guide_hero.webp`: estilo de figura.
- Regla de producción: **editar, no regenerar.** Se parte de una imagen aprobada y se piden cambios
  sobre ella ("keep the character completely unchanged…"), en vez de generar desde cero cada escena.
  Los prompts que funcionaron están en `PROMPTS.md`, sección 1.

## Pendiente: hoja de referencia (generar una vez, con aprobación)
Generar con Nano Banana (2K, ≈ USD 0,05 c/u), usando `bg_zenderu.png` como referencia:
1. Figura de frente, de pie, neutral.
2. Figura de 3/4.
3. Figura de perfil caminando.
4. Figura sentada abrazando las rodillas.
5. Guía de luz verde de frente.
6. Figura y Guía juntas sobre el camino.

Prompt base:
```text
In the exact same illustration style, material and color palette as the reference image (smooth matte
translucent purple-indigo gradient humanoid figure #252151, no facial features, soft rim light #D2B4E1,
deep navy-black starry background #06011A, glowing mint-green accents #62D177): character reference
sheet pose — <POSE>. Plain dark background, full body visible, centered, no text, no logos.
```
Guardar las aprobadas en `assets/personaje/` y usarlas como referencia en todas las escenas nuevas.
