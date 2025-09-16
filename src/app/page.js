import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Contact />
      </main>
      <footer>
        <span className="text-xl">FOOTER</span>
      </footer>
    </>
  );
}
