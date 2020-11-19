import { Stripe } from 'stripe';

var React = require('react');


class PaymentForm extends React.Component{
    state = {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null,
      stripeToken: null
    };

//   getScriptURL: function() {
//     return 'https://js.stripe.com/v2/';
//   },

  componentDidMount() {
    if (!PaymentForm.getStripeToken) {
      // Put your publishable key here
      const stripe = new Stripe('pk_test_05w1UMm37UTSKmtDTNZgzMTI00mSfQXY2V');
      console.log(" stripe ", stripe);
      this.setState({ stripeLoading: false, stripeLoadingError: false, stripeToken: stripe });
    }
  };

  onScriptError = () => {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  };

  onSubmit = event =>  {
    var self = this;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });
    // send form here
    console.log(" outside this.state.stripeToken ", this.state.stripeToken);
    if(this.state.stripeToken != null){
        console.log(" inside this.state.stripeToken ", this.state.stripeToken);
        this.state.stripeToken.createToken(event.target, function(status, response) {
            if (response.error) {
                self.setState({ paymentError: response.error.message, submitDisabled: false });
            }
            else {
                self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
                // make request to your server here!
                console.log("payment completed token ", response.id);
            }
        });
    }
  };

  render() {
    if (this.state.stripeLoading) {
      return <div>Loading</div>;
    }
    else if (this.state.stripeLoadingError) {
      return <div>Error</div>;
    }
    else if (this.state.paymentComplete) {
      return <div>Payment Complete!</div>;
    }
    else {
      return (<form onSubmit={this.onSubmit} >
        <span>{ this.state.paymentError }</span><br />
        <input type='text' data-stripe='number' placeholder='credit card number' /><br />
        <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
        <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
        <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
        <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
      </form>);
    }
  }
}

export default PaymentForm;
