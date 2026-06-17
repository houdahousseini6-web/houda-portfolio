import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../data/firebase'
import '../../styles/Admin.css'

const AdminReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const snapshot = await getDocs(collection(db, 'testimonials'))
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteDoc(doc(db, 'testimonials', id))
        setReviews(reviews.filter((r) => r.id !== id))
      } catch (error) {
        console.error('Error deleting review:', error)
      }
    }
  }

  const handleToggleApprove = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'testimonials', id), {
        approved: !currentStatus,
      })
      setReviews(
        reviews.map((r) =>
          r.id === id ? { ...r, approved: !currentStatus } : r
        )
      )
    } catch (error) {
      console.error('Error updating review:', error)
    }
  }

  if (loading) return <p className="admin-loading">Loading reviews...</p>

  if (reviews.length === 0) return <p className="admin-empty">No reviews yet.</p>

  return (
    <div className="admin-reviews">
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>📝</span>
          <h3>{reviews.length}</h3>
          <p>Total Reviews</p>
        </div>
        <div className="admin-stat-card">
          <span>✅</span>
          <h3>{reviews.filter((r) => r.approved).length}</h3>
          <p>Approved</p>
        </div>
        <div className="admin-stat-card">
          <span>⏳</span>
          <h3>{reviews.filter((r) => !r.approved).length}</h3>
          <p>Pending</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Project</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.name}</td>
                <td>{review.role}</td>
                <td>{review.project}</td>
                <td>{'★'.repeat(review.rating || 5)}</td>
                <td>
                  <span
                    className={`admin-badge ${
                      review.approved ? 'approved' : 'pending'
                    }`}
                  >
                    {review.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="admin-actions">
                  <button
                    className={`admin-action-btn ${
                      review.approved ? 'hide' : 'approve'
                    }`}
                    onClick={() =>
                      handleToggleApprove(review.id, review.approved)
                    }
                  >
                    {review.approved ? 'Hide' : 'Approve'}
                  </button>
                  <button
                    className="admin-action-btn delete"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminReviews