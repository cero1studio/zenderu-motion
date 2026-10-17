import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedLogo } from "./AnimatedLogo";

const FONT = "'Poppins', sans-serif";
const GREEN = "#62D177";
const DARK_BG = "#0B0914";

export const AnselmoQuantumAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for main card
  const cardSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15, mass: 0.9 },
  });

  // Breathing background glow
  const glowPulse = interpolate(
    Math.sin((frame / 30) * Math.PI),
    [-1, 1],
    [0.2, 0.35]
  );

  // Text reveal animation (smooth kinetic feel)
  const line1Opacity = interpolate(frame, [10, 22], [0, 1], { extrapolateRight: "clamp" });
  const line1Y = interpolate(frame, [10, 22], [20, 0], { extrapolateRight: "clamp" });

  const line2Opacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" });
  const line2Y = interpolate(frame, [35, 50], [20, 0], { extrapolateRight: "clamp" });

  const line3Opacity = interpolate(frame, [130, 145], [0, 1], { extrapolateRight: "clamp" });
  const line3Y = interpolate(frame, [130, 145], [20, 0], { extrapolateRight: "clamp" });

  const authorSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 16, mass: 0.8 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: DARK_BG, fontFamily: FONT, color: "white", overflow: "hidden" }}>
      {/* Audio: Voz real de Anselmo + Fondo ambiental */}
      <Audio src={staticFile("anselmo_quote_combined.wav")} volume={1} />
      <Audio src={staticFile("ambient_bg.mp3")} volume={0.22} />

      {/* Fondo con estrellas y orbes de neón reactivos */}
      <AbsoluteFill style={{ opacity: 0.45 }}>
        <Img src={staticFile("universe_bg_vertical_1790811953345.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>

      {/* Orbes de luz profunda */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "-15%",
        width: "80%",
        height: "45%",
        background: `radial-gradient(circle, rgba(98, 209, 119, ${glowPulse}) 0%, transparent 65%)`,
        filter: "blur(90px)",
      }} />
      <div style={{
        position: "absolute",
        bottom: "15%",
        right: "-15%",
        width: "85%",
        height: "50%",
        background: "radial-gradient(circle, rgba(75, 59, 153, 0.45) 0%, transparent 70%)",
        filter: "blur(100px)",
      }} />

      {/* Contenedor central (Vertical 9:16) */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        padding: "120px 60px 100px 60px",
        boxSizing: "border-box",
        zIndex: 10,
      }}>

        {/* HEADER: Logo Zenderu + Tagline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <AnimatedLogo width={420} variant="full" />
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            padding: "10px 28px",
            borderRadius: "30px",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.7)",
            fontWeight: 600,
          }}>
            ✦ Sabiduría & Tecnología Interior ✦
          </div>
        </div>

        {/* TARJETA MAESTRA: Cita Célebre (Glassmorphism Premium) */}
        <div style={{
          width: "100%",
          maxWidth: 960,
          backgroundColor: "rgba(22, 18, 48, 0.72)",
          backdropFilter: "blur(35px)",
          WebkitBackdropFilter: "blur(35px)",
          border: "1px solid rgba(98, 209, 119, 0.35)",
          borderRadius: 48,
          padding: "70px 55px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.65), 0 0 50px rgba(98, 209, 119, 0.12)",
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          display: "flex",
          flexDirection: "column",
          gap: "35px",
          position: "relative",
        }}>
          {/* Ícono de Comillas en Verde Neón */}
          <div style={{
            fontSize: 110,
            lineHeight: 0.6,
            fontFamily: "serif",
            color: GREEN,
            opacity: 0.9,
            marginBottom: -10,
          }}>
            “
          </div>

          {/* Texto de la frase */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <p style={{
              margin: 0,
              fontSize: 48,
              lineHeight: 1.35,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.95)",
              opacity: line1Opacity,
              transform: `translateY(${line1Y}px)`,
            }}>
              Ingeniero de formación,
            </p>

            <p style={{
              margin: 0,
              fontSize: 52,
              lineHeight: 1.35,
              fontWeight: 700,
              color: "#ffffff",
              opacity: line2Opacity,
              transform: `translateY(${line2Y}px)`,
            }}>
              fusiono <span style={{ color: GREEN, textShadow: `0 0 25px rgba(98,209,119,0.5)` }}>intuición</span> y{" "}
              <span style={{ color: GREEN, textShadow: `0 0 25px rgba(98,209,119,0.5)` }}>algoritmos</span>,
            </p>

            <p style={{
              margin: 0,
              fontSize: 46,
              lineHeight: 1.4,
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.85)",
              opacity: line3Opacity,
              transform: `translateY(${line3Y}px)`,
            }}>
              integrando <strong style={{ color: "white", fontWeight: 700 }}>ciencia</strong> y{" "}
              <strong style={{ color: "white", fontWeight: 700 }}>espiritualidad</strong>.
            </p>
          </div>

          {/* AUTOR: Anselmo Quantum (Avatar + Badge) */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            marginTop: "20px",
            paddingTop: "35px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            opacity: authorSpring,
            transform: `translateY(${(1 - authorSpring) * 20}px)`,
          }}>
            {/* Foto de Anselmo en marco circular neón */}
            <div style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              overflow: "hidden",
              border: `3px solid ${GREEN}`,
              boxShadow: `0 0 30px rgba(98, 209, 119, 0.45)`,
              flexShrink: 0,
            }}>
              <Img
                src={staticFile("Anselmo_Thumbnail.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 20%",
                }}
              />
            </div>

            {/* Datos del Guía */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h3 style={{
                margin: 0,
                fontSize: 42,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: -0.5,
              }}>
                Anselmo Quantum
              </h3>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <span style={{
                  color: GREEN,
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}>
                  ✦ Guía Zenderu
                </span>
                <span style={{
                  backgroundColor: "rgba(98, 209, 119, 0.15)",
                  color: GREEN,
                  border: `1px solid rgba(98, 209, 119, 0.3)`,
                  padding: "4px 14px",
                  borderRadius: "20px",
                  fontSize: 20,
                  fontWeight: 600,
                }}>
                  Metafísica & Ciencia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER / CTA: Corporativo Zenderu */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          width: "100%",
        }}>
          <div style={{
            backgroundColor: "rgba(37, 33, 81, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px)",
            padding: "18px 45px",
            borderRadius: "40px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}>
            <span style={{ fontSize: 30, color: "rgba(255, 255, 255, 0.8)", fontWeight: 400 }}>
              Consulta privada con Anselmo en
            </span>
            <span style={{ fontSize: 32, color: GREEN, fontWeight: 700 }}>
              zenderu.com
            </span>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
