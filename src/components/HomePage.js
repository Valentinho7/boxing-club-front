import React from 'react';

function HomePage() {
    return (
        <div style={{ position: 'relative', marginTop: '60px' }}> {/* Ajuste la marge supérieure si nécessaire pour la navbar */}
            {/* Image de fond */}
            <img 
                src="home-page-boxe.jpg" 
                alt="Boxing background" 
                style={{ 
                    width: '100%', 
                    height: '100vh', /* Prend toute la hauteur de la fenêtre visible */
                    objectFit: 'cover' /* Pour s'assurer que l'image ne soit pas déformée */
                }} 
            />
            
            {/* Texte superposé en haut à gauche */}
            <div style={{ 
                position: 'absolute', 
                top: '20px', 
                left: '20px', 
                color: 'white', 
                fontWeight: 'bold', 
                textAlign: 'left' 
            }}>
                <h1 style={{ fontSize: '4em', margin: 0 }}>La Boxe,<br />à l'état pur.</h1>
                <p style={{ fontSize: '1.5em', marginTop: '10px' }}>
                    Cours de boxe, avec ou sans combat.
                </p>
            </div>
        </div>
    );
}

export default HomePage;
