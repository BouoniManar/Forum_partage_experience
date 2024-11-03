import React from 'react';

function ProductList({ produits }) {
    return (
        <div>
            <h2>Produits Populaires</h2>
            <div className="produits">
                {produits.map(produit => (
                    <div key={produit.id} className="produit">
                        <h3>{produit.nom}</h3>
                        <p>{produit.description}</p>
                        <p><strong>Catégorie :</strong> {produit.categorie.nom}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
