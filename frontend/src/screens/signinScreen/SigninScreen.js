import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import LoadingBox from "../../components/loadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { signin } from "../../store/actions/userActions";
import './signin.css';

const SigninScreen = (props) => {
const [searchParams, setSearchParams] = useSearchParams({});
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const userSignin = useSelector(state=>state.userSigninReducer);
const { userInfo, loading, error } = userSignin;

const dispatch = useDispatch();
const submitHandler = (e) => {
    e.preventDefault();        //no auto refresh
    dispatch(signin(email, password));
}
const searchQuery = searchParams.get('redirect');
let redirect = '/';
if(searchQuery){
 redirect = searchQuery
}

useEffect(()=>{
    if(userInfo && searchQuery){
        navigate(`/${redirect}`);
    }else if(userInfo && !searchQuery){
      navigate('/')
    }
},[redirect, userInfo])
  
return (
      
      <div className='form-wrapper'>
       {error && <div className='msgBoxWrapper'><MessageBox variant='danger' >{error}</MessageBox></div> }
      <form className="form" onSubmit={submitHandler}>
        <div>
        <i className="fa fa-sign-in" aria-hidden="true"></i>
          <h1> ورود به حساب کاربری</h1>
        </div>
       
        <div>
          <label htmlFor="email"> : ایمیل <i className="fa fa-envelope-o"></i></label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password"> : رمز عبور <i className="fa fa-key"></i></label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
            <label/>
            <button className='submitBtn' type='submit'>{loading ? <LoadingBox/> : 'ورود'}</button>
        </div>
        <div className='change'>
            <div>
                 اگر قبلا ثبت‌‌‌نام نکرده‌اید 
                <Link to={`/register?redirect=${redirect}`}>ثبت‌نام کنید </Link>
            </div>
        </div>
      </form>
    </div>
  
    
  );
};

export default SigninScreen;
