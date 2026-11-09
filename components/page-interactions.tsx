"use client"
import { useEffect } from 'react'

export function PageInteractions() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches || !('IntersectionObserver' in window)) return
    const targets = document.querySelectorAll<HTMLElement>('.section-kicker, .intro-grid > *, .categories-block, .about-lead h2, .long-copy p, .about-block > *, .why-intro, .why-card, .audience-heading > *, .audience-connection, .audience-detail, .path-panel, .dual-process h2, .dual-process li, .faq-layout > *, .services-heading > *, .service-card, .closing-banner > *, .contact-layout > *')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); if (entry.target.matches('.dual-process li')) { const list = entry.target.parentElement; if (list) { const index = Array.from(list.children).indexOf(entry.target); const progress = (index + 1) / list.children.length; list.style.setProperty('--path-progress', String(Math.max(Number(list.style.getPropertyValue('--path-progress')) || 0, progress))) } } observer.unobserve(entry.target) }
    }), { threshold: 0, rootMargin: '0px 0px -20px 0px' })
    const targetSet = new Set(targets)
    targets.forEach(target => {
      const siblings = Array.from(target.parentElement?.children || []).filter(sibling => targetSet.has(sibling as HTMLElement))
      target.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(target), 3) * 65}ms`)
      // Leave content already in view visible during hydration and anchor navigation.
      const bounds = target.getBoundingClientRect()
      if (bounds.top < window.innerHeight && bounds.bottom > 0) target.classList.add('revealed')
      target.classList.add('scroll-reveal')
      observer.observe(target)
    })
    const reveal = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      event.target.closest('.scroll-reveal')?.classList.add('revealed')
    }
    const updateMotion = () => {
      if (reduced.matches) targets.forEach(target => target.classList.add('revealed'))
    }
    document.addEventListener('focusin', reveal)
    reduced.addEventListener('change', updateMotion)
    const hero = document.querySelector<HTMLElement>('.hero-editorial')
    let frame = 0
    const move = (event: PointerEvent) => { if (reduced.matches || event.pointerType !== 'mouse' || !hero) return; hero.style.setProperty('--cursor-x', `${(event.clientX / window.innerWidth - .5) * 10}px`); hero.style.setProperty('--cursor-y', `${(event.clientY / window.innerHeight - .5) * 10}px`) }
    const scroll = () => { if (reduced.matches || frame) return; frame = requestAnimationFrame(() => { hero?.style.setProperty('--parallax', `${Math.min(window.scrollY * .08, 55)}px`); frame = 0 }) }
    hero?.addEventListener('pointermove', move)
    window.addEventListener('scroll', scroll, { passive: true })
    return () => { observer.disconnect(); targets.forEach(target => { target.classList.remove('scroll-reveal', 'revealed'); target.style.removeProperty('--reveal-delay') }); document.removeEventListener('focusin', reveal); reduced.removeEventListener('change', updateMotion); hero?.removeEventListener('pointermove', move); window.removeEventListener('scroll', scroll); cancelAnimationFrame(frame) }
  }, [])
  return null
}
