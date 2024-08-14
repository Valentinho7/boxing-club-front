import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DisplaySessionMember() {
    const [sessions, setSessions] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

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
    };

    const registerOrder = () => {
        const token = localStorage.getItem('token');
        axios.post('http://34.30.198.59:8081/api/reservations', cart, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                console.log('Order registered successfully');
                setCart([]); 
                navigate('/payment');
            })
            .catch(error => {
                console.error('There was an error registering the order!', error);
            });
    };

    return (
        <div className="container">
            <h1>Sessions</h1>
            <ul className="list-group">
                {sessions.map(session => (
                    <li key={session.id} className="list-group-item">
                        <h2>{session.name}</h2>
                        <p>Duration: {session.durationInHours} hours</p>
                        <p>Description: {session.description}</p>
                        <p>Type: {session.nameSessionType}</p>
                        <p>Date: {session.date}</p>
                        <p>Hour: {session.hour}H00</p>
                        <p>Coach: {session.coachName}</p>
                        <p>Max People: {session.maxPeople}</p>
                        <button onClick={() => addToCart(session.id)}>Ajouter au panier</button>
                    </li>
                ))}
            </ul>
            {cart.length > 0 && (
                <div>
                    <h2>Panier</h2>
                    <ul>
                        {cart.map(sessionId => {
                            const session = sessions.find(s => s.id === sessionId);
                            return <li key={sessionId}>{session.name}</li>;
                        })}
                    </ul>
                    <button onClick={registerOrder}>Valider la réservation</button>
                </div>
            )}
        </div>
    );
}

export default DisplaySessionMember;