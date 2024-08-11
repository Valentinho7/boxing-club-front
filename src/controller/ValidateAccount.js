import React, { useState } from 'react';

const ValidateAccount = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        fetch('http://34.30.198.59:8081/api/member/validatePaymentAndSubscription', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Payment and subscription validation failed');
            }
            return response.text();
        })
        .then(data => {
            setSuccessMessage('Payment and subscription validated successfully.');
        })
        .catch((error) => {
            setErrorMessage(error.message);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card Number:
                <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
};

export default ValidateAccount;