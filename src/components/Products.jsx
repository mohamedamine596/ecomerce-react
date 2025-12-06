// Importation des hooks React pour l'état et les effets secondaires
import React, { useState, useEffect } from 'react'
// Importation du hook panier pour ajouter des produits au panier
import { useCart } from '../context/CartContext'

// Données produits par défaut - utilisées si aucun produit n'existe dans localStorage
// Chaque produit a : id, title, price, old price (pour les soldes), category, et chemin d'image
const defaultItems = [
  { id: 1, title: 'Modern Sofa Set', price: 899, old: 1099, category: 'sofas', img: '/ecomerce-pic/pexels-pixabay-276583.jpg' },
  { id: 2, title: 'Elegant Armchair', price: 320, old: 400, category: 'chairs', img: '/ecomerce-pic/pexels-maksgelatin-4352247.jpg' },
  { id: 3, title: 'Classic Dining Chair', price: 189, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-fotoaibe-1571460.jpg' },
  { id: 4, title: 'Luxury Living Room Set', price: 1450, old: 1799, category: 'sofas', img: '/ecomerce-pic/pexels-pixabay-279746.jpg' },
  { id: 5, title: 'Wooden Dining Table', price: 599, old: null, category: 'tables', img: '/ecomerce-pic/pexels-marianne-67058-238377.jpg' },
  { id: 6, title: 'Contemporary Chair', price: 245, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-pixabay-37347.jpg' },
  { id: 7, title: 'Cozy Armchair', price: 355, old: 449, category: 'chairs', img: '/ecomerce-pic/pexels-kowalievska-1148955.jpg' },
  { id: 8, title: 'Office Chair', price: 275, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-steve-923192.jpg' }
]

// Composant Products - affiche la grille de produits sur la page d'accueil
export default function Products(){
  // State : items stocke le tableau des produits à afficher
  const [items, setItems] = useState(defaultItems)
  
  // Récupérer la fonction addToCart depuis CartContext
  const { addToCart } = useCart()

  // useEffect : Charger les produits depuis localStorage quand le composant monte
  useEffect(() => {
    const stored = localStorage.getItem('heyfa_products')
    if (stored) {
      const parsed = JSON.parse(stored)  // Convertir la chaîne JSON en tableau
      // Si l'admin a ajouté des produits, utiliser ceux-là au lieu des défauts
      if (parsed.length > 0) setItems(parsed)
    }
  }, [])  // Tableau vide = exécuter une fois au montage

  // Fonction pour ajouter un produit au panier d'achats
  const handleAddToCart = (product) => {
    addToCart(product)  // Appeler addToCart depuis CartContext
  }

  return (
    // Conteneur grille - affiche les produits en grille responsive
    <div className="products-grid">
      {/* map() boucle à travers chaque produit et crée une carte pour lui */}
      {/* "p" est chaque objet produit, "i" est le numéro d'index */}
      {items.map((p, i) => (
        // Carte produit - key aide React à suivre quels éléments ont changé
        <div className="product-card" key={p.id || i}>
          {/* Section image du produit */}
          <div className="product-image">
            <img src={p.img} alt={p.title} />
            {/* Badge "Sale" - s'affiche seulement si le produit a un ancien prix (p.old existe) */}
            {p.old && <div className="badge">Sale</div>}
          </div>
          
          {/* Section détails du produit */}
          <div className="product-body">
            <div className="product-info">
              {/* Nom du produit */}
              <div className="product-title">{p.title}</div>
              {/* Section prix */}
              <div className="product-price">
                {/* Prix actuel */}
                <span className="price">${p.price}</span>
                {/* Ancien prix (barré) - s'affiche seulement si en solde */}
                {p.old && <span className="old">${p.old}</span>}
              </div>
            </div>
            {/* Bouton ajouter au panier - appelle handleAddToCart au clic */}
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(p)}>
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
