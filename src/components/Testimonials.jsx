
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import {
  FaQuoteLeft,
  FaStar,
  FaUserCircle
} from 'react-icons/fa'

import { db } from '../data/firebase'
import ScrollReveal from './ScrollReveal'
import '../styles/Testimonials.css'

// ==========================================
// TESTIMONIAL CARD
// ==========================================

const TestimonialCard = ({ item }) => {
  const reduceMotion = useReducedMotion()

  const rating = Math.min(
    5,
    Math.max(0, Math.round(Number(item.rating) || 0))
  )

  return (
    <motion.article
      className="testimonial-card"
      whileHover={
        reduceMotion
          ? undefined
          : { y: -7, scale: 1.015 }
      }
      transition={{
        duration: 0.3,
        ease: 'easeOut'
      }}
    >
      {/* QUOTE ICON */}

      <div className="testi-quote">
        <FaQuoteLeft aria-hidden="true" />
      </div>

      {/* PROJECT CATEGORY */}

      {item.project && (
        <span className="testi-project">
          {item.project}
        </span>
      )}

      {/* RATING */}

      {rating > 0 && (
        <div
          className="testi-stars"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: rating }, (_, i) => (
            <FaStar
              key={i}
              className="testi-star"
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {/* REVIEW TEXT */}

      <p className="testi-text">
        {item.text}
      </p>

      {/* CLIENT INFORMATION */}

      <div className="testi-author">

        <div className="testi-avatar">
          <FaUserCircle aria-hidden="true" />
        </div>

        <div className="testi-info">
          <h4>{item.name}</h4>
          {item.role && <p>{item.role}</p>}
        </div>

      </div>

      {/* DECORATIVE GLOW */}

      <div className="testi-glow" aria-hidden="true" />

    </motion.article>
  )
}

// ==========================================
// TESTIMONIALS SECTION
// ==========================================

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const reduceMotion = useReducedMotion()

  // ========================================
  // LOAD APPROVED FIREBASE REVIEWS
  // ========================================

  useEffect(() => {
    let active = true

    const fetchTestimonials = async () => {
      try {
        const reviewsQuery = query(
  collection(db, 'testimonials'),
  where('approved', '==', true)
)

const snapshot = await getDocs(reviewsQuery)

        const reviews = snapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
          .filter((item) =>
            item.approved === true &&
            typeof item.name === 'string' &&
            item.name.trim() !== '' &&
            typeof item.text === 'string' &&
            item.text.trim() !== ''
          )

        if (active) {
          setTestimonials(reviews)
          setError(false)
        }

      } catch (err) {
        console.error(
          'Error loading testimonials:',
          err
        )

        if (active) {
          setError(true)
        }

      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchTestimonials()

    return () => {
      active = false
    }
  }, [])

  // Duplicate cards only for the seamless
  // visual marquee animation.
  const canAnimate =
    !reduceMotion && testimonials.length > 1

  const marqueeItems = canAnimate
    ? Array.from(
        { length: Math.max(
          1,
          Math.ceil(4 / testimonials.length)
        ) },
        () => testimonials
      ).flat()
    : testimonials

  return (
    <section
      id="testimonials"
      className="testimonials-section"
    >
      <div className="testimonials-container">

        {/* SECTION HEADER */}

        <ScrollReveal>
          <div className="section-header">

            <div className="section-tag-wrap">
              <span className="section-line" />
              <span className="section-tag">
                TESTIMONIALS
              </span>
            </div>

            <h2 className="section-title">
              What people{' '}
              <span className="gradient-text">
                say
              </span>
            </h2>

            <p className="section-subtitle">
              Feedback from clients and collaborators
              I've had the pleasure to work with.
            </p>

          </div>
        </ScrollReveal>

        {/* LOADING STATE */}

        {loading && (
          <div
            className="testimonials-status"
            role="status"
          >
            Loading testimonials...
          </div>
        )}

        {/* FIREBASE ERROR */}

        {!loading && error && (
          <div
            className="testimonials-status"
            role="status"
          >
            Testimonials are temporarily unavailable.
          </div>
        )}

        {/* NO APPROVED REVIEWS */}

        {!loading &&
          !error &&
          testimonials.length === 0 && (
            <div className="testimonials-status">
              Client feedback will be featured here soon.
            </div>
          )}

        {/* TESTIMONIAL MARQUEE */}

        {!loading &&
          !error &&
          testimonials.length > 0 && (
            <ScrollReveal delay={0.2}>

              <div
                className={`testimonials-marquee ${
                  canAnimate
                    ? 'is-animated'
                    : 'is-static'
                }`}
                aria-label="Client testimonials"
              >

                <div className="testimonials-marquee-group">

                  {marqueeItems.map((item, index) => (
                    <TestimonialCard
                      key={`original-${item.id}-${index}`}
                      item={item}
                    />
                  ))}

                </div>

                {canAnimate && (
                  <div
                    className="testimonials-marquee-group"
                    aria-hidden="true"
                  >
                    {marqueeItems.map((item, index) => (
                      <TestimonialCard
                        key={`duplicate-${item.id}-${index}`}
                        item={item}
                      />
                    ))}
                  </div>
                )}

              </div>

            </ScrollReveal>
          )}

      </div>
    </section>
  )
}

export default Testimonials
