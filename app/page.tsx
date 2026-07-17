import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductSection } from "@/components/ProductSection";
import { ImpactSection } from "@/components/ImpactSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { TeamSection } from "@/components/TeamSection";
import { JourneySection } from "@/components/JourneySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <ProblemSection />
        <ProductSection />
        <ImpactSection />
        <WhyUsSection />
        <TeamSection />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
