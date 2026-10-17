import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Outro } from "./Outro";

const GREEN = "#62D177";
const MINT_GLOW = "rgba(98, 209, 119, 0.45)";
const BG_DARK = "#070514";
const FONT = "'Poppins', sans-serif";

export interface QuoteLine {
  text: string;
  highlight?: boolean;
  startFrame: number;
}

export interface KineticTextQuoteProps {
  categoryPill?: string;
  lines?: QuoteLine[];
  authorName?: string;
  authorSpecialty?: string;
  avatarFile?: string;
  ctaText?: string;
  includeOutro?: boolean;
}

export const DEFAULT_QUOTE_LINES: QuoteLine[] = [
  { text: "No estás trabado por falta de opciones.", highlight: false, startFrame: 15 },
  { text: "Estás trabado porque buscas certeza absoluta", highlight: true, startFrame: 65 },
  { text: "antes de dar el primer paso hacia adelante.", highlight: false, startFrame: 125 },
];

export const KineticTextQuoteAd: React.FC<KineticTextQuoteProps> = ({
  categoryPill = "✦ REENCUADRE CONSCIENTE",
  lines = DEFAULT_QUOTE_LINES,
  authorName = "Guía Anselmo",
  authorSpecialty = "Decodificación de Patrones & Vida",
  avatarFile = "carmen_miniatura_1.jpg",
  ctaText = "Conversa en vivo en zenderu.com",
  includeOutro = true,
}) => {
  const frame = useCurrentFrame();


  // Quote body runs for 240 frames (8s), followed by 6s Outro (180 frames)
  const quoteDuration = 240;

  // Background breathing pulsation
  const glowPulse = interpolate(
    Math.sin((frame / 30) * Math.PI),
    [-1, 1],
    [0.15, 0.35]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        fontFamily: FONT,
        color: "white",
        overflow: "hidden",
      }}
    >
      <Sequence from={0} durationInFrames={includeOutro ? quoteDuration : undefined}>
        {/* Soft Ambient Audio */}
        <Audio src={staticFile("ambient_bg.mp3")} volume={0.3} />

        {/* Deep Cosmos Background */}
        <AbsoluteFill style={{ opacity: 0.4 }}>
          <Img
            src={staticFile("universe_bg_vertical_1790811953345.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>

        {/* Ambient Glows */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "10%",
            width: "650px",
            height: "650px",
            borderRadius: "50%",
            background: "rgba(37, 33, 81, 0.55)",
            filter: "blur(140px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "-10%",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: `rgba(98, 209, 119, ${glowPulse})`,
            filter: "blur(130px)",
          }}
        />

        {/* Main Content Center */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            padding: "140px 70px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {/* Top Pill */}
          <div
            style={{
              background: "rgba(37, 33, 81, 0.75)",
              border: `1.5px solid rgba(98, 209, 119, 0.35)`,
              padding: "16px 36px",
              borderRadius: "999px",
              fontSize: "22px",
              fontWeight: 700,
              color: GREEN,
              letterSpacing: "3px",
              textTransform: "uppercase",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              transform: `translateY(${interpolate(frame, [0, 15], [-30, 0], {
                extrapolateRight: "clamp",
              })}px)`,
              opacity: interpolate(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {categoryPill}
          </div>

          {/* Kinetic Quote Text Lines */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              maxWidth: "960px",
              margin: "auto 0",
            }}
          >
            {lines.map((line, idx) => {
              const localFrame = frame - line.startFrame;
              if (localFrame < 0) return null;

              const opacity = interpolate(localFrame, [0, 12], [0, 1], {
                extrapolateRight: "clamp",
              });
              const translateY = interpolate(localFrame, [0, 12], [35, 0], {
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={idx}
                  style={{
                    fontSize: line.highlight ? "62px" : "54px",
                    fontWeight: line.highlight ? 800 : 600,
                    color: line.highlight ? GREEN : "white",
                    textShadow: line.highlight
                      ? `0 0 35px ${MINT_GLOW}`
                      : "0 10px 30px rgba(0,0,0,0.5)",
                    lineHeight: 1.35,
                    letterSpacing: "-0.02em",
                    transform: `translateY(${translateY}px)`,
                    opacity,
                  }}
                >
                  {line.text}
                </div>
              );
            })}
          </div>

          {/* Author Badge Card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              backgroundColor: "rgba(18, 14, 46, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "20px 42px",
              borderRadius: "999px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              backdropFilter: "blur(20px)",
              opacity: interpolate(frame, [150, 170], [0, 1], {
                extrapolateRight: "clamp",
              }),
              transform: `translateY(${interpolate(frame, [150, 170], [30, 0], {
                extrapolateRight: "clamp",
              })}px)`,
            }}
          >
            <Img
              src={staticFile(avatarFile)}
              style={{
                width: "74px",
                height: "74px",
                borderRadius: "50%",
                border: `2px solid ${GREEN}`,
                objectFit: "cover",
              }}
            />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                {authorName}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  color: GREEN,
                  fontWeight: 500,
                  marginTop: "4px",
                }}
              >
                {authorSpecialty}
              </div>
            </div>
          </div>
        </div>
      </Sequence>

      {/* Outro Oficial (Promo 5 Minutos Gratis) */}
      {includeOutro && (
        <Sequence from={quoteDuration} durationInFrames={180}>
          <Outro />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
