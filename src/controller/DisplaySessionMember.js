import React, { useState, useEffect } from 'react';
import axios from 'axios';


function DisplaySessionMember() {
    const [sessions, setSessions] = useState([]);
    const [cart, setCart] = useState([]);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://34.30.198.59:8081/api/sessions', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                setSessions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the sessions!', error);
            });
    }, []);

    const addToCart = (sessionId) => {
        setCart([...cart, sessionId]);
        setConfirmationMessage('');
        setErrorMessage('');
    };

    const removeFromCart = (sessionId) => {
        setCart(cart.filter(id => id !== sessionId));
    };

    const registerOrder = () => {
        const token = localStorage.getItem('token');
        axios.post('http://34.30.198.59:8081/api/reservations', cart, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                setCart([]); 
                setConfirmationMessage('Commande validée. Veuillez vous diriger vers la section "Mes réservations" pour finaliser la commande.');
                setErrorMessage('');
            })
            .catch(error => {
                setErrorMessage('Une erreur est survenue lors de la validation de la réservation.');
                setConfirmationMessage('');
            });
    };

    const isSessionInFuture = (sessionDate) => {
        const currentDate = new Date();
        const sessionDateObj = new Date(sessionDate);
        return sessionDateObj >= currentDate;
    };

    return (
        <div className="container">
            <h1>Sessions</h1>
            <ul className="list-group">
                {sessions.filter(session => isSessionInFuture(session.date)).map(session => (
                    <li key={session.id} className="list-group-item">
                        <h2>{session.name}</h2>
                        <p>Duration: {session.durationInHours} hours</p>
                        <p>Description: {session.description}</p>
                        <p>Type: {session.nameSessionType}</p>
                        <p>Date: {session.date}</p>
                        <p>Hour: {session.hour}H00</p>
                        <p>Coach: {session.coachName}</p>
                        <p>Max People: {session.maxPeople}</p>
                        <button onClick={() => addToCart(session.id)} className="btn btn-primary">Ajouter au panier</button>
                    </li>
                ))}
            </ul>
            {cart.length > 0 && (
                <div>
                    <h2>Panier</h2>
                    <ul className="list-group">
                        {cart.map(sessionId => {
                            const session = sessions.find(s => s.id === sessionId);
                            return (
                                <li key={sessionId} className="list-group-item d-flex justify-content-between align-items-center">
                                {session.name}
                                <button onClick={() => removeFromCart(sessionId)} className="btn btn-danger">Supprimer</button>
                            </li>
                            );
                        })}
                    </ul>
                    <button onClick={registerOrder} className="btn btn-success">Valider la réservation</button>
                </div>
            )}
            {confirmationMessage && <div className="alert alert-success mt-3" role="alert">{confirmationMessage}</div>}
            {errorMessage && <div className="alert alert-danger mt-3" role="alert">{errorMessage}</div>}
        </div>
    );
}

export default DisplaySessionMember;