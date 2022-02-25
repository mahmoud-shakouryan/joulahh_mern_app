import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../rating/Rating';
import './product.css';

const Product = ({product}) => {
    return (
        <div className='productCardWrapper'>
            <div key={product._id} className="card">
                <Link to={`/product/${product._id}`}>  
                  <img
                    className="medium"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
                <div className="card-body">
                  <Link to={`/product/${product._id}`}>
                    <p className='product-name'>{product.name}</p>
                  </Link>
                  <Rating rating={product.rating} numReviews={product.numReviews}/>
                  <div className="price"><span>تومان</span><span>{product.price}</span></div>
                </div>
              </div>
        </div>
    )
}

export default Product
