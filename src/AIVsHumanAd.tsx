import React from "react";
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile, Audio } from "remotion";
import { Outro } from "./Outro";

const FONT = "'Poppins', sans-serif";
const GREEN = "#62D177";
const DARK_BG = "#0B0914";
const ZENDERU_PURPLE = "rgba(37, 33, 81, 0.85)";

// Burbuja de Chat Compacta y Ágil
const ChatBubble: React.FC<{ 
  text: React.ReactNode; 
  type: "user" | "ai" | "guide"; 
  delay: number;
}> = ({ text, type, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.7 },
  });

  const isRight = type === "user";
  
  let bg = "rgba(35, 35, 42, 0.95)";
  let color = "rgba(255, 255, 255, 0.92)";
  let borderRadius = "36px 36px 36px 8px";
  let border = "1px solid rgba(255,255,255,0.08)";
  let backdrop = "none";
  let shadow = "0 15px 35px rgba(0,0,0,0.4)";

  if (type === "user") {
    bg = "rgba(255, 255, 255, 0.12)";
    backdrop = "blur(20px)";
    borderRadius = "36px 36px 8px 36px";
    border = "1px solid rgba(255,255,255,0.18)";
  } else if (type === "guide") {
    bg = ZENDERU_PURPLE;
    backdrop = "blur(30px)";
    border = `1.5px solid rgba(98, 209, 119, 0.45)`;
    borderRadius = "36px 36px 36px 8px";
    shadow = "0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(98, 209, 119, 0.2)";
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: isRight ? "flex-end" : "flex-start",
      width: "100%",
      marginBottom: 35,
      opacity: appear,
      transform: `translateY(${(1 - appear) * 35}px) scale(${interpolate(appear, [0, 1], [0.94, 1])})`,
      transformOrigin: isRight ? "bottom right" : "bottom left"
    }}>
      <div style={{
        backgroundColor: bg,
        backdropFilter: backdrop,
        WebkitBackdropFilter: backdrop,
        border: border,
        color: color,
        padding: "32px 42px", 
        borderRadius: borderRadius,
        maxWidth: 720,
        fontFamily: FONT,
        fontSize: 36,
        fontWeight: 450,
        lineHeight: 1.45,
        boxShadow: shadow
      }}>
        {type === "guide" && (
          <div style={{ color: GREEN, fontWeight: 700, fontSize: 24, marginBottom: 10, letterSpacing: 1.5, display: "flex", alignItems: "center", gap: 8 }}>
            <span>✨</span> GUÍA ZENDERU
          </div>
        )}
        {type === "ai" && (
          <div style={{ color: "#999", fontWeight: 700, fontSize: 24, marginBottom: 10, letterSpacing: 1.5, display: "flex", alignItems: "center", gap: 8 }}>
            <span>🤖</span> ASISTENTE IA
          </div>
        )}
        {text}
      </div>
    </div>
  );
};

export const AIVsHumanAd: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: DARK_BG, fontFamily: FONT, overflow: "hidden" }}>
      {/* Música de fondo */}
      <Audio src={staticFile("ai_vs_human_bgm.wav")} volume={0.32} />
      
      {/* Fondo espacial con orbes */}
      <AbsoluteFill style={{ opacity: 0.75 }}>
        <Img src={staticFile("universe_bg_vertical_1790811953345.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: "15%", left: "-10%", width: "70%", height: "40%", background: "radial-gradient(circle, rgba(98, 209, 119, 0.18) 0%, transparent 60%)", filter: "blur(90px)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "-10%", width: "70%", height: "40%", background: "radial-gradient(circle, rgba(75, 59, 153, 0.55) 0%, transparent 65%)", filter: "blur(100px)" }} />
      
      {/* ========================================================
          ESCENA 1: EL GANCHO RÁPIDO Y POTENTE (0 a 75 frames / 2.5s)
          ======================================================== */}
      <Sequence from={0} durationInFrames={75}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 60px", zIndex: 30 }}>
          <div style={{
            textAlign: "center",
            opacity: interpolate(frame, [0, 12, 63, 75], [0, 1, 1, 0], { extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(frame, [0, 15], [0.95, 1], { extrapolateRight: "clamp" })})`,
          }}>
            <div style={{
              display: "inline-block",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(15px)",
              padding: "12px 35px",
              borderRadius: "40px",
              fontSize: 32,
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: 40,
              letterSpacing: 2
            }}>
              🌙 03:00 AM
            </div>

            <h1 style={{ color: "white", fontSize: 72, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
              Tu cabeza no para.<br />
              <span style={{ color: GREEN, textShadow: "0 0 30px rgba(98,209,119,0.5)" }}>
                ¿A quién le escribes?
              </span>
            </h1>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ========================================================
          ESCENA 2: CHAT CON LA IA (75 a 210 frames / 4.5s)
          ======================================================== */}
      <Sequence from={75} durationInFrames={135}>
        <AbsoluteFill style={{ padding: "120px 65px" }}>
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 28, fontWeight: 500, marginBottom: 50, letterSpacing: 1 }}>
            Madrugada • Modo privado
          </div>

          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <ChatBubble 
              type="user" 
              delay={8} 
              text="No puedo dormir. Siento que todo en mi vida se estancó..." 
            />
            <Sequence from={12}><Audio src={staticFile("chat_message.wav")} volume={0.5} /></Sequence>

            <ChatBubble 
              type="ai" 
              delay={48} 
              text="Es válido sentirte así a esta hora. ¿Qué es lo que más te pesa ahora mismo?" 
            />
            <Sequence from={52}><Audio src={staticFile("chat_message.wav")} volume={0.4} /></Sequence>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ========================================================
          ESCENA 3: EL GOLPE DE REALIDAD (210 a 290 frames / 2.6s)
          (PANTALLA LIMPIA: Cero solapamiento con los mensajes)
          ======================================================== */}
      <Sequence from={210} durationInFrames={80}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 60px", zIndex: 40 }}>
          <div style={{
            textAlign: "center",
            opacity: interpolate(useCurrentFrame(), [0, 12, 68, 80], [0, 1, 1, 0], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(useCurrentFrame(), [0, 15], [30, 0], { extrapolateRight: "clamp" })}px)`,
            backgroundColor: "rgba(11, 9, 20, 0.85)",
            backdropFilter: "blur(25px)",
            padding: "50px 60px",
            borderRadius: "40px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 70px rgba(0,0,0,0.8)"
          }}>
            <h2 style={{ color: "rgba(255,255,255,0.85)", fontSize: 50, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
              Te escucha sin juzgarte...
            </h2>
            <h1 style={{ color: "white", fontSize: 62, fontWeight: 800, margin: 0, marginTop: 15, lineHeight: 1.2 }}>
              Pero sabes que estás <br />
              <span style={{ color: "#FF6B6B" }}>hablando solo.</span>
            </h1>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ========================================================
          ESCENA 4: LA SOLUCIÓN ZENDERU (290 a 405 frames / 3.8s)
          ======================================================== */}
      <Sequence from={290} durationInFrames={115}>
        <AbsoluteFill style={{ padding: "120px 65px" }}>
          <div style={{ textAlign: "center", color: GREEN, fontSize: 28, fontWeight: 600, marginBottom: 50, letterSpacing: 2 }}>
            ✦ CONEXIÓN HUMANA REAL ✦
          </div>

          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <ChatBubble 
              type="user" 
              delay={5} 
              text="No puedo dormir. Siento que todo en mi vida se estancó..." 
            />

            <ChatBubble 
              type="guide" 
              delay={32} 
              text="No tienes que pasar la noche solo. Respira, aquí estoy. Cuéntame." 
            />
            <Sequence from={36}><Audio src={staticFile("tip_received.wav")} volume={0.6} /></Sequence>
          </div>

          {/* Subtítulo de cierre integrado elegante */}
          <div style={{
            marginTop: "auto",
            marginBottom: 60,
            textAlign: "center",
            opacity: interpolate(useCurrentFrame(), [45, 60], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(useCurrentFrame(), [45, 60], [20, 0], { extrapolateRight: "clamp" })}px)`
          }}>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 38, fontWeight: 500, margin: 0 }}>
              El mismo espacio seguro.
            </p>
            <p style={{ color: GREEN, fontSize: 54, fontWeight: 800, margin: 0, marginTop: 6, letterSpacing: -0.5 }}>
              100% Humano.
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ========================================================
          ESCENA 5: OUTRO CORPORATIVO ZENDERU (405 a 495 frames / 3s)
          ======================================================== */}
      <Sequence from={405} durationInFrames={90}>
        <Outro />
        <Sequence from={5}><Audio src={staticFile("call_connected.wav")} volume={0.15} /></Sequence>
      </Sequence>
      
    </AbsoluteFill>
  );
};
