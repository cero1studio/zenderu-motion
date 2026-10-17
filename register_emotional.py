with open("src/Root.tsx", "r") as f:
    content = f.read()

import_line = 'import { AnselmoEmotionalQuoteAd } from "./AnselmoEmotionalQuoteAd";\n'
comp_line = '      <Composition id="ZenderuAnselmoEmotionalAd" component={AnselmoEmotionalQuoteAd} durationInFrames={270} fps={30} width={1080} height={1920} />\n'

if 'import { AnselmoEmotionalQuoteAd }' not in content:
    content = import_line + content

if 'id="ZenderuAnselmoEmotionalAd"' not in content:
    content = content.replace(
        '<Composition id="ZenderuAnselmoQuantumAd"',
        comp_line + '      <Composition id="ZenderuAnselmoQuantumAd"'
    )

with open("src/Root.tsx", "w") as f:
    f.write(content)

print("Root.tsx updated with ZenderuAnselmoEmotionalAd")
