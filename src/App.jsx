import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Products from './components/Products'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import AdminDashboard from './components/AdminDashboard'
import CartModal from './components/CartModal'

export default function App(){
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-root">
          <Header />
          <main>
            <Hero />
            <section id="categories" className="section container">
              <h2 className="section-title">Shop by categories</h2>
              <Categories />
            </section>

            <section id="products" className="section container">
              <h2 className="section-title">Hot Products</h2>
              <Products />
            </section>
          </main>
          <Footer />
          <AuthModal />
          <AdminDashboard />
          <CartModal />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
