// src/components/Footer.jsx
"use client";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--first-blue)] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo o nombre */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold tracking-wide">Rokotovich Estudio Jurídico</h2>
          <p className="text-sm text-gray-300 mt-1">
            Asesoramiento legal claro y estratégico.
          </p>
        </div>

        {/* Navegación rápida */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href="#about" className="hover:text-gray-300 transition">Sobre Nosotros</Link>
          <Link href="#equipo" className="hover:text-gray-300 transition">Profesionales</Link>
          <Link href="#areas" className="hover:text-gray-300 transition">Áreas</Link>
          <Link href="#contacto" className="hover:text-gray-300 transition">Contacto</Link>
        </nav>

        {/* Redes / contacto */}
        <div className="flex gap-4">
          <Link
            href="mailto:rokotovich.estudio@gmail.com"
            aria-label="Enviar correo"
            className="hover:text-gray-300 transition"
          >
            <SiGmail size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/lucas-rokotovich-888941130/"
            aria-label="LinkedIn"
            target="_blank"
            className="hover:text-gray-300 transition"
          >
            <FaLinkedin size={20} />
          </Link>
        </div>
      </div>

      {/* Línea final */}
      <div className="border-t border-white/10 mt-6 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Rokotovich Estudio Jurídico. Todos los derechos reservados.
      </div>
    </footer>
  );
}
