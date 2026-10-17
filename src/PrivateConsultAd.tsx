import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";

// Ad: "La consulta que nadie te ve pedir" — 24fps, 1080x1920.
// Cortes secos entre escenas 1-4 (sin fundidos). El VO entra ~0.25-0.3s antes de cada corte (L-cut).

const GREEN = "#62D177";
const BG = "#0F0C21";
const DEEP = "#07021B";
const LAVENDER = "#A7A2B8";
const FONT = "'Poppins', sans-serif";

// --- EDL (frames @24fps) ---
// v2: VO más pausado → escenas alargadas. El clip de scroll (8s) se reproduce a 0.8x para cubrir ~10s.
export const CUTS = {
  s1: { from: 0, dur: 112 }, // hook
  s2: { from: 112, dur: 55 }, // dolor
  s3: { from: 167, dur: 237 }, // solución (scroll)
  s4: { from: 404, dur: 77 }, // prueba
  s5: { from: 481, dur: 136 }, // CTA nativa
};
export const PRIVATE_AD_DURATION = 617;

// --- VO (inicio en frames, duración real en segundos tras trim; edge-tts es-AR-Elena rate -5%) ---
type Chunk = { text: string; hl?: string[] };
type Line = { file: string; start: number; secs: number; chunks: Chunk[] };

const VO: Line[] = [
  {
    file: "ad2/vo1_s.wav",
    start: 2,
    secs: 3.95,
    chunks: [
      { text: "¿Cuántas veces te tragaste" },
      { text: "lo que sentías…" },
      { text: "por miedo a que alguien" },
      { text: "te escuchara?" },
    ],
  },
  {
    file: "ad2/vo2_s.wav",
    start: 104,
    secs: 2.02,
    chunks: [{ text: "La terapia cuesta" }, { text: "un ojo de la cara." }],
  },
  {
    file: "ad2/vo3_s.wav",
    start: 160,
    secs: 9.57,
    chunks: [
      { text: "Por eso existe Zenderu.", hl: ["Zenderu."] },
      { text: "Hablás con un Guía real,", hl: ["Guía", "real,"] },
      { text: "por chat o llamada," },
      { text: "100% privado,", hl: ["100%", "privado,"] },
      { text: "desde tu casa," },
      { text: "sin pagar una fortuna." },
    ],
  },
  {
    file: "ad2/vo4_s.wav",
    start: 397,
    secs: 2.89,
    chunks: [{ text: "Cinco minutos," }, { text: "y ya no te sentís tan sola.", hl: ["tan", "sola."] }],
  },
  {
    file: "ad2/vo5_s.wav",
    start: 474,
    secs: 5.31,
    chunks: [
      { text: "Ingresá a zenderu.com", hl: ["zenderu.com"] },
      { text: "Tus primeros 5 minutos,", hl: ["5", "minutos,"] },
      { text: "gratis.", hl: ["gratis."] },
    ],
  },
];

// Reparte el tiempo de cada línea entre sus chunks proporcional a los caracteres.
const buildCaptions = (fps: number) => {
  const out: { from: number; to: number; chunk: Chunk }[] = [];
  VO.forEach((line, li) => {
    const total = line.chunks.reduce((a, c) => a + c.text.length, 0);
    const lineFrames = line.secs * fps;
    let t = line.start;
    line.chunks.forEach((c, ci) => {
      const len = (c.text.length / total) * lineFrames;
      const isLast = ci === line.chunks.length - 1;
      const nextStart = VO[li + 1]?.start ?? PRIVATE_AD_DURATION;
      // El último chunk se queda en pantalla hasta poco antes de la siguiente línea.
      const to = isLast ? Math.min(nextStart, t + len + fps * 0.6) : t + len;
      out.push({ from: Math.round(t), to: Math.round(to), chunk: c });
      t += len;
    });
  });
  return out;
};

const Caption: React.FC<{ chunk: Chunk; localFrame: number }> = ({ chunk, localFrame }) => {
  const pop = interpolate(localFrame, [0, 4], [0.92, 1], { extrapolateRight: "clamp" });
  const op = interpolate(localFrame, [0, 3], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        transform: `scale(${pop})`,
        opacity: op,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 68,
        lineHeight: 1.15,
        textAlign: "center",
        color: "white",
        padding: "0 80px",
        textShadow: "0 4px 18px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)",
        WebkitTextStroke: "2px rgba(7,2,27,0.55)",
      }}
    >
      {chunk.text.split(" ").map((w, i) => (
        <span key={i} style={{ color: chunk.hl?.includes(w) ? GREEN : "white" }}>
          {w}{" "}
        </span>
      ))}
    </div>
  );
};

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const caps = React.useMemo(() => buildCaptions(fps), [fps]);
  const active = caps.find((c) => frame >= c.from && frame < c.to);
  // Zona segura: por encima del 25% inferior (UI de Reels/TikTok).
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 520 }}>
      {active && <Caption key={active.from} chunk={active.chunk} localFrame={frame - active.from} />}
    </AbsoluteFill>
  );
};

