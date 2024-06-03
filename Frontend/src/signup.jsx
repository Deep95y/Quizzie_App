import React, { useState } from 'react';
import './index.css';
import AuthReg from './authreg';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handlePasswordClick = () => {
    if (errors.password === 'Weak password') {
      setFormData({
        ...formData,
        password: '',
        confirmPassword: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.name) {
      newErrors.name = 'This field is required';
      valid = false;
    } else if (!/^[a-zA-Z ]+$/.test(formData.name)) {
      newErrors.name = 'Invalid name';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'This field is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'This field is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Weak password';
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'This field is required';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      AuthReg(formData);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', marginLeft: '10%' }}>
          <div style={{ marginLeft: '4.625rem' }}>
            <label className="form-label" htmlFor="name" style={{fontWeight:'bold'}}>Name:</label>
          </div>
          <div style={{ marginLeft: '2.5rem' }}>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              value={errors.name ? errors.name : formData.name}
              onChange={handleChange}
              required
            />
            {/* {errors.name && <span className="error-message" style={{ color: 'red' }}>{errors.name}</span>} */}
          </div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', marginLeft: '10%' }}>
          <div style={{ marginLeft: '4.625rem' }}>
            <label className="form-label" htmlFor="email" style={{fontWeight:'bold'}}>Email:</label>
          </div>
          <div style={{ marginLeft: '2.5rem' }}>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              value={errors.email ? errors.email : formData.email}
              onChange={handleChange}
              required
            />
            {/* {errors.email && <span className="error-message" style={{ color: 'red' }}>{errors.email}</span>} */}
          </div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', marginLeft: '10%' }}>
          <div style={{ marginLeft: '3.125rem' }}>
            <label className="form-label" htmlFor="password" style={{fontWeight:'bold'}}>Password:</label>
          </div>
          <div style={{ marginLeft: '2.375rem' }}>
            <input
              type={errors.password ? 'text' : 'password'}
              id="password"
              name="password"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              value={errors.password ? errors.password : formData.password}
              onChange={handleChange}
              onClick={handlePasswordClick}
              required
            />
          </div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', marginLeft: '10%' }}>
          <div>
            <label className="form-label" htmlFor="confirmPassword" style={{fontWeight:'bold'}}>Confirm Password:</label>
          </div>
          <div style={{ marginLeft: '1.875rem' }}>
            <input
              type={errors.confirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              value={errors.confirmPassword ? errors.confirmPassword : formData.confirmPassword}
              onChange={handleChange}
              required
            />

          </div>
        </div>
        <button type="submit" style={{ background: '#A9BCFF', height: '1.875rem', width: '12.5rem', borderStyle: 'none', borderRadius: '.625rem', marginLeft: '10.625rem',fontWeight:'bold',paddingLeft:'12%',fontSize:'15px',color:'#474444'}}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
