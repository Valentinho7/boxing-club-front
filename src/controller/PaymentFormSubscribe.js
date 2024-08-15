import React from "react";
import Card from "react-credit-cards-2";
import { useNavigate } from 'react-router-dom';

import "react-credit-cards-2/dist/es/styles-compiled.css";

// Assurez-vous d'importer les fonctions correctement
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils"; // Remplacez './utils' par le chemin correct vers votre fichier utils

class PaymentForm extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focused: "",
    issuer: "",
    successMessage: '',
    errorMessage: ''
  };

  setSuccessMessage = (message) => {
    this.setState({ successMessage: message });
  };

  setErrorMessage = (message) => {
    this.setState({ errorMessage: message });
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handlePaymentValidation = (event) => {
    event.preventDefault();
    // Display success message
    this.setSuccessMessage('Paiement validé avec succès. Redirection vers la page d\'accueil...');
    // Redirect to home page after 3 seconds
    setTimeout(() => {
      this.props.navigate('/');
    }, 3000);
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, successMessage, errorMessage } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handlePaymentValidation}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Numéro de carte"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Titulaire de la carte"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="MM/AA"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVV"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <button className="btn btn-primary btn-block" type="submit">Valider le paiement</button>
            </div>
          </form>
          <hr style={{ margin: "60px 0 30px" }} />
        </div>
      </div>
    );
  }
}

const PaymentFormWithNavigate = (props) => {
    const navigate = useNavigate();
    return <PaymentForm {...props} navigate={navigate} />;
};

export default PaymentFormWithNavigate;
