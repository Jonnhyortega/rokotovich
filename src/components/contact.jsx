// src/components/Contact.jsx
"use client";
import { useState } from "react";
import Link from "next/link";

const ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_API || "/api/contact"; // Cambiá esto si ya tenés tu endpoint en Django

export default function Contact() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
    company: "", // honeypot
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: si está completo, ignorar
    if (form.company) return;

    // Validación simple
    if (!form.nombre || !form.email || !form.mensaje) {
      setStatus({
        type: "error",
        message: "Completá nombre, email y el mensaje para enviar.",
      });
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      setStatus({ type: "error", message: "Ingresá un email válido." });
      return;
    }

    setStatus({ type: "loading", message: "Enviando…" });

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          asunto: form.asunto,
          mensaje: form.mensaje,
          origen: "Rokotovich Estudio Jurídico - Web",
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus({
        type: "success",
        message:
          "¡Gracias! Recibimos tu consulta y te contactaremos a la brevedad.",
      });
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
        company: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          "No pudimos enviar el formulario. Intentá nuevamente o escribinos por WhatsApp.",
      });
    }
  };

  return (
    <section id="contacto" className="relative bg-slate-50 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-5">
        {/* Lateral: Datos de contacto */}
        <aside className="lg:col-span-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Contacto
          </h2>
          <p className="mt-3 text-slate-600">
            Contanos tu caso. Nuestro equipo responde dentro de las próximas
            24 – 48 horas hábiles.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-1 h-5 w-5 text-[var(--first-blue,#0f3e74)]" />
              <div>
                <div className="font-semibold text-slate-900">
                  Teléfono / WhatsApp
                </div>
                <Link
                  href="https://wa.me/5491155782731"
                  target="_blank"
                  className="text-[var(--first-blue,#0f3e74)] underline decoration-transparent underline-offset-4 transition hover:decoration-[var(--first-blue,#0f3e74)]"
                >
                  +54 9 11 1234-5678
                </Link>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <MailIcon className="mt-1 h-5 w-5 text-[var(--first-blue,#0f3e74)]" />
              <div>
                <div className="font-semibold text-slate-900">Email</div>
                <a
                  href="mailto:estudiorokotovich@gmail.com"
                  className="text-[var(--first-blue,#0f3e74)] underline decoration-transparent underline-offset-4 transition hover:decoration-[var(--first-blue,#0f3e74)]"
                >
                  estudiorokotovich@gmail.com
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-1 h-5 w-5 text-[var(--first-blue,#0f3e74)]" />
              <div>
                <div className="font-semibold text-slate-900">Estudio</div>
                <a href="https://maps.app.goo.gl/NCcwfz84JGzcBDYZ7" target="_blank" className="text-slate-600">
                Av. Leandro N. Alem 424 Piso 6 Departamento 602 •  Ciudad Autónoma de Buenos Aires
                </a>
                <p className="text-slate-500 text-sm">Atención con turno</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <ClockIcon className="mt-1 h-5 w-5 text-[var(--first-blue,#0f3e74)]" />
              <div>
                <div className="font-semibold text-slate-900">Horarios</div>
                <p className="text-slate-600">
                  Lunes a Viernes • 9:00 a 18:00
                </p>
              </div>
            </li>
          </ul>

          {/* Mini “trust” */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Confidencialidad:</strong>{" "}
              tu consulta es privada y protegida por secreto profesional.
            </p>
          </div>
        </aside>

        {/* Formulario */}
        <div className="lg:col-span-3">
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            noValidate
          >
            {/* Honeypot oculto */}
            <label className="sr-only" htmlFor="company">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={onChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Nombre y apellido"
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                placeholder="Ej. Juan Pérez"
                required
              />
              <Field
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="tu@mail.com"
                required
              />
              <Field
                label="Teléfono"
                name="telefono"
                value={form.telefono}
                onChange={onChange}
                placeholder="+54 9 11 ..."
              />
              <Field
                label="Asunto"
                name="asunto"
                value={form.asunto}
                onChange={onChange}
                placeholder="Consulta legal"
              />
            </div>

            <TextArea
              label="Mensaje"
              name="mensaje"
              value={form.mensaje}
              onChange={onChange}
              placeholder="Contanos brevemente tu situación…"
              required
              className="mt-5"
            />

            {/* Estado */}
            {status.type !== "idle" && (
              <p
                className={`mt-4 text-sm ${
                  status.type === "success"
                    ? "text-green-700"
                    : status.type === "error"
                    ? "text-red-700"
                    : "text-slate-600"
                }`}
                role={status.type === "error" ? "alert" : undefined}
              >
                {status.message}
              </p>
            )}

            {/* Acciones */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={status.type === "loading"}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--first-blue,#0f3e74)] px-5 py-3 font-semibold text-white shadow-md ring-1 ring-black/5 transition hover:opacity-90 disabled:opacity-60"
              >
                {status.type === "loading" ? "Enviando…" : "Enviar consulta"}
              </button>

              <Link
                href="https://wa.me/5491112345678?text=Hola%2C%20quiero%20hacer%20una%20consulta"
                target="_blank"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Escribir por WhatsApp
              </Link>
            </div>

            {/* Aviso legal */}
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Al enviar este formulario aceptás nuestros términos y política de
              privacidad. No se genera relación abogado-cliente hasta aceptar la
              representación por escrito.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */
function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  const id = `field-${name}`;
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-[var(--first-blue,#0f3e74)] focus:ring-2 focus:ring-[var(--first-blue,#0f3e74)]/20"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}) {
  const id = `textarea-${name}`;
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="mb-2 text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={6}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--first-blue,#0f3e74)] focus:ring-2 focus:ring-[var(--first-blue,#0f3e74)]/20"
      />
    </div>
  );
}

/* ---------- Íconos (SVG inline, sin dependencias) ---------- */
function PhoneIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.1 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.57 2.5a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.67-1.12a2 2 0 0 1 2.11-.45c.8.27 1.64.45 2.5.57A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function MapPinIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10z" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  );
}
function ClockIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
