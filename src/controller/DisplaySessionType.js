import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplaySessionType = () => {
  const [sessionTypes, setSessionTypes] = useState([]);
  const [editingType, setEditingType] = useState(null);
  const [newName, setNewName] = useState('');
  const [addingNew, setAddingNew] = useState(false);
  const [newSessionTypeName, setNewSessionTypeName] = useState('');

  const fetchSessionTypes = () => {
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
  };

  useEffect(() => {
    fetchSessionTypes();
  }, []);

  const handleAddSaveClick = () => {
    if (!newSessionTypeName.trim()) {
      console.error('Session type name cannot be empty');
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://34.30.198.59:8081/api/sessions/types', { name: newSessionTypeName }, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          console.log('Server response:', response); // Log the full server response
          const newSessionType = response.data;
          if (!newSessionType || !newSessionType.name) {
            console.error('Invalid session type received from server');
            return;
          }
          console.log('New session type added:', newSessionType); // Debugging line
          fetchSessionTypes(); // Fetch the updated list of session types
          setAddingNew(false);
          setNewSessionTypeName('');
        })
        .catch(error => {
          console.error('There was an error adding the session type!', error);
        });
    } else {
      console.error('No token found in localStorage');
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Session Types</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              {addingNew ? (
                <>
                  <input
                    type="text"
                    value={newSessionTypeName}
                    onChange={(e) => setNewSessionTypeName(e.target.value)}
                    className="form-control mb-2"
                    placeholder="New Session Type Name"
                  />
                  <button
                    className="btn btn-success"
                    onClick={handleAddSaveClick}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setAddingNew(false)}
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setAddingNew(true)}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
        {sessionTypes.map((type, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <div className="card-body">
                {editingType === type.id ? (
                  <>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="form-control mb-2"
                      placeholder="Edit Session Type Name"
                    />
                    <button
                      className="btn btn-success"
                      onClick={() => handleSaveClick(type.id)}
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