import React from 'react';
import backgroundImage from '../img/home-page-boxe.jpg';
import newImage from '../img/mike.jpg'; // Ensure the path is correct

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
            <div style={{ display: 'flex', alignItems: 'center', padding: '40px', backgroundColor: '#fff' }}>
                <img 
                    src={newImage} 
                    alt="Mike Tyson" 
                    style={{
                        width: '180px', /* Adjusted size */
                        height: 'auto',
                        borderRadius: '5px', /* Slight border radius */
                        marginRight: '30px' /* Space between image and text */
                    }}
                />
                <div>
                    <h2 style={{ margin: '0', fontSize: '1.8em', fontWeight: 'bold', color: '#333' }}>
                        "Boxing Club permet de rendre la boxe accessible à des débutants"
                    </h2>
                    <p style={{ margin: '5px 0', fontSize: '1.2em', fontWeight: 'normal', color: '#555' }}>
                        Mike Tyson
                    </p>
                    <p style={{ fontStyle: 'italic', margin: '0', fontSize: '1em', color: '#777' }}>
                        Boxeur professionnel
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
