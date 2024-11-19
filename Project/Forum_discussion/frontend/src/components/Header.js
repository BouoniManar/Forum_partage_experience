import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../config/routes';
import '../styles/Header.css'; // Import du fichier CSS

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // État pour savoir si l'utilisateur est connecté

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');  // Vérifie si un token est présent
        console.log("Token trouvé:", userToken);  // Vérifie la présence du token
        setIsLoggedIn(!!userToken);  // Si un token existe, l'utilisateur est connecté
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');  // Retirer le token pour déconnecter l'utilisateur
        setIsLoggedIn(false);  // Mise à jour de l'état
        navigate(routes.connexion);  // Rediriger vers la page de connexion
    };

    return (
        <header className="header">
            <img src="/assets/image/logo.png" alt="Logo" className="logo" />
            <h1>Forum de Partage d'Expériences</h1>
            <div className="header-buttons">
                {isLoggedIn ? (
                    <>
                        <button 
                            onClick={() => navigate(routes.profile)} 
                            className="header-button" 
                            aria-label="Profil"
                        >
                            Profil
                        </button>
                        <button 
                            onClick={() => navigate(routes.addPost)} 
                            className="header-button" 
                            aria-label="Ajouter un post"
                        >
                            Créer un post
                        </button>
                        <button 
                            onClick={handleLogout} 
                            className="header-button" 
                            aria-label="Déconnexion"
                        >
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={() => navigate(routes.inscription)} 
                            className="header-button" 
                            aria-label="Inscription"
                        >
                            Inscription
                        </button>
                        <button 
                            onClick={() => navigate(routes.connexion)} 
                            className="header-button" 
                            aria-label="Connexion"
                        >
                            Connexion
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
