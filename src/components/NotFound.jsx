import { motion } from 'framer-motion'
import '../styles/NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-bg">
        <div className="nf-glow-1"></div>
        <div className="nf-glow-2"></div>
      </div>

      <motion.div
        className="not-found-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="nf-number"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          4<span className="nf-zero">0</span>4
        </motion.h1>

        <h2 className="nf-title">Lost in Space</h2>
        <p className="nf-text">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          className="nf-btn"
          onClick={() => window.location.href = '/'}
        >
          <span className="nf-btn-bg"></span>
          <span className="nf-btn-text">← Back to Home</span>
        </button>
      </motion.div>

      {/* Stars */}
      <div className="nf-stars">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="nf-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${1 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default NotFound