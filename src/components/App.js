import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'; // Assurez-vous que le chemin d'importation est correct
import RegisterController from '../controller/RegisterController';
import UpdateController from '../controller/MemberDetailsController';
import ConnectionController from '../controller/ConnectionController';
import Planning from '../controller/PlanningController';
import ValidateAccount from '../controller/ValidateAccount';
import Navbar from '../components/Navbar'; 
import HomePage from '../components/HomePage'; 
import Password from '../controller/ChangePasswordController';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterController />} />
                    <Route path="/update" element={<UpdateController />} />
                    <Route path="/login" element={<ConnectionController />} />
                    <Route path="/validate" element={<ValidateAccount />} />
                    <Route path="/password" element={<Password />} />
                    <Route path="/planning" element={<Planning />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;