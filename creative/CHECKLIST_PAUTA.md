# Checklist antes de pautar

Revisar cada anuncio antes de publicarlo o pagarle pauta.

## Mensaje y marca
- [ ] Léxico Zenderu: "Guía" / "Guía Zenderu". Nunca "experto", "vidente", "tarotista", "brujo".
- [ ] Sin promesas de futuro, de "te devuelvo a tu ex" ni de resultados garantizados.
- [ ] **Sin marcas ajenas** (ChatGPT, WhatsApp, etc.) en texto ni en pantalla. Decir "un chat de IA"
      y usar interfaces genéricas. Las plataformas rechazan anuncios por uso de marcas, y hay riesgo legal.
- [ ] **No prometer terapia ni tratamiento.** Zenderu ofrece guía, acompañamiento y escucha; los Guías
      no se presentan como psicólogos clínicos.

## Salud mental y seguridad
- [ ] Si el anuncio toca soledad, tristeza o crisis, la descripción incluye:
      *"Si estás en crisis o en peligro, contacta a una línea de emergencia de tu país."*
- [ ] Nada que muestre o sugiera autolesión. Además, Gemini bloquea esas escenas.

## Derechos y consentimiento
- [ ] **Voces clonadas:** autorización escrita de la persona antes de clonar o publicar su voz
      (por ejemplo, `assets/audio_sfx/reference_carmen*.wav` y `test_carmen_cloned*.wav`).
- [ ] **Imagen de personas reales** (Guías, actores): autorización para uso publicitario y para editar con IA.
- [ ] Música y SFX con licencia para uso comercial en anuncios pagos.

## Técnico
- [ ] 1080x1920, 30 fps, audio a −16 LUFS (true peak −1,5 dBTP).
- [ ] Textos y subtítulos dentro de la zona segura: no en el 35% inferior, no en el 14% superior y con
      120 px de margen a los lados (`config.SAFE_*`).
- [ ] Gancho en los primeros 2 segundos y que se entienda sin sonido.
- [ ] Outro oficial con oferta y URL correctas (`zenderu.com/gratis`).
- [ ] Archivo nombrado con plantilla, variante y fecha, y registrado en `RESULTADOS.md`.
