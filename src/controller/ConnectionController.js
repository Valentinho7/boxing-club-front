import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'; // Assurez-vous que le chemin d'importation est correct
import { useNavigate } from 'react-router-dom'; // Importez useHistory
import { decode } from 'jsonwebtoken';




const ConnexionController = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [role, setRole] = useState(null);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); 
    const navigate = useNavigate(); 


    useEffect(() => {
        console.log('Role after update:', role);
      }, [role]);

    useEffect(() => {
        console.log('Is authenticated:', isAuthenticated); // Afficher la valeur de isAuthenticated chaque fois qu'elle change
    }, [isAuthenticated]);


    const handleSubmit = (event) => {
        event.preventDefault();
    
        const loginRequest = {
            email: username,
            password: password
        };
    
        fetch('http://34.30.198.59:8081/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Identifiant et/ou mot de passe incorrect(s).');
            }
            return response.json();
        })
        .then(data => {
            setErrorMessage(null);
            localStorage.setItem('token', data.accessToken);
        
            const decodedToken = decode(data.accessToken);
            if (decodedToken.roles && decodedToken.roles.length > 0) {
                const userRole = decodedToken.roles[0].authority;
                setRole(userRole);
                localStorage.setItem('role', userRole); // Stocker le rôle dans le localStorage
            }
        
            setIsAuthenticated(true); 
            navigate('/');
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage(error.message);
        });
    };

    return (
        <div className="container">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                    <input type="text" id="username" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Se connecter</button>
            </form>
        </div>
    );
};

export default ConnexionController;
