"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react"

const logo = "/andromeda-logo.png"

const navItems = [
  ["Who We Are", "#who-we-are"],
  ["What We Do", "#what-we-do"],
  ["For Brands", "#for-brands"],
  ["For Creators", "#for-creators"],
  ["How It Works", "#how-it-works"],
]

const services = [
  ["01", "Influencer Marketing", "Connect with the right creators to amplify your message and grow your presence."],
  ["02", "Content Creation", "Bring your vision to life with content that resonates, engages, and inspires."],
  ["03", "Social Media Strategy", "Build stronger communities through strategies designed for lasting impact."],
  ["04", "Campaign Management", "From idea to execution, we make every campaign seamless and effective."],
]

const process = [
  ["01", "Discover", "We take the time to understand your brand, goals, and audience."],
  ["02", "Connect", "We match you with creators who align with your vision and values."],
  ["03", "Create", "Together, we bring ideas to life through meaningful content."],
  ["04", "Measure", "We track performance and optimize for the best results."],
  ["05", "Grow", "We build lasting partnerships that create long-term impact."],
]

function Brand({ priority = false }: { priority?: boolean }) {
  return (
    <span className="brand-mark">
      <Image src={logo} alt="Andromeda" width={1280} height={1280} priority={priority} sizes="160px" />
    </span>
  )
}

function SectionKicker({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-kicker">
      <span>{number}</span>
      <span>{children}</span>
      <span className="kicker-line" aria-hidden="true" />
    </div>
  )
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="editorial-site">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Andromeda home"><Brand priority /></a>
        <nav className="nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="header-contact" href="#contact">Get in Touch <ArrowUpRight size={15} /></a>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <nav className={`mobile-nav${menuOpen ? " mobile-nav-open" : ""}`} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a href="#contact" onClick={() => setMenuOpen(false)}>Get in Touch <ArrowUpRight size={15} /></a>
      </nav>

      <section className="hero-editorial" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-visual" aria-hidden="true">
          <span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbit orbit-three" />
          <span className="orbit-core" /><span className="orbit-node node-one" /><span className="orbit-node node-two" /><span className="orbit-node node-three" />
        </div>
        <div className="hero-content">
          <p className="eyebrow">ANDROMEDA / CREATOR MARKETING</p>
          <h1>Where Brands<br />Meet <em>Brilliance.</em></h1>
          <div className="hero-footer">
            <p className="hero-lede">We connect forward-thinking brands with visionary creators to build meaningful impact and lasting influence.</p>
            <a className="button button-blue" href="#contact">Start a Conversation <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <a className="scroll-cue" href="#who-we-are">Scroll to explore <ArrowDown size={15} /></a>
      </section>

      <section className="intro-section section-pad" id="who-we-are">
        <SectionKicker number="01">Who We Are</SectionKicker>
        <div className="intro-grid">
          <h2>Bringing the<br /><em>universe</em> of<br />influence together.</h2>
          <div className="intro-body"><span className="statement-rule" aria-hidden="true" /><p>Andromeda is a creator marketing agency built at the intersection of culture, creativity, and connection.</p><p>We believe the right partnership can move people, shape conversations, and create impact that lasts far beyond a single campaign.</p></div>
        </div>
        <div className="connection-map" aria-hidden="true">
          <span className="connection-line line-one" /><span className="connection-line line-two" /><span className="connection-line line-three" />
          <span className="connection-dot dot-one" /><span className="connection-dot dot-two" /><span className="connection-dot dot-three" /><span className="connection-dot dot-four" />
        </div>
      </section>

      <section className="services-section section-pad" id="what-we-do">
        <SectionKicker number="02">What We Do</SectionKicker>
        <div className="services-heading"><h2>Ideas that<br /><em>move</em> people.</h2><p>From strategy to storytelling, we create the connections that make brands matter.</p></div>
        <div className="service-list">
          {services.map(([number, title, serviceText]) => <article className="service-row" key={number}><span>{number}</span><h3>{title}</h3><p>{serviceText}</p><ArrowUpRight className="service-arrow" size={20} /></article>)}
        </div>
      </section>

      <section className="split-section">
        <article className="split-panel split-light" id="for-brands"><div className="panel-orbit" aria-hidden="true" /><p className="eyebrow">FOR BRANDS</p><h2>Make your<br /><em>impact</em> matter.</h2><p>We help brands find their voice, connect with the right audiences, and turn influence into measurable growth.</p><a className="text-link" href="#contact">Work with us <ArrowUpRight size={16} /></a></article>
        <article className="split-panel split-dark" id="for-creators"><div className="panel-orbit" aria-hidden="true" /><p className="eyebrow">FOR CREATORS</p><h2>Turn your<br /><em>influence</em> into impact.</h2><p>Partner with brands that believe in your vision and create work you are proud to share.</p><a className="text-link" href="#contact">Join our network <ArrowUpRight size={16} /></a></article>
      </section>

      <section className="process-section section-pad" id="how-it-works">
        <SectionKicker number="03">How It Works</SectionKicker>
        <div className="process-heading"><h2>From first<br /><em>spark</em> to lasting<br />impact.</h2><p>A simple process built around meaningful collaboration.</p></div>
        <div className="process-list">
          {process.map(([number, title, processText]) => <article className="process-item" key={number}><span>{number}</span><div><h3>{title}</h3><p>{processText}</p></div></article>)}
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-orbits" aria-hidden="true"><span /><span /><span /></div>
        <p className="eyebrow">READY TO MAKE AN IMPACT?</p><h2>Let&apos;s create<br /><em>what&apos;s next.</em></h2><p>Whether you are a brand looking to grow or a creator ready to make your mark, we would love to hear from you.</p><a className="button button-blue" href="mailto:hello@andromeda.agency">Get in Touch <ArrowUpRight size={16} /></a>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top" aria-label="Back to top"><Brand /></a>
        <div className="footer-links"><a href="#who-we-are">Who We Are</a><a href="#what-we-do">What We Do</a><a href="#contact">Contact</a></div>
        <p>© 2026 Andromeda. All rights reserved.</p>
      </footer>
    </main>
  )
}
