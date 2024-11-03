import React from 'react';

function CategoriesList({ categories }) {
    return (
        <div>
            <h2>Catégories</h2>
            <ul>
                {categories.map(categorie => (
                    <li key={categorie.id}>{categorie.nom}</li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesList;
