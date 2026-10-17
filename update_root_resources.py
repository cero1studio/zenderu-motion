with open("src/Root.tsx", "r") as f:
    content = f.read()

imports = """import { IntroStandalone } from "./IntroStandalone";
import { OutroStandalone } from "./OutroStandalone";
import { StingStandalone } from "./StingStandalone";
"""

comps = """      <Composition
        id="ZenderuIntroOfficial"
        component={IntroStandalone}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuOutroOfficial"
        component={OutroStandalone}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuStingOfficial"
        component={StingStandalone}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1920}
      />
"""

if 'import { IntroStandalone }' not in content:
    content = imports + content

if 'id="ZenderuIntroOfficial"' not in content:
    content = content.replace(
        '<Composition id="ZenderuAnselmoEmotionalAd"',
        comps + '      <Composition id="ZenderuAnselmoEmotionalAd"'
    )

with open("src/Root.tsx", "w") as f:
    f.write(content)

print("Updated Root.tsx with standalone resources")
