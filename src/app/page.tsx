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

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Research />
      <Awards />
      <Contact />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
