import RevealSection from "./RevealSection";
import HighlightFE from "./HighlightFE";
import HighlightClustering from "./HighlightClustering";
import HighlightFA from "./HighlightFA";
import MobileMessageCard from "./MobileMessageCard";

const MobileScrollSection = () => {
  return (
    <section className="px-4 pt-12 pb-24 bg-skyblue block md:hidden">
      <section id="mobile-scroll" className="px-4 pt-12 pb-24 bg-skyblue block md:hidden">
        <MobileMessageCard />
      </section>


    </section>
  );
};

export default MobileScrollSection;
