import axios from "axios";
import * as actions from "./actionTypes";

export const detailsProduct = (productId) => {
  return (dispatch) => {
    dispatch({ type: actions.PRODUCT_Details_REQUEST });
    axios
      .get(`/api/products/${productId}`)
      .then((result) => {
        if (!result.data.product) {
          return dispatch({
            type: actions.PRODUCT_Details_FAIL,
            payload: result.data.message,
          });
        }
        dispatch({
          type: actions.PRODUCT_Details_SUCCESS,
          payload: result.data.product,
        });
      })
      .catch((error) => {                 //in marboot be axiose.
        dispatch({
          type: actions.PRODUCT_Details_FAIL,
          payload: error.message
        });
      });
  };
};

