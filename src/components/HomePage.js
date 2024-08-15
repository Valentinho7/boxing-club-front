import React from 'react';
import backgroundImage from '../img/home-page-boxe.jpg';
import newImage from '../img/mike.jpg'; // Adjust the path as necessary

function HomePage() {
    return (
        <div style={{ marginTop: '0px' }}>
            {/* Existing background image section */}
            <div style={{ position: 'relative' }}> 
                <img 
                    src={backgroundImage} 
                    alt="Boxing background" 
                    style={{ 
                        width: '100%', 
                        height: '500px', /* Fixed height, adjust as needed */
                        objectFit: 'cover' /* The image fills the width without distortion */
                    }} 
                />
                
                {/* Overlayed text on the background image */}
                <div style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    left: '20px', 
                    fontWeight: 'bold', 
                    textAlign: 'left', 
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'  /* Shadow to improve text readability */
                }}>
                    <h1 style={{ fontSize: '3em', margin: 0, color: 'grey' }}>
                        La Boxe,<br />à l'état pur.
                    </h1>
                    <p style={{ fontSize: '1.5em', marginTop: '10px', color: 'grey' }}>
                        Cours de boxe, avec ou sans combat.
                    </p>
                </div>
            </div>

            {/* New section below the background image */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#f7f7f7' }}>
                <img 
                    src={newImage} 
                    alt="Jérémy Blackwell" 
                    style={{
                        width: '200px', /* Adjust the size as needed */
                        height: 'auto',
                        borderRadius: '10px', /* Optional: add rounded corners */
                        marginRight: '20px' /* Space between image and text */
                    }}
                />
                <div>
                    <h2 style={{ margin: '0 0 10px 0' }}>Jérémy Blackwell</h2>
                    <p style={{ fontStyle: 'italic', marginBottom: '5px' }}>Banquier Privé</p>
                    <p>"Le Temple permet de rendre la boxe accessible à des débutants"</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
