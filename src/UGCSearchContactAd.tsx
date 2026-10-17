import { AbsoluteFill, Sequence, OffthreadVideo, staticFile, useVideoConfig, useCurrentFrame, spring, Audio, interpolate } from "remotion";
import React from "react";
import { Outro } from "./Outro";

const GREEN = "#62D177";
// Apple usa SF Pro, pero mantenemos Poppins para la marca, asegurando pesos correctos
const FONT = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

// Estilo de Cristal Minimalista (Apple iOS 17)
const appleGlassStyle: React.CSSProperties = {
  backgroundColor: "rgba(242, 242, 247, 0.85)", // Blanco translúcido típico de iOS
  backdropFilter: "blur(40px)",
  WebkitBackdropFilter: "blur(40px)",
  boxShadow: "0 25px 50px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.05)",
  border: "1.5px solid rgba(255,255,255,0.6)",
  borderRadius: "55px", // Más curvo al hacerlo más grande
  padding: "45px 50px", // Más aire interno
  display: "flex",
  flexDirection: "column",
  width: "88%", // Un poco más ancho para acomodar el texto grande
};

// Ícono SVG nativo de usuario
const UserIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="rgba(255,255,255,0.9)">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const MinimalTyping: React.FC<{ contactName: string; textToType: string; localFrame: number }> = ({ contactName, textToType, localFrame }) => {
  const typeSpeed = 2; 
  const holdFrames = 30; 
  const deleteSpeed = 1; 
  
  const totalTypeFrames = textToType.length * typeSpeed;
  const startDeleteFrame = totalTypeFrames + holdFrames;

  let currentText = "";
  if (localFrame < totalTypeFrames) {
    currentText = textToType.slice(0, Math.floor(localFrame / typeSpeed));
  } else if (localFrame < startDeleteFrame) {
    currentText = textToType;
  } else {
    const deleteChars = Math.floor((localFrame - startDeleteFrame) / deleteSpeed);
    currentText = textToType.slice(0, Math.max(0, textToType.length - deleteChars));
  }

  const showCursor = Math.floor(localFrame / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: "50%" }}>
      <div style={appleGlassStyle}>
        {/* Contact Header EXACTAMENTE como el mockup, pero más GRANDE */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "#141728", marginRight: 22, display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
            <UserIcon />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ color: "#8E8E93", fontFamily: FONT, fontSize: 28, fontWeight: 600, letterSpacing: "-0.5px" }}>Escribiendo a...</span>
            <span style={{ color: "#1C1C1E", fontFamily: FONT, fontSize: 50, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.5px" }}>{contactName}</span>
          </div>
        </div>

        {/* Thin Separator Line */}
        <div style={{ height: "2px", backgroundColor: "rgba(60,60,67,0.1)", width: "100%", marginTop: 25, marginBottom: 25 }} />

        {/* Typing Area MÁS GRANDE */}
        <div style={{ minHeight: "130px" }}>
          <span style={{ color: "#1C1C1E", fontFamily: FONT, fontSize: 56, fontWeight: 500, lineHeight: 1.15, letterSpacing: "-1px" }}>
            {currentText}
            <span style={{ opacity: showCursor ? 1 : 0, color: GREEN, fontWeight: 400 }}>|</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const MinimalNotification: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { fps } = useVideoConfig();
  const slideIn = spring({ fps, frame: localFrame, config: { damping: 16, stiffness: 120 } });
  
  const translateY = interpolate(slideIn, [0, 1], [-450, 0]);

  return (
    <AbsoluteFill style={{
      alignItems: "center",
      zIndex: 20,
      transform: `translateY(${translateY}px)`
    }}>
      <div style={{
        ...appleGlassStyle,
        padding: "35px 45px",
        borderRadius: "50px",
        marginTop: "20%", 
      }}>
        {/* iOS Notification Header MÁS GRANDE */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: GREEN, marginRight: 12 }} />
            <span style={{ color: "#8E8E93", fontFamily: FONT, fontSize: 26, fontWeight: 500 }}>MENSAGES</span>
          </div>
          <span style={{ color: "#8E8E93", fontFamily: FONT, fontSize: 26, fontWeight: 400 }}>ahora</span>
        </div>

        {/* Content MÁS GRANDE Y CONCISO */}
        <span style={{ color: "#1C1C1E", fontFamily: FONT, fontSize: 42, fontWeight: 700, marginBottom: 8 }}>Valeria 💜</span>
        <span style={{ color: "#3A3A3C", fontFamily: FONT, fontSize: 40, lineHeight: 1.25, fontWeight: 500, letterSpacing: "-0.5px" }}>
          amiga te noté mal. si necesitas desahogarte sin que te juzguen, entra a Zenderu 👇
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const UGCSearchContactAd: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0C21" }}>
      <Audio src={staticFile("ambient_bg.mp3")} volume={0.15} />

      <AbsoluteFill>
        <OffthreadVideo 
          src={staticFile("a5772c60-079d-4ab3-bf2a-5fe320b0415a.MP4")} 
          startFrom={5 * 30}
          muted={true}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
        {/* Blur pesado de fondo tipo iOS */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)"
        }} />
      </AbsoluteFill>

      {/* SCENE 1: Mamá (Texto más corto) */}
      <Sequence from={0} durationInFrames={130}>
        <Audio src={staticFile("keyboard.wav")} volume={0.2} startFrom={0} endAt={100} />
        <MinimalTyping contactName="Mamá" textToType="mami, ya no sé qué hacer..." localFrame={frame} />
      </Sequence>

      {/* SCENE 2: Mejor Amiga (Texto más corto) */}
      <Sequence from={130} durationInFrames={130}>
        <Audio src={staticFile("keyboard.wav")} volume={0.2} startFrom={0} endAt={100} />
        <MinimalTyping contactName="Mejor Amiga" textToType="amiga, estoy colapsando..." localFrame={frame - 130} />
      </Sequence>

      {/* SCENE 3: Texto de transición */}
      <Sequence from={260} durationInFrames={70}>
        <div style={{ position: "absolute", top: "40%", width: "100%", padding: "0 10%" }}>
          <h1 style={{ color: "white", fontFamily: FONT, fontSize: 75, textAlign: "center", lineHeight: 1.15, textShadow: "0 10px 30px rgba(0,0,0,0.8)", fontWeight: 700, letterSpacing: "-1.5px" }}>
            ¿Sientes que no puedes hablarlo con <span style={{color: GREEN}}>nadie</span>?
          </h1>
        </div>
      </Sequence>

      {/* SCENE 4: Notificación iOS */}
      <Sequence from={330} durationInFrames={150}>
        <Audio src={staticFile("tip_received.wav")} volume={0.8} />
        <MinimalNotification localFrame={frame - 330} />
      </Sequence>

      {/* OUTRO */}
      <Sequence from={480} durationInFrames={6 * fps}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
