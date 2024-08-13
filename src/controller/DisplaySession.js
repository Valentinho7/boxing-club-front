import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplaySession = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get('http://34.30.198.59:8081/api/sessions')
      .then(response => {
        setSessions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sessions!', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Sessions</h1>
      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            <h2>{session.name}</h2>
            <p>Duration: {session.durationInHours} hours</p>
            <p>Type: {session.sessionType}</p>
            <p>Date: {session.date}</p>
            <p>Hour: {session.hour}</p>
            <p>Coach: {session.coachName}</p>
            <p>Max People: {session.maxPeople}</p>
            <p>Description: {session.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplaySession;