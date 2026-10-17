# Prompts usados (recuperados del historial de la sesión)
Textos completos, en orden cronológico dentro de cada proyecto (hora UTC). Modelos: imágenes con `gemini-3.1-flash-image` (Nano Banana) y video con `gemini-omni-1.1-flash` (Interactions API).

## 1. Anuncio conceptual: figura morada + camino verde (el que más rindió)

Video 01. Estilo ilustración 3D de Zenderu. Referencias: `assets/bg_zenderu.png` y `assets/guide_hero.webp`. Método que funcionó: generar la imagen del personaje con referencias, editarla ("editar, no regenerar"), animarla con image_to_video y alargarla con extend. Los últimos prompts de cada paso son las iteraciones finales.

### 1. [VIDEO] 04:58

```text
Create a premium advertising video for Zenderu based on the concept "Find clarity in your path". The video should communicate a person experiencing uncertainty and gradually gaining clarity, without showing a predetermined answer or someone deciding for them. An 8-second clip. VISUAL CONCEPT: A single abstract soul-like figure stands in a vast dark environment. At first, the surrounding space is ambiguous and difficult to read. Several subtle organic paths or possibilities exist around the character, but they are not literal roads. The character observes the environment calmly. A soft luminous presence gradually appears in the distance and gently reveals the shapes, paths and space around the character. The environment becomes clearer and more ordered as the light expands. The light represents perspective, understanding and conscious clarity, not prophecy, magic or a predetermined destiny. CHARACTER: The character must be abstract and symbolic, representing consciousness rather than a specific person. No eyes, no nose, no mouth, no eyebrows, no eyelashes, no facial expression. No gender, no age, no ethnicity and no identifiable personal traits. Simplified rounded anatomy, soft limbs, slightly oversized head, minimal details. VISUAL LANGUAGE: Dark cosmic and introspective atmosphere, premium editorial digital illustration, organic abstract forms, soft volumetric lighting, subtle lavender and violet gradients, controlled Zenderu green accents, elegant minimal sophisticated. COLOR PALETTE: #0F0C21 main background, #07021B deep space, #141125 secondary surfaces, #FFFFFF highlights, #A7A2B8 soft lavender, #62D177 Zenderu green accent. CAMERA AND MOTION: slow cinematic intentional camera movement, very subtle forward movement or gentle orbit, the luminous presence gradually expands, organic forms subtly shift as the environment becomes clearer, the character remains calm and grounded, no fast cuts, no aggressive transitions, no excessive particle effects. DO NOT INCLUDE: text, logos, buttons, UI, phone screens, dashboards, realistic humans, facial features, literal roads, cars, generic meditation imagery, zodiac wheels, decorative constellations, excessive neon, fantasy magic effects, superhero aesthetics, corporate stock-photo style.
```

### 2. [VIDEO] 05:10

```text
A single abstract soul-like figure stands in a vast dark cosmic environment, 8-second clip. The surrounding space is ambiguous at first. A soft luminous presence gradually appears and reveals the shapes and space around the character. No facial features, no gender, no ethnicity. Slow cinematic camera movement. Dark violet and lavender gradients with subtle green accents.
```

### 3. [VIDEO] 05:15

```text
A single abstract soul-like figure stands in a vast dark cosmic environment, an 8-second clip. At first the surrounding space is ambiguous and difficult to read. The character observes calmly. A soft luminous presence gradually appears in the distance and gently reveals the shapes and space around the character, becoming clearer and more ordered as the light expands. No eyes, no nose, no mouth, no facial expression, no gender, no age, no ethnicity. Simplified rounded anatomy, soft limbs, slightly oversized head. Dark cosmic introspective atmosphere, premium editorial digital illustration, soft volumetric lighting, subtle lavender and violet gradients, controlled green accents. Slow cinematic camera movement, no fast cuts. Do not include text, logos, UI, realistic humans, facial features, literal roads.
```

### 4. [IMAGEN] 05:41

```text
In the exact same illustration style, material and color palette as the reference images (smooth matte translucent purple-indigo gradient humanoid figure, no facial features, deep navy-black starry background #06011A, glowing mint-green accents #62D177): show the figure standing up and beginning to walk forward along the glowing green brick path, which now stretches further into the distance, with more of the dark landscape gently revealed around it. Vertical 9:16 composition, generous negative space at the top for text.
```

