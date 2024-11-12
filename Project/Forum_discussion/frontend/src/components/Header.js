import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../config/routes';
import '../styles/Header.css'; // Import du fichier CSS

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <img src="/assets/image/logo.png" alt="Logo" className="logo" />
            <h1>Forum de Partage d'Expériences</h1>
            <div className="header-buttons">
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
            </div>
        </header>
    );
}

export default Header;
