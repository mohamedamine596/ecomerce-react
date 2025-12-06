// Import React et le hook useState
import React, { useState } from 'react'

// Page Contact - formulaire de contact et informations de contact
export default function Contact() {
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  // État pour suivre si le formulaire a été soumis avec succès
  const [submitted, setSubmitted] = useState(false)

  // Fonction appelée quand le formulaire est soumis
  const handleSubmit = (e) => {
    // Empêche le rechargement de la page
    e.preventDefault()
    // Affiche les données dans la console (pour le développement)
    console.log('Formulaire de contact soumis:', formData)
    // Change l'état à "soumis" pour afficher le message de succès
    setSubmitted(true)
    // Après 3 secondes (3000ms), réinitialise le formulaire
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  // Fonction appelée quand un champ du formulaire change
  const handleChange = (e) => {
    // Met à jour formData en gardant les anciennes valeurs (...formData)
    // et en modifiant seulement la propriété qui a changé
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="page-container container">
      {/* En-tête de la page */}
      <div className="page-header">
        <h1>Contactez-nous</h1>
        <p className="page-subtitle">Vous avez des questions? Nous serions ravis de vous entendre</p>
      </div>

      {/* Layout à deux colonnes: infos de contact + formulaire */}
      <div className="contact-layout">
        {/* Colonne gauche - informations de contact */}
        <div className="contact-info">
          {/* Carte Adresse */}
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Visitez-nous</h3>
            <p>123 Rue des Meubles<br/>Quartier Design, NY 10001</p>
          </div>
          {/* Carte Email */}
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p>heyfa@gmail.com<br/>support@heyfa.com</p>
            <p>aya@gmail.com <br/>support@aya.com</p>
            <p>nermin@gmail.com <br/>support@nermin.com</p>
          </div>
          {/* Carte Téléphone */}
          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Appelez-nous</h3>
            <p>+1 (+216) 52978971<br/>Sousse 9h-18h EST</p>
          </div>
        </div>

        {/* Colonne droite - formulaire de contact */}
        <div className="contact-form-container">
          {/* Rendu conditionnel: si soumis, affiche message de succès, sinon affiche formulaire */}
          {submitted ? (
            // MESSAGE DE SUCCÈS
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Message Envoyé!</h3>
              <p>Merci de nous avoir contactés. Nous vous répondrons bientôt.</p>
            </div>
          ) : (
            // FORMULAIRE
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Champ Nom */}
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Champ Email */}
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
              {/* Champ Sujet */}
              <div className="form-group">
                <label>Sujet</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Champ Message - textarea pour texte long */}
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
              {/* Bouton de soumission */}
              <button type="submit" className="btn primary full-width">
                Envoyer le message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
