import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig, Audio, staticFile, Img } from "remotion";
import { PromoSuper } from "./PromoSuper";

const GREEN = "#62d177";
const PURPLE = "#0f0c21";
const DARK_PURPLE = "#080614";
const GRAY_BUBBLE = "#2a2746";

// ESCENA 1: El Gancho Psicológico (0 - 240)
const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const str1 = "¿Será que me va a escribir?";
  const str2 = "Siento que mi vida está estancada...";
  
  let displayText = "";
  if (frame >= 15 && frame < 60) {
    displayText = str1.slice(0, Math.floor((frame - 15) * 0.7)); 
  } else if (frame >= 60 && frame < 80) {
    displayText = str1; // Pausa para leer
  } else if (frame >= 80 && frame < 90) {
    displayText = str1.slice(0, Math.max(0, str1.length - Math.floor((frame - 80) * 3))); // Borrando
  } else if (frame >= 90 && frame < 105) {
    displayText = ""; // Pausa pensando
  } else if (frame >= 105 && frame < 145) {
    displayText = str2.slice(0, Math.floor((frame - 105) * 1)); 
  } else if (frame >= 145) {
    displayText = str2; // Se queda escrito
  }

  const cursor = frame % 15 < 7 ? "|" : " ";

  // Transición suave del mensaje a la frase principal
  const bubbleOpacity = interpolate(frame, [170, 180], [1, 0], { extrapolateRight: "clamp" });

  // Entrada de la frase (Mucho más suave y legible, alineada al manual UX)
  const titlePop = spring({ frame: frame - 180, fps, config: { damping: 14 } });
  const titleScale = interpolate(titlePop, [0, 1], [0.8, 1]);
  const titleOpacity = interpolate(frame, [180, 190], [0, 1], { extrapolateRight: "clamp" });

  // Salida de la escena
  const slideUp = spring({ frame: frame - 220, fps, config: { damping: 16 } });
  const translateY = interpolate(slideUp, [0, 1], [0, -2000]);

  return (
    <AbsoluteFill style={{ backgroundColor: PURPLE, color: "white", justifyContent: "center", alignItems: "center", fontFamily: "'Poppins', sans-serif", transform: `translateY(${translateY}px)` }}>
      
      <div style={{
        backgroundColor: DARK_PURPLE,
        border: "2px solid #2a2746",
        borderRadius: 40,
        padding: "30px 50px",
        fontSize: 45,
        width: "80%",
        textAlign: "center",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        opacity: bubbleOpacity,
        position: "absolute"
      }}>
        <span style={{ color: "#a5a2c4" }}>{displayText}</span>
        <span style={{ color: GREEN }}>{cursor}</span>
      </div>

      <div style={{
        position: "absolute",
        transform: `scale(${titleScale})`,
        opacity: titleOpacity,
        textAlign: "center",
        padding: "0 80px" // Margen lateral más seguro
      }}>
        <h1 style={{
          fontSize: 80,
          fontWeight: 800,
          margin: 0,
          lineHeight: 1.2,
          color: "white"
        }}>
          ENCUENTRA CLARIDAD<br />
          <span style={{ color: GREEN }}>EN TU CAMINO.</span>
        </h1>
      </div>

    </AbsoluteFill>
  );
};

