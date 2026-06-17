import { useState } from 'react'
import '../../styles/Admin.css'

const ADMIN_PASSWORD = 'houda24122004' // ← change this to your password

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onLogin(true)
      localStorage.setItem('admin_logged_in', 'true')
    } else {
      setError(true)
    }
  }

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-header">
          <span>🔐</span>
          <h2>Admin Login</h2>
          <p>Enter your password to continue</p>
        </div>

        <div className="admin-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            placeholder="Enter admin password"
            required
          />
        </div>

        {error && <p className="admin-error">Wrong password ❌</p>}

        <button type="submit" className="admin-btn">
          Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin