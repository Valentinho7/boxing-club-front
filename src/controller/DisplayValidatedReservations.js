import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayValidatedReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchValidatedReservations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://34.30.198.59:8081/api/validated', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReservations(response.data);
            } catch (error) {
                console.error('There was an error fetching the validated reservations!', error);
            }
        };

        fetchValidatedReservations();
    }, []);

    return (
        <div className="container">
            <h1>Validated Reservations</h1>
            <ul className="list-group">
                {reservations.map(reservation => (
                    <li key={reservation.id} className="list-group-item">
                        <h2>N° de reservation: {reservation.id}</h2>
                        <p>Date de la commande: {reservation.orderedDate}</p>
                        <p>Date du paiement: {reservation.validateDate}</p>
                        <p>Paiement validé ? {reservation.isValidate ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayValidatedReservations;