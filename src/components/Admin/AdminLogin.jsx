
import { useState } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../../data/firebase'

import {
  FaLock,
  FaShieldAlt,
  FaArrowRight,
} from 'react-icons/fa'

import '../../styles/Admin.css'

// Enter the email you registered in Firebase Authentication.
// The visitor will NOT need to type this email.
const ADMIN_EMAIL = 'YOUR_FIREBASE_EMAIL@example.com'

// Enter the UID of your admin user from Firebase Authentication.
// This is NOT your password.
const ADMIN_UID = 'YOUR_FIREBASE_ADMIN_UID'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        ADMIN_EMAIL,
        password
      )

      if (credential.user.uid !== ADMIN_UID) {
        await signOut(auth)
        setError('This account is not authorized.')
        return
      }

      // App.jsx detects Firebase login automatically.

    } catch (err) {
      console.error('Login failed:', err.code)
      setError('Incorrect password or login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">

      <form
        className="admin-login-card"
        onSubmit={handleSubmit}
      >

        <div className="admin-login-header">

          <div className="admin-login-icon">
            <FaShieldAlt />
          </div>

          <h2>Admin Login</h2>

          <p>
            Enter your password to access your dashboard
          </p>

        </div>

        <div className="admin-field">

          <label htmlFor="admin-password">
            Password
          </label>

          <div className="admin-input-wrapper">

            <FaLock />

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Enter admin password"
              autoComplete="current-password"
              required
            />

          </div>

        </div>

        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="admin-btn"
          disabled={loading}
        >

          {loading ? (
            'Signing in...'
          ) : (
            <>
              Login <FaArrowRight />
            </>
          )}

        </button>

        <p className="admin-login-footer">
          Secure Admin Access
        </p>

      </form>

    </div>
  )
}

export default AdminLogin
