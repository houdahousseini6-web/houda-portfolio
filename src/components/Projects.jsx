
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../data/data'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import ScrollReveal from './ScrollReveal'
import '../styles/Projects.css'

// ======================================
// PROJECT CATEGORIES
// ======================================

const categories = [
  'All',
  ...new Set(projects.map(project => project.category).filter(Boolean))
]

// Check whether a project has a real URL
const hasValidLink = (url) => {
  if (typeof url !== 'string') return false

  const value = url.trim()

  if (!/^https?:\/\//i.test(value)) return false

  // Exclude known placeholder from original data.js
  if (value === 'https://github.com/houda') return false

  return true
}

// ======================================
// PROJECT CARD
// ======================================

const ProjectCard = ({ project, index }) => {
  const reduceMotion = useReducedMotion()

  const githubAvailable = hasValidLink(project.github)
  const demoAvailable = hasValidLink(project.demo)

  const hasLinks = githubAvailable || demoAvailable

  const hasImage =
    typeof project.image === 'string' &&
    project.image.trim().length > 0

  return (
    <motion.article
      className="project-card-new"
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 40, scale: 0.96 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      viewport={{
        once: true,
        amount: 0.12
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : Math.min(index, 3) * 0.12,
        ease: 'easeOut'
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -8,
              transition: { duration: 0.25 }
            }
      }
    >

      {/* PROJECT THUMBNAIL */}

      <div className="project-thumbnail">

        {hasImage ? (
          <img
            src={project.image}
            alt={`Preview of ${project.title}`}
            className="project-image"
            loading="lazy"
          />
        ) : (
          <div className="project-thumb-bg">
            <span aria-hidden="true">
              {project.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* GITHUB AND LIVE DEMO */}

        {hasLinks && (
          <div className="project-actions">

            {githubAvailable && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
                aria-label={`View ${project.title} on GitHub`}
                title="View GitHub Repository"
              >
                <FaGithub aria-hidden="true" />
              </a>
            )}

            {demoAvailable && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn primary"
                aria-label={`View live demo of ${project.title}`}
                title="View Live Project"
              >
                <FaExternalLinkAlt aria-hidden="true" />
              </a>
            )}

          </div>
        )}

      </div>

      {/* PROJECT INFORMATION */}

      <div className="project-body">

        <div className="project-meta">
          <span className="project-cat">
            {project.category}
          </span>
        </div>

        <h3 className="project-name">
          {project.title}
        </h3>

        <p className="project-desc">
          {project.description}
        </p>

        {/* TECHNOLOGY CHIPS */}

        <div className="project-stack">
          {project.tech.map((technology, i) => (
            <span
              key={`${technology}-${i}`}
              className="stack-chip"
            >
              {technology}
            </span>
          ))}
        </div>

      </div>

    </motion.article>
  )
}

// ======================================
// PROJECTS SECTION
// ======================================

const Projects = () => {
  const [active, setActive] = useState('All')

  const filteredProjects =
    active === 'All'
      ? projects
      : projects.filter(
          project => project.category === active
        )

  return (
    <section id="projects" className="projects-section">

      <div className="projects-container">

        {/* SECTION HEADER */}

        <ScrollReveal>
          <div className="section-header">

            <div className="section-tag-wrap">
              <span className="section-line"></span>
              <span className="section-tag">
                MY WORK
              </span>
            </div>

            <h2 className="section-title">
              Featured{' '}
              <span className="gradient-text">
                projects
              </span>
            </h2>

          </div>
        </ScrollReveal>

        {/* CATEGORY FILTERS */}

        <ScrollReveal delay={0.15}>
          <div
            className="filter-bar"
            aria-label="Filter projects by category"
          >

            {categories.map(category => (
              <button
                key={category}
                type="button"
                className={`filter-chip ${
                  active === category ? 'active' : ''
                }`}
                onClick={() => setActive(category)}
                aria-pressed={active === category}
              >
                {category}
              </button>
            ))}

          </div>
        </ScrollReveal>

        {/* PROJECTS GRID */}

        <div className="projects-grid-new">

          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}

        </div>

        {/* EMPTY STATE */}

        {filteredProjects.length === 0 && (
          <p className="projects-empty">
            No projects available in this category yet.
          </p>
        )}

      </div>

    </section>
  )
}

export default Projects
