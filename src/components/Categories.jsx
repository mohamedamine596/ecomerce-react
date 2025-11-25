import React from 'react'

const cats = [
  { title: 'Dining Chair', img: '/ecomerce-pic/pexels-fotoaibe-1571460.jpg' },
  { title: 'Sofa', img: '/ecomerce-pic/pexels-pixabay-276583.jpg' },
  { title: 'Table', img: '/ecomerce-pic/pexels-marianne-67058-238377.jpg' }
]

export default function Categories(){
  return (
    <div className="categories-grid">
      {cats.map((c, i) => (
        <div className="cat-card" key={i}>
          <div className="cat-image"><img src={c.img} alt={c.title} /></div>
          <div className="cat-title">{c.title}</div>
        </div>
      ))}
    </div>
  )
}
