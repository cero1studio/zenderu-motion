import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Outro } from "./Outro";

const GREEN = "#62D177";
const MINT_GLOW = "rgba(98, 209, 119, 0.4)";
const BG_DARK = "#0A0818";
const CLIENT_BUBBLE = "#231B4C";
const GUIDE_BUBBLE = "#181438";
const FONT = "'Poppins', sans-serif";


export interface ChatMessage {
  text: string;
  sender: "client" | "guide";
  startFrame: number;
  highlightText?: string;
  hasAudioWave?: boolean;
  audioDuration?: string;
}

export interface ChatAdProps {
  guideName?: string;
  guideFocus?: string;
  avatarFile?: string;
  zensBalance?: number;
  messages?: ChatMessage[];
  bgVideoFile?: string;
  bgOpacity?: number;
  includeOutro?: boolean;
}

export const DEFAULT_CHAT_MESSAGES: ChatMessage[] = [
  {
    sender: "client",
    text: "Siento que repito la misma indecisión una y otra vez... ¿cómo salgo de este bucle?",
    startFrame: 15,
  },
  {
    sender: "guide",
    text: "No estás estancado por falta de opciones, sino porque buscas certeza absoluta antes de avanzar.",
    highlightText: "buscas certeza absoluta",
    startFrame: 90,
  },
  {
    sender: "guide",
    text: "Escucha este reencuadre de 40 segundos que preparé para ti:",
    startFrame: 180,
    hasAudioWave: true,
    audioDuration: "0:42",
  },
  {
    sender: "client",
    text: "Wow... necesitaba escuchar exactamente eso. Gracias de verdad 💜",
    startFrame: 260,
  },
];

