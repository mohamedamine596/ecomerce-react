// Import React et les hooks useState et useEffect
import React, { useState, useEffect } from 'react'
// Import du hook useCart pour ajouter des produits au panier
import { useCart } from '../context/CartContext'

// Page Products - affiche une sélection de produits en vedette
export default function Products() {
  // État pour stocker la liste des produits
  const [items, setItems] = useState([])
  // Récupération de la fonction addToCart depuis CartContext
  const { addToCart } = useCart()

  // Produits par défaut - sélection réduite de 6 produits vedettes
  const defaultItems = [
    { id: 1, title: 'Ensemble Canapé Moderne', price: 899, old: 1099, img: '/ecomerce-pic/pexels-pixabay-276583.jpg' },
    { id: 2, title: 'Fauteuil Élégant', price: 320, old: 400, img: '/ecomerce-pic/pexels-maksgelatin-4352247.jpg' },
    { id: 3, title: 'Chaise de Salle à Manger Classique', price: 189, old: null, img: '/ecomerce-pic/pexels-fotoaibe-1571460.jpg' },
    { id: 4, title: 'Ensemble Salon de Luxe', price: 1450, old: 1799, img: '/ecomerce-pic/pexels-pixabay-279746.jpg' },
    { id: 5, title: 'Table à Manger en Bois', price: 599, old: null, img: '/ecomerce-pic/pexels-marianne-67058-238377.jpg' },
    { id: 6, title: 'Chaise Contemporaine', price: 245, old: null, img: '/ecomerce-pic/pexels-pixabay-37347.jpg' }
  ]

  // useEffect s'exécute au chargement du composant
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

  return (
    <div className="page-container container">
      {/* En-tête de la page */}
      <div className="page-header">
        <h1>Produits en Vedette</h1>
        <p className="page-subtitle">Découvrez notre sélection de meubles premium triés sur le volet</p>
      </div>

      {/* Grille de produits */}
      <div className="products-grid">
        {/* Boucle à travers items et crée une carte pour chaque produit */}
        {items.map((p) => (
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
