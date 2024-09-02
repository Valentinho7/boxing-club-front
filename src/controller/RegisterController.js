import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Prénom requis'),
    lastname: Yup.string().required('Nom requis'),
    birthdate: Yup.date().required('Date de naissance requise'),
    email: Yup.string().email('Email invalide').required('Email requis'),
    phoneNumber: Yup.string().required('Numéro de téléphone requis'),
    address: Yup.string().required('Adresse requise'),
    password: Yup.string().min(6, 'Le mot de passe doit contenir au minimum 6 caractères').required('Mot de passe requis'),
});

function RegisterController() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();


    const register = (values) => {
        fetch('http://34.30.198.59:8081/api/member/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                setSuccessMessage('Inscription réussie. Redirection vers la page de connexion...');
                setTimeout(() => {
                    navigate('/login');
                }, 5000); // Redirige vers la page de login après 5 secondes
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
                firstname: '',
                lastname: '',
                birthdate: '',
                email: '',
                phoneNumber: '',
                address: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={register}
        >
            {({ errors, touched }) => (
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
                        <label htmlFor="address">Adresse postale</label>
                        <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                        <ErrorMessage name="address" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Mot de passe</label>
                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    );
}

export default RegisterController;
