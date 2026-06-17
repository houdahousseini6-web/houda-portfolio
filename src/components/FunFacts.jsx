import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from './ScrollReveal'
import '../styles/FunFacts.css'

const facts = [
  { icon: '☕', number: 500, suffix: '+', label: 'Cups of Coffee', color: '#f97316' },
  { icon: '💻', number: 1000, suffix: '+', label: 'Hours Coding', color: '#6366f1' },
  { icon: '🎨', number: 50, suffix: '+', label: 'Frontend Designs', color: '#ec4899' },
  { icon: '🌙', number: 200, suffix: '+', label: 'Late Nights', color: '#8b5cf6' },
  { icon: '🐛', number: 999, suffix: '+', label: 'Bugs Fixed', color: '#10b981' },
  { icon: '📚', number: 30, suffix: '+', label: 'Courses Completed', color: '#f59e0b' },
]

const FactCounter = ({ number, suffix, inView }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime = null
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 2000, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * number))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(number)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [inView, number])

  return (
    <span className="fact-number">
      {count}{suffix}
    </span>
  )
}

const FunFacts = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="funfacts-section" ref={ref}>

      {/* Background decorative orbs */}
      <div className="funfacts-orb funfacts-orb--left" />
      <div className="funfacts-orb funfacts-orb--right" />

      <div className="funfacts-container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag-wrap">
              <span className="section-line" />
              <span className="section-tag">FUN FACTS</span>
         
            </div>
            <h2 className="section-title">
              Behind the <span className="gradient-text">scenes</span>
            </h2>
            <p className="section-subtitle">
              The honest truth of my coding journey ✨
            </p>
          </div>
        </ScrollReveal>

        <div className="funfacts-grid">
          {facts.map((fact, index) => (
            <ScrollReveal key={index} delay={0.1 * index} direction="up">
              <div
                className="fact-card"
                style={{ '--card-color': fact.color }}
              >
                {/* Glow behind icon */}
                <div className="fact-icon-glow" />

                <span className="fact-icon">{fact.icon}</span>

                <FactCounter
                  number={fact.number}
                  suffix={fact.suffix}
                  inView={inView}
                />

                <span className="fact-label">{fact.label}</span>

                {/* Bottom accent line */}
                <div className="fact-card-line" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FunFacts