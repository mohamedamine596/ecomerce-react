import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const defaultItems = [
  { id: 1, title: 'Comfy Armchair', price: 320, old: 400, img: 'https://images.unsplash.com/photo-1582582494703-84f4d97cea90?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f7fb2d9fe2f4d8b8e8b0a3d1f6a8b2a' },
  { id: 2, title: 'Modern Swivel', price: 255, old: null, img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5f1f7a3e5b4d6a7e3c9e2b2d9c1e8f7a' },
  { id: 3, title: 'Argo Ottoman', price: 189, old: 249, img: 'https://images.unsplash.com/photo-1578894385255-7f3c0c0f2a77?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=721f2a319b3a0f8c9e6b7a6f7a0c38b6' },
  { id: 4, title: 'Wooden Chair', price: 145, old: null, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6d1c15cd8d364e73f1f3b9b5afbd1fc9' }
]

export default function Products(){
  const [items, setItems] = useState(defaultItems)
  const { addToCart } = useCart()

  useEffect(() => {
    const stored = localStorage.getItem('heyfa_products')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.length > 0) setItems(parsed)
    }
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  return (
    <div className="products-grid">
      {items.map((p, i) => (
        <div className="product-card" key={p.id || i}>
          <div className="product-image">
            <img src={p.img} alt={p.title} />
            {p.old && <div className="badge">Sale</div>}
          </div>
          <div className="product-body">
            <div className="product-info">
              <div className="product-title">{p.title}</div>
              <div className="product-price">
                <span className="price">${p.price}</span>
                {p.old && <span className="old">${p.old}</span>}
              </div>
            </div>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(p)}>
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
