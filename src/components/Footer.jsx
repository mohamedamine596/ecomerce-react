// Import React - bibliothèque pour créer des composants
import React from 'react'

// Composant Footer - pied de page du site
// S'affiche en bas de chaque page avec informations de l'entreprise et liens
export default function Footer(){
  return (
    <footer id="footer" className="site-footer">
      <div className="container footer-inner">
        {/* Section marque/logo avec slogan */}
        <div className="footer-brand">
          {/* Logo HNA */}
          <div className="logo-mark">HNA</div>
          <div>
            {/* Slogan de l'entreprise (muted = texte gris/discret) */}
            <div className="muted">Meubles de qualité depuis 2020</div>
          </div>
        </div>

        {/* Section liens - organisée en colonnes */}
        <div className="footer-links">
          {/* Colonne 1 - liens shopping */}
          <div>
            <strong>Boutique</strong>
            <div>Meubles</div>
            <div>Nouveautés</div>
          </div>
          {/* Colonne 2 - liens entreprise */}
          <div>
            <strong>Entreprise</strong>
            <div>À propos</div>
            <div>Contact</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
