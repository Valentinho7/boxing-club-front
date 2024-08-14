import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayMemberReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [sessions, setSessions] = useState({});
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all'); // État pour le filtre sélectionné


    const handlePayReservation = (reservationId) => {
        navigate(`/payment?reservationId=${reservationId}`);
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

    const isSessionInFuture = (sessionDate) => {
        const currentDate = new Date();
        const sessionDateObj = new Date(sessionDate);
        return sessionDateObj >= currentDate;
    };

    const isReservationValid = (reservationId) => {
        const reservationSessions = sessions[reservationId] || [];
        return reservationSessions.some(session => isSessionInFuture(session.date));
    };

    const filteredReservations = reservations.filter(reservation => {
        if (!isReservationValid(reservation.id)) {
            return false;
        }
        if (filter === 'paid') return reservation.validate;
        if (filter === 'unpaid') return !reservation.validate;
        return true; // 'all' filter
    });

    return (
        <div className="container">
            <h1>Mes réservations</h1>
            <div className="btn-group mb-3">
                <button
                    className={`btn ${filter === 'all' ? 'btn-dark text-white' : 'btn-light text-dark'}`}
                    onClick={() => setFilter('all')}
                >
                    Toutes mes réservations
                </button>
                <button
                    className={`btn ${filter === 'paid' ? 'btn-dark text-white' : 'btn-light text-dark'}`}
                    onClick={() => setFilter('paid')}
                >
                    Mes réservations payées
                </button>
                <button
                    className={`btn ${filter === 'unpaid' ? 'btn-dark text-white' : 'btn-light text-dark'}`}
                    onClick={() => setFilter('unpaid')}
                >
                    Mes réservations non payées
                </button>
            </div>
            <ul className="list-group">
                {filteredReservations.map(reservation => (
                    <li key={reservation.id} className="list-group-item">
                        <h2 style={{ color: reservation.validate ? 'green' : 'black' }}>N° de réservation: {reservation.id}</h2>
                        <p>Date de la commande: {reservation.orderDate}</p>
                        {reservation.validate && <p>Date de paiement: {reservation.validateDate}</p>}
                        {!reservation.validate && (
                            <button className="btn btn-primary">Payer ma réservation</button>
                        )}
                        <button className="btn btn-secondary" onClick={() => toggleSessions(reservation.id)}>
                            {sessions[reservation.id] ? 'Masquer les sessions' : 'Afficher les sessions'}
                        </button>
                        {sessions[reservation.id] && (
                            <ul>
                                {sessions[reservation.id].map(session => (
                                    <li key={session.id}>
                                        <h3>{session.name}</h3>
                                        <p>Durée: {session.durationInHours} heures</p>
                                        <p>Type de séance: {session.sessionType.name}</p>
                                        <p>Date: {session.date}</p>
                                        <p>Heure: {session.hour}H00</p>
                                        <p>Coach: {session.coachName}</p>
                                        <p>Capacité maximum: {session.maxPeople}</p>
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