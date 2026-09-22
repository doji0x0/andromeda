"use client"

import { ArrowUpRight, Check, MessageCircle, RotateCcw, X } from "lucide-react"
import { FormEvent, useEffect, useRef, useState } from "react"
import { Answers, chatFlows, displayAnswer, prepareEmail, Question, Role } from "@/data/chat-flow"

function AnswerInput({ question, value, onAnswer }: { question: Question; value: string | string[] | undefined; onAnswer: (answer: string | string[]) => void }) {
  const [selected, setSelected] = useState<string[]>(Array.isArray(value) ? value : [])
  const [text, setText] = useState(typeof value === "string" ? value : "")
  const [custom, setCustom] = useState(Boolean(question.options && typeof value === "string" && !question.options.includes(value)))
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (question.multiple ? selected.length : text.trim()) onAnswer(question.multiple ? selected : text.trim())
  }

  return <form className="intake-input" onSubmit={submit}>
    {question.options && <div className="assistant-menu">{question.options.map(option => <button type="button" key={option} aria-pressed={question.multiple ? selected.includes(option) : custom && option === "Other"} onClick={() => {
      if (question.multiple) setSelected(current => current.includes(option) ? current.filter(item => item !== option) : [...current, option])
      else if (option === "Other") { setCustom(true); setText("") }
      else onAnswer(option)
    }} className={selected.includes(option) || (custom && option === "Other") ? "selected" : ""}>{option}</button>)}</div>}
    {(!question.options || custom) && <label><span>{custom ? `Custom ${question.label.toLowerCase()}` : question.label}</span><textarea aria-label={custom ? `Custom ${question.label.toLowerCase()}` : question.label} rows={question.optional ? 3 : 2} maxLength={question.optional ? 3000 : 200} value={text} onChange={event => setText(event.target.value)} required={!question.optional} /></label>}
    {(question.multiple || !question.options || custom) && <button className="assistant-link assistant-link-primary" type="submit" disabled={question.multiple ? !selected.length : !text.trim()}>Continue</button>}
    {question.optional && <button type="button" className="assistant-restart" onClick={() => onAnswer("")}>Skip</button>}
  </form>
}

export function AndromedaChatWidget() {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<Role | null>(null)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const current = useRef<HTMLDivElement>(null)
  const questions = role ? chatFlows[role] : []
  const question = questions[step]
  const complete = Boolean(role && step >= questions.length)
  const email = role ? prepareEmail(role, answers) : null

  useEffect(() => {
    if (open) current.current?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }, [open, step, role])

  const restart = () => { setRole(null); setStep(0); setAnswers({}) }
  const close = () => setOpen(false)
  const chooseRole = (nextRole: Role) => { setRole(nextRole); setStep(0); setAnswers({}) }

  return <aside className={`andromeda-assistant${open ? " assistant-open" : ""}`} aria-label="Andromeda Assistant">
    <section className="assistant-panel" aria-hidden={!open} aria-labelledby="andromeda-assistant-title">
      <header className="assistant-header"><span className="assistant-orbit" aria-hidden="true"><i /></span><h2 id="andromeda-assistant-title">Andromeda Assistant</h2><button className="assistant-close" type="button" aria-label="Close Andromeda Assistant" onClick={close}><X size={17} /></button></header>
      <div className="assistant-content">
        <p className="assistant-message">Hi, I’m the Andromeda Assistant.</p>
        {!role && <><p className="assistant-question">Are you a Brand or a Creator?</p><div className="assistant-menu"><button type="button" onClick={() => chooseRole("brand")}>I’m a Brand</button><button type="button" onClick={() => chooseRole("creator")}>I’m a Creator</button></div></>}
        {role && !complete && <><p className="assistant-message user-message">I’m a {role === "brand" ? "Brand" : "Creator"}</p><div ref={current} className="intake-current" aria-live="polite"><p className="assistant-eyebrow">Step {step + 1} of {questions.length}</p><progress max={questions.length} value={step + 1} aria-label="Intake progress" /><p className="assistant-question">{question.question}</p><AnswerInput key={`${role}-${step}`} question={question} value={answers[question.id]} onAnswer={answer => { setAnswers(currentAnswers => ({ ...currentAnswers, [question.id]: answer })); setStep(currentStep => currentStep + 1) }} /></div></>}
        {role && complete && <div ref={current} className="intake-completion" aria-live="polite"><div className="intake-completion-heading"><span className="intake-completion-check" aria-hidden="true"><Check size={18} /></span><div><h3>{role === "brand" ? "Campaign Brief" : "Creator Details"}</h3><p>Your details are ready to send to our team.</p></div></div><dl className="intake-summary">{questions.map(item => <div key={item.id}><dt>{item.label}</dt><dd>{displayAnswer(answers[item.id])}</dd></div>)}</dl><a className="assistant-link assistant-link-primary" href={email?.href}>{role === "brand" ? "Book a Campaign" : "Send My Details"} <ArrowUpRight size={15} /></a><button className="assistant-restart" type="button" onClick={restart}><RotateCcw size={13} /> Start over</button></div>}
      </div>
    </section>
    <button className="assistant-trigger" type="button" aria-label={open ? "Close Andromeda Assistant" : "Open Andromeda Assistant"} aria-expanded={open} onClick={() => setOpen(currentOpen => !currentOpen)}><MessageCircle size={23} /></button>
  </aside>
}
