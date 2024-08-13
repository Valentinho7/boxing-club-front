import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplaySession = () => {
  const [sessions, setSessions] = useState([]);
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
    } else {
      setError('No token found in localStorage');
      console.error('No token found in localStorage');
    }
  }, [token]);

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Sessions</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            <h2>{session.name}</h2>
            <p>Duration: {session.durationInHours} hours</p>
            <p>Type: {session.sessionType}</p>
            <p>Date: {session.date}</p>
            <p>Hour: {session.hour}</p>
            <p>Coach: {session.coachName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplaySession;