import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddSessionForm = () => {
  const [sessionTypes, setSessionTypes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://34.30.198.59:8081/api/sessions/types', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setSessionTypes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the session types!', error);
      });
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
    hour: Yup.string().required('Required'),
    coachName: Yup.string().required('Required'),
    maxPeople: Yup.number().required('Required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token');
    axios.post('http://34.30.198.59:8081/api/sessions', values, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        alert('Session added successfully');
        resetForm();
      })
      .catch(error => {
        alert('Error adding session');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="durationInHours">Duration (in hours)</label>
            <Field type="number" name="durationInHours" />
            <ErrorMessage name="durationInHours" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <div>
            <label htmlFor="nameSessionType">Session Type</label>
            <Field as="select" name="nameSessionType">
              <option value="">Select a session type</option>
              {sessionTypes.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="nameSessionType" component="div" />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <Field type="date" name="date" />
            <ErrorMessage name="date" component="div" />
          </div>
          <div>
            <label htmlFor="hour">Hour</label>
            <Field type="time" name="hour" />
            <ErrorMessage name="hour" component="div" />
          </div>
          <div>
            <label htmlFor="coachName">Coach Name</label>
            <Field type="text" name="coachName" />
            <ErrorMessage name="coachName" component="div" />
          </div>
          <div>
            <label htmlFor="maxPeople">Max People</label>
            <Field type="number" name="maxPeople" />
            <ErrorMessage name="maxPeople" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>Add Session</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddSessionForm;