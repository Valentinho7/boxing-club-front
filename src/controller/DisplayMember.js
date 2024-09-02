import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DisplayMember = () => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);
    const [visibleDetails, setVisibleDetails] = useState({});
    const [visibleReservations, setVisibleReservations] = useState({});

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://34.30.198.59:8081/api/member', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMembers(response.data);
            } catch (error) {
                setError('There was an error fetching the members!');
                console.error(error);
            }
        };

        fetchMembers();
    }, []);

    const toggleDetails = (email) => {
        setVisibleDetails(prevVisibleDetails => ({
            ...prevVisibleDetails,
            [email]: !prevVisibleDetails[email]
        }));
    };

    const toggleReservations = (email) => {
        setVisibleReservations(prevVisibleReservations => ({
            ...prevVisibleReservations,
            [email]: !prevVisibleReservations[email]
        }));
    };

    return (
        <div className="container mt-4">
            <h1>Liste des Membres</h1>
            {error && <p className="text-danger">{error}</p>}
            <ul className="list-group">
                {members.map(member => (
                    <li key={member.email} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>{member.firstname} {member.lastname}</h2>
                            <div>
                                <button 
                                    className="btn btn-primary mr-2" 
                                    onClick={() => toggleDetails(member.email)}
                                >
                                    {visibleDetails[member.email] ? 'Cacher les détails' : 'Afficher les détails du membre'}
                                </button>
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => toggleReservations(member.email)}
                                >
                                    {visibleReservations[member.email] ? 'Cacher les réservations' : 'Réservations'}
                                </button>
                            </div>
                        </div>
                        {visibleDetails[member.email] && (
                            <div className="mt-3">
                                <p>Email: {member.email}</p>
                                <p>Adresse: {member.address}</p>
                                <p>Date de naissance: {member.birthdate}</p>
                                <p>Numéro de téléphone: {member.phoneNumber}</p>
                                <p>Date d'inscription: {member.registrationDate}</p>
                                <p>Abonnement validé: {member.subscriptionValidated ? 'Oui' : 'Non'}</p>
                            </div>
                        )}
                        {visibleReservations[member.email] && (
                            <div className="mt-3">
                                <h3>Réservations:</h3>
                                <ul>
                                    {member.reservations.map(reservation => (
                                        <li key={reservation.id}>
                                            <p>Réservation ID: {reservation.id}</p>
                                            <p>Date de commande: {reservation.orderedDate}</p>
                                            <p>Validée: {reservation.validate ? 'Oui' : 'Non'}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayMember;