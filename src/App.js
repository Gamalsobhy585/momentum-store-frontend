import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Welcome from './components/Welcome/Welcome';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Checkout from './components/Checkout/Checkout';
import ThankYou from './components/ThankYou/ThankYou.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { Offline } from 'react-detect-offline';
import axios from 'axios';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUserData();
    }
  }, []);

  function saveUserData() {
    let token = localStorage.getItem('userToken');
    if (token) {
      setUserData({ token });
    }
  }

  const logOut = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      });
      localStorage.removeItem('userToken');
      setUserData(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const routers = createBrowserRouter([
    {
      path: '/',
      element: <Layout setUserData={setUserData} userData={userData} logOut={logOut} />,
      children: [
        { index: true, element: <Welcome /> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'home', element: <ProtectedRoute userData={userData}><Home /></ProtectedRoute> },
        { path: 'products/:id', element: <ProtectedRoute userData={userData}><ProductDetails /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute userData={userData}><Cart /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute userData={userData}><Checkout /></ProtectedRoute> },
        { path: 'thank-you', element: <ProtectedRoute userData={userData}><ThankYou /></ProtectedRoute> },
      ]
    },
    { path: '*', element: <NotFoundPage /> }
  ]);

  return (
    <>
      <Offline><div className='offline'>You are offline</div></Offline>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
