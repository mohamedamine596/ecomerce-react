// Import React - bibliothèque pour créer des interfaces utilisateur
import React from 'react'
// Import Link - composant de react-router-dom pour naviguer entre pages sans rechargement
import { Link } from 'react-router-dom'

// Chemin de l'image Hero - stocké dans une constante pour faciliter la maintenance
const heroImage = '/ecomerce-pic/pexels-maksgelatin-4352247.jpg'

// Composant Hero - grande bannière en haut de la page d'accueil
// Affiche du contenu promotionnel avec des boutons d'action
export default function Hero(){
  return (
    <section className="hero">
      <div className="container hero-inner">
        {/* Côté gauche - contenu texte et boutons */}
        <div className="hero-left">
          {/* Petit label au-dessus du titre principal */}
          <div className="eyebrow">Nouveautés</div>
          
          {/* Titre principal (h1 pour SEO) */}
          <h1 className="hero-title">Collection Printemps</h1>
          
          {/* Texte de description */}
          <p className="hero-sub">Meubles Heyfa 2020 — une sélection de pièces modernes et élégantes pour votre maison.</p>
          
          {/* Boutons d'appel à l'action (CTA = Call To Action) */}
          <div className="hero-cta">
            {/* Bouton principal - navigue vers la page Shop quand on clique */}
            <Link to="/shop" className="btn primary">Acheter maintenant</Link>
            {/* Bouton secondaire - navigue vers la page Products */}
            <Link to="/products" className="btn ghost">Voir la collection</Link>
          </div>
        </div>

        {/* Côté droit - image hero */}
        <div className="hero-right">
          <div className="hero-image-wrap">
            {/* Image principale du hero */}
            <img src={heroImage} alt="chaise" />
            {/* Numéro décoratif superposé sur l'image */}
            <div className="hero-number">01</div>
          </div>
        </div>
      </div>
    </section>
  )
}
