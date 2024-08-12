import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function ChangePasswordFormAdmin() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://34.30.198.59:8081/api/admin/changePassword', values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setSuccessMessage('Mot de passe changé avec succès');
        setErrorMessage(null);
        resetForm();
      } else {
        throw new Error('Erreur lors du changement de mot de passe');
      }
    } catch (err) {
      setErrorMessage(err.message);
      setSuccessMessage(null);
    }
    setSubmitting(false);
  };

  return (
    <div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="oldPassword">Ancien mot de passe</label>
              <Field name="oldPassword" type="password" className={'form-control' + (errors.oldPassword && touched.oldPassword ? ' is-invalid' : '')} />
              <ErrorMessage name="oldPassword" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword">Nouveau mot de passe</label>
              <Field name="newPassword" type="password" className={'form-control' + (errors.newPassword && touched.newPassword ? ' is-invalid' : '')} />
              <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword">Confirmez le nouveau mot de passe</label>
              <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
              <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Changer le mot de passe
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePasswordFormAdmin;