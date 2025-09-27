// src/components/About.jsx
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-white py-20 px-6 lg:px-16"
      aria-labelledby="about-title"
    >

        
        {/* Texto */}
        <div className="p-5">
          <h2
            id="about-title"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
          >
            Sobre Nosotros
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            En <span className="font-semibold">Rokotovich Estudio Jurídico</span>{" "}
            brindamos asesoramiento legal integral, claro y estratégico. Nuestro
            compromiso es acompañar a cada cliente en la defensa de sus derechos
            y en la búsqueda de soluciones efectivas.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Contamos con un equipo de profesionales especializados en diversas
            ramas del derecho, lo que nos permite ofrecer un enfoque completo y
            personalizado para cada situación.
          </p>
          <a
            href="#contacto"
            className="inline-block px-6 py-3 rounded-xl bg-[var(--first-blue)] text-white font-medium shadow hover:bg-[var(--secondary-blue)] transition"
          >
            Contactanos
          </a>
        </div>


      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[var(--grey)]">
        {/* Imagen institucional */}
        <div className="relative w-full h-80 lg:h-[450px] bg-[var(--first-blue)]">
          <Image
            src="/logo-sinfondo.png" // reemplazar con foto real del estudio
            alt="Imagen institucional del Estudio Rokotovich"
            fill
            className="object-cover rounded-2xl shadow-md"
          />
        </div>

      </div>
    </section>
  );
}
