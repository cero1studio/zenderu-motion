import re

with open('src/AIVsHumanAd.tsx', 'r') as f:
    content = f.read()

# Add Outro import
if "import { Outro }" not in content:
    content = content.replace('import { PromoSuper } from "./PromoSuper";\n', '')
    content = content.replace('import React from "react";', 'import React from "react";\nimport { Outro } from "./Outro";')

# Inject Audio and dynamic colorful background for glassmorphism
bg_injection = """    <AbsoluteFill style={{ backgroundColor: DARK_BG }}>
      <Audio src={staticFile("ai_vs_human_bgm.wav")} volume={0.25} />
      
      {/* Background dinámico y colorido para que el Glassmorphism se note */}
      <AbsoluteFill style={{ opacity: 0.6 }}>
        <Img src={staticFile("universe_bg_vertical_1790811953345.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: "10%", left: "-20%", width: "80%", height: "50%", background: "radial-gradient(circle, rgba(98, 209, 119, 0.4) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-20%", width: "80%", height: "50%", background: "radial-gradient(circle, rgba(142, 68, 173, 0.5) 0%, transparent 70%)", filter: "blur(60px)" }} />
      
      <AbsoluteFill style={{ padding: "80px 40px" }}>"""

content = content.replace('<AbsoluteFill style={{ backgroundColor: DARK_BG, padding: "80px 40px" }}>', bg_injection)

# Close the new AbsoluteFill at the end (before the last </AbsoluteFill>)
content = content.replace('    </AbsoluteFill>\n  );\n};', '      </AbsoluteFill>\n\n      {/* OUTRO DE ZENDERU */}\n      <Sequence from={450} durationInFrames={180}>\n        <Outro />\n        <Audio src={staticFile("call_connected.wav")} volume={0.10} />\n      </Sequence>\n    </AbsoluteFill>\n  );\n};')

# Fix Glassmorphism styles (make it pop more)
content = content.replace('backdropFilter: backdrop,', 'backdropFilter: backdrop, WebkitBackdropFilter: backdrop,')
content = content.replace('bg = "rgba(37, 33, 81, 0.6)";', 'bg = "rgba(40, 30, 90, 0.45)";')

with open('src/AIVsHumanAd.tsx', 'w') as f:
    f.write(content)
