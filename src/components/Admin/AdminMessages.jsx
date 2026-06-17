import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../data/firebase'
import '../../styles/Admin.css'

const AdminMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const snapshot = await getDocs(collection(db, 'messages'))
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', id))
        setMessages(messages.filter((m) => m.id !== id))
      } catch (error) {
        console.error('Error deleting message:', error)
      }
    }
  }

  if (loading) return <p className="admin-loading">Loading messages...</p>

  if (messages.length === 0) return <p className="admin-empty">No messages yet.</p>

  return (
    <div className="admin-messages">
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>📧</span>
          <h3>{messages.length}</h3>
          <p>Total Messages</p>
        </div>
      </div>

      <div className="admin-messages-grid">
        {messages.map((msg) => (
          <div key={msg.id} className="admin-message-card">
            <div className="admin-message-header">
              <h4>{msg.name}</h4>
              <button
                className="admin-action-btn delete"
                onClick={() => handleDelete(msg.id)}
              >
                Delete
              </button>
            </div>
            <p className="admin-message-email">{msg.email}</p>
            <p className="admin-message-subject">
              <strong>Subject:</strong> {msg.subject}
            </p>
            <p className="admin-message-text">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminMessages