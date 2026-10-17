import React from "react";
import { AbsoluteFill, Sequence, Video, staticFile, useVideoConfig, spring, useCurrentFrame } from "remotion";
import { PromoSuper } from "./PromoSuper";

const GREEN = "#62d177";

export const UGCAd: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animaciones para el texto del gancho superior
  const titleY = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12 },
    from: -100,
    to: 0,
  });
  const titleOpacity = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20 },
    from: 0,
    to: 1,
  });

  // Animación para el logo de Zenderu
  const logoScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, mass: 0.8 },
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* 1. EL VIDEO DE FONDO (UGC) */}
      <Video 
        src={staticFile("ugc_base.mp4")} 
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      {/* 2. OVERLAYS DE TEXTO E INTERFAZ */}
      {/* Texto Gancho Superior */}
      <Sequence from={15} durationInFrames={180}>
        <AbsoluteFill style={{ justifyContent: "flex-start", padding: "140px 60px" }}>
          <div style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            backgroundColor: "rgba(37,33,81,0.8)", // Purple con transparencia
            padding: "40px 50px",
            borderRadius: 30,
            borderLeft: `8px solid ${GREEN}`,
            backdropFilter: "blur(10px)"
          }}>
            <h1 style={{
              color: "white",
              fontSize: 60,
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              margin: 0,
              lineHeight: 1.2,
              textTransform: "uppercase"
            }}>
              Cuando por fin<br/>
              <span style={{ color: GREEN }}>encuentras tu Guía.</span>
            </h1>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* 3. CALL TO ACTION FINAL */}
      {/* La Promo card entra en el segundo 15 (frame 450) y se queda */}
      <Sequence from={450}>
        <AbsoluteFill style={{ justifyContent: "flex-end", paddingBottom: 350 }}>
          <PromoSuper />
        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
