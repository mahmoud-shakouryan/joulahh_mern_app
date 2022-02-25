//paymentMethod ro hazfesh kardam az ejraye app.

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from "../components/checkoutSteps/CheckoutSteps";
import * as actions from "../store/actions/actionTypes";

const PaymentMethodScreen = (props) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const { shippingAddress } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: actions.CART_SAVE_PAYMENT_METHOD,
      payload: paymentMethod,
    });
    navigate("/placeorder");
  };

  useEffect(() => {
    //ino copy kardam bordam tu placeorderScreen
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method </h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">Paypal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
