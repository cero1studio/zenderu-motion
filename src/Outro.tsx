import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Img, staticFile } from "remotion";
import React from "react";
import { AnimatedLogo } from "./AnimatedLogo";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  React.useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const contentOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });
  const contentY = interpolate(frame, [15, 35], [20, 0], { extrapolateRight: "clamp" });

  const imageScale = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const buttonScale = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12 },
  });

  const urlOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });

  // Contador 0→5 con spring — antes el "5" aparecía ya escrito, sin ningún golpe de atención.
  const countProgress = spring({ frame: frame - 40, fps, config: { damping: 12, mass: 0.6 } });
  const countValue = Math.min(5, Math.round(interpolate(countProgress, [0, 1], [0, 5])));
  const countGlow = interpolate(countProgress, [0, 0.6, 1], [0, 1, 0.6], { extrapolateRight: "clamp" });
  
  // Fade Out at the very end (last 20 frames)
  const finalFadeOut = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: "clamp" });

  // Wipe In Logic (starts covering the screen, then sweeps away to the right)
  const wipe1 = spring({ frame: frame - 0, fps, config: { damping: 18, mass: 1.2, stiffness: 60 } }); // Black moves out first
  const wipe2 = spring({ frame: frame - 5, fps, config: { damping: 18, mass: 1.2, stiffness: 60 } }); // Green follows
  const wipeX1 = interpolate(wipe1, [0, 1], [0, 3000]);
  const wipeX2 = interpolate(wipe2, [0, 1], [0, 3000]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0c21", overflow: "hidden", color: "white", fontFamily: "'Poppins', sans-serif", opacity: finalFadeOut }}>
      
      <div style={{ opacity: contentOpacity, transform: `translateY(${contentY}px)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", padding: "0 80px", textAlign: "center" }}>
        
        {/* Narrative Illustration (Connection) - Adjust size for more breathing room */}
        <div style={{ width: 750, height: 750, marginBottom: 20, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Img
            src={staticFile("como-funciona-3.webp")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${imageScale})`,
              WebkitMaskImage: "radial-gradient(circle at center, black 45%, transparent 80%)",
              maskImage: "radial-gradient(circle at center, black 45%, transparent 80%)"
            }}
          />
        </div>

        {/* Heading */}
        <h2 style={{ fontSize: 58, margin: 0, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25, color: "#a5a2c4", padding: "0 10px" }}>
          Habla en tiempo real y encuentra la respuesta que necesitas.
        </h2>
        
        {/* Massive Free Promo Block */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          marginTop: 40, 
          backgroundColor: "rgba(98, 209, 119, 0.12)",
          border: "5px solid #62d177",
          borderRadius: 40,
          padding: "35px 70px",
          boxShadow: "0 0 50px rgba(98, 209, 119, 0.2)",
          transform: `scale(${buttonScale})`
        }}>
          <h3 style={{
            fontSize: 90,
            color: "#62d177",
            margin: 0,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            textShadow: `0 0 ${25 + countGlow * 25}px rgba(98, 209, 119, ${0.5 + countGlow * 0.3})`
          }}>
            ¡{countValue} Minutos Gratis!
          </h3>
          <p style={{ fontSize: 46, margin: 0, marginTop: 10, color: "#ffffff", fontWeight: 500 }}>
            Para tu primera consulta
          </p>
        </div>

        {/* CTA Button */}
        <div style={{
          marginTop: 50,
          backgroundColor: "#62d177",
          color: "#0f0c21",
          fontSize: 52,
          fontWeight: 700,
          padding: "25px 80px",
          borderRadius: "100px",
          boxShadow: "0 10px 30px rgba(98, 209, 119, 0.4)",
          transform: `scale(${buttonScale})`
        }}>
          Quiero mis minutos gratis
        </div>

        {/* Animated Logo and URL prominently at the bottom — URL corta, va directo a la landing
            de la promo (/primera-consulta-gratis, con redirect de zenderu.com/gratis + UTM), no
            al home genérico: antes el CTA prometía la promo pero la URL no la mencionaba. */}
        <div style={{ marginTop: 80, display: "flex", flexDirection: "column", alignItems: "center" }}>
           <AnimatedLogo width={400} variant="full" />
           <p style={{
               fontSize: 46,
               marginTop: 25,
               marginBottom: 0,
               color: "#62d177",
               fontWeight: 600,
               letterSpacing: "0.1em",
               opacity: urlOpacity
           }}>
             zenderu.com/gratis
           </p>
        </div>

      </div>

      {/* Cortinilla de Entrada (Wipe In, Left to Right) */}
      {/* WipeX2 (Green) reveals the video beneath it, WipeX1 (Black) reveals the Green beneath it */}
      <div style={{ position: "absolute", zIndex: 100, width: "200%", height: "200%", top: "-50%", left: "-20%", backgroundColor: "#62d177", transform: `translateX(${wipeX2}px) rotate(15deg)` }} />
      <div style={{ position: "absolute", zIndex: 101, width: "200%", height: "200%", top: "-50%", left: "-20%", backgroundColor: "#0f0c21", transform: `translateX(${wipeX1}px) rotate(15deg)` }} />

    </AbsoluteFill>
  );
};
