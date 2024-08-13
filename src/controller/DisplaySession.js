import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplaySession = () => {
  const [sessions, setSessions] = useState([]);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [newSessionData, setNewSessionData] = useState({
    durationInHours: '',
    description: '',
    nameSessionType: '',
    date: '',
    hour: ''
  });

  const fetchSessions = () => {
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
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleEditClick = (session) => {
    setEditingSessionId(session.id);
    setNewSessionData(session);
  };

  const handleSaveClick = (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.put(`http://34.30.198.59:8081/api/sessions/${id}`, newSessionData, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          fetchSessions();
          setEditingSessionId(null);
          setNewSessionData({
            durationInHours: '',
            description: '',
            nameSessionType: '',
            date: '',
            hour: ''
          });
        })
        .catch(error => {
          console.error('There was an error updating the session!', error);
        });
    } else {
      console.error('No token found in localStorage');
    }
  };

  const handleCancelClick = () => {
    setEditingSessionId(null);
    setNewSessionData({
      durationInHours: '',
      description: '',
      nameSessionType: '',
      date: '',
      hour: ''
    });
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Sessions</h1>
      <div className="row">
        {sessions.map((session, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <div className="card-body">
                {editingSessionId === session.id ? (
                  <>
                    <input
                      type="number"
                      value={newSessionData.durationInHours}
                      onChange={(e) => setNewSessionData({ ...newSessionData, durationInHours: e.target.value })}
                      className="form-control mb-2"
                      placeholder="Duration in Hours"
                    />
                    <textarea
                      value={newSessionData.description}
                      onChange={(e) => setNewSessionData({ ...newSessionData, description: e.target.value })}
                      className="form-control mb-2"
                      placeholder="Description"
                      style={{ whiteSpace: 'pre-wrap' }}
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
                    <button
                      className="btn btn-success"
                      onClick={() => handleSaveClick(session.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelClick}
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{session.nameSessionType}</h5>
                    <p className="card-text">Duration: {session.durationInHours} hours</p>
                    <p className="card-text">Description: {session.description}</p>
                    <p className="card-text">Date: {session.date}</p>
                    <p className="card-text">Hour: {session.hour}</p>
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