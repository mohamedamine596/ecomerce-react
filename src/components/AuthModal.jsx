// Import React et le hook useState
import React, { useState } from 'react'
// Import du hook personnalisé useAuth pour accéder au contexte d'authentification
import { useAuth } from '../context/AuthContext'

// Composant AuthModal - fenêtre popup pour connexion/inscription
// S'affiche par-dessus le contenu de la page quand l'utilisateur clique sur Login/Sign up
export default function AuthModal() {
  // Récupération des fonctions et états depuis AuthContext
  // showAuth: indique si le modal est visible
  // setShowAuth: fonction pour ouvrir/fermer le modal
  // authMode: 'login' ou 'signup' - détermine quel formulaire afficher
  // setAuthMode: fonction pour changer entre login et signup
  // login/signup: fonctions pour authentifier l'utilisateur
  const { showAuth, setShowAuth, authMode, setAuthMode, login, signup } = useAuth()
  
  // État local pour stocker les données du formulaire
  // useState crée un objet avec 4 propriétés initialisées à des chaînes vides
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  
  // État pour stocker les messages d'erreur
  const [error, setError] = useState('')

  // Si showAuth est false, ne rien afficher (retourne null)
  // Cela cache le modal quand il n'est pas nécessaire
  if (!showAuth) return null

  // Fonction appelée quand le formulaire est soumis
  const handleSubmit = (e) => {
    // Empêche le rechargement de la page (comportement par défaut des formulaires)
    e.preventDefault()
    // Réinitialise l'erreur
    setError('')

    // Si on est en mode login
    if (authMode === 'login') {
      // Appelle la fonction login avec email et mot de passe
      const result = login(formData.email, formData.password)
      // Si échec, affiche l'erreur
      if (!result.success) setError(result.error)
    } else {
      // En mode signup, vérifie que prénom et nom sont remplis
      if (!formData.firstName || !formData.lastName) {
        setError('Veuillez remplir tous les champs')
        return
      }
      // Appelle la fonction signup avec toutes les données
      const result = signup(formData.firstName, formData.lastName, formData.email, formData.password)
      // Si échec, affiche l'erreur
      if (!result.success) setError(result.error)
    }
  }

  // Fonction appelée quand un champ du formulaire change
  const handleChange = (e) => {
    // Met à jour formData en gardant les anciennes valeurs (...formData)
    // et en modifiant seulement la propriété qui a changé [e.target.name]
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Fonction pour basculer entre login et signup
  const switchMode = () => {
    // Change le mode (login → signup ou signup → login)
    setAuthMode(authMode === 'login' ? 'signup' : 'login')
    // Réinitialise l'erreur
    setError('')
    // Vide tous les champs du formulaire
    setFormData({ firstName: '', lastName: '', email: '', password: '' })
  }

  return (
    // Overlay sombre qui couvre toute la page
    // onClick ferme le modal quand on clique en dehors
    <div className="auth-modal-overlay" onClick={() => setShowAuth(false)}>
      {/* Fenêtre du modal - stopPropagation empêche la fermeture quand on clique dedans */}
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* Bouton X pour fermer le modal */}
        <button className="close-btn" onClick={() => setShowAuth(false)}>✕</button>
        
        {/* Titre - change selon le mode (login ou signup) */}
        <h2>{authMode === 'login' ? 'Bon retour' : 'Créer un compte'}</h2>
        {/* Sous-titre */}
        <p className="auth-subtitle">
          {authMode === 'login' ? 'Connectez-vous à votre compte' : 'Inscrivez-vous pour commencer'}
        </p>

        {/* Formulaire - appelle handleSubmit lors de la soumission */}
        <form onSubmit={handleSubmit}>
          {/* Champs prénom/nom - s'affichent UNIQUEMENT en mode signup */}
          {/* Le && signifie: si authMode === 'signup' est vrai, affiche ce qui suit */}
          {authMode === 'signup' && (
            <>
              <div className="form-row">
                {/* Champ Prénom */}
                <div className="form-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Champ Nom */}
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Champ Email - toujours affiché */}
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

          {/* Champ Mot de passe - toujours affiché */}
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          {/* Message d'erreur - s'affiche seulement si error contient du texte */}
          {error && <div className="auth-error">{error}</div>}

          {/* Bouton de soumission - texte change selon le mode */}
          <button type="submit" className="btn primary full-width">
            {authMode === 'login' ? 'Se connecter' : 'Créer un compte'}
          </button>
        </form>

        {/* Lien pour basculer entre login et signup */}
        <div className="auth-switch">
          {authMode === 'login' ? "Pas encore de compte ? " : "Vous avez déjà un compte ? "}
          {/* span cliquable qui appelle switchMode */}
          <span onClick={switchMode}>
            {authMode === 'login' ? 'S\'inscrire' : 'Se connecter'}
          </span>
        </div>
      </div>
    </div>
  )
}
