import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h1 style={{ textAlign: 'center' }}>Sessions</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {Array.isArray(sessions) && sessions.length > 0 ? (
          sessions.map(session => (
            <li key={session.id}>
              {editingSession === session.id ? (
                <div>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} />
                  <input type="text" name="durationInHours" value={formData.durationInHours} onChange={handleChange} />
                  <input type="text" name="description" value={formData.description} onChange={handleChange} />
                  <input type="text" name="nameSessionType" value={formData.nameSessionType} onChange={handleChange} />
                  <input type="text" name="date" value={formData.date} onChange={handleChange} />
                  <input type="text" name="hour" value={formData.hour} onChange={handleChange} />
                  <input type="text" name="coachName" value={formData.coachName} onChange={handleChange} />
                  <input type="text" name="maxPeople" value={formData.maxPeople} onChange={handleChange} />
                  <button className="btn btn-success" onClick={handleSaveClick}>Save</button>
                </div>
              ) : (
                <div>
                  <h2>{session.name}</h2>
                  <p>ID: {session.id}</p>
                  <p>Duration: {session.durationInHours} hours</p>
                  <p>Description: {session.description}</p>
                  <p>Type: {session.nameSessionType}</p>
                  <p>Date: {session.date}</p>
                  <p>Hour: {session.hour}H00</p>
                  <p>Coach: {session.coachName}</p>
                  <p>Max People: {session.maxPeople}</p>
                  <button className="btn btn-danger" onClick={() => handleDeleteClick(session.id)}>Supprimer</button>
                  <button className="btn btn-primary" onClick={() => handleEditClick(session)}>Modifier</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No sessions available.</p>
        )}
      </ul>
    </div>
  );
};

export default DisplaySession;