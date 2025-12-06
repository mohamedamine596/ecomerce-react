// Importation des hooks React pour gérer l'état du panier globalement
import React, { createContext, useContext, useState, useEffect } from 'react'

// Créer un Context pour le panier d'achats - rend le panier accessible depuis n'importe quel composant
const CartContext = createContext()

// Composant CartProvider - gère toute la logique du panier d'achats
export function CartProvider({ children }) {
  // STATE : cart est un tableau de produits avec quantités
  // Exemple : [{ id: 1, title: "Chaise", price: 100, quantity: 2, img: "..." }]
  const [cart, setCart] = useState([])
  
  // showCart : contrôle si la modal du panier est visible (true/false)
  const [showCart, setShowCart] = useState(false)

  // useEffect : Charger le panier sauvegardé depuis le stockage du navigateur au démarrage de l'app
  useEffect(() => {
    const stored = localStorage.getItem('heyfa_cart')
    if (stored) setCart(JSON.parse(stored))  // Convertir la chaîne JSON en tableau
  }, [])  // Tableau vide = exécuter une seule fois au montage du composant

  // useEffect : Sauvegarder le panier dans le stockage du navigateur à chaque changement
  // Cela garde les données du panier même si l'utilisateur ferme le navigateur
  useEffect(() => {
    localStorage.setItem('heyfa_cart', JSON.stringify(cart))  // Convertir en chaîne JSON
  }, [cart])  // S'exécute à chaque fois que l'état cart change

  // FONCTION AJOUTER AU PANIER : Ajoute un produit ou augmente la quantité s'il existe déjà
  const addToCart = (product) => {
    setCart(prevCart => {  // prevCart est l'état actuel du panier
      // Vérifier si le produit existe déjà dans le panier en comparant les IDs
      const existing = prevCart.find(item => item.id === product.id)
      
      if (existing) {
        // Le produit existe - augmenter sa quantité de 1
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }  // Mettre à jour la quantité
            : item  // Garder les autres articles inchangés
        )
      }
      // Le produit n'existe pas - l'ajouter avec quantité 1
      // ...prevCart étend les articles existants, puis ajoute le nouveau produit
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  // RETIRER DU PANIER : Supprime complètement un produit du panier
  const removeFromCart = (productId) => {
    // filter crée un nouveau tableau sans l'article supprimé
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // METTRE À JOUR QUANTITÉ : Change la quantité d'un produit dans le panier
  const updateQuantity = (productId, quantity) => {
    // Si la quantité est 0 ou moins, supprimer complètement l'article
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    // Sinon, mettre à jour la quantité
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  // VIDER PANIER : Supprime tous les articles du panier
  const clearCart = () => {
    setCart([])  // Définir le panier comme tableau vide
  }

  // OBTENIR TOTAL PANIER : Calcule le prix total de tous les articles
  const getCartTotal = () => {
    // reduce() additionne tous les (prix * quantité) pour chaque article
    // Exemple : article1: 50$ x 2 = 100$, article2: 30$ x 1 = 30$, total = 130$
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // OBTENIR NOMBRE ARTICLES : Calcule le nombre total d'articles (somme de toutes les quantités)
  const getCartCount = () => {
    // reduce() additionne toutes les quantités
    // Exemple : 2 chaises + 1 table = 3 articles au total
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  // Provider rend toutes les fonctions et données du panier disponibles aux composants enfants
  return (
    <CartContext.Provider
      value={{
        cart,            // Tableau des articles du panier
        showCart,        // La modal du panier est-elle visible ?
        setShowCart,     // Fonction pour afficher/masquer la modal du panier
        addToCart,       // Fonction pour ajouter un produit au panier
        removeFromCart,  // Fonction pour retirer un produit du panier
        updateQuantity,  // Fonction pour changer la quantité d'un produit
        clearCart,       // Fonction pour vider le panier
        getCartTotal,    // Fonction pour calculer le prix total
        getCartCount     // Fonction pour compter le nombre total d'articles
      }}
    >
      {children}  {/* Rendre tous les composants enfants */}
    </CartContext.Provider>
  )
}

// Hook personnalisé pour accéder facilement au contexte du panier
// Utilisation : const { cart, addToCart, removeFromCart } = useCart()
export const useCart = () => useContext(CartContext)
