
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import {
  FaCoffee,
  FaLaptopCode,
  FaPalette,
  FaMoon,
  FaBug,
  FaBookOpen
} from 'react-icons/fa'

import ScrollReveal from './ScrollReveal'
import '../styles/FunFacts.css'

// ==========================================
// FUN FACTS DATA
// ==========================================

// Replace these numbers with your actual estimates.
const facts = [
  {
    icon: FaCoffee,
    number: 500,
    suffix: '+',
    label: 'Cups of Coffee',
    color: '#f97316'
  },
  {
    icon: FaLaptopCode,
    number: 1000,
    suffix: '+',
    label: 'Hours Coding',
    color: '#6366f1'
  },
  {
    icon: FaPalette,
    number: 50,
    suffix: '+',
    label: 'Frontend Designs',
    color: '#ec4899'
  },
  {
    icon: FaMoon,
    number: 200,
    suffix: '+',
    label: 'Late Nights',
    color: '#8b5cf6'
  },
  {
    icon: FaBug,
    number: 999,
    suffix: '+',
    label: 'Bugs Fixed',
    color: '#10b981'
  },
  {
    icon: FaBookOpen,
    number: 30,
    suffix: '+',
    label: 'Courses Completed',
    color: '#f59e0b'
  }
]

// ==========================================
// ANIMATED COUNTER
// ==========================================

const FactCounter = ({ number, suffix, inView }) => {
  const [count, setCount] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return

    if (reduceMotion) {
      return
    }

    let startTime = null
    let animationFrame

    const duration = 1800

    const animate = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      )

      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(eased * number))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(number)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [inView, number, reduceMotion])

  return (
    <span className="fact-number">
      {reduceMotion && inView
        ? number.toLocaleString()
        : count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ==========================================
// FUN FACT CARD
// ==========================================

const FactCard = ({ fact, index, inView }) => {
  const reduceMotion = useReducedMotion()
  const Icon = fact.icon

  return (
    <ScrollReveal
      delay={Math.min(index * 0.1, 0.5)}
      direction="up"
    >
      <motion.div
        className="fact-card"
        style={{
          '--card-color': fact.color
        }}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -8,
                scale: 1.025
              }
        }
        transition={{
          duration: 0.3,
          ease: 'easeOut'
        }}
      >
        {/* ICON GLOW */}

        <div
          className="fact-icon-glow"
          aria-hidden="true"
        />

        {/* PROFESSIONAL ICON */}

        <motion.div
          className="fact-icon"
          whileHover={
            reduceMotion
              ? undefined
              : {
                  rotate: 8,
                  scale: 1.12
                }
          }
          transition={{
            type: 'spring',
            stiffness: 250,
            damping: 18
          }}
        >
          <Icon
            className="fact-icon-svg"
            aria-hidden="true"
          />
        </motion.div>

        {/* ANIMATED NUMBER */}

        <FactCounter
          number={fact.number}
          suffix={fact.suffix}
          inView={inView}
        />

        {/* LABEL */}

        <span className="fact-label">
          {fact.label}
        </span>

        {/* BOTTOM ACCENT LINE */}

        <div
          className="fact-card-line"
          aria-hidden="true"
        />

      </motion.div>
    </ScrollReveal>
  )
}

// ==========================================
// MAIN FUN FACTS SECTION
// ==========================================

const FunFacts = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section
      id="funfacts"
      className="funfacts-section"
      ref={ref}
    >

      {/* ORIGINAL DECORATIVE ORBS */}

      <div
        className="funfacts-orb funfacts-orb--left"
        aria-hidden="true"
      />

      <div
        className="funfacts-orb funfacts-orb--right"
        aria-hidden="true"
      />

      <div className="funfacts-container">

        {/* SECTION HEADER */}

        <ScrollReveal>
          <div className="section-header">

            <div className="section-tag-wrap">
              <span className="section-line" />
              <span className="section-tag">
                FUN FACTS
              </span>
            </div>

            <h2 className="section-title">
              Behind the{' '}
              <span className="gradient-text">
                scenes
              </span>
            </h2>

     <p className="funfacts-description">
  A little glimpse into my coding journey.
</p>

          </div>
        </ScrollReveal>

        {/* FACTS GRID */}

        <div className="funfacts-grid">
          {facts.map((fact, index) => (
            <FactCard
              key={fact.label}
              fact={fact}
              index={index}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default FunFacts
