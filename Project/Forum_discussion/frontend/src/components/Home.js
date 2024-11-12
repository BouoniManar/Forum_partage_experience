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
                    <section className="about-section">
                        <h2>À propos du Forum de Partage d'Expériences</h2>
                        <p>Bienvenue sur notre forum, un espace dédié au partage de vos avis et expériences. Que vous soyez un passionné ou un curieux, rejoignez notre communauté pour découvrir et partager des informations authentiques sur une variété de produits. Partageons ensemble et enrichissons nos connaissances !</p>
                    </section>
                    <ProductList produits={produits} />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
