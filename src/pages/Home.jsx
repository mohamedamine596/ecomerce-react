// Importation de la bibliothèque React
import React from 'react'
// Importation des composants qui constituent la page d'accueil
import Hero from '../components/Hero'              // Section bannière large avec image et boutons CTA
import Categories from '../components/Categories'  // Cartes de catégories (Chaises, Canapés, Tables)
import Products from '../components/Products'      // Grille de produits avec ajout au panier

// Composant page Home - la page d'atterrissage principale (/)
// C'est ce que les utilisateurs voient quand ils visitent le site pour la première fois
export default function Home() {
  return (
    <>
      {/* Section Hero - grande bannière en haut avec "Spring Collection" */}
      <Hero />
      
      {/* Section Catégories */}
      <section id="categories" className="section container">
        <h2 className="section-title">Shop by categories</h2>
        <Categories />  {/* Affiche 3 cartes de catégories */}
      </section>

      {/* Section Produits */}
      <section id="products" className="section container">
        <h2 className="section-title">Hot Products</h2>
        <Products />  {/* Affiche une grille de produits avec boutons ajout au panier */}
      </section>
    </>
  )
}
