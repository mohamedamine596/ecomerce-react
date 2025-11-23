import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal() {
  const { showAuth, setShowAuth, authMode, setAuthMode, login, signup } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  if (!showAuth) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (authMode === 'login') {
      const result = login(formData.email, formData.password)
      if (!result.success) setError(result.error)
    } else {
      if (!formData.firstName || !formData.lastName) {
        setError('Please fill all fields')
        return
      }
      const result = signup(formData.firstName, formData.lastName, formData.email, formData.password)
      if (!result.success) setError(result.error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login')
    setError('')
    setFormData({ firstName: '', lastName: '', email: '', password: '' })
  }

  return (
    <div className="auth-modal-overlay" onClick={() => setShowAuth(false)}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setShowAuth(false)}>✕</button>
        
        <h2>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="auth-subtitle">
          {authMode === 'login' ? 'Login to your account' : 'Sign up to get started'}
        </p>

        <form onSubmit={handleSubmit}>
          {authMode === 'signup' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn primary full-width">
            {authMode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <span onClick={switchMode}>
            {authMode === 'login' ? 'Sign up' : 'Login'}
          </span>
        </div>
      </div>
    </div>
  )
}
