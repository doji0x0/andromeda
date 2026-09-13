"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {
  assistantFaqs,
  assistantHomeOptions,
  assistantProcesses,
  assistantServices,
  brandAnswers,
  creatorAnswers,
  type AssistantView,
} from "@/data/chatbot-content"

const logo = "/andromeda-logo.png"

function BackButton({ onClick }: { onClick: () => void }) {
  return <button className="assistant-back" type="button" onClick={onClick}>← Back</button>
}

function ScrollLink({ href, children, onNavigate, primary = false }: { href: string; children: React.ReactNode; onNavigate: () => void; primary?: boolean }) {
  return <a className={`assistant-link${primary ? " assistant-link-primary" : ""}`} href={href} onClick={onNavigate}>{children}<span aria-hidden="true">↗</span></a>
}

export function AndromedaChatWidget() {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<AssistantView>("home")
  const [answer, setAnswer] = useState<string | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const changeView = (nextView: AssistantView) => {
    setAnswer(null)
    setView(nextView)
  }

  const closePanel = () => {
    setOpen(false)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => contentRef.current?.focus(), 80)
    return () => window.clearTimeout(timer)
  }, [open, view])

  const faqIndex = view.startsWith("faq-") ? Number(view.replace("faq-", "")) : -1
  const activeAnswers = view === "brand" ? brandAnswers : creatorAnswers

  return (
    <aside className={`andromeda-assistant${open ? " assistant-open" : ""}`} aria-label="Andromeda Assistant">
      <section className="assistant-panel" id="andromeda-assistant-panel" role="dialog" aria-modal="false" aria-labelledby="andromeda-assistant-title" aria-hidden={!open}>
        <header className="assistant-header">
          <span className="assistant-logo"><Image src={logo} alt="Andromeda" width={1280} height={1280} sizes="110px" /></span>
          <h2 id="andromeda-assistant-title">Andromeda Assistant</h2>
          <button className="assistant-close" type="button" aria-label="Close Andromeda Assistant" onClick={closePanel}><span /><span /></button>
        </header>

        <div className="assistant-content" key={view} ref={contentRef} tabIndex={-1} data-view={view} aria-live="polite">
          {view === "home" && <>
            <p className="assistant-message">Hi! How can I help?</p>
            <div className="assistant-menu assistant-menu-grid">{assistantHomeOptions.map((option) => <button key={option.label} type="button" onClick={() => changeView(option.view)}>{option.label}</button>)}</div>
          </>}

          {(view === "brand" || view === "creator") && <>
            <p className="assistant-eyebrow">{view === "brand" ? "I'm a Brand" : "I'm a Creator"}</p>
            <div className="assistant-menu">{activeAnswers.map((item) => <button className={answer === item.answer ? "selected" : ""} key={item.label} type="button" onClick={() => setAnswer(item.answer)}>{item.label}</button>)}</div>
            {answer && <p className="assistant-answer">{answer}</p>}
            <ScrollLink href="#contact" onNavigate={closePanel} primary>{view === "brand" ? "Book a Campaign" : "Join as a Creator"}</ScrollLink>
            <BackButton onClick={() => changeView("home")} />
          </>}

          {view === "services" && <>
            <p className="assistant-eyebrow">Services</p>
            <ul className="assistant-list compact">{assistantServices.map((service) => <li key={service}>{service}</li>)}</ul>
            <ScrollLink href="#services" onNavigate={closePanel} primary>View Services</ScrollLink>
            <BackButton onClick={() => changeView("home")} />
          </>}

          {view === "process" && <>
            <p className="assistant-eyebrow">How It Works</p>
            <div className="assistant-menu"><button type="button" onClick={() => changeView("process-brand")}>For Brands</button><button type="button" onClick={() => changeView("process-creator")}>For Creators</button></div>
            <BackButton onClick={() => changeView("home")} />
          </>}

          {(view === "process-brand" || view === "process-creator") && <>
            <p className="assistant-eyebrow">How It Works — {view === "process-brand" ? "For Brands" : "For Creators"}</p>
            <ol className="assistant-list numbered">{assistantProcesses[view === "process-brand" ? "brand" : "creator"].map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol>
            <ScrollLink href="#how-it-works" onNavigate={closePanel}>View How It Works</ScrollLink>
            <BackButton onClick={() => changeView("process")} />
          </>}

          {view === "faq" && <>
            <p className="assistant-eyebrow">FAQ</p>
            <div className="assistant-menu faq-menu">{assistantFaqs.map((item, index) => <button key={item.question} type="button" onClick={() => changeView(`faq-${index}`)}>{item.question}</button>)}</div>
            <ScrollLink href="#faq" onNavigate={closePanel}>View FAQ</ScrollLink>
            <BackButton onClick={() => changeView("home")} />
          </>}

          {faqIndex >= 0 && assistantFaqs[faqIndex] && <>
            <p className="assistant-eyebrow">FAQ</p>
            <h3 className="assistant-question">{assistantFaqs[faqIndex].question}</h3>
            <p className="assistant-answer visible">{assistantFaqs[faqIndex].answer}</p>
            <BackButton onClick={() => changeView("faq")} />
          </>}

          {view === "contact" && <>
            <p className="assistant-eyebrow">Contact Us</p>
            <h3 className="assistant-contact-title">Let's build something together.</h3>
            <div className="assistant-contact-links"><ScrollLink href="#contact" onNavigate={closePanel} primary>Book a Campaign</ScrollLink><ScrollLink href="#contact" onNavigate={closePanel}>Join as a Creator</ScrollLink><ScrollLink href="#contact" onNavigate={closePanel}>Go to Contact</ScrollLink></div>
            <BackButton onClick={() => changeView("home")} />
          </>}
        </div>
      </section>

      <button ref={triggerRef} className="assistant-trigger" type="button" aria-label={open ? "Close Andromeda Assistant" : "Open Andromeda Assistant"} aria-expanded={open} aria-controls="andromeda-assistant-panel" onClick={() => setOpen((isOpen) => !isOpen)}>
        <span className="assistant-trigger-bubble" aria-hidden="true"><i /><i /><i /></span>
        <span className="assistant-trigger-x" aria-hidden="true"><i /><i /></span>
      </button>
    </aside>
  )
}
