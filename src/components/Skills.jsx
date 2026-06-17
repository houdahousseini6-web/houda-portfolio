import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '../data/data'
import ScrollReveal from './ScrollReveal'
import '../styles/Skills.css'

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [hovered, setHovered] = useState(null)

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="skills-container">
        <ScrollReveal>
          <div className="section-header">
          <div className="section-tag-wrap">
  <span className="section-line"></span>
  <span className="section-tag">MY SKILLS</span>
</div>            <h2 className="section-title">
              Technologies I <span className="gradient-text">master</span>
            </h2>
            <p className="section-subtitle">
              A curated collection of tools and technologies I use to bring ideas to life.
            </p>
          </div>
        </ScrollReveal>

        <div className="skills-grid-new">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <ScrollReveal key={index} delay={0.08 * index} direction="up">
                <motion.div
                  className={`skill-card-new ${hovered === index ? 'active' : ''}`}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -10, scale: 1.03 }}
                >
                  <div className="skill-icon-wrapper" style={{ '--skill-color': skill.color }}>
                    <Icon className="skill-icon-new" />
                  </div>
                  <span className="skill-name-new">{skill.name}</span>
                  <span className="skill-category-tag">
                    {skill.category === 'dev' ? 'Development' : 'Design'}
                  </span>
                  <div className="skill-glow" style={{ background: skill.color }}></div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills