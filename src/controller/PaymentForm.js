import React from "react";
import Card from "react-credit-cards-2";
import axios from 'axios';

import SupportedCards from "./Cards";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";

import "react-credit-cards-2/dist/es/styles-compiled.css";

export default class App extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
    reservationId: '',
    successMessage: '',
    errorMessage: ''
  };

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const reservationId = queryParams.get('reservationId');
    this.setState({ reservationId });
  }

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

  handleSubmit = (event) => {
    event.preventDefault();
    const { reservationId } = this.state;

    axios.put(`http://34.30.198.59:8081/api/reservations/${reservationId}/validate`)
      .then(response => {
        this.setState({ successMessage: 'Paiement validé avec succès!', errorMessage: '' });
      })
      .catch(error => {
        this.setState({ errorMessage: 'Erreur lors de la validation du paiement.', successMessage: '' });
      });
  };

  render() {
    const { successMessage, errorMessage } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
          <input type="hidden" name="reservationId" value={this.state.reservationId} />
          <div className="form-actions">
            <button className="btn btn-primary btn-block">Valider le paiement</button>
          </div>
        </form>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      </div>
    );
  }
}