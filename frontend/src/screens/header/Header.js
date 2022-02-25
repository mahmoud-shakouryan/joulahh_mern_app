import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/actionTypes";
import Sidebar from "../sidebar/Sidebar";
import "./header.css";

const Header = ({adminDrop,userDrop,headerUserDropDownHandler, headerAdminDropDownHandler}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const cartItems = useSelector((state) => state.cartReducer).cartItems;
  const { userInfo } = useSelector((state) => state.userSigninReducer);

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch({ type: actions.SIGNOUT }); //ajiibe chera borde boodam ino too userActions ba dispatch amal nakard?
  }; // fek konam chon oonja ba dispatch mineveshtam . return dispatch => ... . dar hali ke oon male karaye async'e.

  const cartBadge = (
    <div className="cart-badge">
      {userInfo && (
        <Link to="/cart">
          <i className="fa fa-shopping-basket">
            {cartItems.length > 0 && userInfo && (
              <span>{cartItems.length}</span>
            )}
          </i>
        </Link>
      )}
    </div>
  );

  return (
    <div className="header" id="navbar">
      <div className="hamMobileOnly">
        <i
          className="fa fa-bars"
          onClick={() => setShowSidebar(!showSidebar)}
        ></i>
        <div className="sidebar-wrapper">
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        </div>
      </div>
      <div className="badgeMobileOnly">{cartBadge}</div>
      <div className="brand">
        <Link to="/">جولا‌‌ه</Link>
      </div>
      <div className="navLinks">
        {cartBadge}
        {userInfo ? (
          <div className="navLinks__userWrapper">
            <Link to="#" onClick={headerUserDropDownHandler}>
              <p>تنظیمات کاربر</p>
              <i className="fa fa-caret-down"></i>
            </Link>
            <ul
              className={
                userDrop
                  ? "user-dropdown-content active"
                  : "user-dropdown-content"
              }
            >
              <li>
                <Link to="/profile">پروفایل</Link>
              </li>
              <li>
                <Link to="/orderhistory">تاریخچه سفارشات</Link>
              </li>
              <li>
                <Link to="#" onClick={signoutHandler}>
                  {" "}
                  خروج از حساب کاربری
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <Link to="/signin">
              <p>ورود/ ثبت‌نام</p>
            </Link>
          </div>
        )}
        {userInfo && userInfo.isAdmin && (
          <div>
            <Link to="#" onClick={headerAdminDropDownHandler}>
              <p>ادمین</p>
              <i className="fa fa-caret-down"></i>
            </Link>
            <ul
              className={
                adminDrop
                  ? "admin-dropdown-content active"
                  : "admin-dropdown-content"
              }
            >
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
          </div>
        )}
        <div className="mainPageNavLinkWrapper">
          <Link to="/">
            <p className="mainPageP">صفحه اصلی</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
