import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email invalide').required('Email requis'),
    password: Yup.string().min(6, 'Le mot de passe doit contenir au minimum 6 caractères').required('Mot de passe requis'),
});

function RegisterAdminController() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const register = (values, { resetForm }) => {
        const token = localStorage.getItem('token');
        fetch('http://34.30.198.59:8081/api/admin/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(values)
        })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(data => ({data, ok: response.ok}));
            } else {
                return response.text().then(text => ({text, ok: response.ok}));
            }
        })
        .then(({data, text, ok}) => {
            if (ok) {
                // Handle success
                setErrorMessage(null);
                setSuccessMessage('Administrateur enregistré avec succès.');
                resetForm(); // Reset the form after successful submission
            } else {
                // Handle error
                const errorMessage = typeof data === 'object' ? JSON.stringify(data) : text;
                setErrorMessage(errorMessage);
            }
        })
        .catch((error) => {
            setErrorMessage(error.message);
        })
    };

    return (
        <div>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={register}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Mot de passe</label>
                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    );
}

export default RegisterAdminController;