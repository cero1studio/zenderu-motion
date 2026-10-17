import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const LowerThird: React.FC<{
  name?: string;
  title?: string;
  top?: number;
}> = ({ name = "Anselmo Cuántico", title = "Decodificación de símbolos", top = 220 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  React.useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Animación de entrada (Desliza desde la izquierda)
  const slideIn = spring({
    frame,
    fps,
    config: { damping: 18, mass: 1.2 },
  });

  const textOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp"
  });

  // Animación de salida (Comienza en el frame 120, desliza hacia la izquierda de nuevo)
  const slideOut = spring({
    frame: frame - 120,
    fps,
    config: { damping: 18, mass: 1.2 },
  });

  const xPos = interpolate(slideIn, [0, 1], [-1000, 0]) + interpolate(slideOut, [0, 1], [0, -1000]);

  return (
    <AbsoluteFill style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div style={{
        position: "absolute",
        top: top, // Prop configurable para evitar tapar caras
        left: 60,
        transform: `translateX(${xPos}px)`,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#0f0c21", 
        padding: "40px 75px",
        borderRadius: "0px 35px 35px 0px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(98, 209, 119, 0.15)",
        borderLeft: "16px solid #62d177",
      }}>
        
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: 75, // Mucho más grande para móvil
            color: "white", 
            fontWeight: 700, 
            letterSpacing: "-0.02em", 
            opacity: textOpacity 
          }}>
            {name}
          </h1>
          <h2 style={{ 
            margin: 0, 
            marginTop: 10, 
            fontSize: 46, // Más legible en móvil
            color: "#62d177", 
            fontWeight: 500, 
            letterSpacing: "0.05em", 
            opacity: textOpacity 
          }}>
            {title}
          </h2>
        </div>

      </div>
    </AbsoluteFill>
  );
};
