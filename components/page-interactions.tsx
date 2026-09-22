"use client"
import { useEffect } from 'react'

export function PageInteractions() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return
    const targets = document.querySelectorAll<HTMLElement>('.section-kicker, .intro-grid > *, .categories-block, .about-lead h2, .long-copy p, .about-block > *, .about-tail article, .why-block > *, .audience-heading > *, .path-panel, .dual-process h2, .dual-process li, .faq-layout > *, .services-heading > *, .service-row, .closing-banner > *, .contact-layout > *')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); if (entry.target.matches('.dual-process li')) { const list = entry.target.parentElement; if (list) { const index = Array.from(list.children).indexOf(entry.target); const progress = (index + 1) / list.children.length; list.style.setProperty('--path-progress', String(Math.max(Number(list.style.getPropertyValue('--path-progress')) || 0, progress))) } } observer.unobserve(entry.target) }
    }), { threshold: 0.12, rootMargin: '0px 0px -20px 0px' })
    targets.forEach((target, index) => { target.style.setProperty('--reveal-delay', `${index % 3 * 55}ms`); target.classList.add('scroll-reveal'); observer.observe(target) })
    const hero = document.querySelector<HTMLElement>('.hero-editorial')
    let frame = 0
    const move = (event: PointerEvent) => { if (event.pointerType !== 'mouse' || !hero) return; hero.style.setProperty('--cursor-x', `${(event.clientX / window.innerWidth - .5) * 10}px`); hero.style.setProperty('--cursor-y', `${(event.clientY / window.innerHeight - .5) * 10}px`) }
    const scroll = () => { if (frame) return; frame = requestAnimationFrame(() => { hero?.style.setProperty('--parallax', `${Math.min(window.scrollY * .08, 55)}px`); frame = 0 }) }
    hero?.addEventListener('pointermove', move)
    window.addEventListener('scroll', scroll, { passive: true })
    return () => { observer.disconnect(); targets.forEach(target => target.classList.remove('scroll-reveal')); hero?.removeEventListener('pointermove', move); window.removeEventListener('scroll', scroll); cancelAnimationFrame(frame) }
  }, [])
  return null
}
