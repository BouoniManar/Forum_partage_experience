import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Pour extraire l'ID de la catégorie depuis l'URL
import axios from 'axios';

const CategoryDetails = () => {
    const { id } = useParams(); // Récupérer l'ID de la catégorie depuis l'URL
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Appel à l'API pour récupérer les détails de la catégorie
        axios.get(`http://127.0.0.1:8000/forum/api/categories/${id}/`)
            .then(response => {
                setCategory(response.data);  // Stocker les détails de la catégorie
                setLoading(false);
            })
            .catch(error => {
                setError('Erreur lors de la récupération de la catégorie');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
        </div>
    );
};

export default CategoryDetails;
