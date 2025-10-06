'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import callChatAPI from '@/utils/chatbot'
import 'animate.css'

// 🎵 Sonidos
const botResponseSound = typeof Audio !== 'undefined' ? new Audio('/sounds/bot-response.mp3') : null
const userSendSound = typeof Audio !== 'undefined' ? new Audio('/sounds/send.mp3') : null
const typingSound = typeof Audio !== 'undefined' ? new Audio('/sounds/typing.mp3') : null


// Contexto para asistente
const context_chatbot = `
Sos Rokotovich IA, el asistente virtual oficial de Rokotovich Estudio Jurídico.

Tu función es brindar orientación inicial, información general y acompañamiento al visitante del sitio web.
No reemplazás el asesoramiento legal profesional, pero ayudás al usuario a entender sus opciones y a conectarse con el equipo del estudio.

📘 Sobre el estudio:
Rokotovich Estudio Jurídico se dedica al asesoramiento y gestión integral de casos en diversas áreas del derecho, con un enfoque claro, estratégico y orientado a resultados.  
El estudio se caracteriza por la atención personalizada, la ética profesional y la rapidez de respuesta.

⚖️ Áreas de práctica principales:
- Derecho Laboral (despidos, accidentes de trabajo, reclamos, indemnizaciones)
- Derecho Civil y Comercial (contratos, daños y perjuicios, sucesiones, cobros)
- Derecho de Familia (divorcios, alimentos, régimen de visitas, filiación)
- Derecho Penal (defensas, denuncias, causas penales)
- Derecho Previsional (jubilaciones, pensiones, reajustes)
- Accidentes de tránsito y reclamos ante aseguradoras

🎯 Tu objetivo:
- Responder con lenguaje claro, respetuoso y profesional.
- Ofrecer información general o pasos básicos a seguir según el caso.
- Si el tema requiere revisión personalizada, sugerí al usuario que agende una consulta con un profesional del estudio.
- Nunca des consejos jurídicos definitivos ni valores exactos de indemnizaciones.

💬 Ejemplo de tono:
“Puedo orientarte con la información general, pero para analizar tu caso en detalle te recomiendo agendar una consulta con un abogado del estudio. ¿Querés que te ayude con eso?”

👔 Firma institucional:
Terminá las respuestas formales con algo como:
“— Rokotovich IA | Asistente del Estudio Jurídico Rokotovich”
`

export default function Chatbot() {
  const initialBotMessage = '¡Hola! Soy Rokotovich IA. ¿En qué puedo ayudarte hoy? ⚖️'
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', content: initialBotMessage }])
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  const quickReplies = [
    '¿Qué áreas de práctica abordan?',
    '¿Cómo puedo agendar una consulta?',
    '¿Atienden consultas urgentes?'
  ]

  const toggleChat = () => setChatOpen(o => !o)

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(scrollToBottom, [messages, scrollToBottom])

  useEffect(() => {
    const onEsc = e => e.key === 'Escape' && setChatOpen(false)
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  const send = async text => {
    setMessages(m => [...m, { from: 'user', content: text }])
    setHistory(h => [...h, { role: 'user', content: text }])

    // 🔊 sonido al enviar
    if (userSendSound) {
      userSendSound.currentTime = 0
      userSendSound.play().catch(() => {})
    }

    setLoading(true)

    let reply
    switch (text) {
      case '¿Cómo puedo agendar una consulta?':
        reply = (
          <span>
            Podés agendar tu consulta desde la sección de contacto o directamente por WhatsApp:&nbsp;
            <a
              href="https://wa.link/kwvfsq"
              className="text-blue-700 font-medium hover:underline"
            >
              Contactar por WhatsApp
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/color/48/whatsapp--v1.png"
                alt="whatsapp"
              />
            </a>
          </span>
        )
        break

      case '¿Qué áreas de práctica abordan?':
        reply = (
          <ul className="list-disc list-inside text-gray-700">
            <li>Derecho Civil</li>
            <li>Derecho Comercial</li>
            <li>Derecho Penal</li>
            <li>Derecho Laboral</li>
            <li>Derecho de Familia</li>
          </ul>
        )
        break

      default:
        try {
          // 🔊 typing sound ON
          if (typingSound) {
            typingSound.loop = true
            typingSound.currentTime = 0
            typingSound.volume = 0.3
            typingSound.play().catch(() => {})
          }

          reply = await callChatAPI(text, history, context_chatbot)
        } catch {
          reply = 'Lo siento, hubo un error al procesar tu consulta. Intenta nuevamente.'
        }
    }

    // parar sonido typing
    if (typingSound) typingSound.pause()

    setMessages(m => [...m, { from: 'bot', content: reply }])
    setHistory(h => [
      ...h,
      { role: 'assistant', content: typeof reply === 'string' ? reply : '' },
    ])

    // 🔊 sonido al recibir respuesta
    if (typeof reply === 'string' && botResponseSound) {
      botResponseSound.currentTime = 0
      botResponseSound.volume = 0.7
      botResponseSound.play().catch(() => {})
    }

    setLoading(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const v = input.trim()
    if (!v) return
    send(v)
    setInput('')
  }

  return (
    <>
      {/* botón flotante */}
      {!chatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-[10000] flex items-center space-x-2 cursor-pointer bg-[var(--first-blue)] p-5 rounded-full text-white shadow-lg hover:bg-blue-900 focus:outline-none"
          aria-label="Abrir chat"
        >
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios-filled/50/lawyer.png"
            alt="chatbot"
            className="invert brightness-0 sepia saturate-100 hue-rotate-[40deg]" 
          />
          {/* <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios-filled/50/scales.png"
            alt="justice"
          /> */}
        </button>
      )}

      {chatOpen && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[5000]"
            onClick={toggleChat}
          ></div>

          {/* chat */}
          <div className="fixed bottom-1 right-1 z-[5001] w-[350px] h-[500px] 
                          bg-white/95 backdrop-blur-md border border-gray-200 
                          rounded-xl shadow-2xl flex flex-col animate__animated animate__slideInUp"
               onClick={e => e.stopPropagation()}
          >
            <header className="flex items-center justify-between px-4 py-2 bg-[var(--first-blue)] text-white rounded-t-xl">
              <h3 className="text-lg font-semibold">Rokotovich IA</h3>
              <button onClick={toggleChat} className="text-xl leading-none cursor-pointer">×</button>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      m.from === 'user'
                        ? 'bg-[var(--first-blue)] text-white'
                        : 'bg-gray-100 text-gray-800'
                    } animate__animated animate__fadeIn`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:200ms]"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:400ms]"></span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* respuestas rápidas */}
            <div className="px-4 py-2 border-t border-gray-200 space-x-2 flex flex-wrap gap-1">
              {quickReplies.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q)}
                  className="inline-block cursor-pointer bg-blue-100 text-blue-800 px-3 py-1 rounded-sm text-sm hover:bg-blue-200"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* input */}
            <form onSubmit={handleSubmit} className="flex items-center px-4 py-2 border-t border-gray-200">
              <input
                type="text"
                className="flex-1 bg-gray-100 text-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={e => setInput(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="ml-2 p-2 bg-[var(--first-blue)] rounded-full text-white hover:bg-blue-900 focus:outline-none"
              >
                <ArrowUpIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </>
      )}
    </>
  )
}
