    
    import React, { useState } from 'react';
    import AuthLogin from './authlogin';
    import { useNavigate } from 'react-router-dom';

    const Login = () => {
    const [formData, setFormData] = useState({
    
        email: '',
        password: ''
      
      });
    
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
     
     
      const handleLogin = (e) => {
        e.preventDefault();
        AuthLogin(formData);
      
      };
    
   return (
        <>
        <div className="form-container">
      <form onSubmit={handleLogin}>
      <div className="form-group" style={{display:'flex',flexDirection:'row',marginLeft:'10%',marginTop:'20px'}}>
          <div style={{marginLeft:'4.625rem'}}><label className="form-label" htmlFor="email" style={{fontWeight:'bold'}}>Email:</label></div>
          <div style={{marginLeft:'2.5rem'}}><input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div></div>
        <div className="form-group" style={{display:'flex',flexDirection:'row',marginLeft:'10%'}}>
          <div style={{marginLeft:'3.125rem'}}><label className="form-label" htmlFor="password" style={{fontWeight:'bold'}}>Password:</label></div>
          <div style={{marginLeft:'2.375rem'}}><input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div></div>
        <button type="submit" style={{background: '#A9BCFF',height:'1.875rem',width:'12.5rem',borderStyle:'none',borderRadius:'.625rem',marginLeft:'10.625rem',marginTop:'2rem',fontWeight:'bold',paddingLeft:'15%',fontSize:'15px',color:'#474444'}}>logIn</button>
        </form>
        </div>
        </>
    );
}

export default Login;