import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function Shop() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const { addToCart } = useCart()

  const defaultItems = [
    { id: 1, title: 'Modern Sofa Set', price: 899, old: 1099, category: 'sofas', img: '/ecomerce-pic/pexels-pixabay-276583.jpg' },
    { id: 2, title: 'Elegant Armchair', price: 320, old: 400, category: 'chairs', img: '/ecomerce-pic/pexels-maksgelatin-4352247.jpg' },
    { id: 3, title: 'Classic Dining Chair', price: 189, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-fotoaibe-1571460.jpg' },
    { id: 4, title: 'Luxury Living Room Set', price: 1450, old: 1799, category: 'sofas', img: '/ecomerce-pic/pexels-pixabay-279746.jpg' },
    { id: 5, title: 'Wooden Dining Table', price: 599, old: null, category: 'tables', img: '/ecomerce-pic/pexels-marianne-67058-238377.jpg' },
    { id: 6, title: 'Contemporary Chair', price: 245, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-pixabay-37347.jpg' },
    { id: 7, title: 'Cozy Armchair', price: 355, old: 449, category: 'chairs', img: '/ecomerce-pic/pexels-kowalievska-1148955.jpg' },
    { id: 8, title: 'Office Chair', price: 275, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-steve-923192.jpg' },
    { id: 9, title: 'Modern Dining Set', price: 799, old: null, category: 'tables', img: '/ecomerce-pic/pexels-pixabay-220749.jpg' },
    { id: 10, title: 'Classic Sofa', price: 1099, old: 1299, category: 'sofas', img: '/ecomerce-pic/pexels-falling4utah-1080696.jpg' },
    { id: 11, title: 'Vintage Chair', price: 199, old: null, category: 'chairs', img: '/ecomerce-pic/pexels-donaldtong94-133919.jpg' },
    { id: 12, title: 'Designer Table', price: 449, old: 599, category: 'tables', img: '/ecomerce-pic/pexels-atbo-66986-245208.jpg' }
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

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter)

  return (
    <div className="page-container container">
      <div className="page-header">
        <h1>Shop All Products</h1>
        <p className="page-subtitle">Browse our complete furniture collection</p>
      </div>

      <div className="filter-bar">
        <button 
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >
          All Products
        </button>
        <button 
          className={filter === 'chairs' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('chairs')}
        >
          Chairs
        </button>
        <button 
          className={filter === 'sofas' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('sofas')}
        >
          Sofas
        </button>
        <button 
          className={filter === 'tables' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('tables')}
        >
          Tables
        </button>
      </div>

      <div className="products-grid">
        {filteredItems.map((p) => (
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
