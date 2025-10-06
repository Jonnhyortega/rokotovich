"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useScrollDirection from "@/hooks/useScrollDirection";
import useIsDesktop from "@/hooks/useIsDesktop";

const SECTIONS = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Sobre Nosotros" },
  { id: "equipo", label: "Profesionales" },
  { id: "areas", label: "Áreas de Práctica" },
  { id: "contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const scroll = useScrollDirection(10, 0);

  const direction = isDesktop ? scroll.direction : null;
  const isScrollingDown = isDesktop ? scroll.isScrollingDown : false;
  const y = isDesktop ? scroll.y : 0;

  const collapsed =
    (direction === "down" && y > 10) || (isScrollingDown && y > 80);

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
    <header className="fixed inset-x-0 top-0 z-50 w-[100%]">
      <nav className={`w-[100%] ${!collapsed ? "bg-[var(--first-blue)]" : ""}`}>
        <div className="py-2 flex items-center justify-between backdrop-blur-md ring-1 ring-black/5 shadow-md shadow-black/10 transition-shadow duration-300">
          {/* Logo */}
          <Link
            href="/"
            className="ml-3 text-lg font-semibold tracking-tight text-slate-900"
          >
            <Image
              src="/logo-sinfondo.png"
              alt="Rokotovich Estudio"
              width={y ? (!collapsed ? 140 : 50) : 50}
              height={32}
              priority
              style={{
                borderRadius: "50%",
                transition: "1s",
                background: collapsed ? "var(--first-blue)" : "transparent",
                boxShadow: collapsed ? "1px 1px 5px 2px black" : ""
              }}
            />
          </Link>

          {/* Navbar Desktop */}
          <div className="hidden md:flex items-center gap-6 pr-6 relative group">
            {/* Línea subrayada animada */}
            <span
              id="nav-underline"
              className="absolute bottom-0 left-0 h-[2px] bg-[var(--gold)] rounded-full transition-all duration-300 ease-out"
              style={{ width: "0px", transform: "translateX(0px)" }}
            ></span>

            {SECTIONS.map((s, index) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-index={index}
                className={`${collapsed ? "black" : "text-blue-50"} relative px-1 py-2 text-[1rem] font-medium hover:text-[var(--foreground)] transition`}
                onMouseEnter={(e) => {
                  const underline = document.getElementById("nav-underline");
                  const linkRect = e.target.getBoundingClientRect();
                  const parentRect =
                    e.target.parentElement.getBoundingClientRect();
                  underline.style.width = `${linkRect.width}px`;
                  underline.style.transform = `translateX(${
                    linkRect.left - parentRect.left
                  }px)`;
                }}
                onMouseLeave={() => {
                  const underline = document.getElementById("nav-underline");
                  underline.style.width = `0px`;
                }}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden mr-3 inline-flex items-center justify-center p-2 ring-slate-300 hover:ring-slate-400 transition"
            aria-label="Abrir menú"
            aria-controls="mobile-menu"
            aria-expanded={open}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-amber-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay fondo al abrir menú */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden={!open}
      />

      {/* Menú móvil */}
      <aside
        id="mobile-menu"
        className={`md:hidden fixed right-0 top-0 z-50 h-full w-80 max-w-[85%]
          transform bg-[var(--first-blue)] shadow-xl ring-1 ring-black/5 transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header móvil */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/100">
          <span className="text-base font-semibold text-white">Menú</span>
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex items-center justify-center rounded-xl p-2 hover:ring-slate-400 transition"
            aria-label="Cerrar menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        {/* Links del menú móvil */}
        <div className="px-4 py-3">
          <nav className="flex flex-col gap-1">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={closeMenu}
                className="group flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium text-white hover:bg-slate-100 transition"
              >
                {s.label}
                <span className="transition-transform group-hover:-translate-x-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Footer del menú móvil */}
        <div className="mt-auto p-4 border-t border-white">
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
