import React from 'react';
import backgroundImage from '../img/home-page-boxe.jpg';
import newImage from '../img/mike.jpg'; // Adjust the path as necessary

function HomePage() {
    return (
        <div style={{ position: 'relative', marginTop: '0px' }}> 
            <img 
                src={backgroundImage} 
                alt="Boxing background" 
                style={{ 
                    width: '100%', 
                    height: '500px', /* Fixed height, adjust as needed */
                    objectFit: 'cover' /* The image fills the width without distortion */
                }} 
            />
            
            {/* Overlayed text at the top left */}
            <div style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            fontWeight: 'bold', 
            textAlign: 'left', 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'  /* Shadow to improve text readability */
            }}>
            <h1 style={{ fontSize: '3em', margin: 0, color: 'grey' }}>  {/* Explicitly set color to grey */}
            La Boxe,<br />à l'état pur.
            </h1>
                <p style={{ fontSize: '1.5em', marginTop: '10px', color: 'grey' }}>
                Cours de boxe, avec ou sans combat.
                </p>
            </div>

            {/* New image below the text */}
            <img 
                src={newImage} 
                alt="Jérémy Blackwell" 
                style={{
                    position: 'absolute', 
                    bottom: '20px', /* Adjust the position as needed */
                    left: '20px',
                    width: '300px', /* Adjust the size as needed */
                    height: 'auto',
                    borderRadius: '10px' /* Optional: add rounded corners */
                }}
            />
        </div>
    );
}

export default HomePage;
