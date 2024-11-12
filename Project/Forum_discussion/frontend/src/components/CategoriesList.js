import React from 'react';

function CategoriesList({ categories }) {
    return (
        <div className="categories-list">
            <h3>Catégories</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <button>{category.name}</button> {/* Display category names */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesList;
