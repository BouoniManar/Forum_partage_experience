import React from 'react';
import Slider from 'react-slick';
import '../styles/ProductBanner.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ProductBanner() {
    
    const produits = [
        {
            name: ' COSMOS',
            description: 'produits de soins plus respectueux du corps.',
            image: 'assets/image/produit1.png',
            rating: 2,
        },
        {
            name: 'Machine à Laver ',
            description: 'Inverter à Vapeur LG 8KG',
            image: 'assets/image/produit2.png',
            rating: 5,
        },
        {
            name: 'Maxi Food',
            description: 'Des plats équilibrés et colorés pour affronter les problémes de la journée .',
            image: 'assets/image/produit3.png',
            rating: 2,
        },
        {
            name: 'DUO Q10, Thérapia',
            description: 'Santé cardiovasculaire, Energie cellulaire, Antioxydant',
            image: 'assets/image/produit4.png',
            rating: 4,
        },
        {
            name: 'LOramel ',
            description: 'Kit de Lissage et Soin Capillaire - Petit format',
            image: 'assets/image/produit5.png',
            rating: 4,
        },
        {
            name: 'PlanB',
            description: 'Une saveur et une qualité exceptionnelle',
            image: 'assets/image/produit6.png',
            rating: 1,
        },
    ];

    // Configuration de react-slick
    const settings = {
        dots: true, // Affiche des indicateurs en bas
        infinite: true, // Boucle infinie
        speed: 500, // Vitesse de transition
        slidesToShow: 3, // Nombre de produits visibles en même temps
        slidesToScroll: 1, // Nombre de produits à défiler par clic
        nextArrow: <SampleNextArrow />, // Flèche pour avancer
        prevArrow: <SamplePrevArrow />, // Flèche pour reculer
    };

    // Composants pour personnaliser les flèches
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', background: '#000', borderRadius: '50%' }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', background: '#000', borderRadius: '50%' }}
                onClick={onClick}
            />
        );
    }

    return (
        <div className="container mt-4">
            <Slider {...settings}>
                {produits.map((produit, index) => (
                    <div key={index}>
                        <div className="card product-banner-item">
                            <img src={produit.image} alt={produit.name} className="card-img-top product-image" />
                            <div className="card-body">
                                <h5 className="card-title">{produit.name}</h5>
                                <p className="card-text">{produit.description}</p>
                                <div className="product-rating">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <span key={idx} className={idx < produit.rating ? 'star filled' : 'star'}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ProductBanner;
