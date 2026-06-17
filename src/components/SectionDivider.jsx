import '../styles/SectionDivider.css'

const SectionDivider = ({ type = 'wave', flip = false }) => {
  if (type === 'wave') {
    return (
      <div className={`divider-wave ${flip ? 'flip' : ''}`}>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            fill="url(#wave-gradient)"
            fillOpacity="0.08"
          />
          <path
            d="M0 80C240 120 480 40 720 80C960 120 1200 40 1440 80V120H0V80Z"
            fill="url(#wave-gradient)"
            fillOpacity="0.05"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  if (type === 'glow') {
    return (
      <div className="divider-glow">
        <div className="divider-glow-line"></div>
        <div className="divider-glow-dot"></div>
      </div>
    )
  }

  if (type === 'stars') {
    return (
      <div className="divider-stars">
        <div className="divider-line-left"></div>
        <div className="divider-star-icon">✦</div>
        <div className="divider-line-right"></div>
      </div>
    )
  }

  return null
}

export default SectionDivider