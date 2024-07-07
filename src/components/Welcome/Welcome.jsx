import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Welcome = () => {
 
  return (
  <>
     <Helmet>
    <title>Welcome to Momentum Store</title>
  </Helmet>

    <div className='mb-3'>
      <div style={{ backgroundColor: 'white', height: '100vh' }} className="container d-flex justify-content-center align-items-center">
        <div className="row justify-content-center my-0 position-relative p-1 border-2">
          <div className="col-md-8">
            <div style={{ backgroundColor: 'white' }} className="p-1 rounded-3 border-2">
              <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img className="d-block rounded-3 w-100 rounded-3 rounded-lg" src="/moments.jpg" alt="First slide" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block w-100 rounded-3 rounded-lg" src="/moments2.png" alt="Second slide" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="position-relative d-flex col-md-1">
            <h1 className="vertical"></h1>
          </div>

          <div className="col-md-3 align-self-center">
            <div className="text-center mb-3 h1 oleo-script-bold" style={{ color: 'transparent', backgroundImage: 'linear-gradient(to bottom, var(--primary-green), var(--accent-soft-blue))', WebkitBackgroundClip: 'text', fontWeight: 'bold' }}>
              Explore the happiness of Momentum, only at Momentum Store!
            </div>
           
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Welcome;
