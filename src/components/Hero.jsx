
import { useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion
} from 'framer-motion'

import {
  FaGithub,
  FaLinkedin,
  FaDribbble,
  FaReact,
  FaCube,
  FaPalette,
  FaCode,
  FaArrowRight
} from 'react-icons/fa'

import '../styles/Hero.css'

// ======================================
// ROLES - TYPEWRITER ANIMATION
// ======================================

const roles = [
  'Computer Engineer',
  'Frontend Developer',
  'Creative Technologist',
  'UI/UX Designer',
  'Digital Creator',
  'Problem Solver'
]

// Stable particles that do not jump when React re-renders
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 17) % 100}%`,
  animationDelay: `${(i * 0.73) % 5}s`,
  animationDuration: `${3 + ((i * 7) % 5)}s`
}))

const Hero = () => {

  // ======================================
  // STATE
  // ======================================

  const [currentRole, setCurrentRole] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  // Accessibility: reduce animations when requested
  const reduceMotion = useReducedMotion()

  // ======================================
  // SCROLL ANIMATIONS
  // ======================================

  const { scrollY } = useScroll()

  // Photo moves upward as the user scrolls
  const rawPhotoY = useTransform(
    scrollY,
    [0, 600],
    [0, -90]
  )

  // Photo becomes slightly smaller
  const rawPhotoScale = useTransform(
    scrollY,
    [0, 600],
    [1, 0.94]
  )

  // Smooth scroll transformations
  const smoothPhotoY = useSpring(rawPhotoY, {
    stiffness: 90,
    damping: 25,
    mass: 0.5
  })

  const smoothPhotoScale = useSpring(rawPhotoScale, {
    stiffness: 90,
    damping: 25
  })

  // Background particles move at a different speed
  const rawParticlesY = useTransform(
    scrollY,
    [0, 600],
    [0, 50]
  )

  const smoothParticlesY = useSpring(rawParticlesY, {
    stiffness: 70,
    damping: 25
  })

  // Text gently fades as the Hero leaves the screen
  const heroOpacity = useTransform(
    scrollY,
    [0, 350, 750],
    [1, 1, 0.65]
  )

  // ======================================
  // TYPEWRITER EFFECT
  // ======================================

  useEffect(() => {
    let timeout

    const role = roles[currentRole]

    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => {
          setDisplayed(role.slice(0, displayed.length + 1))
        }, 80)
      } else {
        timeout = setTimeout(() => {
          setTyping(false)
        }, 2000)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 40)
      } else {
        setCurrentRole(prev => (prev + 1) % roles.length)
        setTyping(true)
      }
    }

    return () => clearTimeout(timeout)

  }, [displayed, typing, currentRole])

  // ======================================
  // SMOOTH NAVIGATION
  // ======================================

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? 'instant' : 'smooth'
    })
  }

  // ======================================
  // SHARED ENTRANCE ANIMATION
  // ======================================

  const fadeUp = (delay = 0) => ({
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : 35
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: reduceMotion ? 0 : 0.8,
      delay: reduceMotion ? 0 : delay,
      ease: 'easeOut'
    }
  })

  // ======================================
  // COMPONENT
  // ======================================

  return (
    <section id="home" className="hero">

      {/* BACKGROUND PARTICLES */}

      <motion.div
        className="hero-particles"
        style={{
          y: reduceMotion ? 0 : smoothParticlesY
        }}
        aria-hidden="true"
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration
            }}
          />
        ))}
      </motion.div>

      <div className="hero-container">

        {/* ======================================
            LEFT SIDE - CONTENT
        ====================================== */}

        <div className="hero-content">

          {/* AVAILABLE BADGE */}

          <motion.div
            className="hero-badge"
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 30,
              scale: reduceMotion ? 1 : 0.9
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.2
            }}
          >
            <span className="badge-dot"></span>
            <span>Available for freelance work</span>
          </motion.div>

          {/* NAME */}

          <motion.h1
            className="hero-name"
            {...fadeUp(0.4)}
          >
            <span className="hero-hi">
              Hi, I'm
            </span>

            <span className="hero-name-main">

              <span className="gradient-text">
                Hoda
              </span>

              <br />

              <span className="outline-text">
                Housseini
              </span>

            </span>
          </motion.h1>

          {/* ANIMATED ROLE */}

          <motion.div
            className="hero-role"
            {...fadeUp(0.6)}
            aria-label={roles[currentRole]}
          >
            <span className="role-text">
              {displayed}
            </span>

            <span className="cursor" aria-hidden="true">
              |
            </span>
          </motion.div>

          {/* DESCRIPTION */}

          <motion.p
            className="hero-description"
            {...fadeUp(0.8)}
          >
            Rooted in engineering and inspired by design,
            I create digital experiences that blend
            innovation, elegance, and meaningful interaction.
          </motion.p>

          {/* BUTTONS */}

          <motion.div
            className="hero-cta"
            {...fadeUp(1)}
          >

            <button
              className="cta-primary"
              onClick={() => scrollTo('projects')}
            >
              <span className="cta-bg"></span>

              <span className="cta-text">
                Explore My Work
              </span>

              <span className="cta-arrow">
                <FaArrowRight />
              </span>
            </button>

            <button
              className="cta-outline"
              onClick={() => scrollTo('contact')}
            >
              Let's Talk
            </button>

          </motion.div>

          {/* SOCIAL LINKS */}

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 1,
              delay: reduceMotion ? 0 : 1.2
            }}
          >

            <a
              href="https://github.com/houdahousseini6-web"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/houda-housseini-10509b351"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://dribbble.com/houda-housseini"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Dribbble"
            >
              <FaDribbble />
            </a>

            <div className="social-line"></div>

          </motion.div>

        </div>

        {/* ======================================
            RIGHT SIDE - PHOTO
        ====================================== */}

        <motion.div
          className="hero-photo-section"
          initial={{
            opacity: 0,
            scale: reduceMotion ? 1 : 0.8,
            x: reduceMotion ? 0 : 60
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0
          }}
          transition={{
            duration: reduceMotion ? 0 : 1,
            delay: reduceMotion ? 0 : 0.5,
            ease: 'easeOut'
          }}
        >

          {/* SCROLL PARALLAX WRAPPER */}

          <motion.div
            className="photo-wrapper"
            style={{
              y: reduceMotion ? 0 : smoothPhotoY,
              scale: reduceMotion ? 1 : smoothPhotoScale,
              opacity: reduceMotion ? 1 : heroOpacity
            }}
          >

            {/* ORIGINAL PHOTO RINGS */}

            <div className="photo-ring ring-outer"></div>
            <div className="photo-ring ring-middle"></div>
            <div className="photo-ring ring-inner"></div>

            {/* GLOW EFFECT */}

            <div className="photo-glow"></div>

            {/* PROFILE IMAGE */}

            <div className="photo-container">
              <img
                src="/images/houda-hero.jpg"
                alt="Illustration of Houda Housseini"
                fetchPriority="high"
              />
            </div>

            {/* PROFESSIONAL FLOATING BADGES */}

            <div className="photo-badge badge-react">
              <FaReact aria-hidden="true" />
              <span>React</span>
            </div>

            <div className="photo-badge badge-3d">
              <FaCube aria-hidden="true" />
              <span>3D</span>
            </div>

            <div className="photo-badge badge-design">
              <FaPalette aria-hidden="true" />
              <span>Design</span>
            </div>

            <div className="photo-badge badge-code">
              <FaCode aria-hidden="true" />
              <span>Code</span>
            </div>

          </motion.div>

        </motion.div>

      </div>

      {/* ======================================
          SCROLL INDICATOR
      ====================================== */}

      <div
        className="scroll-down"
        onClick={() => scrollTo('about')}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            scrollTo('about')
          }
        }}
        aria-label="Scroll to About section"
      >

        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>

        <span>Scroll</span>

      </div>

    </section>
  )
}

export default Hero
