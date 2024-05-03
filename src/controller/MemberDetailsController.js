import React, { useState, useEffect } from 'react';
import UpdateForm from './UpdateMemberController';
import '../css/style.css';

function MemberDetails() {
  const [memberData, setMemberData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    fetch('http://localhost:8081/api/member/memberDetails', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else {
        response.text().then(text => {
          console.error('Server response:', text);
        });
      }
    })
    .then(data => {
      if (data) {
        setMemberData(data);
        console.log(data);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const handleUserUpdate = (updatedUser) => {
    setMemberData(updatedUser);
    setIsEditing(false);
  };

  if (!memberData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="member-details">
      <h1>Vos informations</h1>
      {isEditing ? (
        <UpdateForm user={memberData} onUserUpdate={handleUserUpdate} />
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{memberData.firstname} {memberData.lastname}</h5>
            <p className="card-text"><strong>Date de naissance:</strong> {memberData.birthdate}</p>
            <p className="card-text"><strong>Email:</strong> {memberData.email}</p>
            <p className="card-text"><strong>Numéro de téléphone:</strong> {memberData.phoneNumber}</p>
            <p className="card-text"><strong>Adresse postale:</strong> {memberData.address}</p>
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Modifier mes informations</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberDetails;