import { AbsoluteFill, OffthreadVideo, staticFile, useVideoConfig, useCurrentFrame, Sequence, Audio, interpolate } from "remotion";
import React from "react";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { LowerThird } from "./LowerThird";

const GREEN = "#62D177";
const FONT = "'Poppins', sans-serif";

const ANSELMO_SUBS = [
  { fromSec: 0.00, toSec: 1.50, text: "Saludos soy Anselmo," },
  { fromSec: 1.50, toSec: 3.00, text: "desde mi infancia" },
  { fromSec: 3.00, toSec: 5.00, text: "guiado por la sabiduría", hl: ["sabiduría"] },
  { fromSec: 5.00, toSec: 6.50, text: "de mi madre," },
  { fromSec: 6.50, toSec: 8.12, text: "aprendí a interpretar" },
  
  { fromSec: 8.12, toSec: 10.00, text: "arquetipos y conectar mundos." },
  { fromSec: 10.00, toSec: 12.00, text: "Ingeniero de formación," },
  { fromSec: 12.00, toSec: 14.84, text: "fusiono intuición y algoritmos,", hl: ["intuición", "algoritmos"] },
  
  { fromSec: 14.84, toSec: 16.50, text: "brindando una orientación." },
  { fromSec: 16.50, toSec: 18.00, text: "Desde hace años" },
  { fromSec: 18.00, toSec: 19.50, text: "comparto conocimientos," },
  { fromSec: 19.50, toSec: 21.80, text: "integrando ciencia y espiritualidad,", hl: ["ciencia", "espiritualidad"] },
  
  { fromSec: 21.80, toSec: 23.50, text: "durante mis estudios" },
  { fromSec: 23.50, toSec: 24.50, text: "en metafísica", hl: ["metafísica"] },
  { fromSec: 24.50, toSec: 26.00, text: "exploré las profundidades" },
  { fromSec: 26.00, toSec: 27.32, text: "de la espiritualidad" },
  
  { fromSec: 27.32, toSec: 29.00, text: "y las energías universales.", hl: ["energías"] },
  { fromSec: 29.00, toSec: 30.50, text: "Esta búsqueda" },
  { fromSec: 30.50, toSec: 32.50, text: "me brindó una comprensión" },
  { fromSec: 32.50, toSec: 33.80, text: "única de la conexión" },
  
  { fromSec: 33.80, toSec: 35.00, text: "entre el mundo físico" },
  { fromSec: 35.00, toSec: 36.50, text: "y el espiritual." },
  { fromSec: 36.50, toSec: 37.50, text: "Mis consejos," },
  { fromSec: 37.50, toSec: 38.80, text: "basados en esta sabiduría," },
  { fromSec: 38.80, toSec: 39.72, text: "han guiado amigos" },
  
  { fromSec: 39.72, toSec: 41.00, text: "hacia el éxito.", hl: ["éxito"] },
  { fromSec: 41.00, toSec: 42.50, text: "Hoy, muchos de ellos" },
  { fromSec: 42.50, toSec: 44.00, text: "disfrutan de vidas plenas,", hl: ["plenas"] },
  { fromSec: 44.00, toSec: 45.28, text: "gracias a las decisiones" },
  
  { fromSec: 45.28, toSec: 46.50, text: "conscientes que toman", hl: ["conscientes"] },
  { fromSec: 46.50, toSec: 48.00, text: "al explorar su potencial", hl: ["potencial"] },
  { fromSec: 48.00, toSec: 49.00, text: "con mi guía" },
  { fromSec: 49.00, toSec: 50.24, text: "y entendemos juntos" },
  
  { fromSec: 50.24, toSec: 51.50, text: "el código de la vida.", hl: ["vida"] },
  { fromSec: 51.50, toSec: 52.50, text: "Estoy aquí" },
  { fromSec: 52.50, toSec: 54.00, text: "para compartir este conocimiento" },
  { fromSec: 54.00, toSec: 55.72, text: "y guiarte en tu camino.", hl: ["camino"] },
  
  { fromSec: 55.72, toSec: 57.00, text: "¿Estás listo" },
  { fromSec: 57.00, toSec: 58.50, text: "para descubrir" },
  { fromSec: 58.50, toSec: 60.00, text: "lo que el universo", hl: ["universo"] },
  { fromSec: 60.00, toSec: 61.00, text: "tiene preparado para ti?" }
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

export const AnselmoAd: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const introDuration = 3 * fps; // 90 frames
  const anselmoDuration = 61 * fps; // 1830 frames
  const outroDuration = 6 * fps; // 180 frames
  
  const voiceFrame = frame - introDuration;
  const currentVoiceSecond = voiceFrame / fps;
  
  // El clip 1 (Close-up) ocurre exactamente entre el segundo 29.16 y 46.22
  const isCloseUp = currentVoiceSecond >= 29.16 && currentVoiceSecond <= 46.22;

  const activeSub = ANSELMO_SUBS.find(
    s => currentVoiceSecond >= s.fromSec && currentVoiceSecond < s.toSec
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0C21" }}>
      <Audio src={staticFile("anselmo/anselmo_bgm_75s.wav")} volume={0.18} />

      <Sequence from={0} durationInFrames={introDuration}>
        <Intro />
        {/* Efecto de sonido de propina de Zenderu para la Intro */}
        <Audio src={staticFile("tip_received.wav")} volume={0.12} />
      </Sequence>

      <Sequence from={introDuration} durationInFrames={anselmoDuration}>
        <AbsoluteFill>
          <Audio src={staticFile("anselmo/anselmo_audio_enhanced.wav")} volume={1} />
          
          <OffthreadVideo 
            src={staticFile("anselmo/anselmo_full.mp4")}
            muted={true}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>

        <Sequence from={2 * fps} durationInFrames={5 * fps}>
            <LowerThird name="Anselmo" title="Guía Zenderu" />
        </Sequence>
        
        {/* SUBTÍTULOS DINÁMICOS - Arriba en Close-Up, abajo en Plano Medio */}
        <AbsoluteFill 
          style={{ 
            justifyContent: isCloseUp ? "flex-start" : "flex-end", 
            alignItems: "center", 
            paddingTop: isCloseUp ? 280 : 0,
            paddingBottom: isCloseUp ? 0 : 250 
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
      
      <Sequence from={introDuration + anselmoDuration} durationInFrames={outroDuration}>
        <Outro />
        {/* Efectos de sonido del Outro (Igual a Carmen) */}
        <Audio src={staticFile("call_connected.wav")} volume={0.10} />
        <Sequence from={30}>
          <Audio src={staticFile("chat_message.wav")} volume={0.10} />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};
