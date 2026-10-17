import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Img, staticFile } from "remotion";
import React from "react";
import { AnimatedLogo } from "./AnimatedLogo";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  React.useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // ==========================================
  // 1. Wipe In (Frames 0 - 20)
  // ==========================================
  const wipe1 = spring({ frame: frame - 0, fps, config: { damping: 18, mass: 1.1, stiffness: 70 } });
  const wipe2 = spring({ frame: frame - 4, fps, config: { damping: 18, mass: 1.1, stiffness: 70 } });
  const wipeX1 = interpolate(wipe1, [0, 1], [0, 3200]);
  const wipeX2 = interpolate(wipe2, [0, 1], [0, 3200]);

  // ==========================================
  // 2. Acto 1: Ilustración (Frames 10 - 32)
  // ==========================================
  const imgOpacity = interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const imgScaleSpring = spring({ frame: frame - 10, fps, config: { damping: 12, mass: 0.7 } });
  const imgScale = interpolate(imgScaleSpring, [0, 1], [0.85, 1]);
  // Flotación sutil orgánica una vez asentada
  const imgFloat = frame > 25 ? Math.sin((frame - 25) / 14) * 6 : 0;

  // ==========================================
  // 3. Acto 2: Titular Contextual (Frames 24 - 44)
  // ==========================================
  const headingOpacity = interpolate(frame, [24, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headingY = interpolate(frame, [24, 38], [28, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ==========================================
  // 4. Acto 3: Hero Promo Block (Frames 44 - 75)
  // ==========================================
  const promoScaleSpring = spring({ frame: frame - 44, fps, config: { damping: 10, mass: 0.65, stiffness: 120 } });
  const promoScale = interpolate(promoScaleSpring, [0, 1], [0.82, 1]);
  const promoOpacity = interpolate(frame, [44, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Contador dinámico 0 -> 5
  const countProgress = spring({ frame: frame - 48, fps, config: { damping: 11, mass: 0.55, stiffness: 85 } });
  const countValue = Math.min(5, Math.round(interpolate(countProgress, [0, 1], [0, 5])));
  
  // Destello de impacto verde cuando alcanza el 5 (alrededor de frame 62)
  const glowBurst = interpolate(frame, [60, 66, 85], [0, 1, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Subtexto de la promo
  const subPromoOpacity = interpolate(frame, [58, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subPromoY = interpolate(frame, [58, 68], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ==========================================
  // 5. Acto 4: Botón CTA (Frames 72 - 96)
  // ==========================================
  const ctaScaleSpring = spring({ frame: frame - 72, fps, config: { damping: 10, mass: 0.6, stiffness: 130 } });
  const ctaScale = interpolate(ctaScaleSpring, [0, 1], [0.78, 1]);
  const ctaOpacity = interpolate(frame, [72, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  
  // Pulso rítmico de atención en el CTA
  const ctaPulse = frame > 85 ? (Math.sin((frame - 85) / 7) + 1) / 2 : 0;
  const ctaGlowSpread = 25 + ctaPulse * 22;

  // ==========================================
  // 6. Acto 5: Ancla de Marca & URL (Frames 92 - 120)
  // ==========================================
  const brandOpacity = interpolate(frame, [92, 106], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const brandY = interpolate(frame, [92, 106], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const urlOpacity = interpolate(frame, [104, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urlTracking = interpolate(frame, [104, 120], [0.22, 0.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ==========================================
  // 7. Cierre cinematográfico (Fade out final)
  // ==========================================
  const finalFadeOut = interpolate(frame, [160, 180], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0c21", overflow: "hidden", color: "white", fontFamily: "'Poppins', sans-serif", opacity: finalFadeOut }}>
      
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", padding: "0 80px", textAlign: "center" }}>
        
        {/* 1. Narrative Illustration con flotación escalonada */}
        <div style={{ 
          width: 580, 
          height: 580, 
          marginBottom: 15, 
          position: "relative", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          opacity: imgOpacity,
          transform: `scale(${imgScale}) translateY(${imgFloat}px)`
        }}>
          <Img
            src={staticFile("como-funciona-3.webp")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              WebkitMaskImage: "radial-gradient(circle at center, black 45%, transparent 80%)",
              maskImage: "radial-gradient(circle at center, black 45%, transparent 80%)"
            }}
          />
        </div>

        {/* 2. Heading: entra suavemente de abajo hacia arriba */}
        <h2 style={{ 
          fontSize: 52, 
          margin: 0, 
          fontWeight: 600, 
          letterSpacing: "-0.01em", 
          lineHeight: 1.25, 
          color: "#a5a2c4", 
          padding: "0 10px",
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`
        }}>
          Habla en tiempo real y encuentra la respuesta que necesitas.
        </h2>
        
        {/* 3. Hero Promo Block: golpe visual con contador elástico */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          marginTop: 30, 
          backgroundColor: `rgba(98, 209, 119, ${0.12 + glowBurst * 0.08})`,
          border: "5px solid #62d177",
          borderRadius: 40,
          padding: "25px 60px",
          boxShadow: `0 0 ${40 + glowBurst * 40}px rgba(98, 209, 119, ${0.25 + glowBurst * 0.35})`,
          opacity: promoOpacity,
          transform: `scale(${promoScale})`
        }}>
          <h3 style={{
            fontSize: 82,
            color: "#62d177",
            margin: 0,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            textShadow: `0 0 ${20 + glowBurst * 35}px rgba(98, 209, 119, ${0.6 + glowBurst * 0.4})`
          }}>
            ¡{countValue} Minutos Gratis!
          </h3>
          <p style={{ 
            fontSize: 40, 
            margin: 0, 
            marginTop: 10, 
            color: "#ffffff", 
            fontWeight: 500,
            opacity: subPromoOpacity,
            transform: `translateY(${subPromoY}px)`
          }}>
            Para tu primera consulta
          </p>
        </div>

        {/* 4. CTA Button: emerge con rebote y pulso de atención */}
        <div style={{
          marginTop: 40,
          backgroundColor: "#62d177",
          color: "#0f0c21",
          fontSize: 48,
          fontWeight: 700,
          padding: "20px 70px",
          borderRadius: "100px",
          boxShadow: `0 10px ${ctaGlowSpread}px rgba(98, 209, 119, ${0.4 + ctaPulse * 0.25})`,
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`
        }}>
          Quiero mis minutos gratis
        </div>

        {/* 5. Animated Logo & URL de anclaje */}
        <div style={{ 
          marginTop: 55, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          opacity: brandOpacity,
          transform: `translateY(${brandY}px)`
        }}>
           <AnimatedLogo width={350} variant="full" />
           <p style={{
               fontSize: 42,
               marginTop: 20,
               marginBottom: 0,
               color: "#62d177",
               fontWeight: 600,
               letterSpacing: `${urlTracking}em`,
               opacity: urlOpacity
           }}>
             zenderu.com/gratis
           </p>
        </div>

      </div>

      {/* Cortinilla dinámica de entrada (Wipe In de izquierda a derecha) */}
      <div style={{ position: "absolute", zIndex: 100, width: "220%", height: "220%", top: "-60%", left: "-20%", backgroundColor: "#62d177", transform: `translateX(${wipeX2}px) rotate(15deg)` }} />
      <div style={{ position: "absolute", zIndex: 101, width: "220%", height: "220%", top: "-60%", left: "-20%", backgroundColor: "#0f0c21", transform: `translateX(${wipeX1}px) rotate(15deg)` }} />

    </AbsoluteFill>
  );
};
