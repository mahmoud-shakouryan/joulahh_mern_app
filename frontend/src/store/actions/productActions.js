import axios from "axios";
import * as actions from "./actionTypes";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


export const listProducts = () => {
  return async (dispatch) => {
    dispatch({ type: actions.PRODUCT_LIST_REQUEST });
    try {
      const { data } = await axiosInstance.get("/products");
      console.log(data)
      dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: actions.PRODUCT_LIST_FAIL, payload: err.message });
    }
  };
};
