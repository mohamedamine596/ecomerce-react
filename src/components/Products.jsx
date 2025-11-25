import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

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
