import React from 'react';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import './Checkout.css';

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    const {stripe, elements} = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  render() {
    const {stripe} = this.props;
    return (
      <div className="center-div">
        <h2>Checkout</h2>
        <div className="checkout-form">
          <form onSubmit={this.handleSubmit}>
              <CardElement />
              <button type="submit" disabled={!stripe}>
              Pay
              </button>
          </form>
        </div>
      </div>
    );
  }
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const InjectedCheckoutForm = () => {
  return (
        <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {({elements, stripe}) => (
                    <CheckoutForm elements={elements} stripe={stripe} />
                )}
            </ElementsConsumer>
        </Elements>
  );
};

export default InjectedCheckoutForm;