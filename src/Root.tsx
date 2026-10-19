import { IntroStandalone } from "./IntroStandalone";
import { OutroStandalone } from "./OutroStandalone";
import { StingStandalone } from "./StingStandalone";
import { AnselmoEmotionalQuoteAd } from "./AnselmoEmotionalQuoteAd";
import { AnselmoQuantumAd } from "./AnselmoQuantumAd";
import { YoutubeThumbnail } from "./YoutubeThumbnail";
import { AnselmoAd } from "./AnselmoAd";
import { AnselmoAdZoomed } from "./AnselmoAdZoomed";
import { StellaAd } from "./StellaAd";
import { AIVsHumanAd } from "./AIVsHumanAd";
import { Expert3Ad } from "./Expert3Ad";
import { LaylaAd } from "./LaylaAd";
import { Composition } from "remotion";
import { Intro } from "./Intro";
import { Outro } from "./Outro";
import { LowerThird } from "./LowerThird";
import { Sting } from "./Sting";
import { PromoSuper } from "./PromoSuper";
import { FullAd } from "./FullAd";
import { DynamicAd } from "./DynamicAd";
import { UGCAd } from "./UGCAd";
import { ConceptAd } from "./ConceptAd";
import { PrivateConsultAd, PRIVATE_AD_DURATION } from "./PrivateConsultAd";

import { ExpertAd } from "./ExpertAd";
import { ExpertAdMoons } from "./ExpertAdMoons";
import { UGCWhatsappAd } from "./UGCWhatsappAd";
import { UGCSearchContactAd } from "./UGCSearchContactAd";
import { ChatAd } from "./ChatAd";
import { ExpertBumper } from "./ExpertBumper";
import { KineticTextQuoteAd } from "./KineticTextQuoteAd";

export const RemotionRoot: React.FC = () => {

  return (
    <>
      {/* 🚀 COMPOSICIONES MODULARES REUTILIZABLES */}
      <Composition
        id="ChatAdReusable"
        component={ChatAd}
        durationInFrames={500}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          guideName: "Guía Anselmo",
          guideFocus: "Decodificación de Patrones",
          avatarFile: "carmen_miniatura_1.jpg",
          zensBalance: 45.0,
          includeOutro: true,
        }}
      />
      <Composition
        id="ExpertBumperReusable"
        component={ExpertBumper}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          guideName: "Guía Anselmo",
          guideSpecialty: "Decodificación de Patrones",
          badgeText: "Guía Zenderu Oficial",
          avatarFile: "carmen_miniatura_1.jpg",
          top: 220,
        }}
      />
      <Composition
        id="KineticTextQuoteAdReusable"
        component={KineticTextQuoteAd}
        durationInFrames={420}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          categoryPill: "✦ REENCUADRE CONSCIENTE",
          authorName: "Guía Anselmo",
          authorSpecialty: "Decodificación de Patrones & Vida",
          avatarFile: "carmen_miniatura_1.jpg",
          includeOutro: true,
        }}
      />


                        <Composition
        id="ZenderuIntroOfficial"
        component={IntroStandalone}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuOutroOfficial"
        component={OutroStandalone}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuStingOfficial"
        component={StingStandalone}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition id="ZenderuAnselmoEmotionalAd" component={AnselmoEmotionalQuoteAd} durationInFrames={270} fps={30} width={1080} height={1920} />
      <Composition id="ZenderuAnselmoQuantumAd" component={AnselmoQuantumAd} durationInFrames={240} fps={30} width={1080} height={1920} />
      <Composition id="ZenderuAnselmoAdZoomed" component={AnselmoAdZoomed} durationInFrames={70 * 30} fps={30} width={1080} height={1920} />
      <Composition id="ZenderuAIVsHumanAd" component={AIVsHumanAd} durationInFrames={495} fps={30} width={1080} height={1920} />
      
                        
      <Composition id="ThumbStella" component={YoutubeThumbnail} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ expertName: "Stella Moons", phraseWhite: "Rompe tus", phraseGreen: "ciclos tóxicos", imageSrc: "Stella_Thumbnail.jpg" }} />
      <Composition id="ThumbAnselmo" component={YoutubeThumbnail} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ expertName: "Anselmo", phraseWhite: "Suelta el peso", phraseGreen: "del pasado", imageSrc: "Anselmo_Thumbnail.jpg" }} />
      <Composition id="ThumbVioleta" component={YoutubeThumbnail} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ expertName: "Violeta", phraseWhite: "Destraba tu", phraseGreen: "camino", imageSrc: "Violeta_Thumbnail.jpg" }} />
      <Composition id="ThumbLayla" component={YoutubeThumbnail} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ expertName: "Layla", phraseWhite: "Encuentra claridad", phraseGreen: "en tu camino", imageSrc: "Layla_Thumbnail.jpg" }} />
      <Composition id="ZenderuStellaAd" component={StellaAd} durationInFrames={53 * 30} fps={30} width={1080} height={1920} />
      <Composition id="ZenderuVioletaAd" component={Expert3Ad} durationInFrames={46 * 30} fps={30} width={1080} height={1920} />
      <Composition id="ZenderuAnselmoAd" component={AnselmoAd} durationInFrames={70 * 30} fps={30} width={1080} height={1920} />
      <Composition id="ZenderuLaylaAd" component={LaylaAd} durationInFrames={1620} fps={30} width={1080} height={1920} />
      <Composition
        id="ZenderuUGCSearchContactAd"
        component={UGCSearchContactAd}
        durationInFrames={660} // 480frames + 180 (outro)
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuUGCWhatsappAd"
        component={UGCWhatsappAd}
        durationInFrames={570} // 13s video + 6s outro
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuExpertAdMoons"
        component={ExpertAdMoons}
        durationInFrames={919} // ~24.6s video + 6s outro
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuExpertAd"
        component={ExpertAd}
        durationInFrames={Math.floor((3 + 48.3 + 6) * 30)} // 3s intro + 48.3s video + 6s outro
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuPrivateConsultAd"
        component={PrivateConsultAd}
        durationInFrames={PRIVATE_AD_DURATION}
        fps={24}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuConceptAd"
        component={ConceptAd}
        durationInFrames={720} // 24 segundos exactos (lo que dura el video base a 30fps)
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuUGCAd"
        component={UGCAd}
        durationInFrames={720} // 24 segundos exactos (lo que dura el video base a 30fps)
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuDynamicAd"
        component={DynamicAd}
        durationInFrames={800} // ~26.6 seconds
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuFullAd"
        component={FullAd}
        durationInFrames={450} // 15 seconds
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZenderuPromoSuper"
        component={PromoSuper}
        durationInFrames={150} // 5s: entra, cuenta 1→5, brilla, pulsa y sale
        fps={30}
        width={1080}
        height={1920}
      />
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
