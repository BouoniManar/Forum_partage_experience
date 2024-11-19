// DashboardUser.js
import React, { useState } from 'react';
import CategoriesList from '../CategoriesList';
import Header from '../Header'; // Importer le Header modifié

const DashboardUser = () => {
    const [searchTerm, setSearchTerm] = useState(''); // État pour gérer la recherche

    // Gestion du changement dans la barre de recherche
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <Header /> {/* Utiliser le Header avec les nouveaux boutons */}
            <div className="dashboard-header">
                <h2>Explorez Nos Catégories</h2>
                <input
                    type="text"
                    placeholder="Rechercher une catégorie..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
            </div>
            <CategoriesList searchTerm={searchTerm} /> {/* Passer le terme de recherche */}
        </div>
    );
};

export default DashboardUser;
