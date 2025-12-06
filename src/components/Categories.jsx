// Import React
import React from 'react'

// Tableau des catégories - chaque objet contient un titre et une image
// Stocké en dehors du composant car ces données ne changent pas
const cats = [
  { title: 'Chaise de salle à manger', img: '/ecomerce-pic/pexels-fotoaibe-1571460.jpg' },
  { title: 'Canapé', img: '/ecomerce-pic/pexels-pixabay-276583.jpg' },
  { title: 'Table', img: '/ecomerce-pic/pexels-marianne-67058-238377.jpg' }
]

// Composant Categories - affiche une grille de cartes de catégories
// Permet aux utilisateurs de voir les différents types de produits disponibles
export default function Categories(){
  return (
    <div className="categories-grid">
      {/* .map() parcourt le tableau cats et crée une carte pour chaque catégorie */}
      {/* (c, i) => c est la catégorie actuelle, i est l'index (0, 1, 2...) */}
      {cats.map((c, i) => (
        <div className="cat-card" key={i}>
          {/* Image de la catégorie */}
          <div className="cat-image"><img src={c.img} alt={c.title} /></div>
          {/* Titre de la catégorie - affiche c.title (ex: "Chaise de salle à manger") */}
          <div className="cat-title">{c.title}</div>
        </div>
      ))}
    </div>
  )
}
