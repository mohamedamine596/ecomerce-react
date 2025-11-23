import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header(){
  const { user, logout, openAuth, setShowAdmin } = useAuth()
  const { setShowCart, getCartCount } = useCart()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if(element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo"> 
          <div className="logo-mark">H</div>
          <div className="logo-text">Heyfa</div>
        </div>

        <nav className="nav">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}) }}>Home</a>
          <a href="#categories" onClick={(e) => { e.preventDefault(); scrollToSection('categories') }}>Shop</a>
          <a href="#products" onClick={(e) => { e.preventDefault(); scrollToSection('products') }}>Products</a>
          <a href="#footer" onClick={(e) => { e.preventDefault(); scrollToSection('footer') }}>Contact</a>
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
