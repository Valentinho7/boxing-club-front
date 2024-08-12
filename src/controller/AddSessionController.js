import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddSessionController = () => {
  const [sessionTypes, setSessionTypes] = useState([]);
  const [showAddType, setShowAddType] = useState(false);
  const [newSessionType, setNewSessionType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const initialValues = {
    name: '',
    durationInHours: '',
    description: '',
    nameSessionType: '',
    date: '',
    hour: '',
    coachName: '',
    maxPeople: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    durationInHours: Yup.number().required('Required'),
    description: Yup.string().required('Required'),
    nameSessionType: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    hour: Yup.number().min(8, 'Hour must be at least 8').max(18, 'Hour must be at most 18').required('Required'),
    coachName: Yup.string().required('Required'),
    maxPeople: Yup.number().required('Required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://34.30.198.59:8081/api/sessions', values, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          console.log('Session added successfully');
          resetForm();
        })
        .catch(error => {
          console.error('There was an error adding the session!', error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      console.error('No token found in localStorage');
      setSubmitting(false);
    }
  };

  const handleAddSessionType = () => {
    if (sessionTypes.some(type => type.name.toLowerCase() === newSessionType.toLowerCase())) {
      setErrorMessage('Ce type de session existe déjà.');
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://34.30.198.59:8081/api/sessions/types', 
        { name: newSessionType },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        setSessionTypes([...sessionTypes, { name: newSessionType }]);
        setNewSessionType('');
        setShowAddType(false);
        setErrorMessage('');
      })
      .catch(error => {
        console.error('There was an error adding the session type!', error);
      });
    } else {
      console.error('No token found in localStorage');
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="durationInHours">Duration (in hours)</label>
              <Field name="durationInHours" type="number" className={'form-control' + (errors.durationInHours && touched.durationInHours ? ' is-invalid' : '')} />
              <ErrorMessage name="durationInHours" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
              <ErrorMessage name="description" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="nameSessionType">Session Type</label>
              <Field as="select" name="nameSessionType" className={'form-control' + (errors.nameSessionType && touched.nameSessionType ? ' is-invalid' : '')}>
                <option value="">Select a session type</option>
                {sessionTypes.map((type, index) => (
                  <option key={index} value={type.name}>{type.name}</option>
                ))}
              </Field>
              <ErrorMessage name="nameSessionType" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <span 
                style={{ color: 'blue', cursor: 'pointer' }} 
                onClick={() => setShowAddType(!showAddType)}
              >
                + Ajouter un type de session
              </span>
            </div>
            {showAddType && (
              <div className="mb-3">
                <input 
                  type="text" 
                  value={newSessionType} 
                  onChange={(e) => setNewSessionType(e.target.value)} 
                  className="form-control" 
                  placeholder="Nom du type de session" 
                />
                <button 
                  type="button" 
                  className="btn btn-primary mt-2" 
                  onClick={handleAddSessionType}
                >
                  Ajouter
                </button>
                {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="date">Date</label>
              <Field name="date" type="date" className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')} />
              <ErrorMessage name="date" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="hour">Hour</label>
              <Field name="hour" type="number" className={'form-control' + (errors.hour && touched.hour ? ' is-invalid' : '')} />
              <ErrorMessage name="hour" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="coachName">Coach Name</label>
              <Field name="coachName" type="text" className={'form-control' + (errors.coachName && touched.coachName ? ' is-invalid' : '')} />
              <ErrorMessage name="coachName" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="maxPeople">Max People</label>
              <Field name="maxPeople" type="number" className={'form-control' + (errors.maxPeople && touched.maxPeople ? ' is-invalid' : '')} />
              <ErrorMessage name="maxPeople" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Add Session</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSessionController;