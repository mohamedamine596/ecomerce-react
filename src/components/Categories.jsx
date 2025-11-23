import React from 'react'

const cats = [
  { title: 'Dining Chair', img: 'https://images.unsplash.com/photo-1578894385255-7f3c0c0f2a77?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=721f2a319b3a0f8c9e6b7a6f7a0c38b6' },
  { title: 'Sofa', img: 'https://images.unsplash.com/photo-1615874959477-1f0f7dc2b0f9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9bdf311c67df36a9bb7d14de9f6b8a32' },
  { title: 'Table', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6d1c15cd8d364e73f1f3b9b5afbd1fc9' }
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
