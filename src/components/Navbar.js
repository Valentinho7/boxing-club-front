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

    const renderAccountDropdownItems = () => {
        if (role === 'Admin') {
            return (
                <>
                    <li><Link className="dropdown-item" to="/admin">Changer de mot de passe</Link></li>
                    <li><Link className="dropdown-item" to="/registerAdmin">Ajouter un admin</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/" onClick={handleLogout}>Déconnexion</Link></li>
                </>
            );
        }

        if (role === 'Member') {
            return (
                <>
                    <li><Link className="dropdown-item" to="/validate">Adhérer au club</Link></li>
                    <li><Link className="dropdown-item" to="/update">Mes informations</Link></li>
                    <li><Link className="dropdown-item" to="/password">Changer de mot de passe</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/" onClick={handleLogout}>Déconnexion</Link></li>
                </>
            );
        }

        return null;
    };

    const renderReservationsDropdownItems = () => {
        if (role === 'Member') {
            return (
                <>
                    <li><Link className="dropdown-item" to="/memberReservations">Mes réservations</Link></li>
                    <li><Link className="dropdown-item" to="/history">Mon historique des réservations</Link></li>
                </>
            );
        }

        if (role === 'Admin') {
            return (
                <li><Link className="dropdown-item" to="/reservations">Réservations</Link></li>
            );
        }

        return null;
    };

    const renderSessionDropdownItems = () => {
        if (role === 'Admin') {
            return (
                <>
                    <li><Link className="dropdown-item" to="/addSession">Ajouter une session</Link></li>
                    <li><Link className="dropdown-item" to="/sessions">Liste des sessions</Link></li>
                </>
            );
        }

        return null;
    };

    const renderSessionTypeDropdownItems = () => {
        if (role === 'Admin') {
            return (
                <>
                    <li><Link className="dropdown-item" to="/sessions/type">Liste des types de sessions</Link></li>
                </>
            );
        }

        return null;
    };

    const renderMemberDropdownItems = () => {
        if (role === 'Admin') {
            return (
                <>
                    <li><Link className="dropdown-item" to="/member">Liste des membres</Link></li>
                </>
            );
        }

        return null;
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-white bg-white">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Boxing Club</Link>
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
                                    <a className="nav-link dropdown-toggle" href="#" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Mon compte
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                                        {renderAccountDropdownItems()}
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="reservationsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Réservations
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="reservationsDropdown">
                                        {renderReservationsDropdownItems()}
                                    </ul>
                                </li>
                                {role === 'Admin' && (
                                    <>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="sessionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Session
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="sessionDropdown">
                                                {renderSessionDropdownItems()}
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="sessionTypeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Types de sessions
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="sessionTypeDropdown">
                                                {renderSessionTypeDropdownItems()}
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="memberDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Membre
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="memberDropdown">
                                                {renderMemberDropdownItems()}
                                            </ul>
                                        </li>
                                    </>
                                )}
                                {role === 'Member' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/sessions/member">Réserver une séance</Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;