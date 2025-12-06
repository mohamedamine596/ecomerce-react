// Import React et les hooks useState et useEffect
import React, { useState, useEffect } from 'react'
// Import du hook useCart pour ajouter des produits au panier
import { useCart } from '../context/CartContext'

// Page Shop - affiche tous les produits avec filtres par catégorie
export default function Shop() {
  // État pour stocker la liste des produits
  const [items, setItems] = useState([])
  // État pour le filtre actif ('all', 'chairs', 'sofas', 'tables')
  const [filter, setFilter] = useState('all')
  // Récupération de la fonction addToCart depuis CartContext
  const { addToCart } = useCart()

  // Produits par défaut - utilisés si aucun produit n'est dans localStorage
  // Chaque produit a: id, titre, prix, ancien prix (old), catégorie, image
  const defaultItems = [
    { id: 1, title: 'Ensemble Canapé Moderne', price: 899, old: 1099, category: 'sofas', img: '/ecomerce-pic/pexels-pixabay-276583.jpg' },
    { id: 2, title: 'Fauteuil Élégant', price: 320, old: 400, category: 'chairs', img: '/ecomerce-pic/pexels-maksgelatin-4352247.jpg' },
    { id: 3, title: 'Chaise de Salle à Manger Classique', price: 189, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-fotoaibe-1571460.jpg' },
    { id: 4, title: 'Ensemble Salon de Luxe', price: 1450, old: 1799, category: 'sofas', img: '/ecomerce-pic/pexels-pixabay-279746.jpg' },
    { id: 5, title: 'Table à Manger en Bois', price: 599, old: null, category: 'tables', img: '/ecomerce-pic/pexels-marianne-67058-238377.jpg' },
    { id: 6, title: 'Chaise Contemporaine', price: 245, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-pixabay-37347.jpg' },
    { id: 7, title: 'Fauteuil Confortable', price: 355, old: 449, category: 'chairs', img: '/ecomerce-pic/pexels-kowalievska-1148955.jpg' },
    { id: 8, title: 'Chaise de Bureau', price: 275, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-steve-923192.jpg' },
    { id: 9, title: 'Ensemble Salle à Manger Moderne', price: 799, old: null, category: 'tables', img: '/ecomerce-pic/pexels-pixabay-220749.jpg' },
    { id: 10, title: 'Canapé Classique', price: 1099, old: 1299, category: 'sofas', img: '/ecomerce-pic/pexels-falling4utah-1080696.jpg' },
    { id: 11, title: 'Chaise Vintage', price: 199, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-donaldtong94-133919.jpg' },
    { id: 12, title: 'Table Design', price: 449, old: 599, category: 'tables', img: '/ecomerce-pic/pexels-atbo-66986-245208.jpg' }
  ]

  // useEffect s'exécute au chargement du composant (tableau vide [] = une seule fois)
  useEffect(() => {
    // Essaie de récupérer les produits depuis localStorage
    const stored = localStorage.getItem('heyfa_products')
    if (stored) {
      // Convertit la chaîne JSON en objet JavaScript
      const parsed = JSON.parse(stored)
      // Si des produits existent, les utiliser
      if (parsed.length > 0) {
        setItems(parsed)
      } else {
        // Sinon utiliser les produits par défaut
        setItems(defaultItems)
      }
    } else {
      // Si rien dans localStorage, utiliser les produits par défaut
      setItems(defaultItems)
    }
  }, [])

  // Filtre les produits selon la catégorie sélectionnée
  // Si filter === 'all', montre tous les produits
  // Sinon, ne garde que les produits de la catégorie choisie
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter)

  return (
    <div className="page-container container">
      {/* En-tête de la page */}
      <div className="page-header">
        <h1>Tous les Produits</h1>
        <p className="page-subtitle">Parcourez notre collection complète de meubles</p>
      </div>

      {/* Barre de filtres - boutons pour filtrer par catégorie */}
      <div className="filter-bar">
        {/* Bouton "Tous les produits" - classe 'active' si c'est le filtre sélectionné */}
        <button 
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >
          Tous les produits
        </button>
        {/* Bouton "Chaises" */}
        <button 
          className={filter === 'chairs' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('chairs')}
        >
          Chaises
        </button>
        {/* Bouton "Canapés" */}
        <button 
          className={filter === 'sofas' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('sofas')}
        >
          Canapés
        </button>
        {/* Bouton "Tables" */}
        <button 
          className={filter === 'tables' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('tables')}
        >
          Tables
        </button>
      </div>

      {/* Grille de produits - affiche les produits filtrés */}
      <div className="products-grid">
        {/* Boucle à travers filteredItems et crée une carte pour chaque produit */}
        {filteredItems.map((p) => (
          <div className="product-card" key={p.id}>
            {/* Section image */}
            <div className="product-image">
              <img src={p.img} alt={p.title} />
              {/* Badge "Sale" - s'affiche seulement si le produit a un ancien prix */}
              {p.old && <div className="badge">Promo</div>}
            </div>
            {/* Section détails du produit */}
            <div className="product-body">
              <div className="product-info">
                {/* Titre du produit */}
                <div className="product-title">{p.title}</div>
                {/* Section prix */}
                <div className="product-price">
                  {/* Prix actuel */}
                  <span className="price">${p.price}</span>
                  {/* Ancien prix barré - s'affiche seulement en promo */}
                  {p.old && <span className="old">${p.old}</span>}
                </div>
              </div>
              {/* Bouton ajouter au panier */}
              <button className="add-to-cart-btn" onClick={() => addToCart(p)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
