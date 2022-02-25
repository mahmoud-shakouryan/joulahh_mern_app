import React, { useEffect} from "react";
import LoadingBox from "../../components/loadingBox/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../store/actions/index";
import Product from "../../components/product/Product";
import './productsScreen.css';


const ProductsScreen = () => {
console.log('productsScreen.js');
  const productList = useSelector(state => state.productListReducer);          //az tooye store tooye index.js
  const {loading, error, products} = productList;
  
  
  
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(listProducts());
  },[dispatch]);
  
  return (
    <div className="productsContainer">
     { loading ? <div className='loadBox'><LoadingBox /></div>: error ? <div className='msgBox'><MessageBox varaint='danger'>{error}</MessageBox></div> 
    : (
        <div className='productsList'>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsScreen;


