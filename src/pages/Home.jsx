import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Products from '../components/Products'

export default function Home() {
  return (
    <>
      <Hero />
      <section id="categories" className="section container">
        <h2 className="section-title">Shop by categories</h2>
        <Categories />
      </section>

      <section id="products" className="section container">
        <h2 className="section-title">Hot Products</h2>
        <Products />
      </section>
    </>
  )
}
