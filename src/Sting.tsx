import { AbsoluteFill } from "remotion";
import React from "react";
import { AnimatedLogo } from "./AnimatedLogo";

/**
 * Sting de marca — solo el logo, para abrir videos de Guías (no la promo del Intro completo).
 * 30 frames (1s @ 30fps): el reveal propio de AnimatedLogo termina en el frame 25, deja un
 * pequeño respiro antes del corte.
 */
export const Sting: React.FC = () => {
  React.useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0c21", overflow: "hidden", fontFamily: "'Poppins', sans-serif" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <AnimatedLogo width={500} variant="full" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
