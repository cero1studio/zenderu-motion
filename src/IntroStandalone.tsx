import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { Intro } from "./Intro";

export const IntroStandalone: React.FC = () => {
  return (
    <AbsoluteFill>
      <Intro />
      <Audio src={staticFile("intro_music.wav")} volume={0.6} />
      <Audio src={staticFile("tip_received.wav")} volume={0.25} />
    </AbsoluteFill>
  );
};
