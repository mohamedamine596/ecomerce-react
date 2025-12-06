// Importation de React et des hooks
import React, { useState } from 'react'
// Importation des composants de routage - Link crée une navigation cliquable, useLocation obtient l'URL actuelle
import { Link, useLocation } from 'react-router-dom'
// Importation des hooks personnalisés pour accéder aux données d'authentification et du panier
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

// Composant Header - s'affiche en haut de chaque page
export default function Header(){
  // Récupérer les fonctions et données d'authentification depuis AuthContext
  const { user, logout, openAuth, setShowAdmin } = useAuth()
  
  // Récupérer les fonctions du panier depuis CartContext
  const { setShowCart, getCartCount } = useCart()
  
  // State local pour contrôler la visibilité du menu déroulant utilisateur
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  // Obtenir la localisation/URL actuelle de la page (ex: "/shop", "/products")
  const location = useLocation()

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo - cliquer ramène à la page d'accueil */}
        <Link to="/" className="logo"> 
          <div className="logo-mark">HNA</div>
        </Link>

        {/* Menu de navigation */}
        <nav className="nav">
          {/* Chaque Link navigue vers une page différente */}
          {/* className ajoute le style 'active' si la page actuelle correspond au lien */}
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </nav>

        {/* Actions côté droit : recherche, menu utilisateur, panier */}
        <div className="header-actions">
          {/* Champ de recherche (actuellement juste visuel, non fonctionnel) */}
          <div className="search">
            <input placeholder="Search products" />
          </div>
          
          {/* Rendu conditionnel : afficher différent contenu selon si l'utilisateur est connecté */}
          {user ? (
            // UTILISATEUR CONNECTÉ - afficher le menu utilisateur avec nom
            <div className="user-menu">
              {/* Bouton affiche le prénom de l'utilisateur, bascule le dropdown au clic */}
              <button className="icon-btn user-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                🧑 {user.firstName}
              </button>
              
              {/* Menu déroulant - s'affiche seulement quand showUserMenu est true */}
              {showUserMenu && (
                <div className="user-dropdown">
                  {/* Afficher les informations complètes de l'utilisateur */}
                  <div className="user-info">
                    <strong>{user.firstName} {user.lastName}</strong>
                    <span>{user.email}</span>
                  </div>
                  
                  {/* Bouton Tableau de bord admin - s'affiche seulement si l'utilisateur est admin */}
                  {user.isAdmin && (
                    <button onClick={() => { setShowAdmin(true); setShowUserMenu(false) }}>
                      🛠️ Admin Dashboard
                    </button>
                  )}
                  
                  {/* Bouton Déconnexion - déconnecte l'utilisateur et ferme le menu */}
                  <button onClick={() => { logout(); setShowUserMenu(false) }}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            // UTILISATEUR NON CONNECTÉ - afficher le bouton icône de connexion
            <button className="icon-btn" onClick={() => openAuth('login')}>🧑</button>
          )}
          
          {/* Bouton Panier - ouvre la modal du panier */}
          <button className="icon-btn cart" onClick={() => setShowCart(true)}>
            🛒
            {/* Badge affichant le nombre d'articles - s'affiche seulement si le panier contient des articles */}
            {getCartCount() > 0 && <span className="badge">{getCartCount()}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}
