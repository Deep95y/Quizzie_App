import React, { useState } from 'react';
import './index.css';
import SignUp from './signup';
import Login from './login';

const Regbody = () => {
  const [activeButton, setActiveButton] = useState(null);

  const toggleButton = (button) => {
    setActiveButton(activeButton === button ? null : button);
  };

  return (
    <>
      <div style={{ width: '100vw', height: '100vh', background: '#F2F2F2', display: 'flex' }}>
        <div style={{ height: '31.25rem', width: '68.75rem', background: 'white', borderRadius: '.9375rem', margin: 'auto', display: 'flex', flexDirection: 'column',fontFamily: 'Jomhuria' }}>
          <div className="title">QUIZZIE</div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div
              className={`button ${activeButton === 'signUp' ? 'active' : ''}`}
              onClick={() => toggleButton('signUp')}
            >
              Sign Up
            </div>
            <div
              className={`button ${activeButton === 'logIn' ? 'active' : ''}`}
              onClick={() => toggleButton('logIn')}
            >
              Log In
            </div>
          </div>
          <div style={{position:'absolute',marginLeft:'15%',marginTop:'12%'}}>
          {activeButton === 'signUp' && <SignUp />}
          {activeButton === 'logIn' && <Login />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Regbody;
