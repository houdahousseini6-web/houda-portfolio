import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../data/firebase'
import ScrollReveal from './ScrollReveal'
import '../styles/Testimonials.css'

const fallbackTestimonials = [
  {
    name: 'Client Name',
    role: 'CEO, Company',
    text: 'Houda delivered an incredible website that exceeded our expectations. Her attention to detail and creativity are outstanding.',
    avatar: '👨‍💼',
    rating: 5,
    project: 'Web Development',
  },
  {
    name: 'Client Name',
    role: 'Marketing Director',
    text: 'The animated wedding invitation Houda designed for us was absolutely stunning. Every guest complimented it!',
    avatar: '👩‍💼',
    rating: 5,
    project: 'Wedding Card Design',
  },
  {
    name: 'Client Name',
    role: 'Startup Founder',
    text: 'Working with Houda was a fantastic experience. She brings both technical skill and artistic vision to every project.',
    avatar: '👨‍💻',
    rating: 5,
    project: 'Full Stack Development',
  },
  {
    name: 'Client Name',
    role: 'Creative Director',
    text: 'The 3D models and animations Houda created for our brand were phenomenal. Truly world-class quality.',
    avatar: '👩‍🎨',
    rating: 5,
    project: '3D Modeling & Animation',
  },
]

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials)
  const [ref] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'testimonials'))

        if (!snapshot.empty) {
          const reviews = snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((item) => item.approved === true)

          if (reviews.length > 0) {
            setTestimonials(reviews)
          }
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      }
    }

    fetchTestimonials()
  }, [])

  const baseTestimonials =
    testimonials.length < 4
      ? [...testimonials, ...testimonials]
      : testimonials

  const renderCards = (items, copy = 0) =>
    items.map((item, index) => (
      <motion.div
        key={`${copy}-${item.id || item.name}-${index}`}
        className="testimonial-card"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="testi-quote">✦</div>

        <span className="testi-project">{item.project}</span>

        <div className="testi-stars">
          {[...Array(item.rating || 5)].map((_, i) => (
            <span key={i} className="testi-star">★</span>
          ))}
        </div>

        <p className="testi-text">{item.text}</p>

        <div className="testi-author">
          <div className="testi-avatar">
            <span>{item.avatar || '👤'}</span>
          </div>
          <div className="testi-info">
            <h4>{item.name}</h4>
            <p>{item.role}</p>
          </div>
        </div>

        <div className="testi-glow"></div>
      </motion.div>
    ))

  return (
    <section id="testimonials" className="testimonials-section" ref={ref}>
      <div className="testimonials-container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag-wrap">
              <span className="section-line"></span>
              <span className="section-tag">TESTIMONIALS</span>
            </div>
            <h2 className="section-title">
              What people <span className="gradient-text">say</span>
            </h2>
            <p className="section-subtitle">
              Feedback from clients and collaborators I've had the pleasure to work with.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="testimonials-marquee">
            <div className="testimonials-marquee-group">
              {renderCards(baseTestimonials, 1)}
            </div>

            <div className="testimonials-marquee-group" aria-hidden="true">
              {renderCards(baseTestimonials, 2)}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Testimonials