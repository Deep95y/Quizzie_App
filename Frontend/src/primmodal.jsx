import React, { useState } from 'react';
import Modal from 'react-modal';
import CreateQuiz from './createquiz';
import { useNavigate } from 'react-router-dom';

const PrimaryModal = () => {
    const [activeButton, setActiveButton] = useState(null);
    const [cancelContButton, setCancelContButton] = useState(null);
    const [openBox, setOpenBox] = useState(false);
    const [formvalue, setFormvalue] = useState({
        Title: "",
        Type:""
    });

    const navigate = useNavigate();

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
        setFormvalue({
            ...formvalue,
            Type: buttonType,
        })

    };

    const handleContCancelButtonClick = (buttonType) => {
        setCancelContButton(buttonType);
        if (buttonType === 'Continue') {
            handleContinue();
        }
        if (buttonType === 'Cancel') {
            window.location.href = '/sidebar';
        }
    };

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Semi-transparent black background
            zIndex: 1000, // Ensure the overlay is above other elements
        },
        content: {
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)', // Move modal back to center
            border: 'none', // Remove the border
            padding: 0, // Remove padding
            background: 'white', // Ensure background is white
            maxWidth: '80%', // Adjust max-width if needed
            maxHeight: '80%', // Adjust max-height if needed
            overflow: 'auto', // Enable scrolling if content exceeds modal size
        },
    };
    

    Modal.setAppElement('#root');

    const handleContinue = () => {
        if (activeButton === 'QnA'|| 'poll') {
            openQuiz();
        }
    };

    const openQuiz = () => {
        setOpenBox(true);
    };

    const closeQuiz = () => {
        setOpenBox(false);
    };

    const getButtonStyle = (buttonType) => ({
        height: '2rem',
        width: buttonType === 'poll' || buttonType === 'QnA' ? '6.25rem' : '11.25rem',
        borderStyle: 'none',
        borderRadius: '.625rem',
        marginLeft: '1.875rem',
        marginTop: '1rem',
        backgroundColor: (activeButton === buttonType || cancelContButton === buttonType) ? '#60B84B' : '',
        color: (activeButton === buttonType || cancelContButton === buttonType) ? 'white' : '#9F9F9F',
        boxShadow: '0px 0px 25px 0px #00000026' 
    });

    const getlowerButtonStyle = (buttonType) => ({
        height: '2rem',
        width: buttonType === 'poll' || buttonType === 'QnA' ? '6.25rem' : '11.25rem',
        borderStyle: 'none',
        borderRadius: '.625rem',
        marginLeft: '1.875rem',
        marginTop: '0.5rem',
        backgroundColor: (activeButton === buttonType || cancelContButton === buttonType) ? '#60B84B' : '',
        color: (activeButton === buttonType || cancelContButton === buttonType) ? 'white' : '#9F9F9F',
        boxShadow: '0px 0px 25px 0px #00000026' 
    });
    

    const getlowerContinueButtonStyle = (buttonType) => ({
        height: '2rem',
        width: buttonType === 'poll' || buttonType === 'QnA' ? '6.25rem' : '11.25rem',
        borderStyle: 'none',
        borderRadius: '.625rem',
        marginLeft: '1.875rem',
        marginTop: '0.5rem',
        backgroundColor: '#60B84B',
        color: 'white',
        boxShadow: '0px 0px 25px 0px #00000026' 
    });
    

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ height: '13rem', width: '30rem', borderRadius: '.75rem', display: 'flex', flexDirection: 'column', background: 'white', margin: 'auto', marginTop: '10%' }}>
                <div style={{ marginLeft: '8%'}}>
                    <input type="text" className="inputText" placeholder="Quiz name" style={{ height: '2.5rem', width: '26rem', borderStyle: 'none', borderRadius: '.625rem',  boxShadow: '0px 0px 25px 0px #00000026',ciolor:'#9F9F9F' }} 
                      onInput={(e) =>
                        setFormvalue({
                            ...formvalue,
                            Title: e.target.value,
                        })
            }
            value={formvalue.Title}
                    
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginTop: '1.3rem', marginLeft: '3.4375rem', fontSize: '1.25rem', fontWeight: '6.25rem',color:'#9F9F9F' }}>Quiz Type</div>
                    <div><button type="button" style={getButtonStyle('QnA')} onClick={() => handleButtonClick('QnA')}>QnA</button></div>
                    <div><button type="button" style={getButtonStyle('poll')} onClick={() => handleButtonClick('poll')}>Poll type</button></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '2rem', marginLeft: '1.5rem' }}>
                    <div><button type="button" style={getlowerButtonStyle('Cancel')} onClick={() => handleContCancelButtonClick('Cancel')}>Cancel</button></div>
                    <div><button type="button" style={getlowerContinueButtonStyle('Continue')} onClick={() => handleContCancelButtonClick('Continue')}>Continue</button></div>
                </div>
            </div>
            <Modal
                isOpen={openBox}
                onRequestClose={closeQuiz}
                style={customStyles}
            >
                <CreateQuiz title={formvalue.Title} type={formvalue.Type} closeCreateQuiz={closeQuiz}/> 
            </Modal>

        </div>
    );
};

export default PrimaryModal;
