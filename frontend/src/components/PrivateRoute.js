import { Route } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //tu destructuring in karo bokonim engar oon component ro keshidim biroon vali taghire esmesh dadim be Component
  const { userInfo } = useSelector((state) => state.userSigninReducer);
  return (
    <Route
      {...rest}
      render={(props) =>  
        userInfo ? <Component {...props} /> : <Navigate to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
