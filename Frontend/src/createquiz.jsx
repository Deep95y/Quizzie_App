import React, { useState, useEffect } from 'react';
import Text from './text';
import ImageUrl from './imageurl';
import TextPlusImage from './textplusimg';
import AuthCreate from './authcreate';
import Modal from 'react-modal';
import QuizLink from './quizlink';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const CreateQuiz = ({title, type, closeCreateQuiz}) => {
    const [optionType, setOptionType] = useState('Text');
    const [divs, setDivs] = useState([{ id: 1 }]);
    const [clickedButton, setClickedButton] = useState(null);
    const [timerButton, setTimerButton] = useState("Off");
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0); 
    const [token, setToken] = useState('');
    const [quiztitle, setQuiztitle] = useState(title);
    const [quiztype, setQuiztype] = useState(type);
    const [createdQuizID, setcreatedQuizID] = useState(null);
    const [openPublishedBox, setopenPublishedBox] = useState(false);
    
    const [slides, setSlidesData] = useState({
        slidedata: [
            createSlideData(),
            createSlideData()
        ]
    });

    function createSlideData() {
        if (quiztype === 'Poll') {
            return {
                Question: "",
                optionType: 'Text',
                Timer: "Off",
                TextData: { TextOption: ["", ""] },
                ImageData: { ImageOption: ["", ""] },
                TextImageData: { TextImageOption: [{ text: '', imageUrl: '' }, { text: '', imageUrl: '' }] },
            };
        } else {
            return {
                Question: "",
                optionType: 'Text',
                Timer: "Off",
                TextData: { TextOption: ["", ""], isCorrect: 0 },
                ImageData: { ImageOption: ["", ""], isCorrect: 0 },
                TextImageData: { TextImageOption: [{ text: '', imageUrl: '' }, { text: '', imageUrl: '' }], isCorrect: 0 },
            };
        }
    }
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
    
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.log('No token found. Redirect to login page or handle accordingly.');
        }
      }, []);
    

    const handleTextDataChange = (newData, index) => {
        const updatedSlides = [...slides.slidedata];
        updatedSlides[index] = {
            ...updatedSlides[index],
            TextData: newData,
            Option: optionType
        };
        setSlidesData({ ...slides, slidedata: updatedSlides });
    };
    // const navigate = useNavigate();

     const handleSave = async () => {
        const currentSlide = slides.slidedata[currentSlideIndex];
        console.log(currentSlide);

        if (!currentSlide.Question || !currentSlide.optionType || !currentSlide.Timer) {
            alert("Enter each input field");
            return;
        }
        else{
            const createdid = await AuthCreate(quiztitle, quiztype, slides);
            setcreatedQuizID(createdid);
        }
    }

    const handleOptionChange = (e, index) => {
        const { value } = e.target;
        const updatedSlides = [...slides.slidedata];
        updatedSlides[currentSlideIndex] = {
            ...updatedSlides[currentSlideIndex],
            optionType: value
        };
        setSlidesData({ ...slides, slidedata: updatedSlides });
    };

    const handleAddDiv = () => {
        if (divs.length < 5) {
            setDivs([...divs, { id: divs.length + 1 }]);
            setSlidesData({
                ...slides,
                slidedata: [
                    ...slides.slidedata,
                    {
                        Question: "",
                        optionType: 'Text',
                        Timer: "Off",
                        TextData: { TextOption: ["", ""], isCorrect: 0 },
                        ImageData: { ImageOption: ["", ""], isCorrect: 0 },
                        TextImageData: { TextImageOption: [{ text: '', imageUrl: '' }, { text: '', imageUrl: '' }], isCorrect: 0 },
                    }
                ]
            });
            setCurrentSlideIndex(divs.length); // Set the current slide to the new slide
        }
    };

    const handleRemoveDiv = (id) => {
        const updatedDivs = divs.filter(div => div.id !== id);
        const updatedSlides = slides.slidedata.filter((_, index) => index !== id - 1);
        setDivs(updatedDivs);
        setSlidesData({ ...slides, slidedata: updatedSlides });
        if (currentSlideIndex >= updatedSlides.length) {
            setCurrentSlideIndex(updatedSlides.length - 1); // Adjust the current slide index if necessary
        }
    };

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1100, // Higher zIndex for overlay to ensure it's above other modals
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            padding: 0,
            background: 'white',
            zIndex: 1110, // Higher zIndex for content to ensure it's above other modals
        },
    };
    

    Modal.setAppElement('#root');

    const openQuiz = () => {
        setopenPublishedBox(true);
    };

    const closeQuiz = () => {
        setopenPublishedBox(false);
    };

    const handleButtonClick = (buttonId) => {
        setClickedButton(buttonId);
        if (buttonId === 'Create Quiz') {
            handleSave();
            openQuiz();
        }

    };

    const handleTimerButtonClick = (buttonId) => {
        setTimerButton(buttonId); // Update the local state for visual feedback
        const updatedSlides = [...slides.slidedata];
        updatedSlides[currentSlideIndex] = {
            ...updatedSlides[currentSlideIndex],
            Timer: buttonId
        };
        setSlidesData({ ...slides, slidedata: updatedSlides });
    };

    const timerbuttonStyle = (buttonId) => ({
        height: '1.875rem',
        width: '6.25rem',
        borderRadius: '.3rem',
        borderStyle: 'none',
        marginTop: '.625rem',
        backgroundColor: slides.slidedata[currentSlideIndex].Timer === buttonId ? 'red' : '',
        color: slides.slidedata[currentSlideIndex].Timer === buttonId ? 'white' : '',
        boxShadow: '0px 0px 25px 0px #00000026',ciolor:'#9F9F9F'
    });

    const buttonClickStyle = (buttonId) => ({
        height: '1.875rem',
        width: '12.5rem',
        borderRadius: '.5rem',
        borderStyle: 'none',
        backgroundColor: clickedButton === buttonId ? '#60B84B' : '',
        color: clickedButton === buttonId ? 'white' : '',
        boxShadow: '0px 0px 25px 0px #00000026',color:'#9F9F9F',
    
    });

    const handleSlideClick = (index) => {
        setCurrentSlideIndex(index);
        setOptionType(slides.slidedata[index].optionType);
    };

    const handleImageDataChange = (newData, index) => {
        const updatedSlides = [...slides.slidedata];
        updatedSlides[index] = {
            ...updatedSlides[index],
            ImageData: newData
        };
        setSlidesData({ ...slides, slidedata: updatedSlides });
    };

    const handleOptionsChange = (newOptions) => {
        const updatedSlides = [...slides.slidedata];
        updatedSlides[currentSlideIndex] = {
            ...updatedSlides[currentSlideIndex],
            TextData: {
                ...updatedSlides[currentSlideIndex].TextData,
                TextOption: newOptions
            }
        };
        setSlidesData({ ...slides, slidedata: updatedSlides });
    };

    // Update handleTextImageDataChange function
    const handleTextImageDataChange = (newData, index) => {
        const updatedSlides = [...slides.slidedata];
        updatedSlides[index] = {
            ...updatedSlides[index],
            TextImageData: newData,
        };
        setSlidesData({ ...slides, slidedata: updatedSlides });
    };

    const OptionComponent = slides.slidedata[currentSlideIndex].optionType === 'Text' ? Text :
    slides.slidedata[currentSlideIndex].optionType === 'Image' ? ImageUrl :
    slides.slidedata[currentSlideIndex].optionType === 'TextImage' ? TextPlusImage :
    Text; // Default to Text if optionType is not recognized


    return (
        <>
            <div style={{ height: '31rem', width: '35rem', margin: 'auto', background: 'white', borderRadius: '.9375rem', borderStyle: 'none', display: 'flex', flexDirection: 'column', overflowY: 'hidden',marginTop:'20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1.875rem' }}>
                    <div style={{ position: 'relative', marginLeft: '.625rem' }}>
                        <div style={{ height: '2.5rem', width: '2.8125rem', background: 'white', borderRadius: '2.1875rem', borderStyle: 'none', gap: '.3125rem',boxShadow: '0px 0px 25px 0px #00000026',ciolor:'#9F9F9F' }} onClick={() => handleSlideClick(0)}>
                            <p style={{ position: 'absolute', marginLeft: '1.25rem',ciolor:'#9F9F9F' }}>1</p>
                        </div>
                    </div>
                    {divs.map((div, index) => (
                        <div key={index} style={{ position: 'relative', marginLeft: '.625rem' }}>
                            <div style={{ height: '2.5rem', width: '2.8125rem', background: 'white', borderRadius: '2.1875rem', borderStyle: 'none', gap: '.3125rem',boxShadow: '0px 0px 25px 0px #00000026',ciolor:'#9F9F9F' }} onClick={() => handleSlideClick(index + 1)}>
                                <p style={{ position: 'absolute', marginLeft: '1.25rem',ciolor:'#9F9F9F' }}>{index + 2}</p>
                            </div>
                            <div
                                style={{ position: 'absolute', top: '-0.625rem', right: '.625rem', cursor: 'pointer', color: 'black', fontWeight: 'bold', fontSize: '1.25rem' }}
                                onClick={() => handleRemoveDiv(div.id)}
                            >
                                x
                            </div>
                        </div>
                    ))}
                    {divs.length < 4 && (
                        <div
                            style={{ fontSize: '1.875rem', marginLeft: '.9375rem', marginTop: '.3125rem', cursor: 'pointer',ciolor:'#9F9F9F' }}
                            onClick={handleAddDiv}
                        >
                            +
                        </div>
                    )}
                    <div style={{ marginLeft: '25%',ciolor:'#9F9F9F' }}>Max 5 questions</div>
                </div>
             {quiztype == "QnA" && ( 
             <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', marginLeft: '80%', marginTop: '40%' }}>
            <div style={{ marginLeft: '.625rem',ciolor:'#9F9F9F' }}>Timer</div>
            <div>
            <button
            type="button"
            style={timerbuttonStyle('Off')}
            onClick={() => handleTimerButtonClick('Off')} 
            >
            Off
            </button>
            </div>
            <div>
            <button
            type="button"
            style={timerbuttonStyle('5 sec')}
            onClick={() => handleTimerButtonClick('5 sec')}
            >
            5 sec
            </button>
            </div>
            <div>
            <button
            type="button"
            style={timerbuttonStyle('10 sec')}
            onClick={() => handleTimerButtonClick('10 sec')}
            >
            10 sec
            </button>
            </div>
            </div>
            )}   
                
                <div>
                    <input
                        type="text"
                        placeholder="QnA Question"
                        style={{ height: '2.5rem', width: '25rem', marginLeft: '1.875rem', marginTop: '1.875rem', borderRadius: '.75rem', borderStyle: 'none',boxShadow: '0px 0px 25px 0px #00000026',ciolor:'#9F9F9F' }}
                        onChange={(e) => {
                            const updatedSlides = [...slides.slidedata];
                            updatedSlides[currentSlideIndex] = {
                                ...updatedSlides[currentSlideIndex],
                                Question: e.target.value
                            };
                            setSlidesData({ ...slides, slidedata: updatedSlides });
                        }}
                        value={slides.slidedata[currentSlideIndex]?.Question || ""}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1.875rem' }}>
                    <div style={{ marginLeft: '1.875rem',ciolor:'#9F9F9F' }}>Option type</div>
                  
                    <div style={{ marginLeft: '3.125rem' }}>
                    <input
                        type="radio"
                        value="Text"
                        checked={slides.slidedata[currentSlideIndex].optionType === 'Text'}
                        onChange={(e) => handleOptionChange(e, currentSlideIndex)}
                    /> Text
                    </div>
                    
                    <div style={{ marginLeft: '1.875rem' }}>
                    <input
                        type="radio"
                        value="Image"
                        checked={slides.slidedata[currentSlideIndex].optionType === 'Image'}
                        onChange={(e) => handleOptionChange(e, currentSlideIndex)}
                    /> Image URL
                    </div>
                    <div style={{ marginLeft: '1.875rem' }}>
                    <input
                        type="radio"
                        value="TextImage"
                        checked={slides.slidedata[currentSlideIndex].optionType === 'TextImage'}
                        onChange={(e) => handleOptionChange(e, currentSlideIndex)}
                    /> Text & Image URL
                    </div>
                </div>
                <OptionComponent
                    slidesdata={slides.slidedata}
                    currentSlideIndex={currentSlideIndex}
                    onTextDataChange={(newData) => handleTextDataChange(newData, currentSlideIndex)}
                    onTextImgDataChange={(newData) => handleTextImageDataChange(newData, currentSlideIndex)}
                    onImageDataChange={(newData) => handleImageDataChange(newData, currentSlideIndex)}
                    optionType={slides.slidedata[currentSlideIndex].optionType}
                    type ={quiztype}
                />
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem', marginLeft: '2.5rem' }}>
                    <div>
                        <button
                            type="button"
                            style={buttonClickStyle('Cancel')}
                            onClick={() => closeCreateQuiz()}
                        >
                            Cancel
                        </button>
                    </div>
                    <div style={{ marginLeft: '1.875rem' }}>
                        <button
                            type="button"
                            style={buttonClickStyle('Create Quiz')}
                            onClick={() => handleButtonClick('Create Quiz')}
                        >
                            Create Quiz
                        </button>
                    </div>
                </div>
            </div>

        <Modal
                isOpen={openPublishedBox}
                onRequestClose={closeQuiz}
                style={customStyles}
            >
                 <QuizLink createdQuizID={createdQuizID} closeQuiz={closeQuiz}/>
            </Modal>
        </>
    );
};

export default CreateQuiz;
