import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Intro } from "./Intro";
import { LowerThird } from "./LowerThird";
import { Outro } from "./Outro";

const GREEN = "#62D177";
const FONT = "'Poppins', sans-serif";

export const LAYLA_SUBS = [
  { fromSec: 0.00, toSec: 0.80, text: "Hola," },
  { fromSec: 0.80, toSec: 1.65, text: "soy Layla", hl: ["Layla"] },
  { fromSec: 1.65, toSec: 2.40, text: "y quiero brindarte" },
  { fromSec: 2.40, toSec: 3.40, text: "un espacio donde te sientas", hl: ["espacio"] },
  { fromSec: 3.40, toSec: 4.60, text: "escuchado, comprendido", hl: ["escuchado", "comprendido"] },
  { fromSec: 4.60, toSec: 6.30, text: "y acompañado.", hl: ["acompañado"] },
  { fromSec: 6.50, toSec: 7.50, text: "A través del tarot", hl: ["tarot"] },
  { fromSec: 7.50, toSec: 8.30, text: "te ayudo a encontrar" },
  { fromSec: 8.30, toSec: 10.00, text: "claridad en tu camino,", hl: ["claridad", "camino"] },
  { fromSec: 10.00, toSec: 11.10, text: "en las relaciones", hl: ["relaciones"] },
  { fromSec: 11.10, toSec: 12.10, text: "y en estos momentos" },
  { fromSec: 12.10, toSec: 13.30, text: "en los que las dudas", hl: ["dudas"] },
  { fromSec: 13.30, toSec: 14.80, text: "no te dejan avanzar.", hl: ["avanzar"] },
  { fromSec: 14.90, toSec: 16.20, text: "Mi propósito es orientarte", hl: ["propósito"] },
  { fromSec: 16.20, toSec: 17.40, text: "con honestidad,", hl: ["honestidad"] },
  { fromSec: 17.40, toSec: 18.30, text: "con empatía,", hl: ["empatía"] },
  { fromSec: 18.30, toSec: 19.30, text: "con sensibilidad,", hl: ["sensibilidad"] },
  { fromSec: 19.30, toSec: 20.90, text: "para que puedas comprender", hl: ["comprender"] },
  { fromSec: 20.90, toSec: 23.20, text: "mejor qué estás viviendo,", hl: ["viviendo"] },
  { fromSec: 23.20, toSec: 25.40, text: "tomar decisiones con confianza,", hl: ["decisiones", "confianza"] },
  { fromSec: 25.40, toSec: 26.80, text: "porque a veces solo" },
  { fromSec: 26.80, toSec: 28.00, text: "necesitamos una luz", hl: ["luz"] },
  { fromSec: 28.00, toSec: 30.20, text: "que nos ayude a encontrar el camino,", hl: ["camino"] },
  { fromSec: 30.20, toSec: 32.50, text: "para salir de ese estancamiento", hl: ["estancamiento"] },
  { fromSec: 32.50, toSec: 34.30, text: "en el que nos encontramos." },
  { fromSec: 34.30, toSec: 36.60, text: "Con más de 20 años de experiencia,", hl: ["20", "experiencia"] },
  { fromSec: 36.60, toSec: 38.50, text: "todo mi proceso académico", hl: ["académico"] },
  { fromSec: 38.50, toSec: 40.30, text: "y la herencia de mis ancestros,", hl: ["ancestros"] },
  { fromSec: 40.30, toSec: 42.60, text: "tengo las herramientas suficientes", hl: ["herramientas"] },
  { fromSec: 42.60, toSec: 43.70, text: "para guiarte,", hl: ["guiarte"] },
  { fromSec: 43.70, toSec: 45.10, text: "no dudes en contactarme" },
  { fromSec: 45.10, toSec: 46.20, text: "en Zenderu.", hl: ["Zenderu"] },
  { fromSec: 46.20, toSec: 47.80, text: "Mi nombre es Layla.", hl: ["Layla"] },
];

const Caption: React.FC<{ text: string; hl?: string[]; localFrame: number }> = ({ text, hl, localFrame }) => {
  const pop = interpolate(localFrame, [0, 4], [0.95, 1], { extrapolateRight: "clamp" });
  const op = interpolate(localFrame, [0, 3], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        transform: `scale(${pop})`,
        opacity: op,
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 78,
        textTransform: "uppercase",
        lineHeight: 1.15,
        textAlign: "center",
        color: "white",
        padding: "0 60px",
        textShadow: "6px 6px 0px rgba(0,0,0,1), 0px 0px 30px rgba(0,0,0,0.85)",
        WebkitTextStroke: "4px black",
      }}
    >
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          style={{
            color: hl?.includes(w.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]/g, "")) ? GREEN : "white",
          }}
        >
          {w}{" "}
        </span>
      ))}
    </div>
  );
};