export const ChatAd: React.FC<ChatAdProps> = ({
  guideName = "Guía Anselmo",
  guideFocus = "Decodificación de Patrones",
  avatarFile = "carmen_miniatura_1.jpg",
  zensBalance = 45.0,
  messages = DEFAULT_CHAT_MESSAGES,
  bgVideoFile,
  bgOpacity = 0.35,
  includeOutro = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Chat body duration is 10.7s (320 frames), followed by 6s Outro (180 frames)
  const chatDuration = 320;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        fontFamily: FONT,
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Background Ambience / Video */}
      <Sequence from={0} durationInFrames={includeOutro ? chatDuration : undefined}>
        {bgVideoFile ? (
          <AbsoluteFill style={{ opacity: bgOpacity }}>
            <OffthreadVideo
              src={staticFile(bgVideoFile)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AbsoluteFill>
        ) : (
          <AbsoluteFill style={{ opacity: 0.5 }}>
            <Img
              src={staticFile("universe_bg_vertical_1790811953345.jpg")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AbsoluteFill>
        )}

        {/* Ambient Dark/Purple Glows */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(98, 209, 119, 0.12)",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "-15%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "rgba(37, 33, 81, 0.4)",
            filter: "blur(140px)",
          }}
        />

        {/* Background Audio track (low ambient) */}
        <Audio src={staticFile("ambient_bg.mp3")} volume={0.25} />

        {/* Top Header Mockup */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "90px 48px 32px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(10, 8, 24, 0.75)",
            backdropFilter: "blur(25px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            zIndex: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ position: "relative", width: "100px", height: "100px" }}>
              <Img
                src={staticFile(avatarFile)}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: `3px solid ${GREEN}`,
                  boxShadow: `0 0 25px ${MINT_GLOW}`,
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: GREEN,
                  border: `3px solid ${BG_DARK}`,
                  boxShadow: `0 0 10px ${GREEN}`,
                }}
              />
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "36px",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                }}
              >
                {guideName}
              </h2>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "22px",
                  color: GREEN,
                  fontWeight: 500,
                }}
              >
                {guideFocus}
              </p>
            </div>
          </div>

          {/* Zens Balance Badge */}
          <div
            style={{
              background: "rgba(37, 33, 81, 0.65)",
              border: `1.5px solid rgba(98, 209, 119, 0.35)`,
              padding: "14px 26px",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: GREEN,
              }}
            >
              {zensBalance.toFixed(1)}
            </span>
            <span
              style={{
                fontSize: "18px",
                color: "#A5A2C4",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Zens
            </span>
          </div>
        </div>

        {/* Chat Thread Container */}
        <div
          style={{
            position: "absolute",
            top: "230px",
            bottom: "200px",
            left: 0,
            right: 0,
            padding: "40px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: "24px",
            zIndex: 10,
          }}
        >
          {messages.map((msg, idx) => {
            if (frame < msg.startFrame) return null;

            const localFrame = frame - msg.startFrame;
            const pop = spring({
              fps,
              frame: localFrame,
              config: { damping: 14, stiffness: 190 },
            });
            const translateY = interpolate(localFrame, [0, 8], [40, 0], {
              extrapolateRight: "clamp",
            });
            const opacity = interpolate(localFrame, [0, 4], [0, 1], {
              extrapolateRight: "clamp",
            });

            const isClient = msg.sender === "client";

            return (
              <React.Fragment key={idx}>
                {/* Pop sound on message arrival */}
                {localFrame === 1 && (
                  <Audio src={staticFile("chat_message.wav")} volume={0.06} />
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: isClient ? "flex-end" : "flex-start",
                    width: "100%",
                    transform: `scale(${pop}) translateY(${translateY}px)`,
                    transformOrigin: isClient ? "bottom right" : "bottom left",
                    opacity,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: isClient ? CLIENT_BUBBLE : GUIDE_BUBBLE,
                      border: isClient
                        ? "1px solid rgba(255, 255, 255, 0.12)"
                        : `1.5px solid rgba(98, 209, 119, 0.35)`,
                      color: "white",
                      padding: "24px 34px",
                      borderRadius: "32px",
                      borderBottomRightRadius: isClient ? "6px" : "32px",
                      borderBottomLeftRadius: !isClient ? "6px" : "32px",
                      fontSize: "34px",
                      fontWeight: 500,
                      maxWidth: "84%",
                      lineHeight: 1.4,
                      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.45)",
                    }}
                  >
                    {msg.highlightText && msg.text.includes(msg.highlightText) ? (
                      <>
                        {msg.text.split(msg.highlightText)[0]}
                        <span style={{ color: GREEN, fontWeight: 700 }}>
                          {msg.highlightText}
                        </span>
                        {msg.text.split(msg.highlightText)[1]}
                      </>
                    ) : (
                      msg.text
                    )}

                    {/* Audio Note Bar (if present) */}
                    {msg.hasAudioWave && (
                      <div
                        style={{
                          marginTop: "20px",
                          paddingTop: "16px",
                          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            backgroundColor: GREEN,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 0 20px ${MINT_GLOW}`,
                          }}
                        >
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="#0A0818"
                            style={{ marginLeft: "3px" }}
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>

                        {/* Wave bars */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            flex: 1,
                            height: "36px",
                          }}
                        >
                          {[22, 38, 26, 42, 30, 44, 20, 36, 28, 40].map((h, bIdx) => {
                            const waveSin = Math.sin(
                              ((frame + bIdx * 6) / 8) * Math.PI
                            );
                            const dynamicH = interpolate(
                              waveSin,
                              [-1, 1],
                              [12, h]
                            );
                            return (
                              <div
                                key={bIdx}
                                style={{
                                  width: "6px",
                                  height: `${dynamicH}px`,
                                  backgroundColor: GREEN,
                                  borderRadius: "4px",
                                }}
                              />
                            );
                          })}
                        </div>
                        <span
                          style={{
                            fontSize: "22px",
                            color: "#A5A2C4",
                            fontWeight: 600,
                          }}
                        >
                          {msg.audioDuration || "0:30"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Input Area Mockup */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "30px 48px 80px 48px",
            background: "rgba(10, 8, 24, 0.88)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            zIndex: 20,
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: "#16113A",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              padding: "22px 32px",
              borderRadius: "999px",
              fontSize: "26px",
              color: "#8B85B2",
            }}
          >
            Escribe tu consulta confidencial...
          </div>
          <div
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              backgroundColor: GREEN,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 25px ${MINT_GLOW}`,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#0A0818">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </Sequence>

      {/* Outro Oficial (Promo 5 Minutos Gratis) */}
      {includeOutro && (
        <Sequence from={chatDuration} durationInFrames={180}>
          <Outro />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
