import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductList from './ProductList';
import Header from './Header';
import Footer from './Footer';
import '../styles/Home.css';
import ProductBanner from './ProductBanner';

function Home() {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        fetchProducts()
            .then(response => setProduits(response.data))
            .catch(error => console.error('Erreur de chargement des produits:', error));
    }, []);

    return (
        <div className="home-container">
            <Header />
            <div className="content">
                <main className="main-content">
                    <ProductBanner produits={produits} />
                    <section className="about-section">
                        <h2>À propos du Forum de Partage d'Expériences</h2>
                        <p>
                            Bienvenue sur notre forum, un espace dédié au partage de vos avis et expériences.
                            Que vous soyez un passionné ou un curieux, rejoignez notre communauté pour découvrir
                            et partager des informations authentiques sur une variété de produits. Partageons
                            ensemble et enrichissons nos connaissances !
                        </p>
                    </section>
                    <ProductList produits={produits} />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
