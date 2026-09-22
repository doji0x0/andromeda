"use client"

import Image from "next/image"
import { FormEvent, useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Menu, X } from "lucide-react"
import { PageInteractions } from "@/components/page-interactions"
import { AndromedaChatWidget } from "@/components/andromeda-chat-widget"

const logo = "/andromeda-logo.png"

const navItems = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["For Brands", "#for-brands"],
  ["For Creators", "#for-creators"],
  ["Services", "#services"],
  ["Contact", "#contact"],
]

const categories = ["Food & Beverage", "Beauty & Personal Care", "Fashion & Retail", "E-commerce", "Real Estate", "Lifestyle"]

const gapComparison = [
  ["Messaging creators one by one, hoping for a reply", "A shortlist of vetted, relevant creators, matched for you"],
  ["No contract — payment and deliverables left to trust", "One clear contract covering everyone involved"],
  ["No way to compare results across creators", "A single performance report comparing every creator"],
  ["Hours spent managing instead of growing the business", "One point of contact, one price, campaign fully managed"],
]

const pillars = [
  ["Creator Sourcing & Matching", "We identify and vet the right KOLs for each brand."],
  ["Campaign Management", "We plan and run the full campaign from briefing through publishing."],
  ["Contracts & Payments", "Every campaign runs on one clear agreement protecting both sides."],
  ["Reporting & Insights", "Every campaign closes with a full performance report and comparative analysis."],
]

const whyAndromeda = [
  "One partner, not ten creators to manage yourself",
  "Real vetting — matched by audience and content quality, not just follower count",
  "Clear, fair contracts for every campaign, protecting brand and creator alike",
  "Data-backed reporting instead of vanity metrics",
  "Built for the Arab world's creator economy, by a team that belongs to it",
]

const brandBenefits = [
  "A shortlist of vetted, relevant KOLs — matched to your brand and budget",
  "A managed campaign, from briefing to publishing — no chasing creators yourself",
  "A full suite of services: creator sourcing, campaign management, livestreaming, hosting, UGC, and social media management",
  "A full performance report at the end of every campaign",
  "One point of contact, one contract, one clear price",
]

const creatorBenefits = [
  "Free onboarding — no cost to join the Andromeda creator network",
  "Paid opportunities matched to your niche and audience",
  "Fair, upfront terms with every brand collaboration",
  "Support with briefs, content direction, and timelines",
  "On-time payment for every completed campaign",
]

const brandProcess = [
  "Tell us about your brand — through the Andromeda Assistant or a short form",
  "We shortlist vetted creators matched to your goals, category, and budget",
  "You approve the match, and we handle the contract with the creator(s)",
  "We manage the full campaign — briefing, content direction, publishing",
  "You receive a full performance report at the end of the campaign",
]

const creatorProcess = [
  "Join the network — free, and takes just a few minutes",
  "Tell us your niche, platform, and audience",
  "We match you with paying brand campaigns that genuinely fit your content",
  "We support you with the brief, content direction, and timeline",
  "You create, we handle the contract, and you're paid on time",
]

const faqs = [
  ["Is there a cost to join as a creator?", "No — onboarding to the Andromeda creator network is completely free."],
  ["How are creators vetted?", "We look beyond follower count — matching by audience quality, content style, engagement, and category fit for each specific brand."],
  ["What if I don't have a large following yet?", "We work with creators of any size. What matters most is a real, engaged audience in a relevant niche."],
  ["How long does a typical campaign take?", "It depends on scope — a single-post campaign can be ready in days, while a fully managed multi-creator campaign is planned over a few weeks. We'll confirm exact timelines during the discovery call."],
  ["Do brands and creators deal with each other directly?", "No — Andromeda manages the relationship end-to-end, including the contract, briefing, and payment, so neither side has to chase the other."],
]

