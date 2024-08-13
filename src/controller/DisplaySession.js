import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplaySession = () => {
  const [sessions, setSessions] = useState([]);
  const [sessionTypes, setSessionTypes] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://34.30.198.59:8081/api/sessions', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setSessions(response.data);
        })
        .catch(error => {
          setError('There was an error fetching the sessions!');
          console.error(error);
        });

      axios.get('http://34.30.198.59:8081/api/sessions/types', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setSessionTypes(response.data);
        })
        .catch(error => {
          setError('There was an error fetching the session types!');
          console.error(error);
        });
    } else {
      setError('No token found in localStorage');
      console.error('No token found in localStorage');
    }
  }, [token]);

  const getSessionTypeName = (typeId) => {
    const type = sessionTypes.find(t => t.id === typeId);
    return type ? type.name : 'Unknown';
  };

  const handleDeleteClick = (id) => {
    console.log(`Deleting session with id: ${id}`); // Log the ID to verify it's correct
    if (token) {
      axios.delete(`http://34.30.198.59:8081/api/sessions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          setSessions(prevSessions => prevSessions.filter(session => session.id !== id));
        })
        .catch(error => {
          setError('There was an error deleting the session!');
          console.error(error);
        });
    } else {
      setError('No token found in localStorage');
      console.error('No token found in localStorage');
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Sessions</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {sessions.map(session => {
          console.log('Session details:', session); // Log each session's details
          return (
            <li key={session.id}>
              <h2>{session.name}</h2>
              <p>Duration: {session.durationInHours} hours</p>
              <p>Description: {session.description}</p>
              <p>Type: {getSessionTypeName(session.sessionTypeId)}</p>
              <p>Date: {session.date}</p>
              <p>Hour: {session.hour}H00</p>
              <p>Coach: {session.coachName}</p>
              <p>Max People: {session.maxPeople}</p>
              <button className="btn btn-danger" onClick={() => handleDeleteClick(session.id)}>Supprimer</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DisplaySession;