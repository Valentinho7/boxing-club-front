import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DisplayMember = () => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

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

    return (
        <div className="container mt-4">
            <h1>Liste des Membres</h1>
            {error && <p className="text-danger">{error}</p>}
            <ul className="list-group">
                {members.map(member => (
                    <li key={member.email} className="list-group-item">
                        <h2>{member.firstname} {member.lastname}</h2>
                        <p>Email: {member.email}</p>
                        <p>Adresse: {member.address}</p>
                        <p>Date de naissance: {member.birthdate}</p>
                        <p>Numéro de téléphone: {member.phoneNumber}</p>
                        <p>Date d'inscription: {member.registrationDate}</p>
                        <p>Abonnement validé: {member.subscriptionValidated ? 'Oui' : 'Non'}</p>
                        <p>Paiement validé: {member.payementValidated ? 'Oui' : 'Non'}</p>
                        <h3>Réservations:</h3>
                        <ul>
                            {member.reservations.map(reservation => (
                                <li key={reservation.id}>
                                    <p>Réservation ID: {reservation.id}</p>
                                    <p>Date de commande: {reservation.orderedDate}</p>
                                    <p>Date de validation: {reservation.validateDate}</p>
                                    <p>Validée: {reservation.validate ? 'Oui' : 'Non'}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayMember;