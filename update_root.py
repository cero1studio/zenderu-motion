with open("src/Root.tsx", "r") as f:
    content = f.read()

import_line = 'import { AnselmoQuantumAd } from "./AnselmoQuantumAd";\n'
comp_line = '      <Composition id="ZenderuAnselmoQuantumAd" component={AnselmoQuantumAd} durationInFrames={240} fps={30} width={1080} height={1920} />\n'

if 'import { AnselmoQuantumAd }' not in content:
    content = import_line + content

if 'id="ZenderuAnselmoQuantumAd"' not in content:
    content = content.replace(
        '<Composition id="ZenderuAnselmoAdZoomed"',
        comp_line + '      <Composition id="ZenderuAnselmoAdZoomed"'
    )

with open("src/Root.tsx", "w") as f:
    f.write(content)

print("Updated Root.tsx")
