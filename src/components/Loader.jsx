import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/Loader.css'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setVisible(false)
            setTimeout(onComplete, 800)
          }, 400)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const stars = useMemo(() => {
    return [...Array(100)].map((_, i) => {
      const size = Math.random()
      let sizeClass = 'small'
      if (size > 0.8) sizeClass = 'large'
      else if (size > 0.5) sizeClass = 'medium'

      return {
        className: `loader-star ${sizeClass}`,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${1 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 3}s`,
        },
      }
    })
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.2,
            filter: 'blur(15px)',
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* ───── Space Background ───── */}
          <div className="space-bg">
            {/* Stars */}
            <div className="stars-layer">
              {stars.map((star, i) => (
                <div key={i} className={star.className} style={star.style}></div>
              ))}
            </div>

            {/* Shooting Stars */}
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>

            {/* Nebula Clouds */}
            <div className="nebula nebula-1"></div>
            <div className="nebula nebula-2"></div>
            <div className="nebula nebula-3"></div>
            <div className="nebula nebula-4"></div>

            {/* Planets */}
            <div className="planet"></div>
            <div className="planet-small"></div>
          </div>

          {/* ───── Main Content ───── */}
          <div className="loader-content">
            {/* Logo */}
            <motion.div
              className="loader-logo"
              initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, type: 'spring' }}
            >
              <div className="loader-logo-ring ring-1"></div>
              <div className="loader-logo-ring ring-2"></div>
              <div className="loader-logo-ring ring-3"></div>
              <div className="loader-logo-glow"></div>
              <div className="loader-logo-text">HH</div>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="loader-name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Houda <span>Housseini</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              className="loader-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              Multimedia Engineer & Creative Developer
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              className="loader-progress-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <div className="loader-progress-bar">
                <div
                  className="loader-progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="loader-progress-text">
                {progress < 100 ? (
                  <span>{progress}%</span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="loader-ready"
                  >
                    Launching ✨
                  </motion.span>
                )}
              </div>
            </motion.div>
          </div>

          {/* ───── Floating Particles ───── */}
          <div className="loader-particles">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="loader-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              ></div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader