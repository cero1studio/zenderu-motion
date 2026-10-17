import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, interpolate } from "remotion";
import { Outro } from "./Outro";

export const OutroStandalone: React.FC = () => {
  return (
    <AbsoluteFill>
      <Outro />
      
      {/* 1. Whoosh / entrada de la cortinilla (muy sutil) */}
      <Audio src={staticFile("call_connected.wav")} volume={0.035} />

      {/* 2. Campanas al completar el conteo en ¡5 Minutos Gratis! (suaves, elegantes y desvanecen con la música) */}
      <Sequence from={60}>
        <Audio 
          src={staticFile("tip_received.wav")} 
          volume={(f) => interpolate(f, [0, 75, 105], [0.035, 0.035, 0], { extrapolateRight: "clamp" })} 
        />
      </Sequence>

      {/* 3. Pop táctil al emerger el botón CTA (muy sutil) */}
      <Sequence from={72}>
        <Audio src={staticFile("chat_message.wav")} volume={0.03} />
      </Sequence>

      {/* 4. Colchón rítmico oficial: lleva el ritmo sin sonar estridente y resuelve al unísono con las campanas */}
      <Sequence from={0}>
        <Audio 
          src={staticFile("ambient_bg.mp3")} 
          startFrom={9 * 30} 
          volume={(f) => interpolate(f, [0, 130, 172], [0.085, 0.085, 0], { extrapolateRight: "clamp" })} 
        />
      </Sequence>
    </AbsoluteFill>
  );
};
