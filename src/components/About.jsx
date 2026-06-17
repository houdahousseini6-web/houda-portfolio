import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from './ScrollReveal'
import '../styles/About.css'

const stats = [
  { number: 10, suffix: '+', label: 'Projects', icon: '🚀' },
  { number: 6, suffix: '+', label: 'Technologies', icon: '⚡' },
  { number: 3, suffix: '+', label: 'Years Learning', icon: '📚' },
  { number: 100, suffix: '%', label: 'Creativity', icon: '✨' },
]

const Counter = ({ number, suffix, inView }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 2000
    const increment = number / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= number) {
        setCount(number)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [inView, number])

  return (
    <span className="stat-number">
      {count}{suffix}
    </span>
  )
}

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-container">
        {/* ───── Section Header ───── */}
        <ScrollReveal>
          <div className="section-header">
          <div className="section-tag-wrap">
  <span className="section-line"></span>
  <span className="section-tag">ABOUT ME</span>
</div>            <h2 className="section-title">
              Crafting digital <span className="gradient-text">experiences</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* ───── Main Content ───── */}
        <div className="about-content">
          {/* ───── Left: Photo ───── */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="about-left">
              <div className="about-image-wrapper">
                <div className="about-image-bg"></div>
                <div className="about-image-placeholder">
                  <img
                    src="/images/houda-hero.jpg"
                    alt="Houda Housseini"
                    className="about-photo"
                  />
                </div>
                <div className="about-experience-badge">
                  <span className="exp-number">3+</span>
                  <span className="exp-label">
                    Years of<br />Learning
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ───── Right: Text ───── */}
          <ScrollReveal direction="right" delay={0.4}>
            <div className="about-right">
              <p className="about-text">
             I'm <strong>Houda Housseini</strong>, a creative engineer inspired by the harmony of technology and design. With a passion for innovation and attention to detail, I transform ideas into meaningful digital experiences that are both functional and memorable.

              </p>

              <p className="about-text">
                From building responsive React applications to creating
                cinematic 3D animations and elegant wedding invitations, I
                bring a unique blend of technical precision and creative
                vision to every project.
              </p>

              {/* ───── Highlight Cards ───── */}
              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">🎓</div>
                  <div>
                    <h4>Education</h4>
                    <p>Computer Engineering in Multimedia and Technologies</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">💼</div>
                  <div>
                    <h4>Status</h4>
                    <p>Open to Opportunities</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">🌍</div>
                  <div>
                    <h4>Languages</h4>
                    <p>Arabic, English</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">📍</div>
                  <div>
                    <h4>Work Style</h4>
                    <p>Remote / On-site</p>
                  </div>
                </div>
              </div>

              {/* ───── Download CV Button ───── */}
              <a
  href="/Houda cv.pdf"
  download="Houda cv.pdf"
  className="download-cv"
>
  Download CV
  <span>📄</span>
</a>
            </div>
          </ScrollReveal>
        </div>

        {/* ───── Animated Stats ───── */}
        <div className="about-stats">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={0.15 * i} direction="up">
              <div className="stat-card">
                <span className="stat-emoji">{stat.icon}</span>
                <Counter
                  number={stat.number}
                  suffix={stat.suffix}
                  inView={inView}
                />
                <span className="stat-label">{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About