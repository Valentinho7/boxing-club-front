import React from 'react';
import backgroundImage from '../img/home-page-boxe.jpg';
import newImage from '../img/mike.jpg';
import newImage2 from '../img/boxe.jpg';

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
        <h2 style={{ margin: '0', fontSize: '1.4em', fontWeight: 'bold', color: '#333' }}>
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

{/* New text section with image */}
<div style={{ display: 'flex', alignItems: 'flex-start', padding: '20px', backgroundColor: '#fff', marginTop: '20px' }}>
    <div>
        <h1 style={{ fontSize: '2em', fontWeight: 'bold', color: '#333' }}>
            Pourquoi vous devriez faire de la boxe ?
        </h1>
        <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>
            La boxe est le sport le plus complet.
        </h2>
        <p style={{ fontSize: '1em', color: '#555' }}>
            Boxing Clyb rassemble une communauté de Membres qui ont voulu commencer la boxe dans des lieux de caractère, un environnement haut de gamme et une atmosphère bienveillante.
        </p>
        <p style={{ fontSize: '1em', color: '#555' }}>
            Pour commencer la boxe à Paris, vous pouvez rejoindre Boxing Club à tout moment et débuter avec un cours de boxe sur sac, sans combat. Les cours de Cross Training vous permettront de vous remettre en forme.
        </p>
    </div>
    <img 
        src={newImage2} 
        alt="Boxing Image" 
        style={{
            width: '600px', /* Adjusted size */
            height: 'auto',
            borderRadius: '5px', /* Slight border radius */
            marginRight: '30px' /* Space between image and text */
        }}
    />
</div>
        </div>
    );
}

export default HomePage;
