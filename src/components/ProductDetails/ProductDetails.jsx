import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const handleDecrement=()=>{
    if(quantity>1) {
      setQuantity(prevCount=>prevCount-1);
    } 
    
  }
  const handleIncrement=()=>{
    if(quantity <10){

      setQuantity(prevCount=>prevCount+1);
    }
  }

  var avail_stock='';
  if(productDetails.quantity>0){
    avail_stock = <div>
      <label className='bg-success btn text-white py-2 mb-4'> In Stock</label>
    </div>
  }
  else {
    avail_stock = <div>
    <label className='bg-danger btn text-white py-2 mb-4'> Out of Stock</label>
  </div>
  }
  async function getProductDetails(productId) {
    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      let { data } = await axios.get(`http://localhost:8000/api/products/${productId}`, config);
      setProductDetails(data.data); 
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  }
  const submitAddToCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      await axios.post('http://localhost:8000/api/cart/add', { product_id: id, quantity: quantity }, config);
      Toastify({
        text: "Product added to cart!",
        duration: 3000,
        close: true,
        gravity: "bottom", 
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();    } catch (error) {
      console.error('Error adding product to cart:', error);
      Toastify({
        text: "Failed to add product to cart.",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();    }
  };
  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{productDetails.name}</title>
        <link rel="shortcut icon" href="/momentum_solutions_eg_logo.jfif" type="image/x-icon" />


      </Helmet>
      <div className="container-fluid product-container">
  <div className="row px-4 py-5">
    <div className="col-md-7  px-5">
      <img src={productDetails.image} className="w-100" alt={productDetails.name} />
    </div>
    <div className="col-md-5 ">
      <h2 className="product-name">{productDetails.name}</h2>
      <div className="rate">
        <span>Rate: {productDetails.rate} / 5</span>
      </div>
      <div className="description">
        <h5>Description:</h5>
        <p className="py-2 product-description">{productDetails.detailedDescription}</p>
      </div>
      {productDetails.price && (
        <h6 className="py-2 product-price">Price: EGP {productDetails.price}</h6>
      )}
      {avail_stock}
      {productDetails.quantity > 0 && (
        <div className="quantity-container d-flex align-items-center mb-3">
          <button className="btn button" onClick={handleDecrement}>-</button>
          <input type="text" className="form-control w-25 text-center mx-2" value={quantity} readOnly />
          <button className="btn button" onClick={handleIncrement}>+</button>
        </div>
      )}
      <button onClick={submitAddToCart} className="button btn">Add to the Cart</button>
    </div>
  </div>
</div>

    </>
  );
}
