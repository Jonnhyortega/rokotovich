"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SECTIONS = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Sobre Nosotros" },
  { id: "equipo", label: "Profesionales" },
  { id: "areas", label: "Áreas de Práctica" },
  { id: "contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-[100%] ">
      {/* Barra superior */}
      <nav className="w-[100%] bg-[var(--first-blue)]">
        <div className="flex h-16 items-center justify-between rounded-b-2xlbackdrop-blur-md shadow-sm ring-1 ring-black/5">
          {/* Logo / Marca */}
          <Link
            href="/"
            className="ml-3 text-lg font-semibold tracking-tight text-slate-900"
          >
            {/* Rokotovich Estudio */}
            <Image
                src="/LOGO-LETRAS2.jpeg"
                alt="Rokotovich Estudio"
                width={140}
                height={32}
                priority
            />    
          </Link>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center gap-2 pr-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className=" px-3 py-2 text-[1rem] font-medium text-blue-50 hover:text-blue-500 hover:border-b-1 transition"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Botón hamburguesa (mobile) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden mr-3 inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-slate-300 hover:ring-slate-400 transition"
            aria-label="Abrir menú"
            aria-controls="mobile-menu"
            aria-expanded={open}
          >
            {/* Ícono hamburguesa */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
              viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay oscuro */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden={!open}
      />

      {/* Panel deslizante de derecha a izquierda */}
      <aside
        id="mobile-menu"
        className={`md:hidden fixed right-0 top-0 z-50 h-full w-80 max-w-[85%] 
        transform bg-white shadow-xl ring-1 ring-black/5 transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <span className="text-base font-semibold">Menú</span>
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-slate-300 hover:ring-slate-400 transition"
            aria-label="Cerrar menú"
          >
            {/* Ícono cerrar */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
              viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6l-12 12"/>
            </svg>
          </button>
        </div>

        <div className="px-4 py-3">
          {/* Búsqueda opcional / CTA (puedes quitarlo si no lo querés) */}
          {/* <input className="w-full rounded-xl border px-3 py-2 text-sm mb-3" placeholder="Buscar…"/> */}

          <nav className="flex flex-col gap-1">
            {SECTIONS.map((s, idx) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={closeMenu}
                className="group flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium text-slate-800 hover:bg-slate-100 transition"
              >
                {s.label}
                {/* Flecha animada hacia la izquierda para acompañar el “despliegue” */}
                <span className="transition-transform group-hover:-translate-x-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t">
          <a
            href="#contacto"
            onClick={closeMenu}
            className="block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Solicitar Consulta
          </a>
          <p className="mt-2 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Rokotovich Estudio
          </p>
        </div>
      </aside>
    </header>
  );
}
