"use client"

import Image from 'next/image'
import { Check } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Answers, chatFlows, displayAnswer, prepareEmail, Question, Role } from '@/data/chat-flow'

function AnswerInput({ question, value, onAnswer }: { question: Question; value?: string | string[]; onAnswer: (value: string | string[]) => void }) {
  const [text, setText] = useState(typeof value === 'string' ? value : '')
  const [selected, setSelected] = useState<string[]>(Array.isArray(value) ? value : [])
  const [custom, setCustom] = useState(Boolean(question.options && typeof value === 'string' && !question.options.includes(value)))
  function submit(event: FormEvent) { event.preventDefault(); if (question.multiple ? selected.length : text.trim()) onAnswer(question.multiple ? selected : text.trim()) }
  return <form className="intake-input" onSubmit={submit}>
    {question.options && <div className="assistant-menu">{question.options.map(option => <button type="button" key={option} aria-pressed={question.multiple ? selected.includes(option) : custom && option === 'Other'} onClick={() => {
      if (question.multiple) setSelected(current => current.includes(option) ? current.filter(s => s !== option) : [...current, option])
      else if (option === 'Other') { setCustom(true); setText('') }
      else onAnswer(option)
    }} className={selected.includes(option) || (custom && option === 'Other') ? 'selected' : ''}>{option}</button>)}</div>}
    {(!question.options || custom) && <label><span>{custom ? `Custom ${question.label.toLowerCase()}` : question.label}</span><textarea aria-label={custom ? `Custom ${question.label.toLowerCase()}` : question.label} rows={question.optional ? 3 : 2} maxLength={question.optional ? 3000 : 200} value={text} onChange={e => setText(e.target.value)} required={!question.optional} /></label>}
    {(question.multiple || !question.options || custom) && <button className="assistant-link assistant-link-primary" type="submit" disabled={question.multiple ? !selected.length : !text.trim()}>Continue</button>}
    {question.optional && <button type="button" className="assistant-back" onClick={() => onAnswer('')}>Skip</button>}
  </form>
}

function IntakeSummary({ role, answers, onEdit, onEditAnswers }: {
  role: Role
  answers: Answers
  onEdit: (index: number) => void
  onEditAnswers: () => void
}) {
  const email = prepareEmail(role, answers)
  const cta = role === 'brand' ? 'Book a Campaign' : 'Join as a Creator'

  return <section className="intake-completion" aria-labelledby="intake-summary-title">
    <div className="intake-completion-heading">
      <span className="intake-completion-check" aria-hidden="true"><Check size={18} /></span>
      <div>
        <h3 className="assistant-question" id="intake-summary-title">{role === 'brand' ? 'Campaign Brief' : 'Creator Details'}</h3>
        <p>{role === 'brand' ? 'Your campaign brief is ready.' : 'Your creator details are ready.'}</p>
      </div>
    </div>
    <dl className="intake-summary">
      {chatFlows[role].map((question, index) => <div key={question.id}>
        <dt>{question.id === 'goal' ? 'Campaign Goal' : question.label}</dt>
        <dd>
          {Array.isArray(answers[question.id])
            ? <ul className="intake-summary-services">{(answers[question.id] as string[]).map(service => <li key={service}>{service}</li>)}</ul>
            : <span>{displayAnswer(answers[question.id])}</span>}
          <button type="button" aria-label={`Edit ${question.label}`} onClick={() => onEdit(index)}>Edit</button>
        </dd>
      </div>)}
    </dl>
    <div className="intake-completion-actions">
      {email.href
        ? <a className="assistant-link assistant-link-primary" href={email.href}>{cta}</a>
        // An unconfirmed recipient must never produce a broken mailto or visitor-facing debug message.
        : <><button className="assistant-link assistant-link-primary" type="button" disabled>{cta}</button><p className="intake-contact-soon">Contact email coming soon</p></>}
      <button type="button" className="assistant-back" onClick={onEditAnswers}>Edit Answers</button>
    </div>
    <details className="intake-email-preview">
      <summary>Preview email</summary>
      <div><p>{email.subject}</p><pre>{email.body}</pre></div>
    </details>
  </section>
}

export function AndromedaChatWidget() {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<Role | null>(null)
  const [answers, setAnswers] = useState<Answers>({})
  const [step, setStep] = useState(0)
  const [editing, setEditing] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const current = useRef<HTMLDivElement>(null)
  const questions = role ? chatFlows[role] : []
  const question = questions[step]
  const complete = role && step === questions.length
  const close = () => { setOpen(false); trigger.current?.focus() }
  const chooseRole = (next: Role) => { setRole(next); setAnswers({}); setStep(0); setEditing(false) }
  const restart = () => { setRole(null); setAnswers({}); setStep(0); setEditing(false) }
  useEffect(() => {
    if (!open) return
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() } }
    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [open])
  useEffect(() => {
    if (open) { current.current?.focus({ preventScroll: true }); current.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' }) }
  }, [open, step, role, editing])
  return <aside className={`andromeda-assistant${open ? ' assistant-open' : ''}`} aria-label="Andromeda Assistant">
    <section className="assistant-panel" id="andromeda-assistant-panel" role="dialog" aria-modal="false" aria-labelledby="andromeda-assistant-title" inert={!open}>
      <header className="assistant-header"><span className="assistant-logo"><Image src="/andromeda-logo.png" alt="Andromeda" width={1280} height={1280} sizes="110px" /></span><h2 id="andromeda-assistant-title">Andromeda Assistant</h2><button className="assistant-close" type="button" aria-label="Close Andromeda Assistant" onClick={close}><span /><span /></button></header>
      <div className="assistant-content">
        <p className="assistant-message">Hi! I’m the Andromeda Assistant.</p>
        <p className="assistant-message">Are you a Brand or a Creator?</p>
        {role && <p className="assistant-message user-message">{role === 'brand' ? 'I’m a Brand' : 'I’m a Creator'}</p>}
        {questions.slice(0, step).map((q, index) => <div key={q.id}><p className="assistant-message">{q.question}</p><button className="assistant-message user-message" type="button" aria-label={`Edit ${q.label}`} onClick={() => { setStep(index); setEditing(true) }}>{displayAnswer(answers[q.id])}<small>Edit</small></button></div>)}
        <div ref={current} tabIndex={-1} className="intake-current" aria-live="polite">
          {!role && <div className="assistant-menu"><button onClick={() => chooseRole('brand')}>I’m a Brand</button><button onClick={() => chooseRole('creator')}>I’m a Creator</button></div>}
          {role && question && <><p className="assistant-eyebrow">Step {step + 1} of {questions.length}</p><progress max={questions.length} value={step + 1} aria-label="Intake progress" /><p className="assistant-message">{question.question}</p><AnswerInput key={`${role}-${step}`} question={question} value={answers[question.id]} onAnswer={value => {
            const updated = { ...answers, [question.id]: value }; setAnswers(updated)
            if (editing && questions.every(q => updated[q.id] !== undefined)) { setStep(questions.length); setEditing(false) } else setStep(step + 1)
          }} /></>}
          {complete && role && <IntakeSummary role={role} answers={answers}
            onEdit={index => { setStep(index); setEditing(true) }}
            onEditAnswers={() => { setStep(0); setEditing(true) }}
          />}
        </div>
      </div>
      {role && <footer className="intake-controls"><button type="button" onClick={() => { if (step > 0) { setStep(step - 1); setEditing(false) } else setRole(null) }}>← Back</button><button type="button" onClick={restart}>Restart</button></footer>}
    </section>
    <button ref={trigger} className="assistant-trigger" type="button" aria-label={open ? 'Close Andromeda Assistant' : 'Open Andromeda Assistant'} aria-expanded={open} aria-controls="andromeda-assistant-panel" onClick={() => open ? close() : setOpen(true)}><span className="assistant-trigger-bubble" aria-hidden="true"><i /><i /><i /></span><span className="assistant-trigger-x" aria-hidden="true"><i /><i /></span></button>
  </aside>
}
