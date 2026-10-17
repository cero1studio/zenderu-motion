import { AbsoluteFill, OffthreadVideo, staticFile, useVideoConfig, useCurrentFrame, Sequence, Audio, interpolate } from "remotion";
import React from "react";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { LowerThird } from "./LowerThird";

const GREEN = "#62D177";
const FONT = "'Poppins', sans-serif";

const VIOLETA_SUBS = [
  { fromSec: 0.00, toSec: 2.04, text: "Sientes que tienes" },
  { fromSec: 2.04, toSec: 3.08, text: "demasiado en tu corazón", hl: ["corazón"] },
  { fromSec: 3.08, toSec: 3.62, text: "y no sabes" },
  { fromSec: 3.62, toSec: 5.12, text: "con quién hablar?" },
  { fromSec: 5.12, toSec: 6.46, text: "Soy Violeta." },
  { fromSec: 6.46, toSec: 8.28, text: "psicóloga y orientadora,", hl: ["psicóloga", "orientadora"] },
  { fromSec: 8.28, toSec: 9.70, text: "especializada en acompañamiento" },
  { fromSec: 9.70, toSec: 11.28, text: "emocional,", hl: ["emocional"] },
  { fromSec: 11.28, toSec: 12.56, text: "relaciones y situaciones" },
  { fromSec: 12.56, toSec: 13.62, text: "familiares." },
  { fromSec: 13.62, toSec: 14.22, text: "Estoy aquí para" },
  { fromSec: 14.22, toSec: 16.26, text: "escucharte sin juzgarte," },
  { fromSec: 16.26, toSec: 17.50, text: "ayudarte a entender lo" },
  { fromSec: 17.50, toSec: 18.38, text: "que estás sintiendo" },
  { fromSec: 18.38, toSec: 19.54, text: "y encontrar juntos" },
  { fromSec: 19.54, toSec: 20.50, text: "una manera más" },
  { fromSec: 20.50, toSec: 22.92, text: "clara de afrontar" },
  { fromSec: 22.92, toSec: 23.78, text: "aquello que hoy" },
  { fromSec: 23.78, toSec: 25.32, text: "te preocupa.", hl: ["preocupa"] },
  { fromSec: 25.32, toSec: 26.12, text: "Si estás pasando" },
  { fromSec: 26.12, toSec: 26.98, text: "por una dificultad" },
  { fromSec: 26.98, toSec: 27.56, text: "en el amor,", hl: ["amor"] },
  { fromSec: 27.56, toSec: 28.82, text: "con tu familia" },
  { fromSec: 28.82, toSec: 30.70, text: "o simplemente necesitas" },
  { fromSec: 30.70, toSec: 31.98, text: "ser escuchado," },
  { fromSec: 31.98, toSec: 33.70, text: "quiero escucharte," },
  { fromSec: 33.70, toSec: 34.74, text: "encuéntrame en Zenderu", hl: ["Zenderu"] },
  { fromSec: 34.74, toSec: 36.00, text: "y conversemos." },
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
        fontWeight: 900, // Más grueso
        fontSize: 80, // Ligeramente más grande
        lineHeight: 1.15,
        textAlign: "center",
        textTransform: "uppercase", // Hormozi style puro
        color: "white",
        padding: "0 60px",
        // Sombra doble: una dura (desplazada) y una difuminada para despegar del fondo blanco
        textShadow: "6px 6px 0px rgba(0,0,0,1), 0px 0px 30px rgba(0,0,0,0.8)",
        // Borde negro grueso alrededor de cada letra
        WebkitTextStroke: "4px black",
      }}
    >
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ color: hl?.includes(w.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '')) ? GREEN : "white" }}>
          {w}{" "}
        </span>
      ))}
    </div>
  );
};

export const Expert3Ad: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const introDuration = 3 * fps; // 90 frames
  const expertDuration = 37 * fps; // Violeta's video is ~37 seconds
  const outroDuration = 6 * fps; // 180 frames
  
  const voiceFrame = frame - introDuration;
  const currentVoiceSecond = voiceFrame / fps;

  const activeSub = VIOLETA_SUBS.find(
    s => currentVoiceSecond >= s.fromSec && currentVoiceSecond < s.toSec
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0C21" }}>
      <Audio src={staticFile("expert3/expert3_bgm_full.wav")} volume={0.18} />

      <Sequence from={0} durationInFrames={introDuration}>
        <Intro />
        <Audio src={staticFile("tip_received.wav")} volume={0.12} />
      </Sequence>

      <Sequence from={introDuration} durationInFrames={expertDuration}>
        <AbsoluteFill>
          {/* El video no tiene cortes abruptos, así que está a scale(1) */}
          <OffthreadVideo 
            src={staticFile("expert3/expert3_raw.mp4")}
            muted={false} // Mantengo el audio original porque no tengo audio "mejorado" aún
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>

        <Sequence from={2 * fps} durationInFrames={5 * fps}>
            <LowerThird name="Violeta" title="Psicóloga y Orientadora" top={950} />
        </Sequence>
        
        {/* SUBTÍTULOS DINÁMICOS - Todo el video en la parte inferior */}
        <AbsoluteFill 
          style={{ 
            justifyContent: "flex-end", 
            alignItems: "center", 
            paddingBottom: 250 
          }}
        >
          {activeSub && (
            <Caption 
              key={activeSub.fromSec} 
              text={activeSub.text} 
              hl={activeSub.hl} 
              localFrame={frame - Math.floor(introDuration + activeSub.fromSec * fps)} 
            />
          )}
        </AbsoluteFill>
      </Sequence>
      
      <Sequence from={introDuration + expertDuration} durationInFrames={outroDuration}>
        <Outro />
        <Audio src={staticFile("call_connected.wav")} volume={0.10} />
        <Sequence from={30}>
          <Audio src={staticFile("chat_message.wav")} volume={0.10} />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};
