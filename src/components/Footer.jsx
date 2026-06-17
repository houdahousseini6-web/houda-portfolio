import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaLinkedin, FaDribbble, FaHeart } from 'react-icons/fa'
import '../styles/Footer.css'

const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer" ref={ref}>
      <motion.div
        className="footer-container"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
            <span className="f-logo-text">HH</span>
                          <span className="f-logo-dot">.</span>
            </div>
            <p className="footer-tagline">
              Crafting digital experiences<br />that inspire and engage.
            </p>
          </div>

          <div className="footer-links">
            <h4>Navigation</h4>
            <ul>
              <li><button onClick={() => scrollTo('home')}>Home</button></li>
              <li><button onClick={() => scrollTo('about')}>About</button></li>
              <li><button onClick={() => scrollTo('skills')}>Skills</button></li>
              <li><button onClick={() => scrollTo('projects')}>Projects</button></li>
              <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><span>Web Development</span></li>
              <li><span>3D Modeling</span></li>
              <li><span>Animation</span></li>
              <li><span>Design</span></li>
              <li><span>Wedding Cards</span></li>
            </ul>
          </div>

          <div className="footer-social-section">
            <h4>Connect</h4>
            <div className="footer-socials">
              <a href="https://github.com/houdahousseini6-web" target="_blank" rel="noreferrer" className="footer-social">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/houda-housseini-10509b351" target="_blank" rel="noreferrer" className="footer-social">
                <FaLinkedin />
              </a>
              <a href="https://dribbble.com/houda-housseini" target="_blank" rel="noreferrer" className="footer-social">
                <FaDribbble />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>
          © {new Date().getFullYear()} Houda Housseini. All rights reserved.
          </p>
          <p className="made-with">
            Made with <FaHeart className="heart-icon" /> and lots of coffee
          </p>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer