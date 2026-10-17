import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { PromoSuper } from "./PromoSuper";

const GREEN = "#62d177";
const PURPLE = "#0f0c21";
const LIGHT_TEXT = "#a5a2c4";

const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imageScale = spring({ frame, fps, config: { damping: 200, mass: 2 } });
  const imageOpacity = interpolate(frame, [0, 20], [0, 1]);

  const t1Opacity = interpolate(frame, [15, 30, 60, 75], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const t2Opacity = interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp" });
  const t2Y = interpolate(frame, [70, 85], [20, 0], { extrapolateRight: "clamp" });

  // Wipe out
  const wipe = spring({ frame: frame - 105, fps, config: { damping: 18, mass: 1.2 } });
  const wipeX = interpolate(wipe, [0, 1], [-3000, 0]);

  return (
    <AbsoluteFill style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: PURPLE, color: "white", alignItems: "center", justifyContent: "center" }}>
      {/* Background Image */}
      <div style={{ width: 800, height: 800, position: "absolute", opacity: imageOpacity * 0.4 }}>
        <Img
          src={staticFile("como-funciona-2.webp")}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1 + imageScale * 0.1})` }}
        />
      </div>

      <div style={{ zIndex: 10, textAlign: "center", position: "absolute" }}>
        <h1 style={{ fontSize: 80, margin: 0, fontWeight: 700, opacity: t1Opacity }}>
          ¿Dudas sobre <span style={{ color: GREEN }}>tu futuro?</span>
        </h1>
      </div>

      <div style={{ zIndex: 10, textAlign: "center", position: "absolute", transform: `translateY(${t2Y}px)`, opacity: t2Opacity }}>
        <h1 style={{ fontSize: 75, margin: 0, fontWeight: 700, lineHeight: 1.2 }}>
          Encuentra la<br />
          <span style={{ color: GREEN }}>claridad</span> que necesitas.
        </h1>
      </div>

      {/* Wipe out green */}
      <div style={{ position: "absolute", zIndex: 100, width: "200%", height: "200%", top: "-50%", left: "-20%", backgroundColor: GREEN, transform: `translateX(${wipeX}px) rotate(15deg)` }} />
    </AbsoluteFill>
  );
};

const Scene2Service: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wipe In
  const wipeIn = spring({ frame, fps, config: { damping: 18, mass: 1.2 } });
  const wipeX = interpolate(wipeIn, [0, 1], [0, 3000]);

  const float1 = Math.sin(frame / 15) * 15;
  const float2 = Math.cos(frame / 15) * 15;

  const phoneScale = spring({ frame: frame - 15, fps, config: { damping: 14 } });
  const smsScale = spring({ frame: frame - 25, fps, config: { damping: 14 } });

  const textOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" });
  const textY = interpolate(frame, [30, 45], [30, 0], { extrapolateRight: "clamp" });

  // Wipe Out
  const wipeOut = spring({ frame: frame - 135, fps, config: { damping: 18, mass: 1.2 } });
  const wipeOutX = interpolate(wipeOut, [0, 1], [-3000, 0]);

  return (
    <AbsoluteFill style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: GREEN, color: PURPLE, alignItems: "center", justifyContent: "center" }}>
      
      {/* Floating Elements */}
      <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: 120, top: 250, transform: `scale(${phoneScale}) translateY(${float1}px)` }}>
          <Img src={staticFile("telefono_aislado.png")} style={{ width: 350, opacity: 0.95 }} />
        </div>
        <div style={{ position: "absolute", right: 120, top: 480, transform: `scale(${smsScale}) translateY(${float2}px)` }}>
          <Img src={staticFile("sms_aislado.png")} style={{ width: 350, opacity: 0.95 }} />
        </div>
      </div>

      {/* Text Content */}
      <div style={{ zIndex: 10, textAlign: "center", opacity: textOpacity, transform: `translateY(${textY}px)`, padding: "0 60px", position: "absolute", bottom: 350 }}>
        <h1 style={{ fontSize: 75, margin: 0, fontWeight: 800, lineHeight: 1.1, color: PURPLE }}>
          Habla en tiempo real<br />con Guías Zenderu.
        </h1>
        <div style={{ marginTop: 40, display: "inline-block", backgroundColor: PURPLE, padding: "18px 45px", borderRadius: 100 }}>
           <p style={{ fontSize: 40, margin: 0, color: "white", fontWeight: 600 }}>
             Chat en vivo • Llamada de audio
           </p>
        </div>
      </div>

      {/* Wipe In Cover (Green moving right) */}
      <div style={{ position: "absolute", zIndex: 100, width: "200%", height: "200%", top: "-50%", left: "-20%", backgroundColor: GREEN, transform: `translateX(${wipeX}px) rotate(15deg)` }} />
      
      {/* Wipe Out Cover (Purple moving right) */}
      <div style={{ position: "absolute", zIndex: 101, width: "200%", height: "200%", top: "-50%", left: "-20%", backgroundColor: PURPLE, transform: `translateX(${wipeOutX}px) rotate(15deg)` }} />
    </AbsoluteFill>
  );
};

export const FullAd: React.FC = () => {
  React.useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: PURPLE }}>
      {/* Hook: 0 to 120 (4 seconds) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Hook />
      </Sequence>

      {/* Service Explanation: 105 to 255 (5 seconds) */}
      {/* Starts slightly early to allow the wipe transition to overlap */}
      <Sequence from={105} durationInFrames={150}>
        <Scene2Service />
      </Sequence>

      {/* Final Offer CTA: 240 to 450 (7 seconds) */}
      <Sequence from={240} durationInFrames={210}>
        {/* We use PromoSuper here directly! It's perfectly designed for the finale. */}
        {/* PromoSuper is 150 frames by default, we'll give it the final slot. */}
        <AbsoluteFill>
          {/* Wipe In Cover for Scene 3 (Purple revealing) */}
          <WipeInPurple />
          <Sequence from={15}>
            <PromoSuper />
          </Sequence>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

const WipeInPurple: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wipeIn = spring({ frame, fps, config: { damping: 18, mass: 1.2 } });
  const wipeX = interpolate(wipeIn, [0, 1], [0, 3000]);
  return (
    <div style={{ position: "absolute", zIndex: 100, width: "200%", height: "200%", top: "-50%", left: "-20%", backgroundColor: PURPLE, transform: `translateX(${wipeX}px) rotate(15deg)` }} />
  );
};
