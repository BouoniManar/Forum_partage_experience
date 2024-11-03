import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '../services/api';
import CategoriesList from './CategoriesList';
import ProductList from './ProductList';
import Header from './Header';
import Footer from './Footer';
import '../styles/Home.css';

function Home() {
    const [categories, setCategories] = useState([]);
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        fetchCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.error('Erreur de chargement des catégories:', error));

        fetchProducts()
            .then(response => setProduits(response.data))
            .catch(error => console.error('Erreur de chargement des produits:', error));
    }, []);

    return (
        <div className="home-container">
            <Header />
            <div className="content">
                <aside className="sidebar">
                    <CategoriesList categories={categories} />
                </aside>
                <main className="main-content">
                    <ProductList produits={produits} />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