export const LaylaAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const INTRO_DUR = 3 * fps; // 90 frames (0 - 3s)
  const VIDEO_DUR = 48.0 * fps; // 1440 frames (3s - 51s)
  const OUTRO_DUR = 6.0 * fps; // 180 frames (51s - 57s)

  // Tiempo relativo a la voz de Layla (en segundos)
  const voiceFrame = frame - INTRO_DUR;
  const currentVoiceSec = voiceFrame / fps;

  // Dinámica visual moderna (Punches sutiles de zoom en momentos clave)
  let scale = 1.0;
  let origin = "center 38%";

  if (currentVoiceSec >= 14.9 && currentVoiceSec < 23.2) {
    // "Mi propósito es orientarte..." - Zoom sutil íntimo
    scale = 1.07;
  } else if (currentVoiceSec >= 23.2 && currentVoiceSec < 30.2) {
    // "Tomar decisiones con confianza..." - Empuje progresivo
    scale = interpolate(currentVoiceSec, [23.2, 30.2], [1.05, 1.14], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (currentVoiceSec >= 34.3 && currentVoiceSec < 43.7) {
    // "Con más de 20 años de experiencia..." - Punch de autoridad
    scale = 1.09;
  } else if (currentVoiceSec >= 43.7 && currentVoiceSec < 48.0) {
    // "No dudes en contactarme en Zenderu..." - Cierre directo al espectador
    scale = 1.12;
  }

  const activeSub = LAYLA_SUBS.find(
    (s) => currentVoiceSec >= s.fromSec && currentVoiceSec < s.toSec
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0C21" }}>
      {/* 1. INTRO OFICIAL DE ZENDERU (3 segundos = 90 frames) */}
      <Sequence from={0} durationInFrames={INTRO_DUR}>
        <Intro />
        <Audio src={staticFile("tip_received.wav")} volume={0.12} />
      </Sequence>

      {/* 2. SECCIÓN DE DISCURSO DE LAYLA (Segundo 3 al 51 = 1440 frames) */}
      <Sequence from={INTRO_DUR} durationInFrames={VIDEO_DUR}>
        <AbsoluteFill
          style={{
            transform: `scale(${scale})`,
            transformOrigin: origin,
          }}
        >
          <OffthreadVideo
            src={staticFile("Layla.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "contrast(1.05) saturate(1.08) brightness(1.02)",
            }}
          />
        </AbsoluteFill>

        {/* Viñeta inferior oscura para legibilidad perfecta de subtítulos */}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(7,2,27,0) 40%, rgba(7,2,27,0.4) 65%, rgba(7,2,27,0.88) 100%)",
          }}
        />

        {/* LOWER THIRD OFICIAL: Entra a los 1.5s del video de Layla y dura 5 segundos (150 frames) */}
        <Sequence from={Math.floor(1.5 * fps)} durationInFrames={150}>
          <LowerThird name="Layla" title="Guía Zenderu" top={110} />
        </Sequence>

        {/* SUBTÍTULOS DINÁMICOS HORMOZI STYLE */}
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 220,
          }}
        >
          {activeSub && (
            <Caption
              key={activeSub.fromSec}
              text={activeSub.text}
              hl={activeSub.hl}
              localFrame={voiceFrame - Math.floor(activeSub.fromSec * fps)}
            />
          )}
        </AbsoluteFill>
      </Sequence>

      {/* 3. OUTRO OFICIAL DE 6 SEGUNDOS (Segundo 51 al 57 = 180 frames) */}
      <Sequence from={INTRO_DUR + VIDEO_DUR} durationInFrames={OUTRO_DUR}>
        <Outro />
        <Audio src={staticFile("call_connected.wav")} volume={0.10} />
        <Sequence from={30}>
          <Audio src={staticFile("chat_message.wav")} volume={0.10} />
        </Sequence>
      </Sequence>

      {/* 4. MÚSICA DE FONDO AMBIENTAL: Colchón sonoro suave que cubre el video y se funde en el Outro */}
      <AbsoluteFill>
        <Audio
          src={staticFile("ambient_bg.mp3")}
          volume={(f) => {
            const OUTRO_START = INTRO_DUR + VIDEO_DUR;
            const LAST_BEEP = OUTRO_START + 30; // Termina cuando entra el chat_message
            return (
              0.06 *
              interpolate(f, [0, 15, LAST_BEEP - 15, LAST_BEEP], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            );
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
