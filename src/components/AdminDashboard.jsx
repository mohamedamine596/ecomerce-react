// Import React et les hooks useState et useEffect
import React, { useState, useEffect } from 'react'
// Import du hook useAuth pour accéder aux informations d'authentification
import { useAuth } from '../context/AuthContext'

// Composant AdminDashboard - panneau d'administration pour gérer produits et utilisateurs
// Accessible uniquement aux utilisateurs avec le rôle admin
export default function AdminDashboard() {
  // Récupération des données depuis AuthContext
  const { user, showAdmin, setShowAdmin } = useAuth()
  
  // État pour l'onglet actif ('products' ou 'users')
  const [activeTab, setActiveTab] = useState('products')
  // État pour la liste des produits
  const [products, setProducts] = useState([])
  // État pour la liste des utilisateurs
  const [users, setUsers] = useState([])
  // État pour afficher/cacher le formulaire d'ajout de produit
  const [showProductForm, setShowProductForm] = useState(false)
  // État pour suivre le produit en cours d'édition (null si création)
  const [editingProduct, setEditingProduct] = useState(null)
  // État pour les données du formulaire de produit
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    oldPrice: '',
    img: '',
    category: 'chairs'
  })

  // Tableau des images disponibles dans le dossier ecomerce-pic
  // L'admin peut choisir parmi ces images lors de la création d'un produit
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

  // useEffect s'exécute au chargement du composant
  useEffect(() => {
    loadProducts()
    loadUsers()
  }, [])

  // Fonction pour charger les produits depuis localStorage
  const loadProducts = () => {
    const stored = localStorage.getItem('heyfa_products')
    if (stored) setProducts(JSON.parse(stored))
  }

  // Fonction pour charger les utilisateurs depuis localStorage
  const loadUsers = () => {
    const stored = localStorage.getItem('heyfa_users')
    if (stored) setUsers(JSON.parse(stored))
  }

  // Fonction appelée quand le formulaire de produit est soumis
  const handleProductSubmit = (e) => {
    // Empêche le rechargement de la page
    e.preventDefault()
    
    // Crée un objet produit avec les données du formulaire
    const newProduct = {
      // Si on édite, garde l'ancien ID, sinon utilise timestamp comme ID unique
      id: editingProduct ? editingProduct.id : Date.now(),
      title: productForm.title,
      // parseFloat convertit la chaîne en nombre décimal
      price: parseFloat(productForm.price),
      // Si oldPrice existe, le convertir en nombre, sinon null
      old: productForm.oldPrice ? parseFloat(productForm.oldPrice) : null,
      category: productForm.category,
      // Utilise l'image sélectionnée ou une image par défaut
      img: productForm.img || '/ecomerce-pic/pexels-pixabay-276583.jpg'
    }

    let updatedProducts
    if (editingProduct) {
      // Mode édition: remplace le produit existant
      updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p)
    } else {
      // Mode ajout: ajoute le nouveau produit à la liste
      updatedProducts = [...products, newProduct]
    }

    // Sauvegarde dans localStorage
    localStorage.setItem('heyfa_products', JSON.stringify(updatedProducts))
    // Met à jour l'état
    setProducts(updatedProducts)
    // Ferme le formulaire
    setShowProductForm(false)
    // Réinitialise le mode édition
    setEditingProduct(null)
    // Vide le formulaire
    setProductForm({ title: '', price: '', oldPrice: '', img: '', category: 'chairs' })
  }

  // Fonction pour supprimer un produit
  const deleteProduct = (id) => {
    // Demande confirmation avant de supprimer
    if (confirm('Supprimer ce produit?')) {
      // Filtre pour garder tous les produits sauf celui à supprimer
      const updated = products.filter(p => p.id !== id)
      localStorage.setItem('heyfa_products', JSON.stringify(updated))
      setProducts(updated)
    }
  }

  // Fonction pour entrer en mode édition d'un produit
  const editProduct = (product) => {
    // Définit le produit en cours d'édition
    setEditingProduct(product)
    // Pré-remplit le formulaire avec les données du produit
    setProductForm({
      title: product.title,
      price: product.price,
      oldPrice: product.old || '',
      img: product.img,
      category: product.category || 'chairs'
    })
    // Affiche le formulaire
    setShowProductForm(true)
  }

  // Fonction pour supprimer un utilisateur
  const deleteUser = (email) => {
    if (confirm('Supprimer cet utilisateur?')) {
      const updated = users.filter(u => u.email !== email)
      localStorage.setItem('heyfa_users', JSON.stringify(updated))
      setUsers(updated)
    }
  }

  // Fonction pour basculer le rôle admin d'un utilisateur
  const toggleUserRole = (email) => {
    // Parcourt les utilisateurs et inverse isAdmin pour l'utilisateur sélectionné
    const updated = users.map(u => 
      u.email === email ? { ...u, isAdmin: !u.isAdmin } : u
    )
    localStorage.setItem('heyfa_users', JSON.stringify(updated))
    setUsers(updated)
  }

  // Si le dashboard n'est pas affiché, ne rien afficher
  if (!showAdmin) return null

  return (
    // Overlay sombre qui couvre toute la page
    <div className="admin-modal-overlay" onClick={() => setShowAdmin(false)}>
      {/* Panneau admin - stopPropagation empêche la fermeture quand on clique dedans */}
      <div className="admin-dashboard" onClick={(e) => e.stopPropagation()}>
        {/* En-tête avec titre et bouton fermer */}
        <div className="admin-header">
          <h2>🛠️ Panneau d'Administration</h2>
          <button className="close-btn" onClick={() => setShowAdmin(false)}>✕</button>
        </div>

        {/* Onglets pour basculer entre gestion produits et utilisateurs */}
        <div className="admin-tabs">
          <button 
            className={activeTab === 'products' ? 'active' : ''} 
            onClick={() => setActiveTab('products')}
          >
            📦 Produits
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            👥 Utilisateurs
          </button>
        </div>

        {/* Contenu principal - change selon l'onglet actif */}
        <div className="admin-content">
          {/* ONGLET PRODUITS */}
          {activeTab === 'products' && (
            <div className="admin-section">
              {/* En-tête de section avec bouton ajouter */}
              <div className="section-header">
                <h3>Gérer les Produits</h3>
                <button className="btn primary" onClick={() => setShowProductForm(true)}>
                  + Ajouter un Produit
                </button>
              </div>

              {/* Formulaire de produit - s'affiche seulement si showProductForm est vrai */}
              {showProductForm && (
                <div className="product-form-card">
                  {/* Titre change selon mode édition ou création */}
                  <h4>{editingProduct ? 'Modifier le Produit' : 'Nouveau Produit'}</h4>
                  <form onSubmit={handleProductSubmit}>
                    {/* Champ Titre */}
                    <div className="form-group">
                      <label>Titre du Produit</label>
                      <input
                        type="text"
                        value={productForm.title}
                        onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                        required
                      />
                    </div>
                    {/* Ligne avec 2 champs côte à côte */}
                    <div className="form-row">
                      {/* Champ Prix */}
                      <div className="form-group">
                        <label>Prix ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                          required
                        />
                      </div>
                      {/* Champ Ancien Prix (optionnel) */}
                      <div className="form-group">
                        <label>Ancien Prix ($) - Optionnel</label>
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.oldPrice}
                          onChange={(e) => setProductForm({...productForm, oldPrice: e.target.value})}
                        />
                      </div>
                    </div>
                    {/* Champ Catégorie - menu déroulant */}
                    <div className="form-group">
                      <label>Catégorie</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                        required
                      >
                        <option value="chairs">Chaises</option>
                        <option value="sofas">Canapés</option>
                        <option value="tables">Tables</option>
                      </select>
                    </div>
                    {/* Champ Image - sélection parmi images disponibles */}
                    <div className="form-group">
                      <label>Image du Produit</label>
                      <select
                        value={productForm.img}
                        onChange={(e) => setProductForm({...productForm, img: e.target.value})}
                        required
                      >
                        <option value="">Sélectionnez une image...</option>
                        {/* Boucle à travers availableImages et crée une option pour chaque image */}
                        {availableImages.map((img, idx) => (
                          <option key={idx} value={img}>
                            {/* Affiche seulement le nom du fichier sans le chemin et .jpg */}
                            {img.split('/').pop().replace('.jpg', '')}
                          </option>
                        ))}
                      </select>
                      {/* Prévisualisation de l'image - s'affiche seulement si une image est sélectionnée */}
                      {productForm.img && (
                        <div className="image-preview">
                          <img src={productForm.img} alt="Aperçu" />
                        </div>
                      )}
                    </div>
                    {/* Boutons d'action du formulaire */}
                    <div className="form-actions">
                      <button type="submit" className="btn primary">
                        {editingProduct ? 'Mettre à jour' : 'Ajouter'} le Produit
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
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Tableau des produits */}
              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Titre</th>
                      <th>Catégorie</th>
                      <th>Prix</th>
                      <th>Ancien Prix</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Si aucun produit, affiche message */}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{textAlign: 'center', color: 'var(--muted)'}}>
                          Aucun produit pour l'instant. Ajoutez votre premier produit!
                        </td>
                      </tr>
                    )}
                    {/* Boucle à travers products et crée une ligne pour chaque produit */}
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
                          {/* Bouton modifier */}
                          <button className="btn-icon" onClick={() => editProduct(product)}>✏️</button>
                          {/* Bouton supprimer */}
                          <button className="btn-icon" onClick={() => deleteProduct(product.id)}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ONGLET UTILISATEURS */}
          {activeTab === 'users' && (
            <div className="admin-section">
              <div className="section-header">
                <h3>Gérer les Utilisateurs</h3>
                <span className="user-count">{users.length} utilisateurs au total</span>
              </div>

              {/* Tableau des utilisateurs */}
              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Si aucun utilisateur, affiche message */}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{textAlign: 'center', color: 'var(--muted)'}}>
                          Aucun utilisateur enregistré pour l'instant
                        </td>
                      </tr>
                    )}
                    {/* Boucle à travers users et crée une ligne pour chaque utilisateur */}
                    {users.map(u => (
                      <tr key={u.email}>
                        <td>{u.firstName} {u.lastName}</td>
                        <td>{u.email}</td>
                        <td>
                          {/* Badge de rôle - couleur différente selon admin ou user */}
                          <span className={`role-badge ${u.isAdmin ? 'admin' : 'user'}`}>
                            {u.isAdmin ? '👑 Admin' : '👤 Utilisateur'}
                          </span>
                        </td>
                        <td>
                          {/* Bouton pour basculer le rôle admin */}
                          <button 
                            className="btn-icon" 
                            onClick={() => toggleUserRole(u.email)}
                            title="Basculer le rôle admin"
                          >
                            {u.isAdmin ? '⬇️' : '⬆️'}
                          </button>
                          {/* Bouton pour supprimer l'utilisateur */}
                          <button 
                            className="btn-icon" 
                            onClick={() => deleteUser(u.email)}
                            title="Supprimer l'utilisateur"
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
