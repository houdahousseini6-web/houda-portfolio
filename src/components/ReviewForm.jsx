import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../data/firebase'
import '../styles/ReviewForm.css'

const ReviewForm = () => {
  const [form, setForm] = useState({
    name: '',
    role: '',
    project: '',
    text: '',
    rating: 5,
  })

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, 'testimonials'), {
        name: form.name,
        role: form.role,
        project: form.project,
        text: form.text,
        rating: Number(form.rating),
        avatar: '👤',
        approved: true,
        createdAt: serverTimestamp(),
      })

      setSent(true)
      setForm({
        name: '',
        role: '',
        project: '',
        text: '',
        rating: 5,
      })
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <section className="review-page">
        <div className="review-card success-card">
          <div className="review-success-icon">🎉</div>
          <h2>Thank You!</h2>
          <p>Your review was submitted successfully!</p>
          <small>It will appear on the website shortly.</small>
        </div>
      </section>
    )
  }

  return (
    <section className="review-page">
      <div className="review-card">

        <div className="review-header">
          <span className="review-badge">TESTIMONIAL</span>
          <h2>Leave a Review ⭐</h2>
          <p>I'd love to hear about your experience!</p>
        </div>

        <form className="review-form" onSubmit={handleSubmit}>

          <div className="review-field">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Smith"
              required
            />
          </div>

          <div className="review-field">
            <label>Your Role</label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="CEO, Founder, Client..."
              required
            />
          </div>

          <div className="review-field">
            <label>Project Type</label>
            <select
              name="project"
              value={form.project}
              onChange={handleChange}
              required
            >
              <option value="">Select project type</option>
              <option value="Web Development">Web Development</option>
              <option value="Wedding Card Design">Wedding Card Design</option>
              <option value="3D Modeling & Animation">3D Modeling & Animation</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Full Stack Development">Full Stack Development</option>
            </select>
          </div>

          <div className="review-field">
            <label>Rating</label>
            <div className="star-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star-option ${Number(form.rating) >= star ? 'active' : ''}`}
                  onClick={() => setForm({ ...form, rating: star })}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="review-field">
            <label>Your Review</label>
            <textarea
              name="text"
              value={form.text}
              onChange={handleChange}
              placeholder="Tell others about your experience..."
              rows="5"
              required
            />
          </div>

          <button
            type="submit"
            className="review-btn"
            disabled={loading}
          >
            {loading ? 'Submitting...' : '⭐ Submit Review'}
          </button>

        </form>
      </div>
    </section>
  )
}

export default ReviewForm