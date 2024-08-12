import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplaySessionType = () => {
  const [sessionTypes, setSessionTypes] = useState([]);
  const [editingType, setEditingType] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://34.30.198.59:8081/api/sessions/types', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setSessionTypes(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the session types!', error);
        });
    } else {
      console.error('No token found in localStorage');
    }
  }, []);

  const handleEditClick = (type) => {
    setEditingType(type);
    setNewName(type.name);
  };

  const handleSaveClick = (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.put(`http://34.30.198.59:8081/api/sessions/types/${id}`, { name: newName }, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setSessionTypes(sessionTypes.map(type => type.id === id ? { ...type, name: newName } : type));
          setEditingType(null);
        })
        .catch(error => {
          console.error('There was an error updating the session type!', error);
        });
    } else {
      console.error('No token found in localStorage');
    }
  };

  if (sessionTypes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Types de Sessions</h1>
      <div className="row">
        {sessionTypes.map((type, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <div className="card-body">
                {editingType && editingType.id === type.id ? (
                  <>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="form-control mb-2"
                    />
                    <button
                      className="btn btn-success"
                      onClick={() => handleSaveClick(type.id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{type.name}</h5>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(type)}
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

export default DisplaySessionType;