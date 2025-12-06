// Import React - bibliothèque pour créer des composants
import React from 'react'
// Import du hook personnalisé useCart pour accéder aux données du panier
import { useCart } from '../context/CartContext'

// Composant CartModal - fenêtre popup qui affiche le contenu du panier
export default function CartModal() {
  // Récupération des données et fonctions depuis CartContext
  const { 
    cart,              // Tableau des articles dans le panier
    showCart,          // Boolean: le modal est-il visible?
    setShowCart,       // Fonction pour afficher/cacher le modal
    removeFromCart,    // Fonction pour retirer un article du panier
    updateQuantity,    // Fonction pour changer la quantité d'un article
    getCartTotal,      // Fonction pour calculer le prix total
    clearCart          // Fonction pour vider tout le panier
  } = useCart()

  // Si le modal est caché, ne rien afficher (retourne null)
  if (!showCart) return null

  return (
    // Overlay - fond sombre, cliquer dessus ferme le modal
    <div className="cart-modal-overlay" onClick={() => setShowCart(false)}>
      {/* Contenu du modal - stopPropagation empêche la fermeture quand on clique dedans */}
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* En-tête avec titre et bouton fermer */}
        <div className="cart-header">
          <h2>🛒 Panier d'achats</h2>
          <button className="close-btn" onClick={() => setShowCart(false)}>✕</button>
        </div>

        <div className="cart-content">
          {/* Rendu conditionnel: affiche différent contenu selon l'état du panier */}
          {cart.length === 0 ? (
            // PANIER VIDE - affiche message quand aucun article
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <h3>Votre panier est vide</h3>
              <p>Ajoutez des produits pour commencer!</p>
              <button className="btn primary" onClick={() => setShowCart(false)}>
                Continuer vos achats
              </button>
            </div>
          ) : (
            // PANIER CONTIENT DES ARTICLES - affiche liste et totaux
            <>
              {/* Liste des articles du panier */}
              <div className="cart-items">
                {/* Boucle à travers chaque article du panier et l'affiche */}
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    {/* Image du produit */}
                    <img src={item.img} alt={item.title} />
                    
                    {/* Détails du produit */}
                    <div className="cart-item-details">
                      <h4>{item.title}</h4>
                      <div className="cart-item-price">${item.price}</div>
                    </div>
                    
                    {/* Contrôles de quantité et bouton supprimer */}
                    <div className="cart-item-actions">
                      {/* Sélecteur de quantité avec boutons - et + */}
                      <div className="quantity-control">
                        {/* Diminuer la quantité de 1 */}
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        {/* Afficher la quantité actuelle */}
                        <span>{item.quantity}</span>
                        {/* Augmenter la quantité de 1 */}
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      {/* Bouton pour retirer l'article */}
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pied du panier avec totaux et boutons d'action */}
              <div className="cart-footer">
                {/* Résumé des prix */}
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Sous-total:</span>
                    {/* toFixed(2) formate à 2 décimales (ex: 99.00) */}
                    <strong>${getCartTotal().toFixed(2)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Livraison:</span>
                    <strong>Gratuite</strong>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <strong>${getCartTotal().toFixed(2)}</strong>
                  </div>
                </div>
                
                {/* Boutons d'action */}
                <div className="cart-actions">
                  {/* Vider tous les articles du panier */}
                  <button className="btn ghost" onClick={clearCart}>Vider le panier</button>
                  {/* Bouton paiement (non fonctionnel pour l'instant) */}
                  <button className="btn primary">Passer commande</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
