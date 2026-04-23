import { HeroSection } from "../components/home/Hero-banner"
import { MaterialsSection } from "../components/home/Banner"
import { NewsletterSection } from "../components/home/newsteller"
import FeaturedSection from "../components/home/FeaturedSection";
import ValueBoxes from "../components/home/ValueBoxes";
import CategorySection from "../components/home/CategoriesSection";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedSection />
      <MaterialsSection />
      <CategorySection />
      <ValueBoxes />
      <NewsletterSection />
    </main >
  );
}

