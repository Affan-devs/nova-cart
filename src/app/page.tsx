import { HeroSection } from "../components/Hero-banner"
import { MaterialsSection } from "../components/Banner"
import { NewsletterSection } from "../components/newsteller"
import FeaturedSection from "../components/FeaturedSection";
import CategoriesSection from "../components/CategoriesSection";
import ValueBoxes from "../components/ValueBoxes";
import CategorySection from "../components/CategoriesSection";
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

