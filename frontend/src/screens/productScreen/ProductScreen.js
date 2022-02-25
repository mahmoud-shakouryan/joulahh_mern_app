import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../../store/actions/productDetailsAction";
import LoadingBox from "../../components/loadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox";
import "./productScreen.css";
import Rating from "../../components/rating/Rating";

const ProductScreen = (props) => {
  const productDetailsReducer = useSelector(
    (state) => state.productDetailsReducer
  );
  const { error, loading, product } = productDetailsReducer;
  const { id } = useParams(); // in id az click kardan bar rooye <a> haye axe mahsool ya esme mahsool too safheye avavl(Product.js) be dast miad
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({});
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  if (!product) {
    return <div>product not found!</div>;
  }

  const addToCartHandler = () => {
    //props.history.push(`/cart/${id}?qty=${qty}`); //ba in mirim tooye CartScreen.js pas param va search parameter ro tooye CartScreen dar vaghe az inja migirim.
    setSearchParams({ "qty" : qty});
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="productScreenContainer">
      {loading ? (
        <div className="productScreenLoadingBox">
          <LoadingBox />
        </div>
      ) : error ? (
        <div className="productScreenMsgBox">
          <MessageBox variant="danger"> {error}</MessageBox>
        </div>
      ) : (
        <div className="productScreen">
          <div className="productDetailsWrapper">
            <div className="imgWrapper">
              <div ><img src={product.image} alt={product.name} /></div>
              <div className='backLinkDiv'><Link to="/products">برگشت به محصولات</Link></div>
            </div>
            <div className="detailsWrapper">
              <div className="details1">
                <ul>
                  <li>
                    <p>{product.name}</p>
                  </li>
                  <li className="rate">
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    />
                  </li>
                  <li className="descTitle"> : توضیحات </li>
                  <li className="desc">{product.description}</li>
                </ul>
              </div>
              <div className="details2">
                <ul>
                  <li className="price">
                    قیمت : <b>{product.price} </b> تومان
                  </li>
                  <li>
                    {product.countInStock > 0 ? (
                      <span className="inStock">
                        در انبار موجود است<span> &#10003;</span>
                      </span>
                    ) : (
                      <span className="notInStock">
                        {" "}
                        در انبار موجود نیست <span> X</span>
                      </span>
                    )}
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li className="qty">
                        <div>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              //????????????????
                              (x, i) => {
                                return (
                                  <option key={i} value={i + 1}>
                                    {i + 1}
                                  </option>
                                );
                              }
                            )}
                          </select>
                        </div>
                        <p> : تعداد </p>
                      </li>
                      <li className="addToCartBtn">
                        <button onClick={addToCartHandler}>اضافه کن به سبد خرید</button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductScreen;
