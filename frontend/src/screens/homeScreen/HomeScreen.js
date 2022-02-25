import React, { useEffect } from "react";
import "./homeScreen.css";
import { useNavigate } from 'react-router';

const HomeScreen = (props) => {
  const navigate = useNavigate();
  
  const productsBtnHandler = () => {
    //props.history.push("/products");
    navigate('/products');
  };
  useEffect(() => {
    document.title = "جولاه : صفحه اصلی";
  });
  return (
    <div className="homeScreen">
      <div className="homeScreen__left">
        <img src="./images/pinkknit.png" alt="knitwear" />
        <div className="circle"></div>
      </div>
      <div className="homeScreen__right">
        <div className="greeting">
          <h5>کارگروه محصولات دستبافت جولاه</h5>
          <h1>با جولاه شیک، به‌روز و اصیل باشید</h1>
          <button
            className="greeting__btn"
            type="button"
            onClick={productsBtnHandler}
          >
            <p>مشاهده محصولات</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
