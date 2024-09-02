import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DisplaySession = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [editingSession, setEditingSession] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    durationInHours: '',
    description: '',
    nameSessionType: '',
    date: '',
    hour: '',
    coachName: '',
    maxPeople: ''
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://34.30.198.59:8081/api/sessions', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          console.log('Sessions data:', response.data); // Log the response data
          setSessions(response.data);
        })
        .catch(error => {
          setError('There was an error fetching the sessions!');
          console.error(error);
        });
    } else {
      setError('No token found in localStorage');
      console.error('No token found in localStorage');
    }
  }, [token]);

  const handleEditClick = (session) => {
    setEditingSession(session.id);
    setFormData(session);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://34.30.198.59:8081/api/sessions/${formData.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingSession(null);
      // Optionally, refresh the session list or update the state to reflect changes
      setSessions(sessions.map(session => (session.id === formData.id ? formData : session)));
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const handleCancelClick = () => {
    setEditingSession(null);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://34.30.198.59:8081/api/sessions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(sessions.filter(session => session.id !== id));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Sessions</h1>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {Array.isArray(sessions) && sessions.length > 0 ? (
          sessions.map(session => (
            <li key={session.id} className="list-group-item">
              {editingSession === session.id ? (
                <div className="form-group">
                  <input type="text" className="form-control mb-2" name="name" value={formData.name} onChange={handleChange} placeholder="Nom" />
                  <input type="text" className="form-control mb-2" name="durationInHours" value={formData.durationInHours} onChange={handleChange} placeholder="Durée en heure" />
                  <input type="text" className="form-control mb-2" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                  <input type="text" className="form-control mb-2" name="nameSessionType" value={formData.nameSessionType} onChange={handleChange} placeholder="Type de session" />
                  <input type="text" className="form-control mb-2" name="date" value={formData.date} onChange={handleChange} placeholder="Date" />
                  <input type="text" className="form-control mb-2" name="hour" value={formData.hour} onChange={handleChange} placeholder="Heure" />
                  <input type="text" className="form-control mb-2" name="coachName" value={formData.coachName} onChange={handleChange} placeholder="Nom du coach" />
                  <input type="text" className="form-control mb-2" name="maxPeople" value={formData.maxPeople} onChange={handleChange} placeholder="Capacité maximal" />
                  <button className="btn btn-success me-2" onClick={handleSaveClick}>Enregistrer</button>
                  <button className="btn btn-secondary" onClick={handleCancelClick}>Annuler</button>
                </div>
              ) : (
                <div>
                  <h2>{session.name}</h2>
                  <p>Durée: {session.durationInHours} heures</p>
                  <p>Description: {session.description}</p>
                  <p>Type: {session.nameSessionType}</p>
                  <p>Date: {session.date}</p>
                  <p>Heure: {session.hour}H00</p>
                  <p>Coach: {session.coachName}</p>
                  <p>Capacité maximal: {session.maxPeople}</p>
                  <button className="btn btn-danger me-2" onClick={() => handleDeleteClick(session.id)}>Supprimer</button>
                  <button className="btn btn-primary" onClick={() => handleEditClick(session)}>Modifier</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>Aucune session disponible.</p>
        )}
      </ul>
    </div>
  );
};

export default DisplaySession;