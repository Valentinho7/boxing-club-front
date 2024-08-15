import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ValidateAccount = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubscribe = () => {
        const token = localStorage.getItem('token'); // On suppose que le token est stocké dans le localStorage

        fetch('http://34.30.198.59:8081/api/member/validatePaymentAndSubscription', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Payment and subscription validation failed');
            }
            return response.text();
        })
        .then(data => {
            setSuccessMessage('Payment and subscription validated successfully.');
            // Redirection vers la page de paiement en cas de succès
            navigate('/payment');
        })
        .catch((error) => {
            setErrorMessage(error.message);
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow" style={{ width: '22rem' }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">1 ANNEE</h5>
                        <h5 className="text-success">200€</h5>
                    </div>
                    <ul className="list-unstyled mt-3 mb-4">
                        <li>Accès aux cours collectif</li>
                        <li>Accès aux salles de musculation, cardio et de boxe</li>
                        <li>Gants de boxe offerts</li>
                    </ul>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    {successMessage && <p className="text-success">{successMessage}</p>}
                    <button
                        className="btn btn-success w-100"
                        onClick={handleSubscribe}
                    >
                        S'abonner
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ValidateAccount;