const services = [
  ["01", "Creator (KOL) Sourcing & Management", "Identification, vetting, and management of the right creators for each brand — matched by audience, content style, engagement quality, and category, not follower count alone."],
  ["02", "Campaign Management", "End-to-end planning and execution of influencer campaigns, from briefing and content direction through to publishing, so brands are never required to manage creators directly."],
  ["03", "Livestream Management", "Coordination and oversight of creator-led livestream content, from planning through to execution, as part of a brand's wider campaign."],
  ["04", "Event & Campaign Hosting", "Management of hosting requirements for brand activations and campaign-related events, ensuring creators and brand representatives are aligned and well-prepared."],
  ["05", "UGC (User-Generated Content)", "Production and coordination of authentic, creator-made content for brands to use across their own marketing channels."],
  ["06", "Social Media Management", "Ongoing management of a brand's social media presence, ensuring consistency between creator campaigns and the brand's own channels."],
  ["07", "Contracts & Payments", "A clear agreement between brand, creator, and Andromeda for every engagement, covering deliverables, timelines, and payment, so both sides are protected from the outset."],
  ["08", "Reporting & Insights", "A comprehensive report and comparative analysis at the close of every campaign — covering reach, engagement, and performance — providing brands with a clear, measurable view of results."],
]

const serviceProcess = [
  ["01", "Discovery Call", "understanding the brand's goals, category, and requirements"],
  ["02", "Matching & Proposal", "a shortlist of creators and a recommended scope of work"],
  ["03", "Contract & Briefing", "one agreement, with clear deliverables shared with all creators"],
  ["04", "Campaign Execution", "Andromeda manages the engagement through to completion"],
  ["05", "Reporting & Wrap-up", "a full performance report with recommendations for future campaigns"],
]

function Brand({ priority = false }: { priority?: boolean }) {
  return <span className="brand-mark"><Image src={logo} alt="Andromeda" width={1280} height={1280} priority={priority} sizes="160px" /></span>
}

function SectionKicker({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-kicker"><span>{number}</span><span>{children}</span><span className="kicker-line" aria-hidden="true" /></div>
}

function BenefitList({ items }: { items: string[] }) {
  return <ul className="benefit-list">{items.map((item) => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactRole, setContactRole] = useState("Brand")
  const [submitted, setSubmitted] = useState(false)
  const [processVisible, setProcessVisible] = useState(false)
  const processRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const process = processRef.current
    if (!process) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setProcessVisible(true)
      observer.disconnect()
    }, { threshold: 0.2 })
    observer.observe(process)
    return () => observer.disconnect()
  }, [])

  const selectContactRole = (role: "Brand" | "Creator" | "Other") => {
    setContactRole(role)
    setSubmitted(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="editorial-site">
      <PageInteractions />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Andromeda home"><Brand priority /></a>
        <nav className="nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <a className="header-contact" href="#contact" onClick={() => selectContactRole("Other")}>Talk to Our Team <ArrowUpRight size={15} /></a>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <nav className={`mobile-nav${menuOpen ? " mobile-nav-open" : ""}`} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>

      <section className="hero-editorial" id="home">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-visual" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbit orbit-three" /><span className="orbit-core" /><span className="orbit-node node-one" /><span className="orbit-node node-two" /><span className="orbit-node node-three" /></div>
        <div className="hero-content">
          <p className="eyebrow">A Galaxy of Voices</p>
          <h1>Connecting Brands with Creators <em>Across the Arab World</em></h1>
          <p className="hero-lede">Andromeda is the influencer marketing agency and matchmaking platform built for the Arab world — starting in Sudan and growing across the region. We manage the entire relationship between a brand and a creator, end to end.</p>
          <div className="hero-actions">
            <a className="button button-blue" href="#contact" onClick={() => selectContactRole("Brand")}>Book a Campaign <ArrowUpRight size={16} /></a>
            <a className="button button-outline" href="#contact" onClick={() => selectContactRole("Creator")}>Join as a Creator <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <a className="scroll-cue" href="#introduction">Scroll to explore <ArrowDown size={15} /></a>
      </section>

      <section className="intro-section section-pad" id="introduction">
        <SectionKicker number="01">Introduction</SectionKicker>
        <div className="intro-grid">
          <h2>We connect brands with the <em>right creators.</em></h2>
          <div className="intro-body"><span className="statement-rule" aria-hidden="true" /><p>Andromeda is an influencer marketing agency and matchmaking platform built for the Arab world. We connect brands with the right creators and manage everything in between — sourcing, contracts, campaign execution, and reporting — so brands can focus on growing, and creators can focus on creating.</p><a className="text-link" href="#about">Learn more about us <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="categories-block"><p>We work across categories where creator content genuinely drives results:</p><div className="category-grid">{categories.map((category, index) => <div className="category-item" key={category}><span>{String(index + 1).padStart(2, "0")}</span><strong>{category}</strong></div>)}</div></div>
      </section>

      <section className="about-section section-pad" id="about">
        <SectionKicker number="02">About Us</SectionKicker>
        <article className="about-lead"><h2>Who We Are</h2><div className="long-copy"><p>Andromeda is an influencer marketing agency and matchmaking platform built for the Arab world, starting in Sudan and extending across the region. We exist to close the gap between two groups who need each other but rarely find each other easily: brands looking for real audiences, and creators (KOLs) looking for real opportunities.</p><p>We manage the entire relationship between a brand and a creator — from finding the right match, to running the campaign, to delivering a clear report that shows what happened and why it mattered. One KOL or a full multi-creator campaign, we run it end-to-end so brands can focus on their business, and creators can focus on their craft.</p><p>Our name reflects what we believe influencer marketing should feel like: a galaxy of voices, connected with intention — not scattered, not random, but guided toward the right audience, at the right moment.</p></div></article>

        <article className="about-block gap-block"><div className="subsection-heading"><h3>The Gap We Close</h3></div><p className="wide-copy">Most influencer marketing in the region is built for big companies with big budgets. Small and growing brands — the café opening its second branch, the skincare line just finding its audience, the local fashion label going online — are usually left to figure it out alone: messaging creators one by one, with no strategy, no contract, and no way to measure what actually worked.</p><div className="comparison"><div className="comparison-head"><span>Without Andromeda</span><span>With Andromeda</span></div>{gapComparison.map(([without, withAndromeda]) => <div className="comparison-row" key={without}><p>{without}</p><p>{withAndromeda}</p></div>)}</div></article>

        <article className="about-block"><div className="subsection-heading"><h3>What We Do</h3></div><p className="wide-copy">Andromeda manages influencer marketing from start to finish, for brands of every size — from a single sponsored post to a fully managed, multi-creator campaign, built around four pillars:</p><div className="pillar-grid">{pillars.map(([title, body], index) => <div className="pillar-card" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h4>{title}</h4><p>{body}</p></div>)}</div><a className="text-link pillar-services-link" href="#services">Explore all services <ArrowDown size={15} /></a></article>

        <div className="about-tail">
          <article><h3>Where We Operate</h3><p>Starting in Sudan and expanding to Saudi Arabia, the UAE, and the wider Arab region — Andromeda is built to grow with the creator economy across the Arab world, not just in one market.</p></article>
          <article><h3>Our Team</h3><p>Andromeda is built and run by a team of four — Mahgoub, Khadiga, Abdala, and Aya. We are part of the generation we serve — young, hands-on, and genuinely passionate about the idea behind this company: that the Arab world's brands and creators deserve a fairer, more professional way to work together. We understand creators because we grew up alongside them online, and we understand brands because we are building one ourselves.</p></article>
        </div>

        <article className="why-block"><h3>Why Andromeda</h3><BenefitList items={whyAndromeda} /></article>
      </section>

      <section className="audience-section section-pad" id="audiences">
        <SectionKicker number="03">For Brands & Creators</SectionKicker>
        <div className="audience-heading"><h2>Built for both sides of the <em>creator economy.</em></h2><p>Andromeda connects brands with the right creators and gives creators access to real, professional opportunities.</p></div>
        <p className="audience-helper">Need help choosing? Open the Andromeda Assistant.</p>

        <div className="static-paths">
          <article className="path-panel path-brand" tabIndex={0} id="for-brands"><p className="eyebrow">For Brands</p><h3>Get discovered by the right audience</h3><p className="path-subhead">Grow your brand with creators your customers already trust.</p><h4>What you get</h4><BenefitList items={brandBenefits} /><p className="best-for"><strong>Best for:</strong> cafés & restaurants, beauty & fashion brands, e-commerce, real estate, and lifestyle businesses ready to grow with real audiences.</p><a className="button button-dark" href="#contact" onClick={() => selectContactRole("Brand")}>Book a Campaign <ArrowUpRight size={16} /></a></article>
          <article className="path-panel path-creator" tabIndex={0} id="for-creators"><p className="eyebrow">For Creators</p><h3>Turn your content into real income</h3><p className="path-subhead">Join a growing network of KOLs working with real, paying brands.</p><h4>What you get</h4><BenefitList items={creatorBenefits} /><p className="best-for"><strong>Best for:</strong> creators of any size, on Instagram, TikTok, or Snapchat, who want consistent, professional brand partnerships.</p><a className="button button-blue" href="#contact" onClick={() => selectContactRole("Creator")}>Join as a Creator <ArrowUpRight size={16} /></a></article>
        </div>
      </section>

      <section className="process-section section-pad" id="how-it-works">
        <SectionKicker number="04">How It Works</SectionKicker>
        <div className="dual-process">
          <article><h2>How It Works — <em>For Brands</em></h2><ol>{brandProcess.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol></article>
          <article><h2>How It Works — <em>For Creators</em></h2><ol>{creatorProcess.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol></article>
        </div>
      </section>

      <section className="faq-section section-pad" id="faq">
        <SectionKicker number="05">Frequently Asked Questions</SectionKicker>
        <div className="faq-layout"><h2>Frequently Asked <em>Questions</em></h2><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><ChevronDown size={20} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="services-section section-pad" id="services">
        <SectionKicker number="06">Services</SectionKicker>
        <div className="services-heading"><h2>Our <em>Services</em></h2><p>Andromeda provides a complete suite of influencer marketing services, allowing brands to partner with us for a single requirement or for the full scope of a campaign.</p></div>
        <div className="service-list">{services.map(([number, title, description]) => <article className="service-row" tabIndex={0} key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        <div className={`service-process${processVisible ? " process-visible" : ""}`} ref={processRef}><p className="eyebrow">Our Process</p><ol className="process-timeline">{serviceProcess.map(([number, title, description]) => <li className="process-step" key={number}><span className="process-node">{number}</span><div className="process-copy"><h4>{title}</h4><p>{description}</p></div></li>)}</ol></div>
      </section>

      <section className="closing-banner"><h2>Ready to grow with audiences that already trust the voices talking to them?</h2><div><a className="button button-dark" href="#contact" onClick={() => selectContactRole("Brand")}>Book a Campaign <ArrowUpRight size={16} /></a><a className="button button-light-outline" href="#contact" onClick={() => selectContactRole("Creator")}>Join as a Creator <ArrowUpRight size={16} /></a></div></section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-orbits" aria-hidden="true"><span /><span /><span /></div>
        <SectionKicker number="07">Contact Us</SectionKicker>
        <div className="contact-layout">
          <div className="contact-copy"><h2>Let's build <em>something together.</em></h2><p>Whether you are a brand ready to grow or a creator ready to partner with us, we welcome the opportunity to hear from you. Please feel free to reach out to us at your convenience.</p>{/* Official email and social links are intentionally hidden until confirmed. */}</div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label><span>Full Name</span><input name="fullName" autoComplete="name" required /></label>
            <label><span>Email Address</span><input name="email" type="email" autoComplete="email" required /></label>
            <label><span>I am a</span><select name="audience" value={contactRole} onChange={(event) => setContactRole(event.target.value)}><option>Brand</option><option>Creator</option><option>Other</option></select></label>
            <label><span>Message</span><textarea name="message" rows={5} required /></label>
            <button className="button button-blue" type="submit">Send Message <ArrowUpRight size={16} /></button>
            {submitted && <p className="confirmation" role="status">Thank you for reaching out. A member of the Andromeda team will be in touch with you shortly.</p>}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><a className="brand" href="#home" aria-label="Back to home"><Brand /></a><p>Connecting Brands with Creators Across the Arab World</p></div>
        <nav className="footer-links" aria-label="Footer navigation">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        {/* Social links are intentionally hidden until official profiles are confirmed. */}
        <p className="copyright">© 2026 Andromeda. All rights reserved.</p>
      </footer>
      <AndromedaChatWidget />
    </main>
  )
}
