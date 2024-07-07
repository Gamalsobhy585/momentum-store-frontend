import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const getAxiosConfig = () => {
    const token = localStorage.getItem('userToken');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/cart', getAxiosConfig())
      .then(response => {
        setCartItems(response.data.cart);
        console.log(response.data.cart);
      })
      .catch(error => {
        console.error('There was an error fetching the cart data!', error);
      });
  }, []);

  const handleRemove = (cartId) => {
    axios.delete(`http://localhost:8000/api/cart/remove/${cartId}`, getAxiosConfig())
      .then(response => {
        setCartItems(cartItems.filter(item => item.id !== cartId));
        toast.dark('Item has been removed from the cart!', {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: true,
          closeButton: true,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)'
          }
        });
      })
      .catch(error => {
        console.error('There was an error removing the item from the cart!', error);
      });
  };

  const handleEdit = (cartId, scope) => {
    const cartItem = cartItems.find(item => item.id === cartId);
    const newQuantity = scope === 'inc' ? cartItem.product_quantity + 1 : cartItem.product_quantity - 1;

    if (newQuantity < 1) {
      toast.error('Quantity cannot be less than 1', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    axios.put(`http://localhost:8000/api/cart/edit/${cartId}`, { quantity: newQuantity, scope }, getAxiosConfig())
      .then(response => {
        setCartItems(cartItems.map(item => item.id === cartId ? { ...item, product_quantity: newQuantity } : item));
      })
      .catch(error => {
        console.error('There was an error updating the cart item!', error);
      });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.product_quantity), 0).toFixed(2);
  };

  return (
    <>
      <Helmet>
        <title>Your Cart</title>
      </Helmet>
      <ToastContainer />
      <div className="cart-container">
        <h1>Cart</h1>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td><img src={item.product.image} alt={item.product.name} className="product-image" /></td>
                <td>{item.product.name}</td>
                <td>{item.price}</td>
                <td>
                  <button className="quantity-btn" onClick={() => handleEdit(item.id, 'dec')}>-</button>
                  {item.product_quantity}
                  <button className="quantity-btn" onClick={() => handleEdit(item.id, 'inc')}>+</button>
                </td>
                <td>{(item.price * item.product_quantity).toFixed(2)}</td>
                <td><button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-price-container">
          <h6 className='total-price h6 '>Total: {getTotalPrice()}</h6>
          <Link to="/checkout" className="btn btn-warning proceed-btn">Proceed to Checkout</Link>
        </div>
      </div>
    </>
  );
}
