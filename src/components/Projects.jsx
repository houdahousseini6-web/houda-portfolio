import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects } from '../data/data'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'
import '../styles/Projects.css'

const categories = ['All', 'Web', '3D', 'Design']

const Projects = () => {
  const [active, setActive] = useState('All')
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="projects-container">
        <ScrollReveal>
          <div className="section-header">
          <div className="section-tag-wrap">
  <span className="section-line"></span>
  <span className="section-tag">MY WORK</span>
</div>            <h2 className="section-title">
              Featured <span className="gradient-text">projects</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="projects-grid-new">
          {filtered.map((project, index) => (
            <ScrollReveal key={project.id} delay={0.15 * index} direction="up">
              <motion.div className="project-card-new" whileHover={{ y: -12 }}>
                <div className="project-thumbnail">
                  <div className="project-thumb-bg">
                    <span>{project.title.charAt(0)}</span>
                  </div>
                  <div className="project-actions">
                    <a href={project.github} target="_blank" rel="noreferrer" className="action-btn">
                      <FaGithub />
                    </a>
                    <a href={project.demo} target="_blank" rel="noreferrer" className="action-btn primary">
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>

                <div className="project-body">
                  <div className="project-meta">
                    <span className="project-cat">{project.category}</span>
                  </div>
                  <h3 className="project-name">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-stack">
                    {project.tech.map((t, i) => (
                      <span key={i} className="stack-chip">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects