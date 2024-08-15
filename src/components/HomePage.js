import React from 'react';
import image from '../img/home-page-boxe.jpg';

function HomePage() {
    return (
        <div style={{ position: 'relative', marginTop: '60px' }}> 
            <img 
                src={image} 
                alt="Boxing background" 
                style={{ 
                    width: '100%', 
                    height: '500px', /* Hauteur fixe, ajustez selon vos besoins */
                    objectFit: 'cover' /* L'image remplit la largeur sans déformation */
                }} 
            />
            
            {/* Texte superposé en haut à gauche */}
            <div style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            fontWeight: 'bold', 
            textAlign: 'left', 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'  /* Ombre pour améliorer la lisibilité du texte */
            }}>
            <h1 style={{ fontSize: '4em', margin: 0, color: 'white' }}>  {/* Ajout explicite de color: white */}
            La Boxe,<br />à l'état pur.
            </h1>
                <p style={{ fontSize: '1.5em', marginTop: '10px', color: 'white' }}>
                Cours de boxe, avec ou sans combat.
                </p>
            </div>
        </div>
    );
}

export default HomePage;
