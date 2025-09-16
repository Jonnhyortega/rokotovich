// src/components/Hero.jsx
import Image from "next/image";
import Link from "next/link";

export default function Hero({
  title = "Rokotovich Estudio Jurídico",
  subtitle = "Asesoramiento legal claro, estratégico y orientado a resultados.",
  ctaPrimary = { href: "#contacto", label: "Agendar consulta" },
  ctaSecondary = { href: "#areas", label: "Áreas de práctica" },
  bgImage = "/hero-bg.jpg",
}) {
  return (
    <section
      id="hero"
      aria-label="Portada del sitio — Estudio Jurídico"
      className="
        relative isolate flex items-center
        min-h-[82vh] sm:min-h-[78vh] lg:min-h-[86vh]
        pt-24 pb-24 sm:pt-28 lg:pt-32
        overflow-hidden scroll-mt-24
      "
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgImage}
          alt="Fondo institucional del estudio jurídico"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Velo + viñeta sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/45 to-slate-950/85" />
        <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light
                        [mask-image:radial-gradient(60%_50%_at_50%_25%,black,transparent)]" />
      </div>

      {/* Contenido */}
      <div className="mx-auto w-full max-w-7xl px-6 mt-[40px]">
        <div className="max-w-3xl">
          {/* Chip superior */}
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur">
            <ScaleIcon className="h-4 w-4" />
            Defensa y asesoría integral
          </span>

          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#7D0000] drop-shadow">
            {title}
          </h1>

          <p className="mt-5 text-lg sm:text-xl leading-8 text-white/90">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={ctaPrimary.href}
              className="
                inline-flex items-center justify-center rounded-xl
                bg-[var(--first-blue,#0f3e74)] px-6 py-3
                text-base font-semibold text-white
                shadow-lg shadow-black/25 ring-1 ring-black/5
                transition will-change-transform hover:translate-y-[1px] hover:opacity-95 focus:outline-none
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
              "
            >
              {ctaPrimary.label}
            </Link>

            <Link
              href={ctaSecondary.href}
              className="
                inline-flex items-center justify-center rounded-xl
                bg-white/10 px-6 py-3 text-base font-semibold text-white/90
                ring-1 ring-white/25 backdrop-blur
                transition hover:bg-white/15 hover:text-white
              "
            >
              {ctaSecondary.label}
            </Link>
          </div>

          {/* Badges de confianza */}
          <dl className="mt-10 grid max-w-xl grid-cols-1 gap-6 text-white/85 sm:grid-cols-3">
            <Badge title="+200 casos" desc="de experiencia" />
            <Badge title="Respuesta rapida" desc="casos nuevos" />
            <Badge title="Atención federal" desc="AR 🇦🇷" />
          </dl>
        </div>
      </div>
    </section>
  );
}

/* --- Subcomponentes --- */

function Badge({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-1 text-center backdrop-blur shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="text-lg font-semibold text-white">{title}</div>
      <div className="text-sm text-white/75">{desc}</div>
    </div>
  );
}

function ScaleIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v3" />
      <path d="M3 6h18" />
      <path d="M6 6l4 7a3 3 0 1 1-6 0l4-7" />
      <path d="M18 6l4 7a3 3 0 1 1-6 0l4-7" />
      <path d="M12 6v14" />
      <path d="M8 20h8" />
    </svg>
  );
}
