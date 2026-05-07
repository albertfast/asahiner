import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Research } from "@/components/portfolio/Research";
import { Awards } from "@/components/portfolio/Awards";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { CursorTrail } from "@/components/portfolio/CursorTrail";
import { SectionDivider } from "@/components/portfolio/SectionDivider";
import { RevealSection } from "@/components/portfolio/RevealSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <ScrollProgress />
      <CursorTrail />
      <Navbar />
      <Hero />
      <SectionDivider variant="cyan-purple" />
      <RevealSection><About /></RevealSection>
      <SectionDivider variant="purple-pink" />
      <RevealSection delay={0.1}><Education /></RevealSection>
      <SectionDivider variant="emerald-cyan" />
      <RevealSection><Skills /></RevealSection>
      <SectionDivider variant="cyan-purple" />
      <RevealSection delay={0.1}><Experience /></RevealSection>
      <SectionDivider variant="amber-pink" />
      <RevealSection><Projects /></RevealSection>
      <SectionDivider variant="purple-pink" />
      <RevealSection delay={0.1}><Research /></RevealSection>
      <SectionDivider variant="emerald-cyan" />
      <RevealSection><Awards /></RevealSection>
      <SectionDivider variant="cyan-purple" />
      <RevealSection delay={0.1}><Contact /></RevealSection>
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
