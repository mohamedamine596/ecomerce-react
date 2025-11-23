import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'

  useEffect(() => {
    const stored = localStorage.getItem('heyfa_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('heyfa_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    
    if (found) {
      const userData = { email: found.email, firstName: found.firstName, lastName: found.lastName, isAdmin: found.isAdmin || false }
      setUser(userData)
      localStorage.setItem('heyfa_user', JSON.stringify(userData))
      setShowAuth(false)
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const signup = (firstName, lastName, email, password) => {
    const users = JSON.parse(localStorage.getItem('heyfa_users') || '[]')
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' }
    }

    const isFirstUser = users.length === 0
    const newUser = { firstName, lastName, email, password, isAdmin: isFirstUser }
    users.push(newUser)
    localStorage.setItem('heyfa_users', JSON.stringify(users))
    
    const userData = { email, firstName, lastName, isAdmin: isFirstUser }
    setUser(userData)
    localStorage.setItem('heyfa_user', JSON.stringify(userData))
    setShowAuth(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('heyfa_user')
  }

  const openAuth = (mode = 'login') => {
    setAuthMode(mode)
    setShowAuth(true)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, showAuth, setShowAuth, authMode, setAuthMode, openAuth, showAdmin, setShowAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
