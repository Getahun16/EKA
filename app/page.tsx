import About from "./components/About";
import Services from "./components/Services";
import News from "./components/News";
import MissionVision from "./components/MisoinVision";
import PartnerSlider from "./components/PartnerSlider";
import Bio from "./components/Bio";
import HeroSlider from "./components/HeroSlider";
import FAQ from "./components/Faqs";

export default function MainPage() {
  return (
    <main className="mt-8">
      <HeroSlider />
      <About />
      <MissionVision />
      <News />
      <Bio />
      <Services />
      <FAQ />
      <PartnerSlider />
    </main>
  );
}
