import RevealSection from "./RevealSection";
import HighlightFE from "./HighlightFE";
import HighlightClustering from "./HighlightClustering";
import HighlightFA from "./HighlightFA";
import MobileMessageCard from "./MobileMessageCard";

const MobileScrollSection = () => {
  return (
    <section className="px-4 pt-12 pb-24 bg-skyblue block md:hidden">
      <MobileMessageCard />

      <RevealSection>
        <HighlightFE />
      </RevealSection>

      <RevealSection>
        <HighlightClustering />
      </RevealSection>

      <RevealSection>
        <HighlightFA />
      </RevealSection>
    </section>
  );
};

export default MobileScrollSection;
