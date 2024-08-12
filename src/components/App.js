import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'; 
import RegisterController from '../controller/RegisterController';
import Planning from '../controller/PlanningController';
import UpdateController from '../controller/MemberDetailsController';
import ConnectionController from '../controller/ConnectionController';
import ValidateAccount from '../controller/ValidateAccount';
import Navbar from '../components/Navbar'; 
import HomePage from '../components/HomePage'; 
import Password from '../controller/ChangePasswordController';
import AdminPassword from '../controller/ChangePasswordControllerAdmin';
import AddSession from '../controller/AddSessionController';
import RegisterAdmin from '../controller/RegisterAdminController';
import DisplaySessionType from '../controller/DisplaySessionType.js';
import DisplaySession from '../controller/DisplaySession.js';

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
                    <Route path="/admin" element={<AdminPassword />} />
                    <Route path="/planning" element={<Planning />} />
                    <Route path="/addSession" element={<AddSession />} />
                    <Route path="/registerAdmin" element={<RegisterAdmin />} />
                    <Route path="/sessionTypes" element={<DisplaySessionType />} />
                    <Route path="/sessions" element={<DisplaySession />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
