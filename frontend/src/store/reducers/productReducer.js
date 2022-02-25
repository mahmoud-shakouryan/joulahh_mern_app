import * as actions from "../actions/actionTypes";

const initilaState = { loading: true, products: [] };

export const productListReducer = (state = initilaState, action) => {
  switch (action.type) {
    case actions.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case actions.PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case actions.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
