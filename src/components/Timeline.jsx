import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ScrollReveal from './ScrollReveal'
import '../styles/Timeline.css'

const timeline = [
    {
      year: '2022',
      title: 'Graduated from High School & Started Computer Engineering',
      description:
        'Graduated from high school in 2022 and began my Computer Engineering journey at Antonine University, where I started building my technical and problem-solving skills.',
      icon: '🎓',
      color: '#7C3AED',
    },
    {
      year: '2025',
      title: 'Internship at Slangit',
      description:
        'Completed an internship at Slangit, where I gained practical industry experience and strengthened my technical and professional skills.',
      icon: '💼',
      color: '#EC4899',
    },
    {
      year: '2025',
      title: 'Internship at the Lebanese Organization for Studies and Training',
      description:
        'Completed a 3-month internship in a professional work environment, gaining valuable hands-on experience and improving my teamwork and communication skills.',
      icon: '🏢',
      color: '#22D3EE',
    },
    {
      year: '2027',
      title: 'Expected Graduation',
      description:
        'Expected to graduate in 2027 with a degree in Computer Engineering, ready to pursue opportunities in software development and creative digital work.',
      icon: '🚀',
      color: '#A78BFA',
    },
    {
      year: 'Future',
      title: 'Growing as a Creative Developer',
      description:
        'Aiming to combine engineering, design, and multimedia skills to build impactful digital experiences and grow professionally in tech.',
      icon: '✨',
      color: '#F472B6',
    },
  ]

const Timeline = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="timeline" className="timeline-section" ref={ref}>
      <div className="timeline-container">
        <ScrollReveal>
          <div className="section-header">
          <div className="section-tag-wrap">
  <span className="section-line"></span>
  <span className="section-tag">MY JOURNEY</span>
</div>            <h2 className="section-title">
              The path I've <span className="gradient-text">traveled</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="timeline">
          <div className="timeline-line"></div>

          {timeline.map((item, index) => (
            <ScrollReveal
              key={index}
              delay={0.15 * index}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div
                    className="timeline-icon"
                    style={{ background: `${item.color}20`, borderColor: `${item.color}40` }}
                  >
                    <span>{item.icon}</span>
                  </div>
                  <span className="timeline-year" style={{ color: item.color }}>
                    {item.year}
                  </span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
                <div
                  className="timeline-dot"
                  style={{ background: item.color, boxShadow: `0 0 20px ${item.color}40` }}
                ></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline