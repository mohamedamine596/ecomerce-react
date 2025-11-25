import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header(){
  const { user, logout, openAuth, setShowAdmin } = useAuth()
  const { setShowCart, getCartCount } = useCart()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo"> 
          <div className="logo-mark">HNA</div>
        </Link>

        <nav className="nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </nav>

        <div className="header-actions">
          <div className="search">
            <input placeholder="Search products" />
          </div>
          
          {user ? (
            <div className="user-menu">
              <button className="icon-btn user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                🧑 {user.firstName}
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <strong>{user.firstName} {user.lastName}</strong>
                    <span>{user.email}</span>
                  </div>
                  {user.isAdmin && (
                    <button onClick={() => { setShowAdmin(true); setShowUserMenu(false) }}>
                      🛠️ Admin Dashboard
                    </button>
                  )}
                  <button onClick={() => { logout(); setShowUserMenu(false) }}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button className="icon-btn" onClick={() => openAuth('login')}>🧑</button>
          )}
          
          <button className="icon-btn cart" onClick={() => setShowCart(true)}>
            🛒
            {getCartCount() > 0 && <span className="badge">{getCartCount()}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}
