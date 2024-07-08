import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ userData, logOut }) {
  return (
    <nav className='p-2 d-flex nav  justify-content-between align-items-center'>
      <div className="left-nav flex-md-row flex-column d-flex align-items-center">
        <h1 className='m-0 pe-3 h4'>
          <Link className='text-decoration-none' to='/'>
            <img src={'/momentum_solutions_eg_logo.jfif'} alt="Momentum Store Logo" style={{ height: '40px', marginRight: '10px' }} /> Momentum Store
          </Link>
        </h1>
        {userData ?
          <ul className='list-unstyled d-flex flex-md-row flex-column m-0 align-items-center'>
           
            <li className='px-2 ' > <Link className='text-decoration-none' to='/home'>Our Products</Link> </li>
            <li className='px-2 '> <Link className='text-decoration-none' to='cart'> <span><i className="fa-solid fa-cart-shopping"></i></span> Cart</Link> </li>
        
          </ul> : ''
        }
      </div>
      <div className="right-nav flex-md-row flex-column d-flex align-items-center">
        <div className="social-media cursor-pointer d-flex align-items-center m-0">
          <Link target='_blank' to='https://www.facebook.com/MomentumSolutionsCo'><i className='fab mx-1 fa-facebook'></i></Link>
          <Link target='_blank' to='https://www.instagram.com/momentum_solutions_co/'><i className='fab mx-1 fa-instagram'></i></Link>
          <Link target='_blank' to='https://www.linkedin.com/company/momentumsolutionsco/'><i className='fab mx-1 fa-linkedin'></i></Link>
          <ul className='list-unstyled flex-md-row flex-column d-flex m-0 align-items-center'>
            {userData ? <>
              <li onClick={logOut} className='px-2 logout-button cursor-pointer'><span>LogOut</span></li>
            </> :
              <>
                <li className='px-2 '><Link className='text-decoration-none' to='/login'>Login</Link></li>
                <li className='px-2 '><Link className='text-decoration-none' to='/register'>Register</Link></li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
