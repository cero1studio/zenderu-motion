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
import { LowerThird } from "./LowerThird";
import { Outro } from "./Outro";

const GREEN = "#62D177";
const FONT = "'Poppins', sans-serif";

export const LAYLA_SUBS = [
  { fromSec: 0.00, toSec: 0.80, text: "Hola," },
  { fromSec: 0.80, toSec: 1.80, text: "soy Layla", hl: ["Layla"] },
  { fromSec: 1.80, toSec: 2.70, text: "y quiero brindarte" },
  { fromSec: 2.70, toSec: 4.50, text: "un espacio donde te sientas", hl: ["espacio"] },
  { fromSec: 4.50, toSec: 6.20, text: "escuchado, comprendido", hl: ["escuchado", "comprendido"] },
  { fromSec: 6.20, toSec: 7.20, text: "y acompañado.", hl: ["acompañado"] },
  { fromSec: 7.20, toSec: 8.30, text: "A través del tarot", hl: ["tarot"] },
  { fromSec: 8.30, toSec: 10.00, text: "te ayudo a encontrar claridad", hl: ["claridad"] },
  { fromSec: 10.00, toSec: 11.20, text: "en tu camino,", hl: ["camino"] },
  { fromSec: 11.20, toSec: 12.30, text: "en las relaciones", hl: ["relaciones"] },
  { fromSec: 12.30, toSec: 13.40, text: "y en esos momentos" },
  { fromSec: 13.40, toSec: 14.80, text: "en los que las dudas", hl: ["dudas"] },
  { fromSec: 14.80, toSec: 16.00, text: "no te dejan avanzar.", hl: ["avanzar"] },
  { fromSec: 16.00, toSec: 17.50, text: "Mi propósito es orientarte", hl: ["propósito"] },
  { fromSec: 17.50, toSec: 18.40, text: "con honestidad,", hl: ["honestidad"] },
  { fromSec: 18.40, toSec: 19.30, text: "con empatía,", hl: ["empatía"] },
  { fromSec: 19.30, toSec: 20.60, text: "con sensibilidad,", hl: ["sensibilidad"] },
  { fromSec: 20.60, toSec: 22.20, text: "para que puedas comprender", hl: ["comprender"] },
  { fromSec: 22.20, toSec: 23.80, text: "mejor qué estás viviendo.", hl: ["viviendo"] },
  { fromSec: 23.80, toSec: 26.00, text: "Tomar decisiones con confianza,", hl: ["decisiones", "confianza"] },
  { fromSec: 26.00, toSec: 27.50, text: "porque a veces solo" },
  { fromSec: 27.50, toSec: 29.00, text: "necesitamos una luz", hl: ["luz"] },
  { fromSec: 29.00, toSec: 30.60, text: "que nos ayude a encontrar el camino.", hl: ["camino"] },
  { fromSec: 30.60, toSec: 32.80, text: "Para salir de ese estancamiento", hl: ["estancamiento"] },
  { fromSec: 32.80, toSec: 34.40, text: "en el que nos encontramos," },
  { fromSec: 34.40, toSec: 36.60, text: "con más de 20 años de experiencia,", hl: ["20", "experiencia"] },
  { fromSec: 36.60, toSec: 38.60, text: "todo mi proceso académico", hl: ["académico"] },
  { fromSec: 38.60, toSec: 40.50, text: "y la herencia de mis ancestros,", hl: ["ancestros"] },
  { fromSec: 40.50, toSec: 42.40, text: "tengo las herramientas suficientes", hl: ["herramientas"] },
  { fromSec: 42.40, toSec: 43.60, text: "para guiarte.", hl: ["guiarte"] },
  { fromSec: 43.60, toSec: 45.20, text: "No dudes en contactarme", hl: ["contactarme"] },
  { fromSec: 45.20, toSec: 46.20, text: "en Zenderu.", hl: ["Zenderu"] },
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

  const VIDEO_DUR = 48.0 * fps; // 1440 frames
  const OUTRO_DUR = 6.0 * fps; // 180 frames (1440 -> 1620)

  const currentSec = frame / fps;

  // Dinámica visual moderna (Punches sutiles de zoom en momentos clave)
  let scale = 1.0;
  let origin = "center 38%";

  if (currentSec >= 16.0 && currentSec < 23.8) {
    // "Mi propósito es orientarte..." - Zoom sutil íntimo
    scale = 1.07;
  } else if (currentSec >= 23.8 && currentSec < 30.6) {
    // "Tomar decisiones con confianza..." - Empuje progresivo
    scale = interpolate(currentSec, [23.8, 30.6], [1.05, 1.14], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (currentSec >= 34.4 && currentSec < 43.6) {
    // "Con más de 20 años de experiencia..." - Punch de autoridad
    scale = 1.09;
  } else if (currentSec >= 43.6 && currentSec < 48.0) {
    // "No dudes en contactarme en Zenderu..." - Cierre directo al espectador
    scale = 1.12;
  }

  const activeSub = LAYLA_SUBS.find(
    (s) => currentSec >= s.fromSec && currentSec < s.toSec
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0C21" }}>
      {/* 1. SECCIÓN DE DISCURSO DE LAYLA (0s a 48s = 1440 frames) */}
      <Sequence from={0} durationInFrames={VIDEO_DUR}>
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

        {/* LOWER THIRD OFICIAL: Entra en el segundo 1.2 (frame 36) y dura 5 segundos (150 frames) */}
        <Sequence from={36} durationInFrames={150}>
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
              localFrame={frame - Math.floor(activeSub.fromSec * fps)}
            />
          )}
        </AbsoluteFill>
      </Sequence>

      {/* 2. OUTRO OFICIAL DE 6 SEGUNDOS (Frames 1440 a 1620) */}
      <Sequence from={VIDEO_DUR} durationInFrames={OUTRO_DUR}>
        <Outro />
        <Audio src={staticFile("call_connected.wav")} volume={0.10} />
        <Sequence from={30}>
          <Audio src={staticFile("chat_message.wav")} volume={0.10} />
        </Sequence>
      </Sequence>

      {/* 3. MÚSICA DE FONDO AMBIENTAL: Colchón sonoro suave que se disuelve antes de que termine el Outro */}
      <AbsoluteFill>
        <Audio
          src={staticFile("ambient_bg.mp3")}
          volume={(f) => {
            const OUTRO_START = VIDEO_DUR;
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
