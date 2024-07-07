import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
    fetchProducts('http://localhost:8000/api/products');
  }, []);

  async function fetchProducts(url) {
    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      let response = await axios.get(url, config);
      console.log('Fetched products:', response.data);

      setProducts(response.data.data);
      setPaginationData(response.data.meta);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const handlePageChange = async (url) => {
    if (!url) return; 
    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      let response = await axios.get(url, config);
      console.log('Fetched products:', response.data);

      setProducts(response.data.data);
      setPaginationData(response.data.meta);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Momentum Store</title>
        <link rel="shortcut icon" href="/Momentum_Logo.png" type="image/x-icon" />
        <link rel="shortcut icon" href="/images.png" type="image/x-icon" />
      </Helmet>
      <div className="row p-5">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <Link to={`/products/${product.id}`}>
              <div className="card">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.shortDescription}</p>
                  <p className="card-text">Price: EGP {product.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {paginationData && (
        <div className="pagination justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination d-flex">
              {paginationData.prev_page_url && (
                <li className="page-item">
                  <button className="page-link text-white button" onClick={() => handlePageChange(paginationData.prev_page_url)}>Previous</button>
                </li>
              )}
              {paginationData.next_page_url && (
                <li className="page-item">
                  <button className="page-link text-white text-decoration-none button" onClick={() => handlePageChange(paginationData.next_page_url)}>Next</button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
