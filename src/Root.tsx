import { Composition } from "remotion";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { LowerThird } from "./LowerThird";
import { Sting } from "./Sting";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ZenderuIntro"
        component={Intro}
        durationInFrames={90} // 3s @ 30fps — antes 180 (6s), mataba la retención en Reels/TikTok
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuSting"
        component={Sting}
        durationInFrames={30} // 1s — solo el logo, para abrir videos de Guías (no la promo completa)
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuOutro"
        component={Outro}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuLowerThird"
        component={LowerThird}
        durationInFrames={150} // 5 seconds is perfect for a lower third
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          name: "Anselmo Cuántico",
          title: "Decodificación de símbolos"
        }}
      />
    </>
  );
};
