import About from "@/components/about";
import Areas from "@/components/areas";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import TeamCarousel from "@/components/teamcarousel";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Contact />
        <TeamCarousel/>
        <About />
        <Areas />
      </main>
      <Footer />
    </>
  );
}
