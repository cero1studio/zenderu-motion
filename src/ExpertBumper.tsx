import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";


const GREEN = "#62D177";
const MINT_GLOW = "rgba(98, 209, 119, 0.35)";
const BG_DARK = "#0F0C21";
const FONT = "'Poppins', sans-serif";

export interface ExpertBumperProps {
  guideName?: string;
  guideSpecialty?: string;
  badgeText?: string;
  avatarFile?: string;
  top?: number;
  entranceFrame?: number;
  exitFrame?: number;
}

export const ExpertBumper: React.FC<ExpertBumperProps> = ({
  guideName = "Guía Anselmo",
  guideSpecialty = "Decodificación de Patrones",
  badgeText = "Guía Zenderu Oficial",
  avatarFile = "carmen_miniatura_1.jpg",
  top = 220,
  entranceFrame = 5,
  exitFrame = 140,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animación de entrada con spring suave desde la izquierda
  const slideIn = spring({
    frame: frame - entranceFrame,
    fps,
    config: { damping: 16, mass: 1.1 },
  });

  // Animación de salida deslizándose hacia la izquierda
  const slideOut = spring({
    frame: frame - exitFrame,
    fps,
    config: { damping: 16, mass: 1.1 },
  });

  const xPos =
    interpolate(slideIn, [0, 1], [-1100, 0]) +
    interpolate(slideOut, [0, 1], [0, -1100]);

  const textOpacity = interpolate(
    frame - entranceFrame,
    [8, 24],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 50,
        transform: `translateX(${xPos}px)`,
        display: "flex",
        alignItems: "center",
        gap: "28px",
        backgroundColor: BG_DARK,
        padding: "36px 64px 36px 44px",
        borderRadius: "0px 42px 42px 0px",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.65), 0 0 45px rgba(98, 209, 119, 0.2)",
        borderLeft: `16px solid ${GREEN}`,
        fontFamily: FONT,
        zIndex: 50,
      }}
    >
      {/* Avatar circular con badge online */}
      <div style={{ position: "relative", width: "120px", height: "120px" }}>
        <Img
          src={staticFile(avatarFile)}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `3.5px solid ${GREEN}`,
            boxShadow: `0 0 25px ${MINT_GLOW}`,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "3px",
            right: "3px",
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            backgroundColor: GREEN,
            border: `3.5px solid ${BG_DARK}`,
            boxShadow: `0 0 12px ${GREEN}`,
          }}
        />
      </div>

      {/* Info del Guía */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {badgeText && (
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: GREEN,
              textTransform: "uppercase",
              letterSpacing: "2.5px",
              opacity: textOpacity,
            }}
          >
            ✦ {badgeText}
          </span>
        )}
        <h1
          style={{
            margin: 0,
            fontSize: "64px",
            color: "white",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            opacity: textOpacity,
          }}
        >
          {guideName}
        </h1>
        <h2
          style={{
            margin: 0,
            fontSize: "36px",
            color: "#A5A2C4",
            fontWeight: 500,
            letterSpacing: "0.02em",
            opacity: textOpacity,
          }}
        >
          {guideSpecialty}
        </h2>
      </div>
    </div>
  );
};
