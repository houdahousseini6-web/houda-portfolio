import { useState, useEffect } from 'react'
import '../styles/MouseFollower.css'

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const handleLeave = () => setVisible(false)

    const handleHoverStart = () => setHovering(true)
    const handleHoverEnd = () => setHovering(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)

    const hoverElements = document.querySelectorAll('a, button, .project-card-new, .skill-card-new')
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [])

  return (
    <>
      <div
        className={`cursor-dot ${visible ? 'visible' : ''} ${hovering ? 'hover' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
      <div
        className={`cursor-ring ${visible ? 'visible' : ''} ${hovering ? 'hover' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
    </>
  )
}

export default MouseFollower