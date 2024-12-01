import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CategoriesList.css';

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/forum/api/categories/')
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors de la récupération des catégories');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-4">Chargement...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                {/* La colonne déplace le contenu à gauche */}
                <div className="col-md-4">
                    <div className="card shadow-sm">
                    <div
    className="card-header"
    style={{ backgroundColor: "#E8A0BF", color: "white" }}
>
    <h4>Liste de Catégories</h4>
</div>

                        <div className="card-body">
                            <ul className="list-group">
                                {categories.map(category => (
                                    <li key={category.id} className="list-group-item">
                                        <Link to={`/categories/${category.id}`} className="text-decoration-none text-dark">
                                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                                {category.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesList;
