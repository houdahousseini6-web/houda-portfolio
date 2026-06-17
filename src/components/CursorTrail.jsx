import { useState, useEffect, useCallback } from 'react'
import '../styles/CursorTrail.css'

const CursorTrail = () => {
  const [trails, setTrails] = useState([])

  const handleMove = useCallback((e) => {
    const newTrail = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    }

    setTrails((prev) => [...prev.slice(-12), newTrail])

    setTimeout(() => {
      setTrails((prev) => prev.filter((t) => t.id !== newTrail.id))
    }, 600)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [handleMove])

  return (
    <div className="cursor-trail-container">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="trail-dot"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: (index + 1) / trails.length * 0.6,
            transform: `translate(-50%, -50%) scale(${(index + 1) / trails.length})`,
          }}
        />
      ))}
    </div>
  )
}

export default CursorTrail