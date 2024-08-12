import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function RegisterAdminController() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const register = (values) => {
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
                setSuccessMessage('Admin registered successfully. Redirecting to login page...');
                setTimeout(() => {
                    navigate('/login');
                }, 5000); // Redirect to login page after 5 seconds
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
                        <label htmlFor="password">Password</label>
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