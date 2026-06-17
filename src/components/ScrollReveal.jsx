import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ScrollReveal = ({ children, direction = 'up', delay = 0, duration = 0.7 }) => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  const directions = {
    up: { y: 80, x: 0 },
    down: { y: -80, x: 0 },
    left: { y: 0, x: -80 },
    right: { y: 0, x: 80 },
    scale: { y: 0, x: 0 },
  }

  const initial = {
    opacity: 0,
    ...directions[direction],
    ...(direction === 'scale' ? { scale: 0.8 } : {}),
  }

  const animate = inView
    ? { opacity: 1, y: 0, x: 0, scale: 1 }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal