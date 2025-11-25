import React from 'react'
import { Link } from 'react-router-dom'

const heroImage = '/ecomerce-pic/pexels-maksgelatin-4352247.jpg'

export default function Hero(){
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-left">
          <div className="eyebrow">New Arrivals</div>
          <h1 className="hero-title">Spring Collection</h1>
          <p className="hero-sub">Heyfa furniture 2020 — curated selection of modern and elegant pieces for your home.</p>
          <div className="hero-cta">
            <Link to="/shop" className="btn primary">Shop now</Link>
            <Link to="/products" className="btn ghost">View collection</Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrap">
            <img src={heroImage} alt="chair" />
            <div className="hero-number">01</div>
          </div>
        </div>
      </div>
    </section>
  )
}
