import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

const FONT = "'Poppins', sans-serif";
const GREEN = "#82E299"; // Un verde un poco más pastel/brillante como en la foto
const DARK_PURPLE = "#1A1733"; // El fondo morado oscuro exacto

export const YoutubeThumbnail: React.FC<{
  expertName: string;
  phraseWhite: string;
  phraseGreen: string;
  imageSrc: string;
}> = ({ expertName, phraseWhite, phraseGreen, imageSrc }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: DARK_PURPLE, display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* HEADER (Nombre y Título) */}
      <div style={{ marginTop: "140px", textAlign: "center", zIndex: 20 }}>
        <h1 style={{ color: "white", fontFamily: FONT, fontSize: 80, fontWeight: 800, margin: 0, letterSpacing: -1 }}>{expertName}</h1>
        <h2 style={{ color: GREEN, fontFamily: FONT, fontSize: 50, fontWeight: 500, margin: 0, marginTop: "5px" }}>Guía Zenderu</h2>
      </div>

      {/* TITULAR GIGANTE */}
      <div style={{ marginTop: "110px", textAlign: "center", zIndex: 20, width: "85%" }}>
        <h1 style={{ color: "white", fontFamily: FONT, fontSize: 110, fontWeight: 800, margin: 0, lineHeight: 1.15, letterSpacing: -2 }}>
          {phraseWhite}
          <br/>
          <span style={{ color: GREEN }}>{phraseGreen}</span>
        </h1>
      </div>

      {/* IMAGEN DEL EXPERTO CON EFECTO DE FUSIÓN (FADE-IN DESDE ARRIBA) */}
      <AbsoluteFill style={{ top: "38%", zIndex: 10 }}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {/* Capa de difuminado superior (Funde la imagen con el fondo morado) */}
          <div style={{ position: "absolute", top: -2, left: 0, right: 0, height: "40%", background: `linear-gradient(to bottom, ${DARK_PURPLE} 0%, rgba(26,23,51,0.8) 40%, transparent 100%)`, zIndex: 15 }} />
          <Img 
            src={staticFile(imageSrc)} 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              objectPosition: "top" 
            }} 
          />
        </div>
      </AbsoluteFill>

      {/* BADGE INFERIOR zenderu.com */}
      <div style={{ position: "absolute", bottom: "70px", right: "70px", zIndex: 20, backgroundColor: "rgba(10, 8, 25, 0.7)", padding: "15px 40px", borderRadius: "40px" }}>
        <span style={{ color: "rgba(255,255,255,0.8)", fontFamily: FONT, fontSize: 32, fontWeight: 500 }}>zenderu.com</span>
      </div>

    </AbsoluteFill>
  );
};
