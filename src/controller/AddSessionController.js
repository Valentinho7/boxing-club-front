import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddSessionForm = () => {
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
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
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
                {sessionTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="nameSessionType" component="div" className="invalid-feedback" />
            </div>
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
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Add Session</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSessionForm;
