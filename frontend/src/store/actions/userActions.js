import axios from "axios";
import * as actions from "./actionTypes";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


export const signin = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: actions.USER_SIGNIN_REQUEST,
      payload: { email: email, password: password },
    });
    try {
      const { data } = await axiosInstance.post("/users/signin", {
        email: email,
        password: password,
      });
      dispatch({ type: actions.USER_SIGNIN_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: actions.USER_SIGNIN_FAIL, payload: err.message });        //??? inja chera nemitoonam message error ro benevisam
    }
  };
};

// paylaod : error.response && error.respone.data.message ? error.response.data.message : error.message

// sign out tooye hamoon component handle shod

export const register = (name, email, password) => {
  return async (dispatch) => {
    dispatch({
      type: actions.USER_REGISTER_REQUEST,
      payload: { email: email, password: password },
    });
    try {
      const { data } = await axiosInstance.post("/users/register", {
        name : name,
        email: email,
        password: password,
      });
      dispatch({ type: actions.USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: actions.USER_SIGNIN_SUCCESS, payload: data });
      dispatch({ type: actions.USER_REGISTER_RESET});
    } catch (error) {
      const errorMsg = error.response.data.message ? error.response.data.message : error.message
      dispatch({ type: actions.USER_REGISTER_FAIL, payload: errorMsg });        //??? inja chera nemitoonam message error ro benevisam
    }
  };
};


export const detailsUser = (userId) => {
  return async (dispatch, getState) => {
      dispatch({ type: actions.USER_DETAILS_REQUEST});
      const { userSigninReducer : { userInfo }} = getState();
      try {
        const { data } = await axiosInstance.get(`/users/${userId}`, { 
          headers:{
            Authorization: `Bearer ${userInfo.token}`
          }
        }); 
        dispatch({type: actions.USER_DETAILS_SUCCESS, payload: data});          
      } catch (error) {
        const errorMsg = error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: actions.USER_DETAILS_FAIL, payload: errorMsg });
      }
  }
};


// UPDATE USER PROFILE
export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
      dispatch({ type: actions.USER_UPDATE_PROFILE_REQUEST});
      const { userSigninReducer: { userInfo }} = getState();
      try {
        const { data } =  await axiosInstance.put('/users/profile', user, {
          headers:{ Authorization: `Bearer ${ userInfo.token}`}
        });
        dispatch({ type: actions.USER_UPDATE_PROFILE_SUCCESS, payload: data}); //after updating profile , update userSigni state , bekhatere oon name oon baa tu header
        dispatch({ type: actions.USER_SIGNIN_SUCCESS, payload: data}); 
         
      } catch (error) {
        const errorMsg = error.response.data.message ? error.response.data.message : error.message;
          dispatch({ type: actions.USER_UPDATE_PROFILE_FAIL, payload: errorMsg})
      }
  }
}

