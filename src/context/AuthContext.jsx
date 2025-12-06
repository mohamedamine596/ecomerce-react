// Importation des hooks React nécessaires pour ce contexte
import React, { createContext, useContext, useState, useEffect } from 'react'

// Création d'un Context - cela nous permet de partager les données d'authentification dans tous les composants
// Pensez au Context comme un stockage global auquel n'importe quel composant peut accéder
const AuthContext = createContext()

// Composant AuthProvider - enveloppe toute l'application pour fournir les fonctionnalités d'authentification
// "children" signifie tous les composants imbriqués à l'intérieur de ce provider
export function AuthProvider({ children }) {
  // STATE : Variables qui peuvent changer et déclencher des re-rendus quand elles sont mises à jour
  
  // user : stocke les informations de l'utilisateur actuellement connecté (null si non connecté)
  const [user, setUser] = useState(null)
  
  // showAuth : contrôle si la modal de connexion/inscription est visible (true/false)
  const [showAuth, setShowAuth] = useState(false)
  
  // showAdmin : contrôle si le tableau de bord admin est visible (true/false)
  const [showAdmin, setShowAdmin] = useState(false)
  
  // authMode : suit si l'utilisateur veut se 'login' ou 'signup' (s'inscrire)
  const [authMode, setAuthMode] = useState('login')

  // useEffect : exécute du code quand le composant charge pour la première fois (tableau vide [] = exécuter une fois)
  useEffect(() => {
    // Vérifier le localStorage (stockage du navigateur) pour les données utilisateur sauvegardées
    const stored = localStorage.getItem('heyfa_user')
    // Si des données utilisateur existent, les convertir depuis JSON et définir comme utilisateur actuel
    if (stored) setUser(JSON.parse(stored))
  }, [])

  // FONCTION LOGIN : valide les identifiants et connecte l'utilisateur
  const login = (email, password) => {
    // Récupérer tous les utilisateurs enregistrés depuis localStorage (ou tableau vide si aucun)
    const users = JSON.parse(localStorage.getItem('heyfa_users') || '[]')
    
    // Rechercher un utilisateur avec email et mot de passe correspondants
    const found = users.find(u => u.email === email && u.password === password)
    
    if (found) {
      // Utilisateur trouvé ! Créer un objet utilisateur sans données sensibles (pas de mot de passe)
      const userData = { 
        email: found.email, 
        firstName: found.firstName, 
        lastName: found.lastName, 
        isAdmin: found.isAdmin || false 
      }
      setUser(userData)  // Mettre à jour le state avec les infos utilisateur
      localStorage.setItem('heyfa_user', JSON.stringify(userData))  // Sauvegarder dans le navigateur
      setShowAuth(false)  // Fermer la modal de connexion
      return { success: true }  // Retourner le statut de succès
    }
    // Utilisateur non trouvé ou mauvais mot de passe
    return { success: false, error: 'Invalid email or password' }
  }

  // FONCTION SIGNUP : crée un nouveau compte utilisateur
  const signup = (firstName, lastName, email, password) => {
    // Récupérer les utilisateurs existants depuis localStorage
    const users = JSON.parse(localStorage.getItem('heyfa_users') || '[]')
    
    // Vérifier si l'email existe déjà (empêcher les doublons)
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' }
    }

    // Le premier utilisateur à s'inscrire devient admin automatiquement
    const isFirstUser = users.length === 0
    
    // Créer un nouvel objet utilisateur avec toutes les infos
    const newUser = { firstName, lastName, email, password, isAdmin: isFirstUser }
    users.push(newUser)  // Ajouter au tableau des utilisateurs
    localStorage.setItem('heyfa_users', JSON.stringify(users))  // Sauvegarder tous les utilisateurs
    
    // Créer des données utilisateur sûres (sans mot de passe) pour la session actuelle
    const userData = { email, firstName, lastName, isAdmin: isFirstUser }
    setUser(userData)  // Définir comme utilisateur actuel
    localStorage.setItem('heyfa_user', JSON.stringify(userData))  // Sauvegarder dans le navigateur
    setShowAuth(false)  // Fermer la modal d'inscription
    return { success: true }
  }

  // FONCTION LOGOUT : efface la session utilisateur
  const logout = () => {
    setUser(null)  // Effacer l'utilisateur du state
    localStorage.removeItem('heyfa_user')  // Supprimer du stockage du navigateur
  }

  // OUVRIR AUTH MODAL : ouvre la modal de connexion ou d'inscription
  const openAuth = (mode = 'login') => {
    setAuthMode(mode)  // Définir à 'login' ou 'signup'
    setShowAuth(true)  // Afficher la modal
  }

  // Provider rend toutes ces valeurs disponibles à n'importe quel composant enfant
  return (
    <AuthContext.Provider value={{ 
      user,           // Données utilisateur actuel
      login,          // Fonction pour se connecter
      signup,         // Fonction pour s'inscrire
      logout,         // Fonction pour se déconnecter
      showAuth,       // La modal d'auth est-elle visible ?
      setShowAuth,    // Fonction pour afficher/masquer la modal d'auth
      authMode,       // Mode actuel (login/signup)
      setAuthMode,    // Fonction pour changer le mode
      openAuth,       // Fonction pour ouvrir la modal d'auth
      showAdmin,      // Le tableau de bord admin est-il visible ?
      setShowAdmin    // Fonction pour afficher/masquer le tableau de bord admin
    }}>
      {children}  {/* Rendre tous les composants enfants */}
    </AuthContext.Provider>
  )
}

// Hook personnalisé pour accéder facilement au contexte d'auth dans n'importe quel composant
// Utilisation : const { user, login, logout } = useAuth()
export const useAuth = () => useContext(AuthContext)
