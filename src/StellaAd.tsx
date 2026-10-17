import { AbsoluteFill, OffthreadVideo, staticFile, useVideoConfig, useCurrentFrame, Sequence, Audio, interpolate } from "remotion";
import React from "react";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { LowerThird } from "./LowerThird";

const GREEN = "#62D177";
const FONT = "'Poppins', sans-serif";

const STELLA_SUBS = [
  { fromSec: 0.62, toSec: 1.64, text: "Yo soy Stella" },
  { fromSec: 1.64, toSec: 2.76, text: "Moons y me" },
  { fromSec: 2.76, toSec: 3.68, text: "dedico a acompañar" },
  { fromSec: 3.68, toSec: 4.26, text: "a las personas" },
  { fromSec: 4.26, toSec: 5.34, text: "que están atravesando" },
  { fromSec: 5.34, toSec: 6.02, text: "por un vínculo" },
  { fromSec: 6.02, toSec: 7.36, text: "confuso,", hl: ["confuso"] },
  { fromSec: 7.36, toSec: 7.84, text: "por la toma" },
  { fromSec: 7.84, toSec: 8.66, text: "de una decisión", hl: ["decisión"] },
  { fromSec: 8.66, toSec: 10.26, text: "importante o que" },
  { fromSec: 10.26, toSec: 11.10, text: "tienen un caos" },
  { fromSec: 11.10, toSec: 11.66, text: "en su cabeza" },
  { fromSec: 11.66, toSec: 12.38, text: "que no saben" },
  { fromSec: 12.38, toSec: 13.82, text: "como resolver." },
  { fromSec: 13.82, toSec: 14.34, text: "Mi forma de" },
  { fromSec: 14.34, toSec: 15.54, text: "trabajo mezcla la" },
  { fromSec: 15.54, toSec: 16.50, text: "astrología,", hl: ["astrología"] },
  { fromSec: 16.50, toSec: 17.62, text: "la meta programación" },
  { fromSec: 17.62, toSec: 18.74, text: "cognitiva,", hl: ["cognitiva"] },
  { fromSec: 18.74, toSec: 20.00, text: "la lectura de" },
  { fromSec: 20.00, toSec: 21.12, text: "símbolos y la" },
  { fromSec: 21.12, toSec: 23.20, text: "programación neurolinguística,", hl: ["neurolinguística"] },
  { fromSec: 23.20, toSec: 24.14, text: "que aparentemente son" },
  { fromSec: 24.14, toSec: 25.66, text: "herramientas muy diferentes," },
  { fromSec: 25.66, toSec: 26.58, text: "pero que para" },
  { fromSec: 26.58, toSec: 27.74, text: "mí todas llevan" },
  { fromSec: 27.74, toSec: 28.34, text: "a un mismo" },
  { fromSec: 28.34, toSec: 29.50, text: "resultado," },
  { fromSec: 29.50, toSec: 30.18, text: "que es lograr" },
  { fromSec: 30.18, toSec: 31.58, text: "entenderte,", hl: ["entenderte"] },
  { fromSec: 31.58, toSec: 32.50, text: "lograr descifrar" },
  { fromSec: 32.50, toSec: 33.10, text: "lo que tienes" },
  { fromSec: 33.10, toSec: 34.44, text: "dentro y llegar" },
  { fromSec: 34.44, toSec: 35.44, text: "a una solución" },
  { fromSec: 35.44, toSec: 36.60, text: "juntos.", hl: ["juntos"] },
  { fromSec: 36.60, toSec: 38.26, text: "No necesitas tener" },
  { fromSec: 38.26, toSec: 39.42, text: "una pregunta clara" },
  { fromSec: 39.42, toSec: 40.38, text: "para hacer," },
  { fromSec: 40.38, toSec: 41.56, text: "necesitas que vengas" },
  { fromSec: 41.56, toSec: 42.56, text: "y tengamos una" },
  { fromSec: 42.56, toSec: 43.32, text: "conversación.", hl: ["conversación"] },
];


const ZOOM_MOMENTS = [
  { startSec: 18.00, endSec: 24.84 }, // Enumera herramientas (Zoom in)
  { startSec: 31.50, endSec: 36.68 }, // "lograr entenderte..." (Zoom in)
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
        lineHeight: 1.15,
        textAlign: "center",
        textTransform: "uppercase",
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

export const StellaAd: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const introDuration = 3 * fps; // 90 frames
  const expertDuration = 44 * fps; // Stella's video 1 is ~44 seconds
  const outroDuration = 6 * fps; // 180 frames
  
  const voiceFrame = frame - introDuration;
  const currentVoiceSecond = voiceFrame / fps;
  
  // LÓGICA DE EDICIÓN TIKTOK: Cortes secos y un Zoom Lento (Creeping Zoom)
  let scale = 1;
  let translateY = 0;

  if (currentVoiceSecond >= 18.74 && currentVoiceSecond < 24.14) {
    // JUMP CUT DURO (Fuerza)
    scale = 1.15;
    translateY = 3;
  } else if (currentVoiceSecond >= 31.58 && currentVoiceSecond < 36.60) {
    // ZOOM LENTO (Creeping zoom para intensidad: "lograr entenderte...")
    scale = interpolate(currentVoiceSecond, [31.58, 36.60], [1.0, 1.35], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    translateY = interpolate(currentVoiceSecond, [31.58, 36.60], [0, 6], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  } else if (currentVoiceSecond >= 40.38 && currentVoiceSecond < 45.00) {
    // JUMP CUT FINAL PARA EL CTA
    scale = 1.2;
    translateY = 4;
  }

  // Detectar si estamos ampliados para mover los subtítulos
  const isZoomed = scale >= 1.15;

  const activeSub = STELLA_SUBS.find(
    s => currentVoiceSecond >= s.fromSec && currentVoiceSecond < s.toSec
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0C21" }}>
      <Audio src={staticFile("stella/stella_bgm_full.wav")} volume={0.15} />

      <Sequence from={0} durationInFrames={introDuration}>
        <Intro />
        <Audio src={staticFile("tip_received.wav")} volume={0.12} />
      </Sequence>

      <Sequence from={introDuration} durationInFrames={expertDuration}>
        <AbsoluteFill
          style={{
            transform: `scale(${scale}) translateY(${translateY}%)`,
            transformOrigin: "top center",
            // ¡SIN TRANSICIÓN CSS! Para que los cortes sean secos (Hard Cuts) estilo TikTok
          }}
        >
          <OffthreadVideo 
            src={staticFile("stella/68e1a57b8dd8466cb1f49df7961e36e5.mov")}
            muted={false} 
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.08) saturate(1.12) brightness(1.05)" }}
          />
        </AbsoluteFill>

        <Sequence from={2 * fps} durationInFrames={5 * fps}>
            <LowerThird name="Stella Moons" title="Estratega Espiritual Zenderu" top={1100} />
        </Sequence>
        
        {/* SUBTÍTULOS DINÁMICOS */}
        <AbsoluteFill 
          style={{ 
            justifyContent: isZoomed ? "flex-start" : "flex-end", 
            alignItems: "center", 
            paddingTop: isZoomed ? 280 : 0,
            paddingBottom: isZoomed ? 0 : 250 
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
