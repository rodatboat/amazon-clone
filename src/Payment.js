import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";

export default function Payment() {
  const history = useHistory();

  const [{ user, basket }, dispatch] = useStateValue();
  const [clientSecret, setClientSecret] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    if (getBasketTotal(basket).toFixed(2) > 0) {
      const getClientSecret = async () => {
        const response = await axios({
          method: "post",
          // Stripe expects the total in a currencies subunits
          url: `/payments/create?total=${
            getBasketTotal(basket).toFixed(2) * 100
          }`,
        });
        setClientSecret(response.data.clientSecret);
      };

      getClientSecret();
      console.log("THE SECRET IS >>>", clientSecret);
    }
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);

  const handleSubmit = async (e) => {
    // Stripe stuff in here...
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // Payment Intent = Payment Confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment Section - Delviery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 Compton Road</p>
            <p>Miami, FL</p>
          </div>
        </div>

        {/* Payment Section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((i) => (
              <CheckoutProduct
                // key={i.id}
                id={i.id}
                image={i.image}
                title={i.title}
                price={i.price}
                rating={i.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment Section - Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe Magic! will go here*/}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
