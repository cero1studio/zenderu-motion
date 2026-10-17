import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Loop,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { LowerThird } from "./LowerThird";
import { Intro } from "./Intro";
import { Outro } from "./Outro";

const GREEN = "#62D177";
const FONT = "'Poppins', sans-serif";

export const EXPERT_SUBS = [
  { fromSec: 0.50, toSec: 2.20, text: "Hola, yo soy Carmen" },
  { fromSec: 2.20, toSec: 4.34, text: "Y a lo largo de mi vida he aprendido" },
  { fromSec: 4.34, toSec: 6.50, text: "que muchas veces no necesitamos" },
  { fromSec: 6.50, toSec: 9.43, text: "que alguien nos diga qué hacer", hl: ["hacer"] },
  { fromSec: 9.43, toSec: 11.17, text: "necesitamos que realmente nos escuche", hl: ["escuche"] },
  { fromSec: 11.17, toSec: 13.06, text: "Yo soy maestra de profesión" },
  { fromSec: 13.06, toSec: 15.78, text: "y durante años he acompañado a personas" },
  { fromSec: 15.78, toSec: 18.50, text: "en diferentes momentos de sus vidas" },
  { fromSec: 18.50, toSec: 21.43, text: "escuchando sus historias, sus dudas, sus miedos" },
  { fromSec: 21.43, toSec: 22.83, text: "y también sus sueños" },
  { fromSec: 22.83, toSec: 25.50, text: "Mi forma de acompañar" },
  { fromSec: 25.50, toSec: 27.57, text: "combina experiencia, sensibilidad e intuición" },
  { fromSec: 27.57, toSec: 30.50, text: "y una profunda comprensión de las personas" },
  { fromSec: 30.50, toSec: 31.76, text: "Si hoy tienes algo" },
  { fromSec: 31.76, toSec: 33.71, text: "que te preocupa, una decisión", hl: ["decisión"] },
  { fromSec: 33.71, toSec: 35.31, text: "que no sabes cómo tomar" },
  { fromSec: 35.31, toSec: 38.00, text: "o simplemente necesitas hablar con alguien" },
  { fromSec: 38.00, toSec: 41.45, text: "sin sentirte juzgado, me encantaría escucharte", hl: ["hablar", "juzgado"] },
  { fromSec: 41.45, toSec: 44.00, text: "A veces una conversación puede ser" },
  { fromSec: 44.00, toSec: 46.20, text: "el comienzo de una nueva Claridad", hl: ["Claridad"] },
  { fromSec: 46.20, toSec: 48.30, text: "Te espero en Zenderu", hl: ["Zenderu"] }
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
        fontSize: 80,
        textTransform: "uppercase",
        lineHeight: 1.15,
        textAlign: "center",
        color: "white",
        padding: "0 60px",
        textShadow: "6px 6px 0px rgba(0,0,0,1), 0px 0px 30px rgba(0,0,0,0.8)",
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

export const ExpertAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const INTRO_DUR = 3 * fps;
  const VIDEO_DUR = 48.3 * fps; // Cortamos apenas dice Zenderu, para que no se coma la 'u'
  const OUTRO_DUR = 6 * fps;

  const hookStartFrame = INTRO_DUR + 30.5 * fps; // "si hoy tienes algo..."

  // Ken Burns zoom en el hook (sobre el video de Carmen)
  const scale = interpolate(frame, [hookStartFrame, hookStartFrame + fps * 5], [1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const activeSub = EXPERT_SUBS.find(
    (s) => frame >= (INTRO_DUR + s.fromSec * fps) && frame < (INTRO_DUR + s.toSec * fps)
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0C21" }}>
      
      {/* 1. INTRO (3 segundos) */}
      <Sequence from={0} durationInFrames={INTRO_DUR}>
        <Intro />
        <Audio src={staticFile("tip_received.wav")} volume={0.12} />
      </Sequence>

      {/* 2. EL VIDEO DE CARMEN (50.9 segundos) */}
      <Sequence from={INTRO_DUR} durationInFrames={Math.floor(VIDEO_DUR)}>
        <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "center 40%" }}>
          <OffthreadVideo 
            src={staticFile("expert_carmen_final_pro.mp4")} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
        </AbsoluteFill>
        
        {/* Viñeta para legibilidad */}
        <AbsoluteFill
          style={{ background: "linear-gradient(to bottom, rgba(7,2,27,0) 45%, rgba(7,2,27,0.75) 100%)" }}
        />
        
        {/* LOWER THIRD CORREGIDO (Entra a los 2s del video) */}
        <Sequence from={2 * fps} durationInFrames={180}>
          <LowerThird name="Carmen" title="Guía Zenderu" />
        </Sequence>

        {/* SUBTÍTULOS DINÁMICOS - Ajustado el bottom para que no estrelle */}
        <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 200 }}>
          {activeSub && (
            <Caption 
              key={activeSub.fromSec} 
              text={activeSub.text} 
              hl={activeSub.hl} 
              localFrame={frame - Math.floor(INTRO_DUR + activeSub.fromSec * fps)} 
            />
          )}
        </AbsoluteFill>
      </Sequence>

      {/* 3. OUTRO (6 segundos) */}
      <Sequence from={Math.floor(INTRO_DUR + VIDEO_DUR)} durationInFrames={OUTRO_DUR}>
        <Outro />
        <Audio src={staticFile("call_connected.wav")} volume={0.10} />
        <Sequence from={30}>
          <Audio src={staticFile("chat_message.wav")} volume={0.10} />
        </Sequence>
      </Sequence>

      {/* MÚSICA DE FONDO ORIGINAL (ambient_bg.mp3) - Cubre todo el ad pero se corta al final */}
      <AbsoluteFill>
        <Audio 
          src={staticFile("ambient_bg.mp3")} 
          volume={(f) => {
            const OUTRO_START = Math.floor(INTRO_DUR + VIDEO_DUR);
            const LAST_BEEP = OUTRO_START + 30; // Aquí suena el último wav
            return (
              0.06 * // Volumen a la mitad (antes 0.12)
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
