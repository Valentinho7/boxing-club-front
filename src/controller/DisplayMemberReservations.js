import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayMemberReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [sessions, setSessions] = useState({});

    const handlePayReservation = (reservationId) => {
        navigate.push(`/payment?reservationId=${reservationId}`);
    };

    useEffect(() => {
        const fetchMemberReservations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://34.30.198.59:8081/api/reservations/myReservations', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReservations(response.data);
            } catch (error) {
                console.error('There was an error fetching the member reservations!', error);
            }
        };

        fetchMemberReservations();
    }, []);

    const fetchSessions = async (reservationId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://34.30.198.59:8081/api/reservations/${reservationId}/sessions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(`Sessions for reservation ${reservationId}:`, response.data); // Log sessions
            setSessions(prevSessions => ({
                ...prevSessions,
                [reservationId]: response.data
            }));
        } catch (error) {
            console.error('There was an error fetching the sessions!', error);
        }
    };

    const toggleSessions = (reservationId) => {
        if (sessions[reservationId]) {
            setSessions(prevSessions => ({
                ...prevSessions,
                [reservationId]: null
            }));
        } else {
            fetchSessions(reservationId);
        }
    };

    return (
        <div className="container">
            <h1>Mes réservations</h1>
            <ul className="list-group">
                {reservations.map(reservation => (
                    <li key={reservation.id} className="list-group-item">
                        <h2>N° de reservation: {reservation.id}</h2>
                        <p>Date de la commande: {reservation.orderedDate}</p>
                        <button 
                            className="btn btn-primary mr-2" 
                            onClick={() => toggleSessions(reservation.id)}
                        >
                            {sessions[reservation.id] ? 'Hide Sessions' : 'Show Sessions'}
                        </button>
                        <button 
                            className="btn btn-success" 
                            onClick={() => handlePayReservation(reservation.id)}
                        >
                            Payé ma réservation
                        </button>
                        {sessions[reservation.id] && (
                            <ul>
                                {sessions[reservation.id].map(session => (
                                    <li key={session.id}>
                                        <h3>{session.name}</h3>
                                        <p>Duration: {session.durationInHours} hours</p>
                                        <p>Type: {session.sessionType.name}</p>
                                        <p>Date: {session.date}</p>
                                        <p>Hour: {session.hour}H00</p>
                                        <p>Coach: {session.coachName}</p>
                                        <p>Max People: {session.maxPeople}</p>
                                        <p>Description: {session.description}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayMemberReservations;