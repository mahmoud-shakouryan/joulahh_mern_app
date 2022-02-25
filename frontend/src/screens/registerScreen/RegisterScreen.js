import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import LoadingBox from "../../components/loadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { register } from "../../store/actions/userActions";


const RegisterScreen = (props) => {

  let [searchParams, setSearchParams] = useSearchParams({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userRegister = useSelector((state) => state.userRegisterReducer);
  const { userInfo, loading, error } = userRegister;
  //const [passErr, setPassErr] = useState(false);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault(); //no auto refresh
    if (password !== confirmPassword) {
      alert('پسووردها همخوانی ندارند')
    } else {
      dispatch(register(name, email, password));
     
    }
  };

  const redirect = searchParams && Object.keys(searchParams).length === 0 ? '/' : searchParams ? searchParams.get('redirect') : '/';
  useEffect(() => {
    //register ke ok shod chon dobare in component render mishe pas dobare ueEffect va indafe chon userInfo darim mire to if...
    if (userInfo) {
      navigate(redirect);
     }
  }, [redirect, userInfo]);

  return (
    <div className="form-wrapper registerFromWrapper">
      {error  && (
        <div className="msgBoxWrapper">
          <MessageBox variant="danger">{error}</MessageBox>
        </div>
      )}
      <form className="form" onSubmit={submitHandler}>
        <div>
        <i className="fa fa-user-plus" aria-hidden="true"></i>
          <h1>ایجاد حساب کاربری</h1>
        </div>
        <div>
          <label htmlFor="name"> : نام  <i className="fa fa-user-o" aria-hidden="true"></i> </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
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
          />
        </div>
        <div>
          <label htmlFor="confirmPassword"> :تکرار رمز عبور <i className="fa fa-key"></i></label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter Password Again"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className='submitBtn' type="submit">{loading ? <LoadingBox /> : "ثبت‌نام"}</button>
        </div>
        <div className="change">
          <div>
            قبلا ثبت‌نام کرده‌اید؟
            <Link to={`/signin?redirect=${redirect}`}>وارد شوید</Link>
          
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
