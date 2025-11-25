import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import AdminDashboard from './components/AdminDashboard'
import CartModal from './components/CartModal'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductsPage from './pages/ProductsPage'
import Contact from './pages/Contact'

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-root">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <AuthModal />
            <AdminDashboard />
            <CartModal />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}