// ESCENA 2: Simulación de la App (220 - 550)
const Scene2Chat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideUp = spring({ frame, fps, config: { damping: 16, mass: 1.2 } });
  const translateY = interpolate(slideUp, [0, 1], [2000, 0]);

  // Burbuja 1 (Usuario)
  const b1Pop = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  const b1Scale = interpolate(b1Pop, [0, 1], [0.8, 1]);
  const b1Opacity = interpolate(b1Pop, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  // Burbuja 2 (Stella)
  const b2Pop = spring({ frame: frame - 90, fps, config: { damping: 14 } });
  const b2Scale = interpolate(b2Pop, [0, 1], [0.8, 1]);
  const b2Opacity = interpolate(b2Pop, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  // Pasa de ... a texto real después de 3 segundos (frame 180) para dar realismo
  const isTyping = frame < 180;

  const dot1 = Math.sin(frame / 3) * -8;
  const dot2 = Math.sin((frame - 2) / 3) * -8;
  const dot3 = Math.sin((frame - 4) / 3) * -8;

  // Notificación Elegante en lugar del cuadro verde roto
  const notifPop = spring({ frame: frame - 210, fps, config: { damping: 14 } });
  const notifY = interpolate(notifPop, [0, 1], [500, 0]);
  const notifOpacity = interpolate(notifPop, [0, 1], [0, 1]);
  
  // Efecto de pulso en el punto verde de la notificación
  const pulseScale = interpolate(Math.sin(frame / 5), [-1, 1], [1, 1.4]);
  const pulseOpacity = interpolate(Math.sin(frame / 5), [-1, 1], [0.4, 1]);

  // Blur final cuando entra la promo (Frame local 310 = Global 530)
  const blurVal = interpolate(frame, [310, 325], [0, 20], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: PURPLE, 
      fontFamily: "'Poppins', sans-serif",
      transform: `translateY(${translateY}px)`,
      filter: `blur(${blurVal}px)`
    }}>
      <div style={{
        height: 280, // Más alto para empujar el contenido abajo (Safe Zone Superior)
        backgroundColor: DARK_PURPLE,
        display: "flex",
        alignItems: "flex-end",
        padding: "0 50px 40px 50px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <Img 
            src={staticFile("stella_moons.webp")} 
            style={{ 
              width: 100, 
              height: 100, 
              borderRadius: "50%", 
              border: `3px solid ${GREEN}`, 
              objectFit: "cover" 
            }} 
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 style={{ color: "white", fontSize: 45, margin: 0, fontWeight: 700 }}>Stella Moons</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 5 }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: GREEN, boxShadow: `0 0 10px ${GREEN}` }} />
              <span style={{ color: GREEN, fontSize: 30, fontWeight: 500 }}>En línea ahora</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "50px", display: "flex", flexDirection: "column", gap: 40, flex: 1 }}>
        <div style={{
          alignSelf: "flex-end",
          backgroundColor: GRAY_BUBBLE,
          padding: "30px 45px",
          borderRadius: "40px 40px 0 40px",
          maxWidth: "80%",
          transform: `scale(${b1Scale})`,
          opacity: b1Opacity,
          transformOrigin: "bottom right"
        }}>
          <p style={{ color: "white", fontSize: 42, margin: 0, lineHeight: 1.4 }}>
            Siento mucha confusión con todo últimamente...
          </p>
        </div>

        <div style={{
          alignSelf: "flex-start",
          backgroundColor: "#111b15", 
          border: `3px solid ${GREEN}`,
          padding: "30px 45px",
          borderRadius: "40px 40px 40px 0",
          maxWidth: "85%",
          transform: `scale(${b2Scale})`,
          opacity: b2Opacity,
          transformOrigin: "bottom left",
          boxShadow: `0 10px 30px rgba(98,209,119,0.15)`
        }}>
          {isTyping ? (
            <div style={{ display: "flex", gap: 12, height: 50, alignItems: "center" }}>
              <div style={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: GREEN, transform: `translateY(${dot1}px)` }} />
              <div style={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: GREEN, transform: `translateY(${dot2}px)` }} />
              <div style={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: GREEN, transform: `translateY(${dot3}px)` }} />
            </div>
          ) : (
            <p style={{ color: "white", fontSize: 42, margin: 0, lineHeight: 1.4 }}>
              Tranquila, estoy aquí para escucharte. Vamos a encontrar esa claridad que necesitas hoy.
            </p>
          )}
        </div>
      </div>

      {/* NOTIFICACIÓN ELEGANTE */}
      <div style={{
        position: "absolute",
        bottom: 380, // Subido radicalmente para Safe Zone Inferior (TikTok / Reels)
        width: "100%",
        padding: "0 50px",
        zIndex: 20,
        transform: `translateY(${notifY}px)`,
        opacity: notifOpacity
      }}>
        <div style={{
          backgroundColor: "#1a1733",
          borderRadius: 30,
          padding: "40px 45px",
          border: "2px solid #2a2746",
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
          gap: 15
        }}>
          <p style={{ color: "white", fontSize: 52, margin: 0, lineHeight: 1.3, fontWeight: 600 }}>
            Habla en tiempo real con un Guía.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 10 }}>
            <div style={{ position: "relative", width: 22, height: 22 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: GREEN, transform: `scale(${pulseScale})`, opacity: pulseOpacity }} />
              <div style={{ position: "absolute", inset: 4, borderRadius: "50%", backgroundColor: GREEN }} />
            </div>
            <span style={{ color: GREEN, fontSize: 38, fontWeight: 700 }}>100% Confidencial</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DynamicAd: React.FC = () => {
  React.useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: PURPLE, overflow: "hidden" }}>
      
      {/* --- VISUALES --- */}
      {/* Escena 1: 0 a 240 */}
      <Sequence from={0} durationInFrames={240}>
        <Scene1Hook />
      </Sequence>

      {/* Escena 2: 220 a 580 (Alargado para dar más tiempo de lectura) */}
      <Sequence from={220} durationInFrames={360}>
        <Scene2Chat />
      </Sequence>

      {/* Escena 3: Promo Final (560 a 800) */}
      <Sequence from={560} durationInFrames={240}>
        <PromoSuper />
      </Sequence>

      {/* --- DISEÑO SONORO (SOUND DESIGN) --- */}
      {/* Música de Fondo Ambiental */}
      <Sequence from={0}>
        <Audio src={staticFile("ambient_bg.mp3")} volume={0.12} />
      </Sequence>

      {/* Voz en Off (VO) */}
      <Sequence from={15}>
        <Audio src={staticFile("vo_gancho_v5.mp3")} volume={1} />
      </Sequence>
      <Sequence from={270}>
        <Audio src={staticFile("vo_stella_v5.mp3")} volume={1} />
      </Sequence>
      <Sequence from={540}>
        <Audio src={staticFile("vo_cta_v8.mp3")} volume={1} />
      </Sequence>

      {/* Keyboard Typing Sounds (Scene 1) */}
      <Sequence from={15} durationInFrames={45}>
        <Audio src={staticFile("keyboard.wav")} volume={0.05} playbackRate={1.2} />
      </Sequence>
      <Sequence from={105} durationInFrames={40}>
        <Audio src={staticFile("keyboard.wav")} volume={0.05} playbackRate={1.2} />
      </Sequence>

      {/* Hook Title Impact (Frame 180) */}
      <Sequence from={180}>
        <Audio src={staticFile("call_connected.wav")} volume={0.08} />
      </Sequence>
      
      {/* User Message Sent (Scene 2 + 40 = 260) */}
      <Sequence from={260}>
        <Audio src={staticFile("chat_message.wav")} volume={0.1} />
      </Sequence>

      {/* Guide Message Resolved (Scene 2 + 180 = 400) */}
      <Sequence from={400}>
        <Audio src={staticFile("chat_message.wav")} volume={0.1} />
      </Sequence>

      {/* Premium Notification Appears (Scene 2 + 210 = 430) */}
      <Sequence from={430}>
        <Audio src={staticFile("tip_received.wav")} volume={0.12} />
      </Sequence>

      {/* PromoSuper Impact (Frame 560) */}
      <Sequence from={560}>
        <Audio src={staticFile("call_connected.wav")} volume={0.1} />
        {/* Doble campana para el CTA final */}
        <Sequence from={30}>
           <Audio src={staticFile("tip_received.wav")} volume={0.1} />
        </Sequence>
      </Sequence>

    </AbsoluteFill>
  );
};
