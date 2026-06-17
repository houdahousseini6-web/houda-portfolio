import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from './ScrollReveal'
import '../styles/Services.css'

const services = [
  {
    icon: '💻',
    title: 'Web Development',
    description:
      'Building modern, responsive and interactive websites using React and the latest technologies.',
    tags: ['React', 'JavaScript', 'CSS', 'HTML'],
    color: '#7C3AED',
  },
  {
    icon: '🧊',
    title: '3D Modeling',
    description:
      'Creating stunning 3D models, product visualizations and architectural renders.',
    tags: ['Blender', '3D Design', 'Rendering', 'Animation'],
    color: '#22D3EE',
  },
  {
    icon: '🎬',
    title: 'Motion & Animation',
    description:
      'Designing captivating animated videos, motion graphics and visual effects.',
    tags: ['After Effects', 'Motion', 'Video', 'VFX'],
    color: '#EC4899',
  },
  {
    icon: '💍',
    title: 'Wedding Cards',
    description:
      'Crafting elegant and personalized animated wedding invitations that leave a lasting impression.',
    tags: ['Illustrator', 'Photoshop', 'Animation', 'Design'],
    color: '#F472B6',
  },
  {
    icon: '🎨',
    title: ' Design',
    description:
      'Creating beautiful visual identities, logos, posters and social media designs.',
    tags: ['Photoshop', 'Illustrator', 'Branding', 'UI'],
    color: '#A78BFA',
  },
  {
    icon: '📱',
    title: 'UI/UX Design',
    description:
      'Designing clean and intuitive user interfaces with a focus on user experience.',
    tags: ['Figma', 'Wireframes', 'Prototyping', 'Design'],
    color: '#34D399',
  },
]

const Services = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="services" className="services-section" ref={ref}>
      <div className="services-container">
        <ScrollReveal>
          <div className="section-header">
          <div className="section-tag-wrap">
  <span className="section-line"></span>
  <span className="section-tag">WHAT I DO</span>
</div>            <h2 className="section-title">
              My <span className="gradient-text">Services</span>
            </h2>
            <p className="services-subtitle">
              From concept to completion — I bring your ideas to life
              with creativity and technical precision.
            </p>
          </div>
        </ScrollReveal>

        <div className="services-grid">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={0.1 * index} direction="up">
              <motion.div
                className="service-card"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Top Glow Line */}
                <div
                  className="service-top-line"
                  style={{ background: service.color }}
                ></div>

                {/* Icon */}
                <div
                  className="service-icon"
                  style={{ background: `${service.color}15` }}
                >
                  <span>{service.icon}</span>
                  <div
                    className="service-icon-glow"
                    style={{ background: service.color }}
                  ></div>
                </div>

                {/* Content */}
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                {/* Tags */}
                <div className="service-tags">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="service-tag"
                      style={{
                        color: service.color,
                        background: `${service.color}12`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="service-arrow">
                  <span>→</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services