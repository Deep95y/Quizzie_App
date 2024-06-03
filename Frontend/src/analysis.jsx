import { FaEdit, FaTrash } from 'react-icons/fa';
import './index.css';
import { MdShare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DeleteQuiz from './quizdelete';
import Modal from 'react-modal';
import React, { useState, useEffect } from "react";
import { FaCheck } from 'react-icons/fa';
import EditQuiz from './editQuiz';
import AuthDashboardDetailed from './authdashboarddetailed';
import AuthQuizAnalysisDetails from './AuthQuizAnalysis';

const Analysis = () => {
    const [showbox, setshowbox] = useState(false);
    const [showshare, setShowshare] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [quizToEdit, setQuizToEdit] = useState(null);
    const [quizdetails, setquizdetails] = useState(null);
    const [individualquizdetails, setindividualquizdetails] = useState(null);
    const [quizIdDelete, setquizdeleteId] = useState(null);
    const [showDetailedAnalysis, setshowDetailedAnalysis] = useState(true);

    const fetchDetailedSummary = async () => {
        try {
            const data = await AuthDashboardDetailed();
            setquizdetails(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setshowDetailedAnalysis(true);
        fetchDetailedSummary();

    }, []);

    const handleClick = async (id) => {
        try {
            const data = await AuthQuizAnalysisDetails(id);
            console.log(data);
            setindividualquizdetails(data);
            setshowDetailedAnalysis(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Semi-transparent black background
        },
        content: {
            top: "40%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: 'none', // Remove the border
            padding: 0, // Remove padding
            background: 'white', // Ensure background is white
        },
    };

    Modal.setAppElement('#root');

    const openBox = (id) => {
        setquizdeleteId(id)
        setshowbox(true);
    };

    const closeBox = () => {
        setshowbox(false);
    };

    const toggleDiv = (id) => {
        const quizLink = `${import.meta.env.VITE_REACT_URL}/attempt/${id}`;
        navigator.clipboard.writeText(quizLink)
        .then(() => {
            setShowshare(true);
          setTimeout(() => {
            setShowshare(false);
          }, 3000); // Hide the message after 3 seconds
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
      }

    const handleClose = () => {
        setShowshare(false);
    }

    const openEditModal = (quizId) => {
        setQuizToEdit(quizId);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setQuizToEdit(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    };

    return (
        <>
            {showDetailedAnalysis ? (
                <div style={{ height: '100vh', width: '100vw', background: '#EDEDED', display: 'flex', flexDirection: 'column',overflowY:'hidden' }}>
                    {showshare && (
                        <div style={{ height: '3.75rem', width: '12.5rem', background: 'white', borderBottomColor: 'green', display: 'flex', flexDirection: 'row', marginLeft: '62%' }}>
                            <div style={{ backgroundColor: 'green', borderRadius: '50%', width: '1.25rem', height: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1.25rem' }}>
                                <FaCheck style={{ color: 'white', fontSize: '.875rem' }} /></div>
                            <div style={{ marginTop: '1.25rem', marginLeft: '.3125rem' }}>link copied to clipboard</div>
                            <div style={{ marginLeft: '.3125rem', cursor: 'pointer' }} onClick={handleClose}>x</div>
                        </div>
                    )}
                    <div style={{ fontSize: '2.5rem', fontWeight: '600', color: '#5076FF', marginLeft: '30%', marginTop: '5%',font:'Poppins'}}>Quiz Analysis</div>
                    <div style={{height: '2.5rem', width: '55rem', background: '#5076FF', color: 'white', display: 'flex', flexDirection: 'row', borderRadius: '.75rem', marginLeft: '5%', marginTop: '1.25rem',font:'Poppins'  }}>
                        <div style={{ marginLeft: '3%',marginTop:'10px'}}>Sr.No</div>
                        <div style={{ marginLeft: '6%',marginTop:'10px' }}>Quiz Name</div>
                        <div style={{ marginLeft: '5%',marginTop:'10px' }}>Created on</div>
                        <div style={{ marginLeft: '5%',marginTop:'10px' }}>Impression</div>
                    </div>
                    {quizdetails && quizdetails.map((item, index) => (
                        <div key={item._id} style={{ height: '2.5rem', width: '55rem',  background: index % 2 === 0 ? '#EDEDED' : 'lightblue', color: 'black', display: 'flex', flexDirection: 'row', borderRadius: '.75rem', marginLeft: '5%', marginTop: '2rem',font:'Poppins'  }}>
                            <div style={{ marginLeft: '5%',marginTop:'10px' }}>{index + 1}</div>
                            <div style={{ marginLeft: '5%',marginTop:'10px'  }}>{item.title}</div>
                            <div style={{ marginLeft: '8%',marginTop:'10px'  }}>{formatDate(item.createdAt)}</div>
                            <div style={{ marginLeft: '5%',marginTop:'10px'  }}>{item.impressions}</div>
                            <div style={{ marginLeft: '10%',marginTop:'10px'  }}> <FaEdit style={{ color: '#854CFF' }} onClick={() => openEditModal(item._id)} /></div>
                            <div style={{ marginLeft: '5%',marginTop:'10px'  }}> <FaTrash style={{ color: 'red' }} onClick={() => openBox(item._id)} /></div>
                            <div style={{ marginLeft: '5%',marginTop:'10px'  }}> <MdShare style={{ color: 'green' }} onClick={() => toggleDiv(item._id)} /></div>
                            <div style={{ marginLeft: '5%', marginTop: '0.5rem', cursor: 'pointer' }} onClick={() => handleClick(item._id)}>Question wise analysis</div>
                        </div>
                    ))}
                
                    <Modal
                        isOpen={showbox}
                        onRequestClose={closeBox}
                        style={customStyles}
                    >
                        <DeleteQuiz id={quizIdDelete} setshowbox={setshowbox} fetchDetailedSummary={fetchDetailedSummary} />
                    </Modal>

                    <Modal
                        isOpen={editModalOpen}
                        onRequestClose={closeEditModal}
                        style={customStyles}
                    >
                        <EditQuiz quizId={quizToEdit} onClose={closeEditModal} />
                    </Modal>
                </div>
            ) : (
                individualquizdetails.type == "QnA" ? (
                    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#EDEDED', flexDirection: 'column',overflowY:'hidden' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ color: 'blue', fontSize: '1.875rem', marginLeft: '3.5rem', marginTop: '1.25rem' }}>{individualquizdetails.title} Question Analysis</div>
                            <div style={{ color: 'red', marginLeft: '30%',marginTop:'20px' }}>Created on: {formatDate(individualquizdetails.createdAt)}</div><br />
                            <p style={{ color: 'red', position: 'absolute', marginLeft: '65%',marginTop:'40px' }}>Impression: {individualquizdetails.impressions}</p>
                        </div>
                        {individualquizdetails.slides.map((slide, index) => (
                            <div key={slide._id}>
                                <div style={{ marginLeft: '3.5rem', marginTop: '2.5rem' }}>{`Q${index + 1}. ${slide.Question}`}</div>
                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '3.5rem', marginTop: '1.875rem' }}>
                                    <div style={{ height: '5rem', width: '12.5rem', background: 'white' }}>
                                        <p style={{marginLeft:'45%'}}>{slide.totalAttempt}</p>
                                        <p style={{marginLeft:'5px'}}>people attempted the question</p>
                                    </div>
                                    <div style={{ height: '5rem', width: '12.5rem', background: 'white', marginLeft: '2.5rem' }}>
                                        <p style={{marginLeft:'45%'}}>{slide.totalCorrectAttempt}</p>
                                        <p style={{marginLeft:'5px'}}>people answered correctly</p>
                                    </div>
                                    <div style={{ height: '5rem', width: '12.5rem', background: 'white', marginLeft: '2.5rem' }}>
                                        <p style={{marginLeft:'45%'}}>{slide.totalAttempt - slide.totalCorrectAttempt}</p>
                                        <p style={{marginLeft:'5px'}}>people answered incorrectly</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#EDEDED', flexDirection: 'column',overflowY:'hidden' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ color: 'blue', fontSize: '1.875rem', marginLeft: '2.5rem', marginTop: '1.25rem' }}>{individualquizdetails.title} Question Analysis</div>
                            <div style={{ color: 'red', marginLeft: '25%',marginTop:'10px' }}>Created on: {formatDate(individualquizdetails.createdAt)}</div><br />
                            <p style={{ color: 'red', position: 'absolute', marginLeft: '66%',marginTop:'30px'}}>Impression: {individualquizdetails.impressions}</p>
                        </div>
                        {individualquizdetails.slides.map((slide, index) => (
                            <div key={slide._id}>
                                <div style={{ marginLeft: '2.5rem', marginTop: '2.5rem',fontSize:'30px' }}>{`Q${index + 1}. ${slide.Question}`}</div>
                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '2.5rem', marginTop: '1.875rem' }}>
                                    {slide.optionType === 'Text' && (
                                        slide.TextData.TextOption.map((option, optionIndex) => (
                                            <div key={`${slide._id}-option-${optionIndex}`} style={{ height: '5rem', width: '12.5rem', background: 'white', marginRight: '1rem',display:'flex',flexDirection:'row' }}>
                                            
                                                <div style={{marginLeft:'40px',marginTop:'20px',fontSize:'40px'}}>{slide.totalPollAttemmpts[optionIndex]}</div><div style={{marginTop:'30px',marginLeft:'20px',fontSize:'20px'}}>option</div> <div style={{marginTop:'30px',marginLeft:'5px',fontSize:'20px'}}>{option}</div>
                                            </div>
                                        ))
                                    )}
                                    {slide.optionType === 'Image' && (
                                        slide.ImageData.ImageOption.map((option, optionIndex) => (
                                            <div key={`${slide._id}-option-${optionIndex}`} style={{ height: '5rem', width: '12.5rem', background: 'white', marginRight: '1rem',display:'flex',flexDirection:'row' }}>
                                               <div style={{marginLeft:'40px',marginTop:'20px',fontSize:'40px'}}>{slide.totalPollAttemmpts[optionIndex]}</div><div style={{marginTop:'30px',marginLeft:'20px'}}>option</div> <div style={{marginTop:'30px',marginLeft:'5px'}}>{option}</div>
                                            </div>
                                        ))
                                    )}
                                    {slide.optionType === 'TextImage' && (
                                        slide.TextImageData.TextImageOption.map((option, optionIndex) => (
                                            <div key={`${slide._id}-option-${optionIndex}`} style={{ height: '5rem', width: '12.5rem', background: 'white', marginRight: '1rem' }}>
                                               <div style={{marginLeft:'40px',marginTop:'20px',fontSize:'40px'}}>{slide.totalPollAttemmpts[optionIndex]}</div><div style={{marginTop:'30px',marginLeft:'20px'}}>option</div> <div style={{marginTop:'30px',marginLeft:'5px'}}>{option.text}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>
                )
            )}
        </>
    );
}

export default Analysis;