import Hero from "@/components/home/Hero";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import LocationStrip from "@/components/home/LocationStrip";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedMenu />
      <LocationStrip />
    </main>
  );
}
