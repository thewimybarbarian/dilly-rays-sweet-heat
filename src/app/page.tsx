import Hero from "@/components/home/Hero";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import LocationStrip from "@/components/home/LocationStrip";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <FeaturedMenu />
      <LocationStrip />
    </main>
  );
}
