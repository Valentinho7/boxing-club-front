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
import DisplaySessionMember from '../controller/DisplaySessionMember.js';
import DisplayMemberReservations from '../controller/DisplayMemberReservations.js';
import PaymentForm from '../controller/PaymentForm.js';
import ReservationHistory from '../controller/ReservationHistory.js';
import PaymentFormSubscribe from '../controller/PaymentFormSubscribe.js';
import DisplayMember from '../controller/DisplayMember.js';

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
                    <Route path="/sessions/type" element={<DisplaySessionType />} />
                    <Route path="/sessions" element={<DisplaySession />} />
                    <Route path="/sessions/member" element={<DisplaySessionMember />} />
                    <Route path="/memberReservations" element={<DisplayMemberReservations />} />
                    <Route path="/payment" element={<PaymentForm />} />
                    <Route path="/history" element={<ReservationHistory />} />
                    <Route path="/paymentSubscription" element={<PaymentFormSubscribe />} />
                    <Route path="/member" element={<DisplayMember />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
