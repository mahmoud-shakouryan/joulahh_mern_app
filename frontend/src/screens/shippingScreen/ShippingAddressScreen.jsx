import React, { useEffect, useState } from "react";
import { saveShippingAddress } from "../../store/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import "./shippingAddressScreen.css";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";

const ShippingAddressScreen = (props) => {

  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSigninReducer);
  const { userInfo } = userSignin;
  // if(!userInfo) {
  //     props.history.push('/signin')
  // }
  const { shippingAddress }  = useSelector((state) => state.cartReducer);
  const [fullName, setFullName] = useState(
    shippingAddress.fullName ? shippingAddress.fullName : ""
  );
  const [province, setProvince] = useState( shippingAddress.province ? shippingAddress.province : '');
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ""
  );
  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ""
  );
  const [mobileNum, setMobileNum] = useState(
    shippingAddress.mobileNum ? shippingAddress.mobileNum : ""
  );
  const [telNum, setTelNum] = useState(
    shippingAddress.telNum ? shippingAddress.telNum : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ""
  );

  const dispatch = useDispatch();
  const submitHandler = (e) => {           //chon sybmite forme >> e.preventDefault()
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName: fullName,
        address: address,
        province:province,
        city: city,
        mobileNum: mobileNum,
        telNum: telNum,
        postalCode:postalCode
      })
    );
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [userInfo]);

  return (
    <div className='shippingContainer'>
      <div className="checkoutStepsWrapper"><CheckoutSteps step1 step2></CheckoutSteps></div>
      <form className="form shippingForm" onSubmit={submitHandler}>
        <div>
          <h1>اطلاعات پستی</h1>
        </div>
        <div>
          <label htmlFor="fullName"> نام کامل  </label>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="province">استان</label>
          <input
            type="text"
            id="province"
            placeholder="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">شهر</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">آدرس</label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mobileNum">تلفن همراه</label>
          <input
            type="text"
            id="mobileNum"
            placeholder="Mobile Number"
            value={mobileNum}
            onChange={(e) => setMobileNum(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="telNum">تلفن منزل / محل کار</label>
          <input
            type="text"
            id="telNum"
            placeholder="Office/Home Tel Number"
            value={telNum}
            onChange={(e) => setTelNum(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">کد پستی</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        
        <div>
          <button type="submit">
            ادامه
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
