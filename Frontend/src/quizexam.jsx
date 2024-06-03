import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const QuizExamPage = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizData, setQuizData] = useState(null); // Initialize with null
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const quizLink = `${import.meta.env.VITE_API_URL}/quiz/getQuizDataById/${id}`;
        axios.get(quizLink, { headers: { Authorization: token } })
            .then((res) => {
                setQuizData(res.data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const updateAttemptStatus = async (slideIndex, option) => {
        const slide = quizData.slides[slideIndex];

        if (quizData.type === "QnA") {
            let status = "wrong";
            if (slide.optionType === 'Text' && slide.TextData?.isCorrect == option) {
                status = "correct";
            } else if (slide.optionType === 'Image' && slide.ImageData?.isCorrect == option) {
                status = "correct";
            } else if (slide.optionType === 'TextImage' && slide.TextImageData?.isCorrect == option) {
                status = "correct";
            }

            const apiUrl = `${import.meta.env.VITE_API_URL}/quiz/incrementAttempt/${quizData._id}/${slideIndex}/${status}`
            try {
                await axios.put(apiUrl);
            } catch (error) {
                console.log("API call error:", error);
            }
        }

        if (quizData.type === "poll") {
            const apiUrl = `${import.meta.env.VITE_API_URL}/quiz/incrementPollAttempt/${quizData._id}/${slideIndex}/${option}`
            try {
                await axios.put(apiUrl);
            } catch (error) {
                console.log("API call error:", error);
            }
        }
    };

    const handleNext = async () => {
        if (quizData && currentSlide < quizData.slides.length - 1) {
            await updateAttemptStatus(currentSlide, selectedOption);
            setCurrentSlide(currentSlide + 1);
            setSelectedOption(null);
        }
    };

    const handleSubmit = async () => {
        await updateAttemptStatus(currentSlide, selectedOption);
        if (quizData.type === "QnA") {
            navigate('/scorepage', { state: { quizData, totalCount } });
        }
        if (quizData.type === "poll") {
            navigate('/pollfinalpage');
        }
    };

    const getSlideTime = (timer) => {
        switch (timer) {
            case '5 sec':
                return 5000;
            case '10 sec':
                return 10000;
            default:
                return 0;
        }
    };

    const renderer = ({ seconds, completed }) => {
        if (completed) {
            handleNext();
            return null;
        } else {
            return <span>{seconds} sec</span>;
        }
    };

    const handleOption = (optionIdx) => {
        setSelectedOption(optionIdx);
        const slide = quizData.slides[currentSlide];

        let correctAnswer;
        switch (slide.optionType) {
            case 'Text':
                correctAnswer = slide.TextData?.isCorrect;
                break;
            case 'Image':
                correctAnswer = slide.ImageData?.isCorrect;
                break;
            case 'TextImage':
                correctAnswer = slide.TextImageData?.isCorrect;
                break;
            default:
                correctAnswer = null;
        }

        if (optionIdx === correctAnswer) {
            setTotalCount(totalCount + 1);
        }
    };

    if (!quizData) {
        return <div>Loading...</div>; // Add a loading state
    }

    return (
        <div style={{ height: '100vh', width: '100vw', background: '#041325', display: 'flex' }}>
            <div style={{ height: '25rem', width: '31.25rem', borderRadius: '.9375rem', borderStyle: 'none', display: 'flex', flexDirection: 'column', background: 'white', margin: 'auto' }}>
                {quizData.slides.map((slide, index) => (
                    <div key={index} style={{ display: currentSlide === index ? 'block' : 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <p style={{ marginLeft: '1.25rem',fontSize:'25px',fontWeight:'bold' }}>{`${currentSlide + 1}/${quizData.slides.length}`}</p>
                            <div style={{ marginLeft: '70%', marginTop: '1.5625rem', color: 'red',fontSize:'20px'}}>
                                {getSlideTime(slide.Timer) > 0 ? (
                                    <Countdown
                                        date={Date.now() + getSlideTime(slide.Timer)}
                                        renderer={renderer}
                                        key={currentSlide}
                                    />
                                ) : 'No Timer'}
                            </div>
                        </div>
                        <div style={{ fontSize: '1.875rem', margin: 'auto', marginTop: '1.25rem', marginLeft: '1.25rem' }}>{slide.Question}</div>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '1.25rem', marginLeft: '3.125rem' }}>
                            {slide.optionType === 'Text' && slide.TextData?.TextOption.map((option, idx) => (
                                <div key={idx} style={{
                                    height: '3.75rem', width: '11.25rem', borderStyle: 'none', borderRadius: '.3rem', borderColor: 'blueviolet',
                                    background: selectedOption === idx ? '#60B84B' : '#F0F0F0', color: selectedOption === idx ? 'white' : 'black',
                                    margin: '.625rem', cursor: 'pointer'
                                }} onClick={() => handleOption(idx)}>
                                    {option}
                                </div>
                            ))}
                            {slide.optionType === 'Image' && slide.ImageData?.ImageOption.map((option, idx) => (
                                <div key={idx} style={{
                                    height: '3.75rem', width: '11.25rem', borderStyle: 'none', borderRadius: '.3rem', borderColor: 'blueviolet',
                                    background: selectedOption === idx ? '#60B84B' : '#F0F0F0', margin: '.625rem', cursor: 'pointer'
                                }} onClick={() => handleOption(idx)}>
                                    <img src={option} alt={`Option ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '.75rem' }} />
                                </div>
                            ))}
                            {slide.optionType === 'TextImage' && slide.TextImageData?.TextImageOption.map((option, idx) => (
                                <div key={idx} style={{
                                    height: '3.75rem', width: '11.25rem', borderStyle: 'none', borderRadius: '.3rem', borderColor: 'blueviolet',
                                    background: selectedOption === idx ? '#60B84B' : '#F0F0F0', margin: '.625rem', cursor: 'pointer'
                                }} onClick={() => handleOption(idx)}>
                                    <p>{option.text}</p>
                                    <img src={option.imageUrl} alt={`Option ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '.75rem' }} />
                                </div>
                            ))}
                        </div>
                        <div style={{ marginLeft: '10%', marginTop: '10%' }}>
                            {currentSlide < quizData.slides.length - 1 ? (
                                <button type="button" style={{ height: '2rem', width: '9.375rem', background: '#60B84B', borderRadius: '.5rem', borderStyle: 'none', marginLeft: '30%',color:'white',paddingLeft:'12%',fontSize:'15px'}} onClick={handleNext}>
                                    Next
                                </button>
                            ) : (
                                <button type="button" style={{ height: '2rem', width: '9.375rem', background: '#60B84B', borderRadius: '.5rem', borderStyle: 'none', marginLeft: '30%',color:'white',paddingLeft:'12%',fontSize:'15px' }} onClick={handleSubmit}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizExamPage;
