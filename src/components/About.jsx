
import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import {
  FaGraduationCap,
  FaBriefcase,
  FaGlobe,
  FaMapMarkerAlt,
  FaRocket,
  FaBolt,
  FaBookOpen,
  FaMagic,
  FaFileDownload
} from 'react-icons/fa'

import ScrollReveal from './ScrollReveal'
import '../styles/About.css'

// ======================================
// STATISTICS
// ======================================

const stats = [
  {
    number: 10,
    suffix: '+',
    label: 'Projects',
    icon: FaRocket
  },
  {
    number: 6,
    suffix: '+',
    label: 'Technologies',
    icon: FaBolt
  },
  {
    number: 3,
    suffix: '+',
    label: 'Years Learning',
    icon: FaBookOpen
  },
  {
    number: 100,
    suffix: '%',
    label: 'Creativity',
    icon: FaMagic
  }
]

// ======================================
// HIGHLIGHT INFORMATION
// ======================================

const highlights = [
  {
    title: 'Education',
    description: 'Computer Engineering in Multimedia and Technologies',
    icon: FaGraduationCap
  },
  {
    title: 'Status',
    description: 'Open to Opportunities',
    icon: FaBriefcase
  },
  {
    title: 'Languages',
    description: 'Arabic, English',
    icon: FaGlobe
  },
  {
    title: 'Work Style',
    description: 'Remote / On-site',
    icon: FaMapMarkerAlt
  }
]

// ======================================
// ANIMATED COUNTER
// ======================================

const Counter = ({ number, suffix, inView }) => {
  const [count, setCount] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return

    if (reduceMotion) {
      setCount(number)
      return
    }

    let frameId
    let startTime = null
    const duration = 1800

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      )

      // Ease-out animation
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.round(number * eased))

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [inView, number, reduceMotion])

  return (
    <span className="stat-number">
      {count}{suffix}
    </span>
  )
}

// ======================================
// ABOUT SECTION
// ======================================

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true
  })

  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="about" ref={ref}>

      <div className="about-container">

        {/* SECTION HEADER */}

        <ScrollReveal>
          <div className="section-header">

            <div className="section-tag-wrap">
              <span className="section-line"></span>
              <span className="section-tag">
                ABOUT ME
              </span>
            </div>

            <h2 className="section-title">
              Crafting digital{' '}
              <span className="gradient-text">
                experiences
              </span>
            </h2>

          </div>
        </ScrollReveal>

        {/* MAIN CONTENT */}

        <div className="about-content">

          {/* LEFT - PHOTO */}

          <ScrollReveal direction="left" delay={0.2}>

            <motion.div
              className="about-left"
              whileHover={
                reduceMotion ? undefined : { y: -6 }
              }
              transition={{ duration: 0.4 }}
            >

              <div className="about-image-wrapper">

                <div className="about-image-bg"></div>

                <div className="about-image-placeholder">

                  <img
                    src="/images/houda-hero.jpg"
                    alt="Houda Housseini"
                    className="about-photo"
                    loading="lazy"
                  />

                </div>

                <motion.div
                  className="about-experience-badge"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { scale: 1.06, y: -4 }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 250,
                    damping: 18
                  }}
                >

                  <span className="exp-number">
                    3+
                  </span>

                  <span className="exp-label">
                    Years of
                    <br />
                    Learning
                  </span>

                </motion.div>

              </div>

            </motion.div>

          </ScrollReveal>

          {/* RIGHT - TEXT */}

          <ScrollReveal direction="right" delay={0.35}>

            <div className="about-right">

              <p className="about-text">
                I'm <strong>Hoda Housseini</strong>,
                a creative engineer inspired by the harmony
                of technology and design. With a passion
                for innovation and attention to detail,
                I transform ideas into meaningful digital
                experiences that are both functional
                and memorable.
              </p>

              <p className="about-text">
                From building responsive React applications
                to creating cinematic 3D animations and
                elegant wedding invitations, I bring a
                unique blend of technical precision and
                creative vision to every project.
              </p>

              {/* HIGHLIGHT CARDS */}

              <div className="about-highlights">

                {highlights.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      className="highlight-item"
                      key={item.title}

                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, y: 25 }
                      }

                      animate={
                        inView
                          ? { opacity: 1, y: 0 }
                          : undefined
                      }

                      transition={{
                        duration: 0.5,
                        delay: reduceMotion
                          ? 0
                          : 0.2 + index * 0.12
                      }}

                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -5 }
                      }
                    >

                      <div className="highlight-icon">
                        <Icon aria-hidden="true" />
                      </div>

                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>

                    </motion.div>
                  )
                })}

              </div>

              {/* DOWNLOAD CV */}

              <motion.a
                href="/Houda cv.pdf"
                download="Houda cv.pdf"
                className="download-cv"

                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -4, scale: 1.02 }
                }

                whileTap={
                  reduceMotion
                    ? undefined
                    : { scale: 0.97 }
                }

                transition={{ duration: 0.25 }}
              >
                <span>Download CV</span>
                <FaFileDownload aria-hidden="true" />
              </motion.a>

            </div>

          </ScrollReveal>

        </div>

        {/* ANIMATED STATISTICS */}

        <div className="about-stats">

          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <ScrollReveal
                key={stat.label}
                direction="up"
                delay={0.12 * index}
              >

                <motion.div
                  className="stat-card"

                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -8, scale: 1.025 }
                  }

                  transition={{
                    type: 'spring',
                    stiffness: 250,
                    damping: 20
                  }}
                >

                  <span className="stat-icon">
                    <Icon aria-hidden="true" />
                  </span>

                  <Counter
                    number={stat.number}
                    suffix={stat.suffix}
                    inView={inView}
                  />

                  <span className="stat-label">
                    {stat.label}
                  </span>

                </motion.div>

              </ScrollReveal>
            )
          })}

        </div>

      </div>

    </section>
  )
}

export default About
