import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function Products() {
  const [items, setItems] = useState([])
  const { addToCart } = useCart()

  const defaultItems = [
    { id: 1, title: 'Modern Sofa Set', price: 899, old: 1099, img: '/ecomerce-pic/pexels-pixabay-276583.jpg' },
    { id: 2, title: 'Elegant Armchair', price: 320, old: 400, img: '/ecomerce-pic/pexels-maksgelatin-4352247.jpg' },
    { id: 3, title: 'Classic Dining Chair', price: 189, old: null, img: '/ecomerce-pic/pexels-fotoaibe-1571460.jpg' },
    { id: 4, title: 'Luxury Living Room Set', price: 1450, old: 1799, img: '/ecomerce-pic/pexels-pixabay-279746.jpg' },
    { id: 5, title: 'Wooden Dining Table', price: 599, old: null, img: '/ecomerce-pic/pexels-marianne-67058-238377.jpg' },
    { id: 6, title: 'Contemporary Chair', price: 245, old: null, img: '/ecomerce-pic/pexels-pixabay-37347.jpg' }
  ]

  useEffect(() => {
    const stored = localStorage.getItem('heyfa_products')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed.length > 0) {
        setItems(parsed)
      } else {
        setItems(defaultItems)
      }
    } else {
      setItems(defaultItems)
    }
  }, [])

  return (
    <div className="page-container container">
      <div className="page-header">
        <h1>Featured Products</h1>
        <p className="page-subtitle">Discover our handpicked selection of premium furniture</p>
      </div>

      <div className="products-grid">
        {items.map((p) => (
          <div className="product-card" key={p.id}>
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
              <button className="add-to-cart-btn" onClick={() => addToCart(p)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
