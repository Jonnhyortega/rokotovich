// src/components/Areas.jsx
"use client";
import { useState } from "react";

// Puedes ajustar esta paleta desde tu globals.css con variables CSS.
// Acá uso clases Tailwind y var(--first-blue) si ya la tenés definida.
const AREAS_DATA = [
  {
    id: "penal",
    titulo: "Derecho penal",
    abierto: true, // abierto por defecto como en la referencia
    items: [
      "Querellas y defensas",
      "Delitos económicos y contra la administración pública",
      "Delitos tributarios",
      "Extradiciones",
      "Recursos de casación",
      "Recursos ante los Superiores Tribunales provinciales",
      "Recurso Extraordinario Federal ante la Corte Suprema de Justicia de la Nación",
    ],
  },
  {
    id: "constitucional",
    titulo: "Derecho constitucional",
    items: [
      "Acciones de amparo y medidas cautelares",
      "Acciones declarativas de inconstitucionalidad",
      "Derechos y garantías fundamentales",
      "Litigios estratégicos y libertad de expresión",
    ],
  },
  {
    id: "administrativo",
    titulo: "Derecho administrativo",
    items: [
      "Procedimientos y recursos administrativos",
      "Contratación pública y licitaciones",
      "Responsabilidad del Estado",
      "Servicios públicos y regulación",
    ],
  },
  {
    id: "consultoria",
    titulo: "Consultoría",
    items: [
      "Auditoría legal (due diligence)",
      "Opiniones legales (legal opinions)",
      "Diseño de políticas y manuales internos",
      "Capacitación in-company",
    ],
  },
  {
    id: "compliance",
    titulo: "Compliance",
    items: [
      "Programas de integridad (Ley 27.401)",
      "Gestión de riesgos y mapas de calor",
      "Investigaciones internas y canales de denuncia",
      "Capacitación y cultura de cumplimiento",
    ],
  },
];

function Chevron({ open }) {
  return (
    <svg
      className={`h-5 w-5 transition-transform duration-200 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Areas({ titulo = "Derecho Público", data = AREAS_DATA }) {
  const [openIds, setOpenIds] = useState(() =>
    data.filter((d) => d.abierto).map((d) => d.id)
  );

  const toggle = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section id="areas" className="relative mx-auto max-w-5xl px-4 py-12">
      {/* Título de bloque */}
      <h2 className="mb-8 text-center text-3xl font-serif tracking-tight text-slate-900">
        {titulo}
      </h2>

      <div className="space-y-4">
        {data.map((area) => {
          const isOpen = openIds.includes(area.id);
          const panelId = `panel-${area.id}`;
          const btnId = `button-${area.id}`;
          return (
            <div
              key={area.id}
              className="overflow-hidden rounded-xl border border-slate-200 shadow-sm"
            >
              {/* Header */}
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(area.id)}
                className="flex w-full items-center justify-between bg-[color:var(--first-blue,#1f273a)] px-4 py-4 text-left text-white"
              >
                <span className="text-lg font-semibold">{area.titulo}</span>
                <span className="text-white/80">
                  <Chevron open={isOpen} />
                </span>
              </button>

              {/* Panel */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden bg-white">
                  <div className="px-6 py-5">
                    <ul className="list-disc space-y-3 pl-6 text-[15px] leading-relaxed text-slate-700">
                      {area.items.map((item, i) => (
                        <li key={i} className="marker:text-slate-400">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
