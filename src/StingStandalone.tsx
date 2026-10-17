import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { Sting } from "./Sting";

export const StingStandalone: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sting />
      <Audio src={staticFile("call_connected.wav")} volume={0.35} />
    </AbsoluteFill>
  );
};