### 5. [VIDEO] 05:54

```text
Animate this exact image, an 8-second clip, keeping the character design, pose, color palette and dark cosmic atmosphere identical to the starting frame. The figure remains calm and still, curled up. A soft luminous presence gradually appears in the distance and gently grows, slowly revealing more of the glowing green path and the dark shapes of the environment around the character as the light expands. Slow, subtle, cinematic camera movement. No fast cuts, no text, no logos.
```

### 6. [VIDEO] 05:58

```text
Animate this exact image, an 8-second clip. Strictly preserve the exact illustration style, material and color palette throughout the entire clip, including any newly revealed parts of the scene: smooth matte translucent purple-indigo gradient humanoid figure (purple tones in the #4D3990 to #563A9D range, with lighter #D2B4E1 highlights on rim light), no facial features, deep navy-black starry background (#06011A), glowing mint-green accents (#62D177) for the path and light. The figure remains calm and still, curled up, hugging her knees. A soft mint-green luminous presence gradually appears in the distance and gently grows, slowly revealing more of the glowing green brick path and the dark purple-navy shapes of the environment around the character as the light expands outward. Slow, subtle, cinematic camera movement. Do not change the character's material, color, or proportions. No text, no logos, no realistic skin or facial features.
```

### 7. [IMAGEN] 06:11

```text
Edit the first image (the sitting purple figure). Keep the character completely unchanged: exact same anatomy, pose, hair, proportions, material, color, and the rest of the composition identical, pixel-for-pixel where possible. The ONLY change: replace the short straight green path segment with a winding, curving green brick path (serpentine S-shape), matching the curved path shape and rounded brick-tile texture with glowing seams shown in the second image. Keep the path small, faint and distant, not reaching the character, same position and size as before, just curved instead of straight.
```

### 8. [VIDEO] 06:18

```text
Extend this video by 8 more seconds, continuing directly from where it ends. Keep the exact same illustration style, character design, pose and color palette (purple-indigo gradient figure #4D3990-#563A9D, mint-green glow #62D177, navy-black background #06011A). The soft mint-green light continues to grow and spread further, now clearly revealing more of the winding brick path and soft organic shapes of the dark environment around the character, which becomes more legible and ordered. The figure remains calm, grounded, still curled up, now with a sense of quiet understanding rather than uncertainty. Slow, subtle cinematic camera movement. No text, no logos, no fast cuts.
```

## 2. Anuncio realista v1: privacidad / "no puedo contarle a nadie"

Protagonista fija (retrato de referencia), planos distintos hechos editando la misma referencia, animaciones de 6 s y tarjeta CTA con el logo.

### 1. [IMAGEN] 07:25

```text
A realistic photo of a woman's hands holding a smartphone at night in bed, soft warm lamp light and blue screen glow on her hands, cozy blanket visible. The phone screen must show EXACTLY the app screenshot provided as reference, pixel-accurate, fully legible text, unchanged -- do not redraw, restyle, or alter the screenshot content in any way, just display it realistically on the phone screen with correct perspective and screen glare. Vertical 9:16 photo, shallow depth of field, warm cinematic tone.
```

### 2. [VIDEO] 07:29

```text
Animate this exact photo, an 8-second clip. Keep the woman, her hands, the phone, the room, the lighting and the entire phone screen content completely static and unchanged -- do not redraw or alter any text or UI on the screen. The only motion: a slow, subtle cinematic zoom in toward the phone screen, plus a very slight natural handheld sway as if she is holding the phone. Her thumb may move very slightly as if about to scroll. Warm cozy nighttime mood. No text changes, no new elements, no cuts.
```

### 3. [VIDEO] 07:31

```text
Animate this exact photo, an 8-second clip. Keep the woman, her hands, the phone, the room and lighting completely static. On the phone screen, show her scrolling up through a list of app profile cards similar in style to the one visible (dark cards, circular profile photo, name, specialties, star rating, green price button) -- the cards should scroll smoothly upward as if browsing more options. Keep the UI style, colors and layout consistent with the visible card. Warm cozy nighttime mood. No cuts.
```

### 4. [IMAGEN] 07:34

```text
A realistic, warm, natural photo portrait of a Latina woman, 28-32 years old, light-to-medium brown skin tone, long dark wavy hair, calm and thoughtful expression (not sad, not smiling, just present and introspective), wearing a simple cozy oversized sweater, soft warm indoor lighting at night, lying propped up in bed with pillows, looking down slightly at something off-frame (as if at her phone). Cinematic, shallow depth of field, photographic realism, not illustrated or stylized. Vertical 9:16 composition.
```

### 5. [IMAGEN] 07:35

```text
Edit this photo: keep the exact same woman (same face, hair, skin tone, sweater, room, bed, lighting) completely unchanged. Now show her holding her phone up in front of her, thumbs poised over the keyboard as if typing a message to a friend, her expression hesitant and conflicted, eyes slightly unsure, about to send something personal but holding back. Phone screen faces away from camera or is softly blurred/out of focus, not legible. Keep the warm cinematic nighttime mood. Vertical 9:16.
```

### 6. [VIDEO] 07:37

```text
Animate this exact photo, a 6-second clip. Keep the woman's face, hair, sweater, the room and lighting completely unchanged. She is holding her phone, thumbs hovering over the screen as if about to type. Subtle motion: her thumbs move slightly as if typing, then she hesitates and slowly lowers the phone a little, her expression shifting to more conflicted and tired, she looks away from the phone briefly. Natural subtle breathing motion. Warm cinematic nighttime mood, soft handheld camera feel. The phone screen stays out of focus or angled away, never legible. No text, no dialogue, no lip movement suggesting speech.
```

### 7. [VIDEO] 07:40

```text
Animate this exact photo, a 6-second clip. Keep the woman's face, hair, sweater, the room, lighting and the phone completely unchanged. Subtle motion: a slow quiet exhale, her hand gently rubbing her temple then slowly lowering, eyes remaining closed or drifting down, a small natural head movement, very slight breathing motion. Melancholic, tired, quietly overwhelmed mood, nothing exaggerated. Warm cinematic nighttime lighting, soft handheld camera feel. No text, no dialogue, no lip movement suggesting speech.
```

### 8. [IMAGEN] 07:41

```text
Using the woman from the first reference image (keep her exact same hands, skin tone, rings, sweater sleeves, nail style -- consistent with that reference), create a NEW close-up shot, different angle and framing than a medium shot: a tight close-up from a higher angle looking down over her shoulder at her phone, now showing her thumb scrolling through the exact app screen in the second reference image (the Zenderu guide profile card), pixel-accurate legible text, unchanged from the reference. Warm cozy blanket visible in the blurred foreground, soft nighttime lighting, shallower depth of field than before, slightly different camera angle to feel like a new shot, not a repeat of the same framing. Vertical 9:16.
```

### 9. [VIDEO] 07:42

```text
Animate this exact photo, a 6-second clip. Keep the woman's hands, hair, sweater, the room, lighting and the entire phone screen content completely static and unchanged -- do not redraw or alter any text or UI on the screen. The only motion: her thumb slowly moves as if about to tap the green button, a slow subtle push-in camera movement toward the phone screen, very slight natural handheld sway. Warm cozy nighttime mood. No text changes, no new UI elements, no cuts.
```

### 10. [IMAGEN] 07:42

```text
Using the woman from the reference image (keep her exact same face, hair, skin tone, sweater, consistent identity), create a NEW tight close-up shot, different angle and framing than a medium shot: an intimate close-up on just her face and one hand, shot from a slightly lower and closer angle than before, eyes closed, her hand gently resting against her forehead/temple, a single strand of hair across her cheek, soft shallow depth of field blurring the background completely. Quiet emotional exhaustion. Warm cinematic nighttime lighting, slightly dimmer and more intimate than before. Vertical 9:16.
```

### 11. [VIDEO] 07:46

```text
Animate this exact photo, a 6-second clip. Keep her face, hair, sweater, the room and lighting completely unchanged. Subtle motion: a slow quiet exhale, her hand very gently pressing then softly releasing against her temple, eyes staying closed, a small strand of hair moving slightly. Melancholic, tired, intimate mood, nothing exaggerated. Warm cinematic nighttime lighting, soft handheld camera feel, very slow subtle push-in. No text, no dialogue, no lip movement suggesting speech.
```

### 12. [IMAGEN] 07:47

```text
Using the woman from the reference image (keep her exact same face, hair, skin tone, sweater, identity consistent), create a NEW wide shot, different angle than before: a slightly wider shot from in front and a bit lower, showing her phone resting face-up on her chest/blanket as she leans her head back against the pillow with her eyes closed, a small genuine relaxed exhale, the corner of her mouth softly relaxed almost like the beginning of a small peaceful smile, body visibly more relaxed and at ease than before, shoulders down, no longer tense. Phone screen is softly glowing but not legible, out of focus. Warm cinematic nighttime lighting, calmer and softer mood than previous shots. Vertical 9:16.
```

### 13. [IMAGEN] 07:49

```text
Edit this photo: keep the woman's face, hair, pose, relaxed peaceful expression, sweater, room and lighting exactly the same. Change only the phone: instead of resting flat on the pillow, prop it upright against a pillow near her on speakerphone, screen showing a simple audio call-in-progress interface -- a circular avatar icon, a call timer like '04:12', a speaker icon, and a Zenderu-style dark UI with a mint-green accent, simple and mostly iconic (minimal text). Add a very subtle soft green glow near the phone suggesting an active call. Keep everything else identical. Vertical 9:16.
```

### 14. [VIDEO] 07:50

```text
Animate this exact photo, a 6-second clip. Keep her face, hair, sweater, the room, lighting and the entire phone screen content completely static and unchanged -- do not redraw or alter any text or UI on the screen. Subtle motion only: a slow peaceful breathing motion, her relaxed smile staying soft and steady, a very slight gentle head movement as if listening attentively to the call, eyes staying closed. Warm cinematic nighttime mood, calm and still camera with only a very slow subtle push-in. No text changes, no cuts.
```

### 15. [VIDEO] 07:52

```text
A clean, premium closing CTA card for a video ad, using the exact Zenderu logo shown in the reference image (the white swirl 'Z' icon plus 'enderu' wordmark in that same elegant italic font) centered on a dark cosmic navy background (#06011A) with a few subtle small stars. Below the logo, in clean modern white sans-serif text: the tagline 'Encuentra claridad en tu camino'. Below that, a small pill-shaped badge with a soft mint-green glow (#62D177) containing the text '5 minutos gratis'. Elegant, minimal, premium feel, generous negative space, nothing cluttered. Vertical 9:16.
```

## 3. Anuncio cinematográfico "pro": pareja discute → escalera → cuarto → app → camino verde

Un solo plano continuo con cadena de `extend`, grano 35 mm y cámara en mano. Ojo: "llorar + deslizarse al piso + alma" dispara `content_blocked`; la escalera mágica fue DESCARTADA por el usuario.

### 1. [IMAGEN] 18:28

```text
Using the woman from the reference image (keep her exact same face, hair, skin tone consistent, now wearing a casual home outfit), create a raw, cinematic, slightly imperfect handheld shot: she is at the top of a staircase in a house at night, caught mid-motion having just run up the stairs, one hand reaching for her bedroom door, body turned slightly back toward the stairs behind her as if glancing back, emotional and upset expression, tears starting. Shot from a slightly low dynamic angle looking up the stairs, dramatic warm/cool mixed lighting (warm light from downstairs, cooler light from her room), visible 35mm film grain, subtle motion blur suggesting handheld documentary-style camera movement, slightly off-center 'dirty' framing (not perfectly composed), shallow depth of field. Moody indie film aesthetic, not polished commercial lighting. Vertical 9:16.
```

### 2. [IMAGEN] 18:45

```text
Edit this exact photo: keep the woman, her pose, her face, the door, the hallway and all lighting exactly the same. Now transform the staircase below her: the straight steps begin to glow with a soft mint-green light and gently bend into a winding, serpentine S-curve shape -- rounded glowing brick-tile segments with visible seams between them, identical in material and glow to the Zenderu brand path (mint-green glow, dark navy shadows around it). The transformation is partial and magical, as if reality is shifting -- the lower half of the staircase is already the glowing winding path, the upper steps near her are still normal stairs. The rest of the house fades slightly into darkness around the glowing path. Subtle sci-fi/magical realism mood. Vertical 9:16.
```

### 3. [IMAGEN] 18:50

```text
Using the woman from the reference image (keep her exact same face, hair, skin tone consistent, wearing a casual home outfit), create a gritty, raw, indie-film-style photo: she is standing in a dim living room at night, mid-argument with a man (medium build, casual clothes, back partially to camera or out of focus in foreground), her face full-frame showing hurt and frustration, caught mid-sentence or mid-reaction. HEAVY visible 35mm film grain throughout the image, noticeably imperfect handheld framing (slightly tilted dutch angle, subject not centered, a bit of motion blur on an edge), harsh practical lighting from a lamp creating hard shadows, desaturated moody color grade (muted, slightly cold), like a screengrab from a Sundance drama, NOT a clean commercial photo. Vertical 9:16.
```

### 4. [VIDEO] 18:51

```text
Animate this exact photo, a 6-second clip. Keep both people, the room, lighting, heavy film grain and desaturated color grade completely consistent throughout. Subtle handheld camera motion, slightly shaky and imperfect, dutch angle drifting a tiny bit. She is mid-argument, her expression shifting from hurt to overwhelmed, mouth moving as if speaking but no clear words -- gritty indie drama energy. The man's silhouette shifts weight slightly, shoulders tense. Near the end, she turns her head away from him as if about to walk off. No dialogue audio, no legible speech, ambient room tone only.
```

### 5. [VIDEO] 19:11

```text
Animate this exact photo, a 6-second clip. Keep her face, hair, outfit, the staircase, the lit doorway above and heavy 35mm film grain completely consistent -- gritty indie drama look, not clean commercial footage. She turns and starts running up the stairs toward the glowing doorway, gripping the railing, tears on her face, desperate urgent motion. Camera does a dynamic push-in zoom following her upward movement, with subtle handheld shake, slightly imperfect framing. Fast but not chaotic motion. No dialogue, ambient room tone only, footsteps implied visually not audibly scripted.
```

### 6. [VIDEO] 19:51

```text
Extend this video by 6 more seconds, continuing the exact same continuous handheld shot, same heavy 35mm film grain, same desaturated gritty indie-drama look. She turns away from the man and walks away quickly toward a staircase, then starts climbing the stairs fast, gripping the railing, crying quietly -- her emotional state is sad, hurt, and overwhelmed, fleeing the argument, NOT scared or panicked like being chased or in danger, no horror or thriller energy at all. The camera follows her the whole time in one continuous tracking shot, handheld, slightly shaky, staying close behind or beside her. Soft warm light below fading as she moves up into cooler light. No dialogue, ambient room tone only.
```

### 7. [VIDEO] 20:03

```text
Extend this video, a 10-second continuation, continuing the exact same continuous handheld shot, same heavy 35mm film grain, same desaturated gritty indie-drama look. She suddenly turns her back on the man, takes a few steps away, then breaks down completely -- both hands pressed hard against her head, body hunched forward, an intense emotional explosion of grief, pain and rage all at once, like she is on the verge of screaming or sobbing violently, raw and unfiltered, a real nervous breakdown moment. After this intense outburst, she turns and walks quickly toward the staircase and starts climbing it at a slow, heavy, deliberate pace -- each step weighted down by grief, one hand gripping the railing, still crying. Keep it to exactly the same single staircase already shown in this house, same railing, same wall, same steps -- do not change its design. The camera follows her closely the whole time in one continuous tracking shot, handheld, shaky during her breakdown, steadier as she climbs. No dialogue, ambient room tone only.
```

### 8. [VIDEO] 20:18

```text
Extend this video, a 8-second continuation, continuing the exact same continuous handheld shot and gritty 35mm film grain. She reaches the top of the stairs, grabs the door handle, still sobbing, about to go inside. As her hand touches the door, something magical begins: the steps behind and below her start glowing with a soft mint-green light and gently bending into a winding, serpentine S-curve shape -- rounded glowing brick-tile segments with visible seams, as if reality itself is shifting into another world. The grain and gritty look fade into something more polished and dreamlike as the glow spreads. She glances back down at the glowing transformation, her expression shifting from grief to quiet awe. Camera holds steady, slowly pushing in. Subtle sci-fi/magical realism mood, no dialogue, ambient tone shifting to a soft musical hum.
```

### 9. [IMAGEN] 20:23

