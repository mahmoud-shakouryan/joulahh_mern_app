import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import LoadingBox from "../../components/loadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { createOrder } from "../../store/actions/orderActions";
import * as actions from "../../store/actions/actionTypes";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import "./placeOrderScreen.css";

const PlaceOrderScreen = (props) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartReducer);
  const { loading, success, error, order } = useSelector(
    (state) => state.orderCreate
  );
  const { shippingAddress } = useSelector((state) => state.cartReducer);

  const toPrice = (num) => Number(num.toFixed(2)); //5.122323 >> "5.12" >> 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice); //mohasebe maliat az kole gheymate kalaha
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems })); //kare khasi nakardim faghat chon baraye order ma orderItems mikhaim na cartItems vali mohtaviateshoon yekie, esmeshoon ro taghir dadim.
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: actions.ORDER_CREATE_RESET }); //faghat state'e orderCreate ro khali kardim
      return navigate(`/order/${order._id}`);
    }
  }, [dispatch, cart.paymentMethod, success, order]);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress]);

  return (
    <div className="placeOrder-container">
      <div className="placeOrder-checkoutSteps">
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div className="recipt-wrapper">
        <div className="recipt-summary">
          <ul>
            <li>
              <div>
                <p>مشخصات :</p>
                <p>
                  <strong>نام :</strong>
                  <span> {cart.shippingAddress.fullName} </span>
                  <br />
                  <strong> آدرس :</strong>
                  <span className="address">
                    {" "}
                    {cart.shippingAddress.province} ,{" "}
                    {cart.shippingAddress.city} , {cart.shippingAddress.address}{" "}
                    , {cart.shippingAddress.mobileNum} ,{" "}
                    {cart.shippingAddress.telNum} ,{" "}
                    {cart.shippingAddress.postalCode}
                  </span>
                </p>
              </div>
            </li>
            <li className="orderItemsWrapper">
              <p className="title">اقلام سفارشی</p>
              <ul className="img-details-wrapper">
                {cart.cartItems.map((cartItem) => (
                  <li className="imgDetailsLi" key={cartItem.product}>
                    <div className="wrapperDiv">
                      <div className="imgWrapper">
                        <img src={cartItem.image} alt={cartItem.name} />
                      </div>

                      <Link to={`/product/${cartItem.product}`}>
                        {cartItem.name}
                      </Link>

                      <div className="priceWrapper">
                        {cartItem.qty} x {cartItem.price} ={" "}
                        {cartItem.qty * cartItem.price}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <div className="price-summary">
          <ul>
            <li>
              <ul>
                <li>
                  <p id="title">رسید قیمت </p>
                </li>
                <li className="recipt">
                  <div>
                    <div>
                      <strong>قیمت کل</strong>
                    </div>
                    <div>{cart.totalPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div>دستمزد</div>
                    <div>{cart.taxPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div>اقلام</div>
                    <div>{cart.itemsPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div>ارسال پستی</div>
                    <div>{cart.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
              </ul>
            </li>
            <li className="buttonWrapper">
              <button                                  //click >>> 1- ijade documente order tu db , 2-pak shodane documente cartItems az localStorage , 3-raftan be page'e orderScreen
                type="button"
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0}
              >
                {loading ? <span><LoadingBox /></span> : "ثبت سفارش"}                       
              </button>
            </li>

            <div className="placeOrderMsgBox">
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
