import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function UpdateForm({ user, onUserUpdate }) {
  const handleSubmit = async (values, { setSubmitting }) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://34.30.198.59:8081/api/member/update', values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUserUpdate(values);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        firstname: user.firstname,
        lastname: user.lastname,
        birthdate: user.birthdate,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="firstname">Prénom</label>
            <Field name="firstname" type="text" className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')} />
            <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname">Nom</label>
            <Field name="lastname" type="text" className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
            <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
          </div>
          <div className="mb-3">
            <label htmlFor="birthdate">Date de naissance</label>
            <Field name="birthdate" type="date" className={'form-control' + (errors.birthdate && touched.birthdate ? ' is-invalid' : '')} />
            <ErrorMessage name="birthdate" component="div" className="invalid-feedback" />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber">Numéro de téléphone</label>
            <Field name="phoneNumber" type="text" className={'form-control' + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')} />
            <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Adresse</label>
            <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
            <ErrorMessage name="address" component="div" className="invalid-feedback" />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Mettre à jour
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default UpdateForm;
