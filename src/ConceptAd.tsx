import React from "react";
import { AbsoluteFill, Sequence, Video, staticFile, useVideoConfig, spring, useCurrentFrame, Audio, interpolate, Img } from "remotion";

const GREEN = "#62d177";
const PURPLE_DARK = "#0F0C21";

export const ConceptAd: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animaciones súper lentas y cinemáticas (estilo editorial)
  
  // 1. Titular Principal
  const titleOpacity = interpolate(frame, [45, 90], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const titleY = interpolate(frame, [45, 120], [20, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // 2. Mensaje Secundario
  const subtitleOpacity = interpolate(frame, [150, 210], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subtitleY = interpolate(frame, [150, 210], [20, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // 3. CTA y Logo
  const ctaOpacity = interpolate(frame, [450, 510], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  
  // Efecto de desvanecimiento global al final (últimos 30 frames)
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: PURPLE_DARK, opacity: fadeOut }}>
      {/* --- AUDIO --- */}
      <Audio src={staticFile("ambient_bg.mp3")} volume={0.15} />

      {/* --- VIDEO BASE --- */}
      <Video 
        src={staticFile("ugc_upscaled.mp4")} 
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      {/* --- GRADIENTE SUTIL PARA LEGIBILIDAD --- */}
      <AbsoluteFill style={{
        // Gradiente más oscuro para resaltar los textos blancos
        background: "linear-gradient(to bottom, rgba(15, 12, 33, 0.9) 0%, rgba(15, 12, 33, 0.2) 40%, rgba(15, 12, 33, 0.2) 60%, rgba(15, 12, 33, 0.95) 100%)"
      }} />

      {/* --- TEXTOS EDITORIALES --- */}
      {/* Contenedor Superior (Titular) */}
      <AbsoluteFill style={{ padding: "120px 70px", justifyContent: "flex-start", alignItems: "center", textAlign: "center" }}>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: 65,
          color: "white",
          lineHeight: 1.1,
          margin: 0,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: "0px 6px 25px rgba(0,0,0,0.8)"
        }}>
          Encuentra claridad<br />
          <span style={{ color: GREEN }}>en tu camino</span>
        </h1>

        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500, // Más peso
          fontSize: 42, // Mucho más grande (antes 32)
          color: "#FFFFFF", // Blanco puro para máximo contraste
          lineHeight: 1.3,
          marginTop: 40,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          textShadow: "0px 6px 20px rgba(0,0,0,0.9)"
        }}>
          Habla con un Guía que te ayude a entender lo que estás viviendo y a tomar decisiones conscientes.
        </p>
      </AbsoluteFill>

      {/* Contenedor Inferior (Logo + CTA) */}
      <AbsoluteFill style={{ paddingBottom: 120, justifyContent: "flex-end", alignItems: "center" }}>
        <div style={{
          opacity: ctaOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40
        }}>
          {/* Logo Oficial */}
          <Img 
            src={staticFile("logo_white.svg")} 
            style={{ 
              width: 320, 
              filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.5))" 
            }} 
          />

          {/* CTA Button */}
          <div style={{
            backgroundColor: GREEN,
            padding: "25px 70px",
            borderRadius: 50,
            boxShadow: `0 15px 40px rgba(98, 209, 119, 0.25)`
          }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 34,
              color: PURPLE_DARK,
              textTransform: "uppercase",
              letterSpacing: "1.5px"
            }}>
              Explorar Guías
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
