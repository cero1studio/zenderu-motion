import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import React from "react";
import { AnimatedLogo } from "./AnimatedLogo";

export const Intro: React.FC = () => {
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

  // Animations — reescalado a 90 frames (3s @ 30fps). Antes eran 180 frames (6s): en Reels/TikTok
  // un intro de 6s mata la retención antes de que arranque el contenido real. 3s es el punto medio
  // razonable — 2s (lo que pedía el plan original) no dejaba tiempo de leer logo+tagline+URL en
  // secuencia; esto sí.
  const imageScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Clean, snappy fades
  const imageOpacity = interpolate(frame, [8, 18], [0, 1], { extrapolateRight: "clamp" });

  const textOpacity = interpolate(frame, [15, 25], [0, 1], { extrapolateRight: "clamp" });
  const textY = interpolate(frame, [15, 25], [20, 0], { extrapolateRight: "clamp" });

  const urlOpacity = interpolate(frame, [23, 33], [0, 1], { extrapolateRight: "clamp" });

  // Wipe Transition Logic (Left to Right, snappy)
  // Arranca en el frame 70 (deja 20 frames / ~0.66s para el wipe dentro de los 90 totales)
  const wipe1 = spring({ frame: frame - 70, fps, config: { damping: 18, mass: 1.2, stiffness: 60 } });
  const wipe2 = spring({ frame: frame - 73, fps, config: { damping: 18, mass: 1.2, stiffness: 60 } });
  const wipeX1 = interpolate(wipe1, [0, 1], [-3000, 0]);
  const wipeX2 = interpolate(wipe2, [0, 1], [-3000, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0c21", overflow: "hidden", fontFamily: "'Poppins', sans-serif", color: "white" }}>
      
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", padding: "80px" }}>
        
        {/* Animated Zenderu Official Logo (Top) */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 60 }}>
           <AnimatedLogo width={550} variant="full" />
        </div>

        {/* Narrative Illustration (Center) - Faded edges to mimic the background */}
        <div style={{ width: 800, height: 800, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Img
            src={staticFile("como-funciona-2.webp")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${imageScale})`,
              opacity: imageOpacity,
              WebkitMaskImage: "radial-gradient(circle at center, black 45%, transparent 80%)",
              maskImage: "radial-gradient(circle at center, black 45%, transparent 80%)"
            }}
          />
        </div>

        {/* Tagline (Bottom) */}
        <div
          style={{
            marginTop: 50,
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <p style={{ 
            fontSize: 60, 
            margin: 0, 
            color: "#ffffff", 
            fontWeight: 500, 
            letterSpacing: "0.01em",
            textAlign: "center"
          }}>
            Encuentra claridad en tu camino
          </p>
        </div>

        {/* URL (Absolute Bottom) */}
        <div style={{ position: "absolute", bottom: 200, opacity: urlOpacity }}>
          <p style={{ 
            fontSize: 48, 
            margin: 0, 
            color: "#62d177", 
            fontWeight: 600, 
            letterSpacing: "0.15em",
            textAlign: "center"
          }}>
            www.zenderu.com
          </p>
        </div>

        {/* Cortinilla de Salida (Wipe Out, Left to Right) */}
        <div style={{ position: "absolute", zIndex: 100, width: "200%", height: "200%", top: "-50%", left: "-20%", backgroundColor: "#62d177", transform: `translateX(${wipeX1}px) rotate(15deg)` }} />
        <div style={{ position: "absolute", zIndex: 101, width: "200%", height: "200%", top: "-50%", left: "-20%", backgroundColor: "#0f0c21", transform: `translateX(${wipeX2}px) rotate(15deg)` }} />

      </div>
    </AbsoluteFill>
  );
};
