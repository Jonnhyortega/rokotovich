"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const defaultMembers = [
  { id: "1", name: "Dr. Lucas Rokotovich", role: "Abogado", img: "https://res.cloudinary.com/do87isqjr/image/upload/v1758841125/rokotovich_gc0nlv.jpg", lkd: "https://www.linkedin.com/in/lucas-rokotovich-888941130/", email: "estudiorokotovich@gmail.com" },
  { id: "2", name: "Dr. Martín D. Haissiner", role: "Abogado", img: "https://res.cloudinary.com/do87isqjr/image/upload/v1758844341/pexels-brunocortes1969-33344504_sprkp9.jpg", lkd: "https://www.linkedin.com/in/lucas-rokotovich-888941130/", email: "estudiorokotovich@gmail.com" },
  { id: "3", name: "Sebastián Guidi", role: "Abogado", img: "https://res.cloudinary.com/do87isqjr/image/upload/v1758844381/pexels-khezez-34007256_klmunt.jpg", lkd: "https://www.linkedin.com/in/lucas-rokotovich-888941130/", email: "estudiorokotovich@gmail.com" },
  { id: "4", name: "Laura Rey", role: "Administrativa", img: "https://res.cloudinary.com/do87isqjr/image/upload/v1758844403/pexels-olly-3758159_kxru1d.jpg", lkd: "https://www.linkedin.com/in/lucas-rokotovich-888941130/", email: "estudiorokotovich@gmail.com" },
  { id: "5", name: "Agustina Pérez", role: "Abogada", img: "https://res.cloudinary.com/do87isqjr/image/upload/v1758844430/pexels-wendy-petit-2444087-33931448_zk6j1i.jpg", email: "estudiorokotovich@gmail.com" },
  { id: "6", name: "Juan R. López", role: "Abogado", img: "https://res.cloudinary.com/do87isqjr/image/upload/v1758844447/pexels-khezez-34007212_esnfr6.jpg", email: "estudiorokotovich@gmail.com" },
];

export default function TeamCarousel({ members = defaultMembers, className = "" }) {
  const [items, setItems] = useState(members);
  const [translate, setTranslate] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const deltaXRef = useRef(0);
  const widthRef = useRef(1);

  const viewportRef = useRef(null);

  useEffect(() => setItems(members), [members]);

  useEffect(() => {
    const setW = () => { if (viewportRef.current) widthRef.current = viewportRef.current.offsetWidth; };
    setW();
    window.addEventListener("resize", setW);
    return () => window.removeEventListener("resize", setW);
  }, []);

  const onTransitionEnd = () => { setAnimating(false); setTranslate(0); };

  const next = () => {
    if (animating) return;
    setAnimating(true);
    setTranslate(-100);
    const first = items[0];
    setTimeout(() => setItems(prev => [...prev.slice(1), first]), 250);
  };

  const prev = () => {
    if (animating) return;
    const last = items[items.length - 1];
    setItems(prev => [last, ...prev.slice(0, -1)]);
    setTranslate(-100);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setAnimating(true); setTranslate(0);
    }));
  };

  const onPointerDown = (e) => {
    if (animating) return;
    setIsDragging(true);
    startXRef.current = (e.clientX ?? e.touches?.[0]?.clientX ?? 0);
    deltaXRef.current = 0;
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const clientX = (e.clientX ?? e.touches?.[0]?.clientX ?? 0);
    deltaXRef.current = clientX - startXRef.current;
    const percent = (deltaXRef.current / widthRef.current) * 100;
    setAnimating(false);
    setTranslate(percent);
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const percent = (deltaXRef.current / widthRef.current) * 100;
    if (percent <= -15) next();
    else if (percent >= 15) prev();
    else { setAnimating(true); setTranslate(0); }
  };

  return (
    <section className={`relative ${className}`}>
      
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 text-center w-full">Nuestro Equipo</h2>
      <div className="mx-auto max-w-6xl px-4 mt-6 mb-6">
        <div
          ref={viewportRef}
          className={`relative overflow-hidden rounded-2xl bg-white/60 ring-1 ring-black/5 backdrop-blur-sm select-none touch-pan-y ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={endDrag}
          onDragStart={(e) => e.preventDefault()}
        >
          <div
            onTransitionEnd={onTransitionEnd}
            style={{ transform: `translateX(${translate}%)`, transition: animating ? "transform 320ms ease" : "none" }}
            className="flex gap-2.5"
          >
            {items.map((m, idx) => (
              <article key={m.id} className="group w-full md:w-1/4 flex-shrink-0 bg-white border-[var(--first-blue)] last:border-none rounded-[10px_0_0_10px]">
                <div className="relative">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={m.img}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03] pointer-events-none select-none"
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:pointer-events-auto">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 shadow-md ring-1 ring-black/5">
                      {m.lkd && (
                        <a
                          href={m.lkd}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--first-blue,_#0a66c2)] hover:bg-slate-100"
                          aria-label={`LinkedIn de ${m.name}`}
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {m.email && (
                        <a
                          href={`mailto:${m.email}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-red-600 hover:bg-slate-100"
                          aria-label={`Email a ${m.name}`}
                        >
                          <SiGmail />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 bg-[var(--first-blue)]">
                  <h3 className="text-center text-[16px] font-semibold text-[var(--grey)] tracking-tight">{m.name}</h3>
                  {m.role && <p className="mt-1 text-center text-[13px] text-slate-500 italic">{m.role}</p>}
                </div>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent opacity-80 md:opacity-60" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent opacity-80 md:opacity-60" />
        </div>

        <div className="mt-4 flex md:hidden items-center justify-center gap-3">
          <button onClick={prev} aria-label="Anterior" className="h-10 w-10 rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] ring-1 ring-black/5 grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={next} aria-label="Siguiente" className="h-10 w-10 rounded-full bg-slate-900 text-white shadow-[0_10px_25px_rgba(0,0,0,0.2)] grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Anterior"
        className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] ring-1 ring-black/5 hover:scale-105 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={next}
        aria-label="Siguiente"
        className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] ring-1 ring-black/5 hover:scale-105 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>

    </section>
  );
}
