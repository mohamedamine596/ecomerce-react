import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AdminDashboard() {
  const { user, showAdmin, setShowAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    oldPrice: '',
    img: '',
    category: 'chairs'
  })

  const availableImages = [
    '/ecomerce-pic/pexels-pixabay-276583.jpg',
    '/ecomerce-pic/pexels-maksgelatin-4352247.jpg',
    '/ecomerce-pic/pexels-fotoaibe-1571460.jpg',
    '/ecomerce-pic/pexels-pixabay-279746.jpg',
    '/ecomerce-pic/pexels-marianne-67058-238377.jpg',
    '/ecomerce-pic/pexels-pixabay-37347.jpg',
    '/ecomerce-pic/pexels-kowalievska-1148955.jpg',
    '/ecomerce-pic/pexels-steve-923192.jpg',
    '/ecomerce-pic/pexels-pixabay-220749.jpg',
    '/ecomerce-pic/pexels-falling4utah-1080696.jpg',
    '/ecomerce-pic/pexels-donaldtong94-133919.jpg',
    '/ecomerce-pic/pexels-atbo-66986-245208.jpg',
    '/ecomerce-pic/pexels-dropshado-2251247.jpg',
    '/ecomerce-pic/pexels-eric-mufasa-578798-1350789.jpg',
    '/ecomerce-pic/pexels-medhat-ayad-122846-447592.jpg'
  ]

  useEffect(() => {
    loadProducts()
    loadUsers()
  }, [])

  const loadProducts = () => {
    const stored = localStorage.getItem('heyfa_products')
    if (stored) setProducts(JSON.parse(stored))
  }

  const loadUsers = () => {
    const stored = localStorage.getItem('heyfa_users')
    if (stored) setUsers(JSON.parse(stored))
  }

  const handleProductSubmit = (e) => {
    e.preventDefault()
    const newProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      title: productForm.title,
      price: parseFloat(productForm.price),
      old: productForm.oldPrice ? parseFloat(productForm.oldPrice) : null,
      category: productForm.category,
      img: productForm.img || '/ecomerce-pic/pexels-pixabay-276583.jpg'
    }

    let updatedProducts
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p)
    } else {
      updatedProducts = [...products, newProduct]
    }

    localStorage.setItem('heyfa_products', JSON.stringify(updatedProducts))
    setProducts(updatedProducts)
    setShowProductForm(false)
    setEditingProduct(null)
    setProductForm({ title: '', price: '', oldPrice: '', img: '', category: 'chairs' })
  }

  const deleteProduct = (id) => {
    if (confirm('Delete this product?')) {
      const updated = products.filter(p => p.id !== id)
      localStorage.setItem('heyfa_products', JSON.stringify(updated))
      setProducts(updated)
    }
  }

  const editProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      title: product.title,
      price: product.price,
      oldPrice: product.old || '',
      img: product.img,
      category: product.category || 'chairs'
    })
    setShowProductForm(true)
  }

  const deleteUser = (email) => {
    if (confirm('Delete this user?')) {
      const updated = users.filter(u => u.email !== email)
      localStorage.setItem('heyfa_users', JSON.stringify(updated))
      setUsers(updated)
    }
  }

  const toggleUserRole = (email) => {
    const updated = users.map(u => 
      u.email === email ? { ...u, isAdmin: !u.isAdmin } : u
    )
    localStorage.setItem('heyfa_users', JSON.stringify(updated))
    setUsers(updated)
  }

  if (!showAdmin) return null

  return (
    <div className="admin-modal-overlay" onClick={() => setShowAdmin(false)}>
      <div className="admin-dashboard" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <h2>🛠️ Admin Dashboard</h2>
          <button className="close-btn" onClick={() => setShowAdmin(false)}>✕</button>
        </div>

        <div className="admin-tabs">
          <button 
            className={activeTab === 'products' ? 'active' : ''} 
            onClick={() => setActiveTab('products')}
          >
            📦 Products
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'products' && (
            <div className="admin-section">
              <div className="section-header">
                <h3>Manage Products</h3>
                <button className="btn primary" onClick={() => setShowProductForm(true)}>
                  + Add Product
                </button>
              </div>

              {showProductForm && (
                <div className="product-form-card">
                  <h4>{editingProduct ? 'Edit Product' : 'New Product'}</h4>
                  <form onSubmit={handleProductSubmit}>
                    <div className="form-group">
                      <label>Product Title</label>
                      <input
                        type="text"
                        value={productForm.title}
                        onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Old Price ($) - Optional</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.oldPrice}
                          onChange={(e) => setProductForm({...productForm, oldPrice: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                        required
                      >
                        <option value="chairs">Chairs</option>
                        <option value="sofas">Sofas</option>
                        <option value="tables">Tables</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Product Image</label>
                      <select
                        value={productForm.img}
                        onChange={(e) => setProductForm({...productForm, img: e.target.value})}
                        required
                      >
                        <option value="">Select an image...</option>
                        {availableImages.map((img, idx) => (
                          <option key={idx} value={img}>
                            {img.split('/').pop().replace('.jpg', '')}
                          </option>
                        ))}
                      </select>
                      {productForm.img && (
                        <div className="image-preview">
                          <img src={productForm.img} alt="Preview" />
                        </div>
                      )}
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn primary">
                        {editingProduct ? 'Update' : 'Add'} Product
                      </button>
                      <button 
                        type="button" 
                        className="btn ghost" 
                        onClick={() => {
                          setShowProductForm(false)
                          setEditingProduct(null)
                          setProductForm({ title: '', price: '', oldPrice: '', img: '', category: 'chairs' })
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Old Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{textAlign: 'center', color: 'var(--muted)'}}>
                          No products yet. Add your first product!
                        </td>
                      </tr>
                    )}
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>
                          <img src={product.img} alt={product.title} className="table-img" />
                        </td>
                        <td>{product.title}</td>
                        <td><span className="category-tag">{product.category || 'chairs'}</span></td>
                        <td>${product.price}</td>
                        <td>{product.old ? `$${product.old}` : '-'}</td>
                        <td>
                          <button className="btn-icon" onClick={() => editProduct(product)}>✏️</button>
                          <button className="btn-icon" onClick={() => deleteProduct(product.id)}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="admin-section">
              <div className="section-header">
                <h3>Manage Users</h3>
                <span className="user-count">{users.length} total users</span>
              </div>

              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{textAlign: 'center', color: 'var(--muted)'}}>
                          No users registered yet
                        </td>
                      </tr>
                    )}
                    {users.map(u => (
                      <tr key={u.email}>
                        <td>{u.firstName} {u.lastName}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`role-badge ${u.isAdmin ? 'admin' : 'user'}`}>
                            {u.isAdmin ? '👑 Admin' : '👤 User'}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn-icon" 
                            onClick={() => toggleUserRole(u.email)}
                            title="Toggle admin role"
                          >
                            {u.isAdmin ? '⬇️' : '⬆️'}
                          </button>
                          <button 
                            className="btn-icon" 
                            onClick={() => deleteUser(u.email)}
                            title="Delete user"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
