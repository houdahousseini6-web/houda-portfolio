
import { motion, useReducedMotion } from 'framer-motion'
import {
  FaGraduationCap,
  FaBriefcase,
  FaBuilding,
  FaRocket,
  FaStar
} from 'react-icons/fa'

import ScrollReveal from './ScrollReveal'
import '../styles/Timeline.css'

// ==========================================
// TIMELINE DATA
// ==========================================

const timeline = [
  {
    year: '2022',
    title: 'Started My Computer Engineering Journey',
    description:
      'Graduated from high school and began studying Computer Engineering at Antonine University, developing my technical knowledge, creativity, and problem-solving skills.',
    icon: FaGraduationCap,
    color: '#7C3AED'
  },
  {
    year: '2025',
    title: 'Software Development Internship at Slangit',
    description:
      'Gained practical experience in software development, contributing to real projects and strengthening my technical and professional skills.',
    icon: FaBriefcase,
    color: '#EC4899'
  },
  {
    year: '2025',
    title: 'Internship at the Lebanese Organization for Studies and Training',
    description:
      'Completed a three-month internship in a professional environment, gaining hands-on experience while improving my collaboration, communication, and teamwork skills.',
    icon: FaBuilding,
    color: '#22D3EE'
  },
  {
    year: '2027',
    title: 'Expected Graduation',
    description:
      'Working toward my Computer Engineering degree, with the goal of building a career in software development, multimedia, and creative digital experiences.',
    icon: FaGraduationCap,
    color: '#A78BFA'
  },
  {
    year: 'Future',
    title: 'Growing as a Creative Developer',
    description:
      'Continuing to combine engineering, design, and technology to create innovative, interactive, and meaningful digital experiences.',
    icon: FaRocket,
    color: '#F472B6'
  }
]

// ==========================================
// TIMELINE ITEM
// ==========================================

const TimelineItem = ({ item, index }) => {
  const reduceMotion = useReducedMotion()

  const Icon = item.icon

  const position = index % 2 === 0 ? 'left' : 'right'

  return (
    <ScrollReveal
      delay={Math.min(index * 0.1, 0.4)}
      direction={position}
    >
      <div className={`timeline-item ${position}`}>

        {/* TIMELINE CARD */}

        <motion.div
          className="timeline-content"
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -6,
                  scale: 1.015
                }
          }
          transition={{
            duration: 0.3,
            ease: 'easeOut'
          }}
        >

          {/* ICON */}

          <motion.div
            className="timeline-icon"
            style={{
              background: `${item.color}20`,
              borderColor: `${item.color}40`,
              color: item.color
            }}
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
              stiffness: 260,
              damping: 18
            }}
          >
            <Icon
              className="timeline-icon-svg"
              aria-hidden="true"
            />
          </motion.div>

          {/* YEAR */}

          <span
            className="timeline-year"
            style={{ color: item.color }}
          >
            {item.year}
          </span>

          {/* TITLE */}

          <h3 className="timeline-title">
            {item.title}
          </h3>

          {/* DESCRIPTION */}

          <p className="timeline-description">
            {item.description}
          </p>

        </motion.div>

        {/* TIMELINE DOT */}

        <div
          className="timeline-dot"
          style={{
            background: item.color,
            boxShadow: `0 0 20px ${item.color}40`
          }}
          aria-hidden="true"
        />

      </div>
    </ScrollReveal>
  )
}

// ==========================================
// MAIN TIMELINE SECTION
// ==========================================

const Timeline = () => {
  return (
    <section
      id="timeline"
      className="timeline-section"
    >
      <div className="timeline-container">

        {/* SECTION HEADER */}

        <ScrollReveal>
          <div className="section-header">

            <div className="section-tag-wrap">

              <span className="section-line" />

              <span className="section-tag">
                MY JOURNEY
              </span>

            </div>

            <h2 className="section-title">
              The path I've{' '}
              <span className="gradient-text">
                traveled
              </span>
            </h2>

          </div>
        </ScrollReveal>

        {/* TIMELINE */}

        <div className="timeline">

          {/* CENTER LINE */}

          <div
            className="timeline-line"
            aria-hidden="true"
          />

          {/* TIMELINE ITEMS */}

          {timeline.map((item, index) => (
            <TimelineItem
              key={`${item.year}-${index}`}
              item={item}
              index={index}
            />
          ))}

        </div>

      </div>
    </section>
  )
}

export default Timeline
