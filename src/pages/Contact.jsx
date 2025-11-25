import React, { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="page-container container">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p className="page-subtitle">Have questions? We'd love to hear from you</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Visit Us</h3>
            <p>123 Furniture Street<br/>Design District, NY 10001</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p>heyfa@gmail.com<br/>support@heyfa.com</p>
            <p>aya@gmail.com <br/>support@aya.com</p>
            <p>nermin@gmail.com <br/>support@nermin.com</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Call Us</h3>
            <p>+1 (+216) 52978971<br/>Sousse 9am-6pm EST</p>
          </div>
        </div>

        <div className="contact-form-container">
          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>Thank you for contacting us. We'll get back to you soon.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn primary full-width">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
