import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Helmet } from 'react-helmet';

export default function Checkout() {
    const navigate = useNavigate();
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '+20',
        email: '',
        address: '',
        city: '',
    });

    const [error, setError] = useState({});

    const handleInput = (e) => {
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    };

    const validateInput = (data) => {
        const schema = Joi.object({
            firstname: Joi.string().required().messages({
                'string.empty': 'First Name is required',
                'any.required': 'First Name is required'
            }),
            lastname: Joi.string().required().messages({
                'string.empty': 'Last Name is required',
                'any.required': 'Last Name is required'
            }),
            phone: Joi.string().pattern(/^\+20[0-9]{10}$/).required().messages({
                'string.pattern.base': 'Phone number must be in the format +20XXXXXXXXXX',
                'string.empty': 'Phone number is required',
                'any.required': 'Phone number is required'
            }),
            email: Joi.string().email({ tlds: { allow: false } }).required().messages({
                'string.email': 'Email must be a valid email',
                'string.empty': 'Email is required',
                'any.required': 'Email is required'
            }),
            address: Joi.string().required().messages({
                'string.empty': 'Address is required',
                'any.required': 'Address is required'
            }),
            city: Joi.string().required().messages({
                'string.empty': 'City is required',
                'any.required': 'City is required'
            }),
        });

        return schema.validate(data, { abortEarly: false });
    };

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
        };

        const { error } = validateInput(data);
        if (error) {
            const validationErrors = {};
            error.details.forEach(err => {
                validationErrors[err.path[0]] = err.message;
            });
            setError(validationErrors);
        } else {
            
            const token = localStorage.getItem('userToken'); 
    
            axios.post(`http://localhost:8000/api/place-order`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                if (res.data.status === 200) {
                    swal("Order Placed Successfully", res.data.message, "success");
                    setError({});
                    navigate('/thank-you');
                } else if (res.data.status === 422) {
                    swal("All fields are mandatory", "", "error");
                    setError(res.data.errors);
                }
            }).catch(error => {
                swal("Error", "Something went wrong. Please try again later.", "error");
            });
        }
    };
    const cities = [
        "Alexandria",
        "Aswan",
        "Asyut",
        "Beni Suef",
        "Cairo",
        "Damanhur",
        "Damietta",
        "El Arish",
        "El Mahalla el Kubra",
        "El Mansoura",
        "El-Minya",
        "Fayoum",
        "Giza",
        "Hurghada",
        "Ismailia",
        "Kafr al-Sheikh",
        "Luxor",
        "Matruh",
        "New Valley",
        "Port Said",
        "Qalyubia",
        "Qena",
        "Red Sea",
        "Sharm El Sheikh",
        "Sohag",
        "South Sinai",
        "Suez",
        "Tanta",
        "Zagazig"
    ];

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Checkout Page</title>
            </Helmet>
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Basic Information</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        onChange={handleInput}
                                        value={checkoutInput.firstname}
                                        className="form-control"
                                    />
                                    <small className="text-danger">{error.firstname}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        onChange={handleInput}
                                        value={checkoutInput.lastname}
                                        className="form-control"
                                    />
                                    <small className="text-danger">{error.lastname}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        onChange={handleInput}
                                        value={checkoutInput.phone}
                                        className="form-control"
                                    />
                                    <small className="text-danger">{error.phone}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleInput}
                                        value={checkoutInput.email}
                                        className="form-control"
                                    />
                                    <small className="text-danger">{error.email}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        onChange={handleInput}
                                        value={checkoutInput.address}
                                        className="form-control"
                                    />
                                    <small className="text-danger">{error.address}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>City</label>
                                    <select
                                        name="city"
                                        onChange={handleInput}
                                        value={checkoutInput.city}
                                        className="form-control"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city, index) => (
                                            <option key={index} value={city}>{city}</option>
                                        ))}
                                    </select>
                                    <small className="text-danger">{error.city}</small>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group text-end">
                                    <button type="button" className="btn btn-warning mx-1" onClick={submitOrder}>Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
