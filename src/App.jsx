// Importation de la bibliothèque React - obligatoire pour tous les composants React
import React from 'react'
// Importation des composants Router pour la navigation entre les pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Importation des Context Providers - ils enveloppent l'application pour partager des données globalement
import { AuthProvider } from './context/AuthContext'  // Gère l'authentification utilisateur (connexion/inscription)
import { CartProvider } from './context/CartContext'  // Gère l'état du panier d'achats
// Importation des composants réutilisables qui apparaissent sur chaque page
import Header from './components/Header'              // Barre de navigation en haut
import Footer from './components/Footer'              // Section pied de page en bas
import AuthModal from './components/AuthModal'        // Popup de connexion/inscription
import AdminDashboard from './components/AdminDashboard' // Panneau de contrôle administrateur
import CartModal from './components/CartModal'        // Popup du panier d'achats
// Importation des composants de page - chacun représente une route/URL différente
import Home from './pages/Home'                       // Page d'accueil (/)
import Shop from './pages/Shop'                       // Page boutique avec filtres (/shop)
import ProductsPage from './pages/ProductsPage'       // Produits vedettes (/products)
import Contact from './pages/Contact'                 // Page formulaire de contact (/contact)

// Composant App principal - la racine de toute notre application
export default function App(){
  return (
    // AuthProvider enveloppe tout pour fournir les données d'authentification à tous les composants
    <AuthProvider>
      {/* CartProvider enveloppe tout pour fournir les données du panier à tous les composants */}
      <CartProvider>
        {/* Router active la navigation entre différentes pages sans rechargement */}
        <Router>
          <div className="app-root">
            {/* Header apparaît en haut de chaque page */}
            <Header />
            
            {/* Zone de contenu principal - différentes pages s'afficheront ici selon l'URL */}
            <main>
              {/* Routes définit toutes les pages de notre application */}
              <Routes>
                {/* Chaque Route associe un chemin URL à un composant */}
                <Route path="/" element={<Home />} />           {/* Page d'accueil */}
                <Route path="/shop" element={<Shop />} />       {/* Page boutique */}
                <Route path="/products" element={<ProductsPage />} /> {/* Page produits */}
                <Route path="/contact" element={<Contact />} /> {/* Page contact */}
              </Routes>
            </main>
            
            {/* Footer apparaît en bas de chaque page */}
            <Footer />
            
            {/* Composants Modal - ils sont cachés jusqu'à ce qu'ils soient ouverts par une action utilisateur */}
            <AuthModal />        {/* Popup connexion/inscription */}
            <AdminDashboard />   {/* Popup tableau de bord admin */}
            <CartModal />        {/* Popup panier d'achats */}
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}
