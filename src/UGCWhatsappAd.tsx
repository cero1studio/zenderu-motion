import { AbsoluteFill, Sequence, OffthreadVideo, staticFile, useVideoConfig, useCurrentFrame, spring, Audio, interpolate } from "remotion";
import React from "react";
import { Outro } from "./Outro";

const GREEN = "#62D177";
const DARK_BUBBLE = "#2A2A35";
const FONT = "'Poppins', sans-serif";

const MESSAGES = [
  { text: "amiga te lo juro que mi cabeza va a explotar 🤯 llevo días sobrepensando lo mismo...", side: "left", startFrame: 15 },
  { text: "nena a veces uno solo necesita desahogarse con alguien de afuera para no volverse loca... ¿ya probaste zenderu?", side: "right", startFrame: 90 },
  { text: "no, qué es eso? 😭 de verdad necesito hablarlo con alguien YA", side: "left", startFrame: 180 },
  { text: "te conectan de una con un Guía por chat o llamada. te escuchan súper lindo, a mí me salvó 💜", side: "right", startFrame: 270 },
  { text: "te paso el link que te regalan los primeros minutos pa que pruebes 👇", side: "right", startFrame: 340 }
];

const SCENES = [
  { startFrame: 0, duration: 90, videoStart: 5 * 30 },
  { startFrame: 90, duration: 90, videoStart: 12 * 30 },
  { startFrame: 180, duration: 160, videoStart: 20 * 30 },
  { startFrame: 340, duration: 90, videoStart: 45 * 30 }
];

const ChatBubble: React.FC<{ text: string; side: string; startFrame: number; currentFrame: number }> = ({ text, side, startFrame, currentFrame }) => {
  const { fps } = useVideoConfig();
  
  // No renderizar hasta que llegue su frame
  if (currentFrame < startFrame) return null;

  const localFrame = currentFrame - startFrame;
  const pop = spring({ fps, frame: localFrame, config: { damping: 14, stiffness: 200 } });
  const translateY = interpolate(localFrame, [0, 10], [50, 0], { extrapolateRight: "clamp" });
  
  const isLeft = side === "left";

  return (
    <div style={{
      display: "flex",
      justifyContent: isLeft ? "flex-start" : "flex-end",
      width: "100%",
      marginBottom: "24px",
      transform: `scale(${pop}) translateY(${translateY}px)`,
      transformOrigin: isLeft ? "bottom left" : "bottom right",
      opacity: interpolate(localFrame, [0, 5], [0, 1], { extrapolateRight: "clamp" })
    }}>
      <div style={{
        backgroundColor: isLeft ? DARK_BUBBLE : GREEN,
        color: isLeft ? "white" : "#0F0C21",
        padding: "20px 28px",
        borderRadius: "26px",
        borderBottomLeftRadius: isLeft ? "5px" : "26px",
        borderBottomRightRadius: !isLeft ? "5px" : "26px",
        fontFamily: FONT,
        fontSize: "38px",
        fontWeight: 500,
        maxWidth: "85%",
        lineHeight: 1.3,
        boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
      }}>
        {text}
      </div>
    </div>
  );
};

export const UGCWhatsappAd: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  
  const videoDuration = SCENES.reduce((acc, scene) => acc + scene.duration, 0);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0C21" }}>
      {/* Música lo-fi de fondo */}
      <Audio src={staticFile("ambient_bg.mp3")} volume={0.15} />

      {/* Efectos de sonido para cada mensaje */}
      {MESSAGES.map((msg, i) => {
        // El último mensaje (minutos gratis) hace sonar la campana de regalo/propina
        const soundFile = i === MESSAGES.length - 1 ? "tip_received.wav" : "chat_message.wav";
        const vol = i === MESSAGES.length - 1 ? 0.3 : 0.6;
        return (
          <Sequence key={`audio-${i}`} from={msg.startFrame}>
            <Audio src={staticFile(soundFile)} volume={vol} />
          </Sequence>
        );
      })}

      {/* TOMAS DE VIDEO SILENCIADAS */}
      {SCENES.map((scene, i) => (
        <Sequence key={`scene-${i}`} from={scene.startFrame} durationInFrames={scene.duration}>
          <AbsoluteFill>
            <OffthreadVideo 
              src={staticFile("a5772c60-079d-4ab3-bf2a-5fe320b0415a.MP4")} 
              startFrom={scene.videoStart}
              endAt={scene.videoStart + scene.duration}
              muted={true} // SILENCIADO COMO PEDISTE
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
            {/* Gradiente oscuro superior para que el chat se lea perfecto */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "60%",
              background: "linear-gradient(to bottom, rgba(7,2,27,0.85) 0%, rgba(7,2,27,0) 100%)",
              zIndex: 1
            }} />
          </AbsoluteFill>
        </Sequence>
      ))}

      {/* CONTENEDOR DE CHAT (Arriba) */}
      <Sequence from={0} durationInFrames={videoDuration}>
        <div style={{
          position: "absolute",
          top: "8%",
          left: 0,
          width: "100%",
          padding: "0 50px",
          display: "flex",
          flexDirection: "column",
          zIndex: 10
        }}>
          {MESSAGES.map((msg, i) => (
            <ChatBubble key={`msg-${i}`} {...msg} currentFrame={frame} />
          ))}
        </div>
      </Sequence>

      {/* Outro Promocional */}
      <Sequence from={videoDuration} durationInFrames={6 * fps}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
