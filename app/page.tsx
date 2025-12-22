import AccessoryCategories from "./components/AccessoryCategories";
import HeroCarousel from "./components/HeroCarousel";
import PromoBanner from "./components/promoBanner";
import RepairingCategories from "./components/RepairingCategories";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <RepairingCategories />
      < PromoBanner />
      < AccessoryCategories />
    </>
  );
}
