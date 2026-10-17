import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedLogo } from "./AnimatedLogo";

/**
 * Super / overlay de la promo "5 minutos gratis".
 * Ahora adaptado como clip standalone (MP4) con logo de Zenderu oficial y fondo oscuro.
 */
const GREEN = "#62d177";
const PURPLE = "#0f0c21";

export const PromoSuper: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  React.useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // 1. Entrada: pop con rebote suave
  const enter = spring({ frame, fps, config: { damping: 11, mass: 0.7, stiffness: 120 } });
  // 2. Salida (últimos ~25 frames)
  const exitStart = durationInFrames - 25;
  const exit = spring({ frame: frame - exitStart, fps, config: { damping: 16, mass: 0.8 } });

  const cardScale = interpolate(enter, [0, 1], [0.6, 1]) * interpolate(exit, [0, 1], [1, 0.85]);
  const cardRotate = interpolate(enter, [0, 1], [-4, 0]);
  const cardOpacity = Math.min(interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" }), interpolate(exit, [0, 1], [1, 0]));

  // 3. Anillo de reloj que se dibuja alrededor del número
  const R = 118;
  const CIRC = 2 * Math.PI * R;
  const ring = interpolate(frame, [8, 36], [CIRC, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 4. Conteo 1 → 5
  const count = Math.round(interpolate(frame, [8, 32], [1, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const numberPop = spring({ frame: frame - 32, fps, config: { damping: 8, mass: 0.5 } });
  const numberScale = frame < 32 ? 1 : interpolate(numberPop, [0, 1], [1.25, 1]);

  // 5. Textos entran escalonados
  const t = (start: number) => ({
    opacity: interpolate(frame, [start, start + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    transform: `translateX(${interpolate(frame, [start, start + 12], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
  });

  // 6. Brillo que cruza la tarjeta
  const shineX = interpolate(frame, [38, 62], [-900, 1100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 7. Pulso del glow en "GRATIS" mientras está en pantalla
  const pulse = frame > 45 && frame < exitStart ? (Math.sin((frame - 45) / 6) + 1) / 2 : 0;
  const glow = 18 + pulse * 22;

  return (
    <AbsoluteFill style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: PURPLE, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: cardOpacity,
          transform: `scale(${cardScale}) rotate(${cardRotate}deg)`,
        }}
      >
        {/* Animated Zenderu Logo */}
        <div style={{ marginBottom: 60 }}>
          <AnimatedLogo width={450} variant="full" />
        </div>

        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "88%",
            backgroundColor: PURPLE,
            border: `6px solid ${GREEN}`,
            borderRadius: 48,
            padding: "50px 50px 44px",
            boxShadow: `0 30px 70px rgba(0,0,0,0.55), 0 0 ${glow + 20}px rgba(98,209,119,0.35)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 36, marginTop: 20 }}>
            {/* Número con anillo de reloj */}
            <div style={{ position: "relative", width: 260, height: 260, flexShrink: 0 }}>
              <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                <circle cx="130" cy="130" r={R} stroke="rgba(98,209,119,0.18)" strokeWidth="14" fill="none" />
                <circle cx="130" cy="130" r={R} stroke={GREEN} strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={ring} />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 190,
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1,
                  transform: `scale(${numberScale})`,
                  textShadow: `0 0 ${glow}px rgba(98,209,119,0.6)`,
                }}
              >
                {count}
              </div>
            </div>

            {/* MINUTOS / GRATIS */}
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.95 }}>
              <span style={{ ...t(18), fontSize: 92, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>MINUTOS</span>
              <span style={{ ...t(24), fontSize: 112, fontWeight: 900, color: GREEN, letterSpacing: "-0.02em", textShadow: `0 0 ${glow}px rgba(98,209,119,0.7)` }}>
                GRATIS
              </span>
            </div>
          </div>

          {/* Sub */}
          <div style={{ ...t(32), fontSize: 52, fontWeight: 700, color: "white", marginTop: 40, textAlign: "center", lineHeight: 1.25 }}>
            PARA TU PRIMERA CONSULTA<br />
            <span style={{ color: GREEN, fontWeight: 600, fontSize: 44 }}>con un Guía Zenderu</span>
          </div>

          {/* Pill URL */}
          <div
            style={{
              ...t(40),
              marginTop: 32,
              backgroundColor: GREEN,
              color: PURPLE,
              fontSize: 44,
              fontWeight: 800,
              padding: "16px 54px",
              borderRadius: 100,
              letterSpacing: "0.02em",
            }}
          >
            zenderu.com
          </div>

          {/* Brillo */}
          <div
            style={{
              position: "absolute",
              top: -100,
              bottom: -100,
              width: 220,
              left: 0,
              transform: `translateX(${shineX}px) rotate(18deg)`,
              background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
