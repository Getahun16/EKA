import About from "./components/About";
import Services from "./components/Services";
import BlogList from "./components/BlogList";
import MissionVision from "./components/MisoinVision";
import PartnerSlider from "./components/PartnerSlider";
import Bio from "./components/Bio";
import HeroSlider from "./components/HeroSlider";

export default function MainPage() {
  return (
    <main className="mt-8">
      <HeroSlider />
      <About />
      <MissionVision />
      <BlogList />
      <Bio />
      <Services />
      <PartnerSlider />
    </main>
  );
}
