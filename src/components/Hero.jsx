import React from 'react'

const heroImage = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6d1c15cd8d364e73f1f3b9b5afbd1fc9'

export default function Hero(){
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-left">
          <div className="eyebrow">New Arrivals</div>
          <h1 className="hero-title">Spring Collection</h1>
          <p className="hero-sub">Davici furniture 2020 — curated selection of modern and elegant pieces for your home.</p>
          <div className="hero-cta">
            <button className="btn primary">Shop now</button>
            <button className="btn ghost">View collection</button>
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
