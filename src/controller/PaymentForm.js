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
    formData: null
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

  handlePaymentValidation = async (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const reservationId = urlParams.get('reservationId');
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
  
    if (reservationId) {
      try {
        const response = await axios.put(`http://34.30.198.59:8081/api/reservations/${reservationId}/validate`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          alert('Réservation validée avec succès');
        } else {
          alert('Erreur lors de la validation de la réservation');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la validation de la réservation');
      }
    } else {
      alert('Aucun ID de réservation trouvé');
    }
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
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
            <button className="btn btn-primary btn-block" onClick={this.handlePaymentValidation}>Valider le paiement</button>            </div>
          </form>
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
          <hr style={{ margin: "60px 0 30px" }} />
          <div className="App-badges">
          </div>
          <hr style={{ margin: "30px 0" }} />
          <SupportedCards />
        </div>
      </div>
    );
  }
}
