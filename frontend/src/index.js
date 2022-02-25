import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import { productListReducer } from './store/reducers/productReducer';
import { productDetailsReducer } from './store/reducers/productDetailsReducer';
import { cartReducer } from './store/reducers/cartReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './store/reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer } from './store/reducers/orderReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const initialState = {  ino bejaye inke inja bezaram bordam too hamoon file'e cartReducer
//   cartReducer : {
//     cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
//   }
// };
const reducer = combineReducers({
  productListReducer: productListReducer,
  productDetailsReducer : productDetailsReducer,
  cartReducer : cartReducer,
  userSigninReducer : userSigninReducer,
  userRegisterReducer : userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer
})
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
