import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplaySessionType = () => {
  const [sessionTypes, setSessionTypes] = useState([]);

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
                <h5 className="card-title">{type.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplaySessionType;