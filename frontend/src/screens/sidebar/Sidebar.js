import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/actionTypes";
import './sidebar.css';

const Sidebar = ({showSidebar, setShowSidebar}) => {
  const [userDropDown, setUserDropDown] = useState(false);
  const [adminDropDown, setAdminDropDown] = useState(false);
  const { userInfo } = useSelector((state) => state.userSigninReducer);

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch({ type: actions.SIGNOUT }); //?? ajiibe chera borde boodam ino too userActions ba dispatch amal nakard?
  }; // fek konam chon oonja ba dispatch mineveshtam . return dispatch => ... . dar hali ke oon male karaye async'e.

  const userDropDownHandler = () => {
    setAdminDropDown(false);
    setUserDropDown(!userDropDown);
  };
  const adminDropDownHandler = () => {
    setUserDropDown(false);
    setAdminDropDown(!adminDropDown);
  };
  return (
    <div className={showSidebar ? 'sidebar active' : 'sidebar'}>
        <div className='closeSidebar' onClick={()=>setShowSidebar(!showSidebar)} >
        <i className="fa fa-chevron-right"></i>
        </div>
        <div className='mainPage'>
            <Link to='/'>صفحه اصلی</Link>
        </div>
      {userInfo ? (
        <ul >
          <li onClick={userDropDownHandler}>
          <i className={userDropDown ? "fa fa-chevron-down active": 'fa fa-chevron-down'}></i>تنظیمات کاربر 
          </li>
          {userDropDown && (
            <div className="userDropdown">
              <li>
                <Link to="/profile">پروفایل</Link>
              </li>
              <li>
                <Link to="/orderhistory">تاریخچه سفارشات</Link>
              </li>
              <li>
                <Link to="#" onClick={signoutHandler}>
                  خروج از حساب کاربری
                </Link>
              </li>
            </div>
          )}
        </ul>
      ) : (
        <div >
          <Link to="/signin">
            <p>ورود/ ثبت‌نام</p>
          </Link>
        </div>
      )}
      {userInfo && userInfo.isAdmin && (
        <ul>
          <li onClick={adminDropDownHandler}><i className={adminDropDown ? "fa fa-chevron-down active" : 'fa fa-chevron-down'}></i>ادمین</li>
          {adminDropDown && (
              <li className="adminDropdown">
              <ul className='adminDropdown'>
                <li>
                  <Link to="/dashboard">داشبورد</Link>
                </li>
                <li>
                  <Link to="/productlist">محصولات</Link>
                </li>
                <li>
                  <Link to="/orderlist">سفارشات</Link>
                </li>
                <li>
                  <Link to="/userlist">کاربران</Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
