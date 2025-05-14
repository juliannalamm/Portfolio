import RevealSection from "../components/RevealSection";
import HighlightFE from "../components/HighlightFE";
import HighlightClustering from "../components/HighlightClustering";
import HighlightFA from "../components/HighlightFA";
import MobileMessageCard from "../components/MobileMessageCard";

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
