import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../store/actions/cartActions";
import MessageBox from "../../components/MessageBox";
import "./cartScreen.css";

const CartScreen = (props) => {
  // const productId = props.match.params.id;
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({});  // in oon ghesmate belafasele baad az ? ro mide yaani >>> qty={qty}
  const qty = Object.keys(searchParams).length !== 0 ? searchParams.get('qty') : 1;
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;
  const userSignin = useSelector(state=>state.userSigninReducer);
  const { userInfo } = userSignin;


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if(userInfo) navigate('/shipping')
    else navigate("/signin?redirect=shipping"); //??? after signin user must be redirection?
  };

  const dispatch = useDispatch();
  useEffect(() => {
    // hala vaghte vasl shodan be backende'e
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <div className="cartContainer">
      <div className="cart-details">
      <div className="basket"><img src="../images/cart-basket.png" alt="shopping cart"  /></div>
        {cartItems.length === 0 ? (
          <div className='cartMsgBoxWrapper'>
            <MessageBox >
              <Link to="/products">برو به محصولات</Link> 
              <span>سبد خرید شما خالی است </span>
            </MessageBox>
        </div>
        ) : (
          <ul>
            {cartItems.map((cartItem) => (
              <li key={cartItem.product}>
                <div className="imgWrapper">
                  <img src={cartItem.image} alt={cartItem.name} />
                </div>
                <div className="cartInfo">
                  <Link to={`/product/${cartItem.product}`}>
                    {cartItem.name}
                  </Link>
                  <div className="selectWrapper">
                    <select
                      value={cartItem.qty}
                      onChange={(e) =>
                        dispatch(addToCart(cartItem.product, e.target.value))
                      }
                    >
                      {[...Array(cartItem.countInStock).keys()].map((x, i) => {
                        return (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                    <div>
                      <span>تومان</span> {cartItem.price}{" "}
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(cartItem.product)}
                    >
                      <img className='trash-bin-img' src='../images/trash-bin.png' alt='trash bin'/>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="cart-price-checkoutBtn">
        <ul>
          <li>
            <button
              type="button"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              ادامه
            </button>
          </li>
          <li className='subTotal'>
            <p>
              <span>مجموع</span>
             <span>{cartItems.reduce((a, c) => a + +c.qty, 0)} عدد</span>
              <span>{cartItems.reduce((a, c) => a + c.price * c.qty, 0)} تومان</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartScreen;
