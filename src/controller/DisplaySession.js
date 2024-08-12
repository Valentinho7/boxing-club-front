import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplaySession = () => {
  const [sessions, setSessions] = useState([]);
  const [editingSession, setEditingSession] = useState(null);
  const [newSessionData, setNewSessionData] = useState({
    name: '',
    durationInHours: 0,
    description: '',
    nameSessionType: '',
    date: '',
    hour: 0,
    coachName: '',
    maxPeople: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://34.30.198.59:8081/api/sessions', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setSessions(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the sessions!', error);
        });
    } else {
      console.error('No token found in localStorage');
    }
  }, []);

  const handleEditClick = (session) => {
    setEditingSession(session);
    setNewSessionData({
      name: session.name,
      durationInHours: session.durationInHours,
      description: session.description,
      nameSessionType: session.nameSessionType,
      date: session.date,
      hour: session.hour,
      coachName: session.coachName,
      maxPeople: session.maxPeople,
    });
  };

  const handleSaveClick = (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.put(`http://34.30.198.59:8081/api/sessions/${id}`, newSessionData, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setSessions(sessions.map(session => session.id === id ? { ...session, ...newSessionData } : session));
          setEditingSession(null);
        })
        .catch(error => {
          console.error('There was an error updating the session!', error);
        });
    } else {
      console.error('No token found in localStorage');
    }
  };

  if (sessions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Sessions</h1>
      <div className="row">
        {sessions.map((session, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <div className="card-body">
                {editingSession && editingSession.id === session.id ? (
                  <>
                    <input
                      type="text"
                      value={newSessionData.name}
                      onChange={(e) => setNewSessionData({ ...newSessionData, name: e.target.value })}
                      className="form-control mb-2"
                      placeholder="Name"
                    />
                    <input
                      type="number"
                      value={newSessionData.durationInHours}
                      onChange={(e) => setNewSessionData({ ...newSessionData, durationInHours: e.target.value })}
                      className="form-control mb-2"
                      placeholder="Duration in Hours"
                    />
                    <input
                      type="text"
                      value={newSessionData.description}
                      onChange={(e) => setNewSessionData({ ...newSessionData, description: e.target.value })}
                      className="form-control mb-2"
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      value={newSessionData.nameSessionType}
                      onChange={(e) => setNewSessionData({ ...newSessionData, nameSessionType: e.target.value })}
                      className="form-control mb-2"
                      placeholder="Session Type"
                    />
                    <input
                      type="date"
                      value={newSessionData.date}
                      onChange={(e) => setNewSessionData({ ...newSessionData, date: e.target.value })}
                      className="form-control mb-2"
                      placeholder="Date"
                    />
                    <input
                      type="number"
                      value={newSessionData.hour}
                      onChange={(e) => setNewSessionData({ ...newSessionData, hour: e.target.value })}
                      className="form-control mb-2"
                      placeholder="Hour"
                    />
                    <input
                      type="text"
                      value={newSessionData.coachName}
                      onChange={(e) => setNewSessionData({ ...newSessionData, coachName: e.target.value })}
                      className="form-control mb-2"
                      placeholder="Coach Name"
                    />
                    <input
                      type="number"
                      value={newSessionData.maxPeople}
                      onChange={(e) => setNewSessionData({ ...newSessionData, maxPeople: e.target.value })}
                      className="form-control mb-2"
                      placeholder="Max People"
                    />
                    <button
                      className="btn btn-success"
                      onClick={() => handleSaveClick(session.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{session.name}</h5>
                    <p className="card-text">Duration: {session.durationInHours} hours</p>
                    <p className="card-text">Description: {session.description}</p>
                    <p className="card-text">Type: {session.nameSessionType}</p>
                    <p className="card-text">Date: {session.date}</p>
                    <p className="card-text">Hour: {session.hour}</p>
                    <p className="card-text">Coach: {session.coachName}</p>
                    <p className="card-text">Max People: {session.maxPeople}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(session)}
                    >
                      Modifier
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplaySession;