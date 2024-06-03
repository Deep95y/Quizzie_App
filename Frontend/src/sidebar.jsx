import React, { useState } from "react";
import Homepage from './homepage';
import CreateQuiz from './createquiz';
import Analysis from './analysis';
import Modal from 'react-modal';
import PrimaryModal from './primmodal';

const Sidebar = () => {
    const [optionType, setOptionType] = useState('Dashboard');
    const [showbox, setshowbox] = useState(false);

    const handleOptionChange = (selectedOption) => {
        setOptionType(selectedOption);
    };
  
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            marginTop:'50px',
            transform: "translate(-50%, -50%)",
            border: 'none',
            padding: 0,
        },
    };
      
    Modal.setAppElement('#root');

    const openBox = () => {
        setshowbox(true);
    };
      
    const closeBox = () => {
        setshowbox(false);
    };

    const logout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        // Redirect to '/' route using window.location.href
        window.location.href = '/';
    };

    let OptionComponent;
    switch (optionType) {
        case 'Dashboard':
            OptionComponent = Homepage;
            break;
        case 'Create Quiz':
            OptionComponent = PrimaryModal;
            break;
        case 'Analytics':
            OptionComponent = Analysis;
            break;
        default:
            OptionComponent = Homepage;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '20%', borderRightStyle: 'inset'}}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#474444', marginLeft: '3rem', fontFamily: 'Jomhuria' }}>Quizzie</div>
                <div style={{ fontSize: '1.875rem', color: '#474444', marginTop: '40%', marginLeft: '3.125rem', cursor: 'pointer' }} onClick={() => handleOptionChange('Dashboard')}>Dashboard</div>
                <div style={{ fontSize: '1.875rem', color: '#474444', marginTop: '3.125rem', marginLeft: '3.125rem', cursor: 'pointer' }} onClick={() => handleOptionChange('Analytics')}>Analytics</div>
                <div style={{ fontSize: '1.875rem', color: '#474444', marginTop: '3.125rem', marginLeft: '3.125rem', cursor: 'pointer' }} onClick={openBox}>Create Quiz</div>
                <div className="line">-</div>
                <div style={{ fontSize: '1.375rem', fontWeight: '5rem', color: '#474444', marginLeft: '5rem', marginTop: '1rem', cursor: 'pointer' }} onClick={logout}>LOGOUT</div>
            </div>
            <div style={{ flex: 1, width: '80%' }}>
                <OptionComponent />
            </div>
            <Modal
                isOpen={showbox}
                onRequestClose={closeBox}
                style={customStyles}
            >
                <PrimaryModal />
            </Modal>
        </div>
    );
}

export default Sidebar;
