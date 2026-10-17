import { AbsoluteFill, Sequence, OffthreadVideo, staticFile, useVideoConfig, useCurrentFrame, interpolate, spring, Audio } from "remotion";
import React from "react";
import { Outro } from "./Outro";

const GREEN = "#62D177";
const FONT = "'Poppins', sans-serif";

// Moons-style jump cuts
// Format: [startSec, endSec, text, highlights]
const CUTS = [
  { start: 30.50, end: 35.31, text: "Si hoy tienes algo que te preocupa, una decisión que no sabes cómo tomar..." },
  { start: 35.31, end: 41.45, text: "o simplemente necesitas hablar con alguien sin sentirte juzgado, me encantaría escucharte." },
  { start: 4.34, end: 11.17, text: "Muchas veces no necesitamos que alguien nos diga qué hacer, necesitamos que realmente nos escuche." },
  { start: 41.45, end: 46.20, text: "A veces una conversación puede ser el comienzo de una nueva Claridad." },
  { start: 46.20, end: 48.30, text: "Te espero en Zenderu." }
];

const Caption: React.FC<{ text: string; localFrame: number }> = ({ text, localFrame }) => {
  const pop = interpolate(localFrame, [0, 4], [0.95, 1], { extrapolateRight: "clamp" });
  const op = interpolate(localFrame, [0, 3], [0, 1], { extrapolateRight: "clamp" });
  
  // Highlight important words natively
  const hlWords = ["decisión", "juzgado", "escuche", "Claridad.", "Zenderu."];
  
  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        boxSizing: "border-box",
        zIndex: 10,
        opacity: op,
        transform: `scale(${pop})`
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: "52px",
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          lineHeight: 1.2,
          textShadow: "0px 4px 12px rgba(0,0,0,0.8)",
        }}
      >
        {text.split(" ").map((w, i) => {
          const isHl = hlWords.some(h => w.includes(h));
          return (
            <span key={i} style={{ color: isHl ? GREEN : "white" }}>
              {w}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const ExpertAdMoons: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ fps, frame, config: { damping: 200 } }) * 0.1 + 1; // Subtle zoom
  
  let currentStartFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0C21" }}>
      
      {/* Background Music */}
      <Audio src={staticFile("ambient_bg.mp3")} volume={0.05} />

      {/* Jump Cuts */}
      {CUTS.map((cut, index) => {
        const durationFrames = Math.floor((cut.end - cut.start) * fps);
        const sequenceStart = currentStartFrame;
        currentStartFrame += durationFrames;
        
        return (
          <Sequence key={index} from={sequenceStart} durationInFrames={durationFrames}>
            <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "center 40%" }}>
              {/* startFrom allows us to start the video at the specific cut */}
              <OffthreadVideo 
                src={staticFile("expert_carmen_final_pro.mp4")} 
                startFrom={Math.floor(cut.start * fps)}
                endAt={Math.floor(cut.end * fps)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </AbsoluteFill>
            
            <AbsoluteFill style={{ background: "linear-gradient(to bottom, rgba(7,2,27,0) 45%, rgba(7,2,27,0.75) 100%)" }} />
            
            <Caption text={cut.text} localFrame={frame - sequenceStart} />
          </Sequence>
        );
      })}

      {/* Outro */}
      <Sequence from={currentStartFrame} durationInFrames={6 * fps}>
        <Outro />
      </Sequence>

    </AbsoluteFill>
  );
};
