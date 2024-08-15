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
        La boxe est bien plus qu'un simple sport; c'est une discipline qui engage à la fois le corps et l'esprit, offrant un équilibre parfait entre force physique et concentration mentale. En pratiquant la boxe, vous développez non seulement votre endurance, votre agilité, et votre force musculaire, mais vous améliorez également votre confiance en vous et votre capacité à gérer le stress.        </p>
        <p style={{ fontSize: '1em', color: '#555' }}>
        Chez Boxing Club, nous croyons que la boxe est accessible à tous, quels que soient votre niveau de forme physique ou votre expérience. C'est pourquoi nous avons conçu nos espaces avec soin, en combinant des lieux de caractère, un environnement haut de gamme, et une atmosphère chaleureuse et bienveillante. Que vous soyez débutant ou boxeur confirmé, vous trouverez au sein de notre communauté un soutien et une motivation pour atteindre vos objectifs.        </p>
        <p style={{ fontSize: '1em', color: '#555' }}>
        Pour ceux qui souhaitent se lancer dans la boxe à Paris, Boxing Club offre une flexibilité totale. Vous pouvez rejoindre notre communauté à tout moment et commencer avec des cours adaptés à votre niveau. Nos cours de boxe sur sac sont parfaits pour débuter sans la pression d'un combat direct, tout en vous offrant une excellente opportunité de vous défouler et de travailler votre technique.</p>
        <p style={{ fontSize: '1em', color: '#555' }}>
        En parallèle, nos séances de Cross Training sont idéales pour ceux qui veulent se remettre en forme de manière intensive, en combinant des exercices cardiovasculaires et de renforcement musculaire. Grâce à la diversité de nos cours, vous pourrez diversifier votre entraînement et progresser à votre rythme, tout en profitant d'une ambiance conviviale et stimulante.</p>
        <p style={{ fontSize: '1em', color: '#555' }}>
        Rejoindre Boxing Club, c'est bien plus que pratiquer un sport; c'est intégrer une communauté passionnée et soudée, où chaque membre est encouragé à donner le meilleur de lui-même. N'attendez plus, commencez votre parcours vers une meilleure forme physique et mentale avec nous.</p>
        
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
