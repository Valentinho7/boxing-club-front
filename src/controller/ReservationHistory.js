import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationHistory = () => {
    const [reservations, setReservations] = useState([]);
    const [sessions, setSessions] = useState({});
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [filter, setFilter] = useState('all');
    const [visibleSessions, setVisibleSessions] = useState({}); // Pour gérer l'affichage des séances

    // Fonction pour vérifier si une session est passée
    const isSessionPast = (session) => {
        const sessionDate = new Date(session.date);
        const today = new Date();
        return sessionDate < today; // Vérifier si la date de la session est passée
    };

    // Filtrer les réservations où toutes les sessions sont passées
    const filterPastReservations = (reservations, sessions) => {
        return reservations.filter(reservation => {
            const reservationSessions = sessions[reservation.id] || [];
            return reservationSessions.every(isSessionPast); // On conserve seulement les réservations où toutes les sessions sont passées
        });
    };

    useEffect(() => {
        const fetchMemberReservations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://34.30.198.59:8081/api/reservations/myReservations', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const reservationsData = response.data;

                // Pour chaque réservation, on récupère les sessions
                const sessionsData = {};
                await Promise.all(reservationsData.map(async (reservation) => {
                    const sessionResponse = await fetchSessions(reservation.id);
                    sessionsData[reservation.id] = sessionResponse;
                }));

                setReservations(reservationsData);
                setSessions(sessionsData);

                // Filtrer les réservations où toutes les sessions sont passées
                const pastReservations = filterPastReservations(reservationsData, sessionsData);
                setFilteredReservations(pastReservations);
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
            return response.data; // Retourne les sessions de la réservation
        } catch (error) {
            console.error('There was an error fetching the sessions!', error);
            return [];
        }
    };

    const toggleSessions = (reservationId) => {
        setVisibleSessions(prevVisibleSessions => ({
            ...prevVisibleSessions,
            [reservationId]: !prevVisibleSessions[reservationId] // Bascule entre montrer et cacher
        }));
    };

    // Gérer le filtre par état (toutes, payées, non payées)
    const applyStateFilter = (reservations) => {
        return reservations.filter(reservation => {
            if (filter === 'paid') return reservation.validate;
            if (filter === 'unpaid') return !reservation.validate;
            return true;
        });
    };

    // Appliquer les filtres
    const displayedReservations = applyStateFilter(filteredReservations);

    return (
        <div className="container">
            <h1>Historique des réservations</h1>
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
                {displayedReservations.map(reservation => (
                    <li key={reservation.id} className="list-group-item">
                        <h2 style={{ color: reservation.validate ? 'green' : 'red' }}>N° de réservation: {reservation.id}</h2>
                        <p>Date de la commande: {reservation.orderedDate}</p>
                        {reservation.validate && <p>Date de paiement: {reservation.validateDate}</p>}
                        <button 
                            className="btn btn-primary mr-2" 
                            onClick={() => toggleSessions(reservation.id)}
                        >
                            {visibleSessions[reservation.id] ? 'Cacher les séances' : 'Montrer les séances'}
                        </button>
                        {visibleSessions[reservation.id] && sessions[reservation.id] && (
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

export default ReservationHistory;