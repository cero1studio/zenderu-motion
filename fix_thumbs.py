import re

with open('src/Root.tsx', 'r') as f:
    content = f.read()

# Borrar los Thumb antiguos si existen
content = re.sub(r'<Composition id="Thumb.*?\n', '', content)

thumbs = """
      <Composition id="ThumbStella" component={YoutubeThumbnail} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ expertName: "Stella Moons", phraseWhite: "Rompe tus", phraseGreen: "ciclos tóxicos", imageSrc: "../ads_aprobados/Expertos_Master/Thumbnails/Stella_Thumbnail.jpg" }} />
      <Composition id="ThumbAnselmo" component={YoutubeThumbnail} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ expertName: "Anselmo", phraseWhite: "Suelta el peso", phraseGreen: "del pasado", imageSrc: "../ads_aprobados/Expertos_Master/Thumbnails/Anselmo_Thumbnail.jpg" }} />
      <Composition id="ThumbVioleta" component={YoutubeThumbnail} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ expertName: "Violeta", phraseWhite: "Destraba tu", phraseGreen: "camino", imageSrc: "../ads_aprobados/Expertos_Master/Thumbnails/Violeta_Thumbnail.jpg" }} />
"""

content = content.replace('<Composition id="ZenderuStellaAd"', thumbs + '      <Composition id="ZenderuStellaAd"')

with open('src/Root.tsx', 'w') as f:
    f.write(content)