```text
Using the woman from the reference image (keep her exact same face, hair, skin tone consistent), create a cinematic photo: she is inside a dark bedroom at night, having just slammed the door shut behind her, her back pressed against the door, sliding down slightly as she cries, completely alone, the room almost entirely dark and empty-feeling. Directly in front of her, floating in the darkness a few feet away, a soft point of mint-green light has appeared, glowing gently. The light is just beginning to stretch and shape itself into the start of a winding path made of glowing rounded brick-tile segments, in the exact illustrated style of the Zenderu brand (the same glow, same brick texture, same deep navy darkness as the brand's signature path artwork) -- a magical, otherworldly element appearing within her realistic dark room. She looks up at it through tears, an expression of surprise mixed with grief. Vertical 9:16, cinematic but with this one stylized glowing element breaking into the photoreal scene.
```

### 10. [VIDEO] 20:26

```text
Extend this video, a detailed 10-second continuation, continuing the exact same continuous handheld shot. Step by step, exactly in this order: (1) She pushes the door open, steps inside her bedroom, and slams the door shut hard behind her with a sharp motion. (2) She leans her back flat against the closed door, sliding down slightly, breathing hard, crying. The room around her is almost completely dark and empty-feeling. (3) She pulls her phone out of her pocket with a shaking hand, unlocks it, and starts to call her mom -- but after a second or two of hesitation and looking at the screen, she cannot bring herself to do it and lowers the phone, shaking her head slightly. (4) She tries again, scrolling to call her best friend instead -- but again hesitates, overwhelmed, and lowers the phone a second time, realizing she cannot talk about this with anyone. (5) She lets the phone drop to her side. (6) Directly in front of her, floating gently in the dark air like a soft glowing soul or spirit, a small point of mint-green light slowly appears and pulses softly. (7) She slowly lifts her head and turns to look directly at this floating green light, her tear-streaked face shifting from despair to quiet, stunned curiosity. (8) As she stares at it, the glowing light begins to stretch and extend outward and downward, transforming into the start of a winding, serpentine path made of glowing rounded mint-green brick-tile segments with visible glowing seams -- in the exact illustrated art style of the Zenderu brand (same glow color, same brick texture, same deep dark background as the brand's signature path artwork). Keep the camera handheld and steady throughout, slowly pushing in by the end. No dialogue, ambient room tone only, fading into a soft magical hum as the light appears.
```

### 11. [VIDEO] 20:37

```text
Extend this video, a detailed 8-second continuation, continuing the exact same continuous handheld shot. In order: (1) She looks down at the phone in her hand again, hesitates for a moment, then opens an app -- the Zenderu app logo (a white swirl 'Z' icon with the wordmark) briefly appears large on her phone screen, glowing softly. (2) As the app opens, a soft mint-green light begins to glow and grow from the phone screen itself, as if a gentle presence is emerging directly out of the device. (3) The glowing light lifts up and away from the phone, floating calmly in the air in front of her, pulsing softly and warmly. (4) She slowly lifts her head and looks at this floating green light, her tear-streaked expression shifting from sadness to quiet wonder. (5) As she watches, the glowing light stretches and extends outward and downward, forming the start of a winding path made of glowing rounded mint-green brick-tile segments with visible glowing seams -- in the exact illustrated art style of the Zenderu brand. Camera handheld, steady, slowly pushing in by the end. No dialogue, ambient room tone only, fading into a soft gentle hum as the light appears.
```

### 12. [VIDEO] 20:42

```text
Extend this video, an 8-second continuation, continuing the same continuous handheld shot. She looks at her phone and opens an app. A white swirl 'Z' logo with the Zenderu wordmark appears on the phone screen for a moment. A small mint-green glowing light effect appears above the phone screen and slowly rises into the air in front of her, like a simple visual effect, growing slightly larger as it floats. She looks up at this green light, her expression curious. The light then stretches downward and outward, forming a winding path made of glowing rounded mint-green brick-tile segments with visible glowing seams, matching the Zenderu brand illustration style. Camera handheld, steady, slow push-in by the end. Ambient room tone only, soft background hum.
```

### 13. [VIDEO] 20:47

```text
Extend this video, a 6-second continuation, continuing the exact same continuous handheld shot and gritty 35mm film grain, same desaturated color grade. She reaches the top of the stairs, grabs the door handle, opens the door and walks through into her bedroom, still crying. The staircase and house remain completely normal and unchanged throughout -- no glowing effects, no magical transformation, no special lighting on the stairs at any point, purely realistic. The camera follows her closely, steady handheld, through the doorway. No dialogue, ambient room tone only.
```

## 4. Anselmo: retrato, oficina y edición de video con Omni

La versión final y más completa del prompt de edición (look fijo, mirada a cámara, retoque) está en `tools/omni_edit.py`.

### 1. [IMAGEN] 01:15

```text
Using the exact same real person shown in the reference photo (same bald head shape, same thick dark beard and mustache, same facial structure, same ear piercings, same skin tone, same build) — generate a new, high-quality vertical portrait of him. Keep his face completely recognizable and unaltered in likeness. Change only the setting: place him in a mystical, atmospheric environment — soft deep indigo and violet tones, gentle glowing mint-green light particles drifting in the air, subtle cosmic haze, soft rim lighting on his face and shoulders, a sense of calm spiritual presence, like a tarot reader or spiritual guide in a dreamlike sanctuary. He wears simple dark clothing. Sharp, professional portrait photography quality, shallow depth of field, cinematic lighting, 9:16 vertical composition, shoulders-up framing looking calmly toward camera.
```

### 2. [IMAGEN] 01:18

```text
Using the exact same real person in the reference photo (same bald head, same thick dark beard and mustache shape, same facial structure, same ear piercings, same skin tone, same build) — generate a new, realistic, high-quality vertical photo of him. Keep his face completely recognizable and unaltered in likeness. This must look like a REAL, unedited photograph, not a stylized or fantasy render: no glowing particles, no floating lights, no sparkles, no candles, no crystals, no magical effects of any kind. Natural, true-to-life skin texture and lighting. Medium shot (waist-up), he is sitting in a nice modern office chair at his office desk, relaxed confident posture, looking calmly at the camera. The office is tasteful and professional: wood desk, a bookshelf or plant in soft background blur, warm natural window light mixed with a subtle cool purple accent light from a lamp off to one side (barely noticeable, not magical, just mood lighting like a nice interview setup). He wears a simple dark button-up shirt. Shot on a professional camera, shallow depth of field, natural color grading, looks like a real photo from an actual video interview, 9:16 vertical composition.
```

### 3. [VIDEO] 01:25

```text
Change only the background environment behind the person to a tasteful modern office: wood desk, a bookshelf, a green plant, soft window light mixed with a subtle cool purple accent light off to one side. Keep the person, his face, his voice, his exact speech, his lip movements, and his body movements completely unchanged. Keep everything else the same.
```

### 4. [VIDEO] 01:31

```text
This is a vertical 9:16 video with large black bars above and below the visible footage. Using <IMAGE_REF_0> as the reference for the office environment and his wardrobe, extend and fill the entire vertical frame (including the black bars at top and bottom) with that same elegant modern office: wood desk, bookshelf, green plant, soft window light with a subtle cool purple accent light, so the final video has no black bars at all, just a natural full-frame vertical shot of him sitting in the office chair. Change his plaid shirt to match the simple solid dark button-up shirt from the reference image. Remove any text, captions, subtitles, or logos anywhere in the frame. Enhance and sharpen the overall video quality. Keep the person's face, voice, exact speech, lip movements, and body movement completely unchanged.
```

### 5. [IMAGEN] 13:38

```text
Using the office in the reference photo as the style guide, create a realistic photo of that same office background with NO person and NO chair in frame: the view a webcam would see behind someone sitting at a desk. Directly in the center: a dark walnut bookshelf with books and a few small objects; on the right a tall green plant; on the left a floor lamp giving a soft, subtle cool purple accent glow on the wall; warm natural window light from the left. Light warm-gray wall. Eye-level camera, straight-on, shallow depth of field with the background softly out of focus, as it would look behind a person 1.5 meters in front of it. Real photograph, natural colors, no text, no logos.
```

### 6. [VIDEO] 13:42

```text
Replace the background behind the man with the office shown in <IMAGE_REF_0>: the walnut bookshelf directly behind him, the plant, and the lamp with its soft purple glow, warm natural window light. He sits in a black high-back office chair. Change his shirt to a plain black button-up shirt. Remove all on-screen text, captions, lower-third graphics, logos and watermarks. Keep his face, expressions, lip movements, hand gestures, voice and audio exactly the same, in a single continuous shot with no cuts. Keep everything else the same.
```

### 7. [VIDEO] 13:43

```text
The black areas at the top and bottom of the frame are empty: fill them so the whole vertical frame is one natural, real shot (office wall and bookshelf above him, his black shirt and torso below), with no black bars.
```
