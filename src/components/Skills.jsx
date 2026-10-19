
import { motion, useReducedMotion } from 'framer-motion'
import { skills } from '../data/data'
import ScrollReveal from './ScrollReveal'
import '../styles/Skills.css'

// Each card has its own scroll reveal animation
const SkillCard = ({ skill, index }) => {
  const reduceMotion = useReducedMotion()
  const Icon = skill.icon

  return (
    <motion.div
      className="skill-card-new"
      style={{ '--skill-color': skill.color }}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 35, scale: 0.94 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      viewport={{
        once: true,
        amount: 0.15
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : (index % 4) * 0.08,
        ease: 'easeOut'
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -8,
              scale: 1.025,
              transition: { duration: 0.25 }
            }
      }
    >
      <div className="skill-icon-wrapper">
        <Icon className="skill-icon-new" aria-hidden="true" />
      </div>

      <span className="skill-name-new">
        {skill.name}
      </span>

      <span className="skill-category-tag">
        {skill.category}
      </span>

      <div className="skill-glow" aria-hidden="true" />
    </motion.div>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">

        {/* SECTION HEADER */}
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag-wrap">
              <span className="section-line" />
              <span className="section-tag">
                MY SKILLS
              </span>
            </div>

            <h2 className="section-title">
              Technologies I{' '}
              <span className="gradient-text">
                work with
              </span>
            </h2>

            <p className="section-subtitle">
              A curated collection of tools and
              technologies I use to bring ideas to life.
            </p>
          </div>
        </ScrollReveal>

        {/* TECHNOLOGY GRID */}
        <div className="skills-grid-new">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skills
