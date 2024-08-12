import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const navigate = useNavigate();
    const role = localStorage.getItem('role'); 

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const renderDropdownItems = () => {
        if (role === 'Member') {
            return (
                <>
                    <li><Link className="dropdown-item" to="/validate">Adhérer au club</Link></li>
                    <li><Link className="dropdown-item" to="/update">Mes informations</Link></li>
                    <li><Link className="dropdown-item" to="/password">Changer de mot de passe</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                </>
            );
        }

        if (role === 'Admin') {
            return (
                <>
                    <li><Link className="dropdown-item" to="/admin">Changer de mot de passe</Link></li>
                    <li><Link className="dropdown-item" to="/registerAdmin">Ajouter un admin</Link></li>
                    <li><Link className="dropdown-item" to="/addSession">Ajouter une session</Link></li>
                    <li><Link className="dropdown-item" to="/sessions/type">Liste des types de sessions</Link></li>
                    <li><Link className="dropdown-item" to="/sessions">Liste des sessions</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                </>
            );
        }

        return null;
    };

    console.log('Role in Navbar:', role);


    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">BOXING CLUB</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">S'inscrire</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Se connecter</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/planning">Planning</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Mon compte
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            {renderDropdownItems()}
            <li><button className="dropdown-item" onClick={handleLogout}>Se déconnecter</button></li>
        </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;