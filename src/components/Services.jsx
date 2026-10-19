
import { motion, useReducedMotion } from 'framer-motion'

import {
  FaLaptopCode,
  FaCube,
  FaFilm,
  FaEnvelopeOpenText,
  FaPalette,
  FaObjectGroup,
  FaArrowRight
} from 'react-icons/fa'

import ScrollReveal from './ScrollReveal'
import '../styles/Services.css'

// ==========================================
// SERVICES DATA
// ==========================================

const services = [
  {
    icon: FaLaptopCode,
    title: 'Web Development',
    description:
      'Building modern, responsive and interactive websites using React and the latest technologies.',
    tags: ['React', 'JavaScript', 'CSS', 'HTML'],
    color: '#7C3AED'
  },
  {
    icon: FaCube,
    title: '3D Modeling',
    description:
      'Creating stunning 3D models, product visualizations and architectural renders.',
    tags: ['3ds Max', 'Unity', '3D Design', 'Rendering'],
    color: '#22D3EE'
  },
  {
    icon: FaFilm,
    title: 'Motion & Animation',
    description:
      'Designing captivating animated videos, motion graphics and visual effects.',
    tags: ['Animation', 'Motion', 'Video', 'VFX'],
    color: '#EC4899'
  },
  {
    icon: FaEnvelopeOpenText,
    title: 'Wedding Invitations',
    description:
      'Crafting elegant and personalized animated wedding invitations that leave a lasting impression.',
    tags: ['Animation', 'Interactive Web', 'Design'],
    color: '#F472B6'
  },
  {
    icon: FaPalette,
    title: 'Graphic Design',
    description:
      'Creating beautiful visual identities, logos, posters and social media designs.',
    tags: ['Photoshop', 'Illustrator', 'Branding', 'UI'],
    color: '#A78BFA'
  },
  {
    icon: FaObjectGroup,
    title: 'UI/UX Design',
    description:
      'Designing clean and intuitive user interfaces with a focus on user experience.',
    tags: ['Figma', 'Wireframes', 'Prototyping', 'Design'],
    color: '#34D399'
  }
]

// ==========================================
// SERVICE CARD
// ==========================================

const ServiceCard = ({ service, index }) => {
  const reduceMotion = useReducedMotion()
  const Icon = service.icon

  return (
    <motion.div
      className="service-card"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 45,
              scale: 0.95
            }
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
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : (index % 3) * 0.12,
        ease: 'easeOut'
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -8,
              scale: 1.025,
              transition: {
                duration: 0.25
              }
            }
      }
    >

      {/* TOP ACCENT LINE */}

      <div
        className="service-top-line"
        style={{
          background: service.color
        }}
      />

      {/* PROFESSIONAL ICON */}

      <div
        className="service-icon"
        style={{
          background: `${service.color}15`
        }}
      >
        <Icon
          className="service-icon-svg"
          style={{
            color: service.color,
            fontSize: '30px'
          }}
          aria-hidden="true"
        />

        <div
          className="service-icon-glow"
          style={{
            background: service.color
          }}
        />
      </div>

      {/* SERVICE CONTENT */}

      <h3 className="service-title">
        {service.title}
      </h3>

      <p className="service-description">
        {service.description}
      </p>

      {/* TECHNOLOGY TAGS */}

      <div className="service-tags">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="service-tag"
            style={{
              color: service.color,
              background: `${service.color}12`
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* DECORATIVE ARROW */}

      <div className="service-arrow" aria-hidden="true">
        <FaArrowRight />
      </div>

    </motion.div>
  )
}

// ==========================================
// SERVICES SECTION
// ==========================================

const Services = () => {
  return (
    <section
      id="services"
      className="services-section"
    >
      <div className="services-container">

        {/* SECTION HEADER */}

        <ScrollReveal>
          <div className="section-header">

            <div className="section-tag-wrap">
              <span className="section-line" />
              <span className="section-tag">
                WHAT I DO
              </span>
            </div>

            <h2 className="section-title">
              My{' '}
              <span className="gradient-text">
                Services
              </span>
            </h2>

            <p className="services-subtitle">
              From concept to completion — I bring
              your ideas to life with creativity
              and technical precision.
            </p>

          </div>
        </ScrollReveal>

        {/* SERVICES GRID */}

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services
