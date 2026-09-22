"use client"

import { ArrowUpRight, MessageCircle, RotateCcw, X } from "lucide-react"
import { useState } from "react"

type Visitor = "brand" | "creator" | null

const paths = {
  brand: {
    title: "Let’s grow your brand.",
    body: "We’ll match you with vetted creators and manage every step of your campaign — from the brief through reporting.",
    action: "Book a Campaign",
  },
  creator: {
    title: "Let’s find your next opportunity.",
    body: "Join a growing network of creators working with real brands, clear briefs, and fair terms.",
    action: "Join as a Creator",
  },
}

export function AndromedaChatWidget() {
  const [open, setOpen] = useState(false)
  const [visitor, setVisitor] = useState<Visitor>(null)
  const close = () => setOpen(false)
  const restart = () => setVisitor(null)
  const content = visitor ? paths[visitor] : null

  return <aside className={`andromeda-assistant${open ? " assistant-open" : ""}`} aria-label="Andromeda Assistant">
    <section className="assistant-panel" aria-hidden={!open} aria-labelledby="andromeda-assistant-title">
      <header className="assistant-header">
        <span className="assistant-orbit" aria-hidden="true"><i /><i /><i /></span>
        <h2 id="andromeda-assistant-title">Andromeda Assistant</h2>
        <button className="assistant-close" type="button" aria-label="Close Andromeda Assistant" onClick={close}><X size={17} /></button>
      </header>
      <div className="assistant-content" aria-live="polite">
        <p className="assistant-message">Hi, I’m the Andromeda Assistant.</p>
        {!content ? <>
          <p className="assistant-question">Are you a Brand or a Creator?</p>
          <div className="assistant-menu">
            <button type="button" onClick={() => setVisitor("brand")}>I’m a Brand</button>
            <button type="button" onClick={() => setVisitor("creator")}>I’m a Creator</button>
          </div>
        </> : <>
          <p className="assistant-message user-message">I’m a {visitor === "brand" ? "Brand" : "Creator"}</p>
          <div className="assistant-answer"><h3>{content.title}</h3><p>{content.body}</p></div>
          <a className="assistant-link" href="#contact" onClick={close}>{content.action} <ArrowUpRight size={15} /></a>
          <button className="assistant-restart" type="button" onClick={restart}><RotateCcw size={13} /> Start over</button>
        </>}
      </div>
    </section>
    <button className="assistant-trigger" type="button" aria-label={open ? "Close Andromeda Assistant" : "Open Andromeda Assistant"} aria-expanded={open} onClick={() => setOpen(current => !current)}><MessageCircle size={23} /></button>
  </aside>
}
