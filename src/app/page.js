import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Navbar />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-xl">FOOTER</span>
      </footer>
    </div>
  );
}