const Clip: React.FC<{ src: string; rate?: number }> = ({ src, rate = 1 }) => (
  <AbsoluteFill style={{ backgroundColor: DEEP }}>
    <OffthreadVideo muted playbackRate={rate} src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    {/* Viñeta inferior para legibilidad de subtítulos */}
    <AbsoluteFill
      style={{ background: "linear-gradient(to bottom, rgba(7,2,27,0) 45%, rgba(7,2,27,0.55) 100%)" }}
    />
  </AbsoluteFill>
);

// --- Escena 5: CTA nativa ---
const Stars: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {new Array(55).fill(0).map((_, i) => {
        const x = random(`x${i}`) * 1080;
        const y = random(`y${i}`) * 1920;
        const size = 2 + random(`s${i}`) * 4;
        const tw = 0.25 + 0.75 * Math.abs(Math.sin(frame / (10 + random(`t${i}`) * 18) + i));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: i % 7 === 0 ? GREEN : "white",
              opacity: tw * 0.55,
              boxShadow: `0 0 ${size * 3}px ${i % 7 === 0 ? GREEN : "white"}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08]);
  const glow = 0.45 + 0.35 * Math.abs(Math.sin(frame / 9));
  const fadeBlack = interpolate(frame, [durationInFrames - 6, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 42%, #1E1840 0%, ${BG} 55%, ${DEEP} 100%)` }}>
      <Stars />
      <AbsoluteFill
        style={{ transform: `scale(${scale})`, justifyContent: "center", alignItems: "center", gap: 56, paddingBottom: 220 }}
      >
        <Img src={staticFile("logo_white.svg")} style={{ width: 560 }} />
        <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 50, color: LAVENDER, textAlign: "center", lineHeight: 1.25 }}>
          Encuentra claridad
          <br />
          <span style={{ color: "white" }}>en tu camino</span>
        </div>
        <div
          style={{
            marginTop: 20,
            padding: "26px 64px",
            borderRadius: 999,
            background: GREEN,
            boxShadow: `0 0 ${50 * glow}px rgba(98,209,119,${glow}), 0 0 ${110 * glow}px rgba(98,209,119,${glow * 0.5})`,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 52,
            color: BG,
            letterSpacing: 0.5,
          }}
        >
          5 minutos gratis
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 46, color: "white", letterSpacing: 1 }}>
          zenderu.com
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: "black", opacity: fadeBlack }} />
    </AbsoluteFill>
  );
};

export const PrivateConsultAd: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: DEEP }}>
      {/* --- VIDEO (cortes secos) --- */}
      <Sequence from={CUTS.s1.from} durationInFrames={CUTS.s1.dur}>
        <Clip src="ad2/scene1_hook_hd.mp4" />
      </Sequence>
      <Sequence from={CUTS.s2.from} durationInFrames={CUTS.s2.dur}>
        <Clip src="ad2/scene2_pain_v2_hd.mp4" />
      </Sequence>
      <Sequence from={CUTS.s3.from} durationInFrames={CUTS.s3.dur}>
        <Clip src="ad2/scroll_h_test_hd.mp4" rate={0.8} />
      </Sequence>
      <Sequence from={CUTS.s4.from} durationInFrames={CUTS.s4.dur}>
        <Clip src="ad2/scene4_proof_hd.mp4" />
      </Sequence>
      <Sequence from={CUTS.s5.from} durationInFrames={CUTS.s5.dur}>
        <CTA />
      </Sequence>

      {/* --- SUBTÍTULOS (solo sobre escenas 1-4; la CTA ya lleva su copy) --- */}
      <Sequence from={0} durationInFrames={CUTS.s5.from}>
        <Captions />
      </Sequence>

      {/* --- AUDIO --- */}
      {VO.map((l) => (
        <Sequence key={l.file} from={l.start}>
          <Audio src={staticFile(l.file)} volume={1} />
        </Sequence>
      ))}
      {/* Whoosh centrado en el corte 2→3 */}
      <Sequence from={CUTS.s3.from - 5}>
        <Audio src={staticFile("ad2/whoosh.wav")} volume={0.35} />
      </Sequence>
      {/* Música ~-19dB bajo la voz, con salida suave */}
      <Audio
        src={staticFile("ambient_bg.mp3")}
        volume={(f) =>
          0.11 *
          interpolate(f, [0, 8, durationInFrames - 18, durationInFrames], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
    </AbsoluteFill>
  );
};
