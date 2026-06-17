import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaDribbble } from 'react-icons/fa'
import '../styles/Hero.css'

const roles = [
  
    'Computer Engineer',
    'Frontend Developer',
    'Creative Technologist',
    'UI/UX Designer',
    'Digital Creator',
    'Problem Solver'

  
]

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    let timeout
    const role = roles[currentRole]

    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, currentRole])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="hero">
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}></div>
        ))}
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="badge-dot"></span>
            <span>Available for freelance work</span>
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <span className="hero-hi">Hi, I'm</span>
            <span className="hero-name-main">
              <span className="gradient-text">Houda</span>
              <br />
              <span className="outline-text">Housseini</span>
            </span>
          </motion.h1>

          <motion.div
  className="hero-role"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
>
  <span className="role-text">{displayed}</span>
  <span className="cursor">|</span>
</motion.div>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Rooted in engineering and inspired by design, I create digital experiences that blend innovation, elegance, and meaningful interaction.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <button className="cta-primary" onClick={() => scrollTo('projects')}>
              <span className="cta-bg"></span>
              <span className="cta-text">Explore My Work</span>
              <span className="cta-arrow">→</span>
            </button>
            <button className="cta-outline" onClick={() => scrollTo('contact')}>
              Let's Talk
            </button>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <a href="https://github.com/houdahousseini6-web" target="_blank" rel="noreferrer" className="social-link">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/houda-housseini-10509b351" target="_blank" rel="noreferrer" className="social-link">
              <FaLinkedin />
            </a>
            <a href="https://dribbble.com/houda-housseini" target="_blank" rel="noreferrer" className="social-link">
              <FaDribbble />
            </a>
            <div className="social-line"></div>
          </motion.div>
        </div>

        <motion.div
          className="hero-photo-section"
          initial={{ opacity: 0, scale: 0.8, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="photo-wrapper">
            <div className="photo-ring ring-outer"></div>
            <div className="photo-ring ring-middle"></div>
            <div className="photo-ring ring-inner"></div>
            <div className="photo-glow"></div>
            <div className="photo-container">
              <img src="/images/houda-hero.jpg" alt="Houda Housseini" />
            </div>
            <div className="photo-badge badge-react">⚛️ React</div>
            <div className="photo-badge badge-3d">🧊 3D</div>
            <div className="photo-badge badge-design">🎨 Design</div>
            <div className="photo-badge badge-code">💻 Code</div>
          </div>
        </motion.div>
      </div>

      <div className="scroll-down" onClick={() => scrollTo('about')}>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
        <span>Scroll</span>
      </div>
    </section>
  )
}

export default Hero