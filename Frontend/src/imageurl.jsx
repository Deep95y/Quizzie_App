import React, { useState, useEffect } from 'react';
import {FaTrash } from 'react-icons/fa';

const ImageUrl = ({ slidesdata, currentSlideIndex, onImageDataChange,type }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizType, setQuizType] = useState(type);

    // Initialize selectedOption when the component mounts or currentSlideIndex changes
    useEffect(() => {
        if (quizType == "QnA") {
            const correctOption = slidesdata[currentSlideIndex]?.ImageData?.isCorrect;
            if (correctOption !== undefined) {
                setSelectedOption(correctOption);
            } else {
                setSelectedOption(null);
            }
        } else {
            setSelectedOption(null);
        }
    }, [currentSlideIndex, slidesdata]);

    const handleRadioChange = (optionId) => {
        setSelectedOption(optionId);
        const updatedSlidesData = [...slidesdata];
        updatedSlidesData[currentSlideIndex].ImageData.isCorrect = optionId;
        onImageDataChange(updatedSlidesData[currentSlideIndex].ImageData, currentSlideIndex);
    };

    const handleAddOption = () => {
        const updatedSlidesData = [...slidesdata];
        updatedSlidesData[currentSlideIndex].ImageData = {
            ImageOption: [...(updatedSlidesData[currentSlideIndex]?.ImageData?.ImageOption || []), '']
        };
        onImageDataChange(updatedSlidesData[currentSlideIndex].ImageData, currentSlideIndex);
    };

    const handleRemoveOption = (index) => {
        const updatedSlidesData = [...slidesdata];
        updatedSlidesData[currentSlideIndex].ImageData.ImageOption.splice(index, 1);
        onImageDataChange(updatedSlidesData[currentSlideIndex].ImageData, currentSlideIndex);
    };

    const buttonStyle = (buttonId) => ({
        height: '1.875rem',
        width: '9.375rem',
        borderRadius: '.625rem',
        borderStyle: 'none',
        marginTop: '.625rem',
        backgroundColor: selectedOption === buttonId ? '#60B84B' : '',
        color: selectedOption === buttonId ? 'white' : '',
        boxShadow: '0px 0px 25px 0px #00000026',ciolor:'#9F9F9F'
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1.875rem', marginLeft: '1.875rem' }}>
            {(slidesdata[currentSlideIndex]?.ImageData?.ImageOption || ['','']).map((option, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '.625rem' }}>
                      {quizType == "QnA" && (
                    <input
                        type="radio"
                        name="option"
                        value={index}
                        checked={selectedOption === index}
                        onChange={() => handleRadioChange(index)}
                    />
                      )}
                    <input
                        type="text"
                        style={buttonStyle(index)}
                        value={option}
                        onChange={(e) => {
                            const updatedSlidesData = [...slidesdata];
                            updatedSlidesData[currentSlideIndex].ImageData.ImageOption[index] = e.target.value;
                            onImageDataChange(updatedSlidesData[currentSlideIndex].ImageData, currentSlideIndex);
                        }}
                    />
                    {index >= 2 && (
                        <button
                            style={{ marginLeft: '.625rem' }}
                            onClick={() => handleRemoveOption(index)}
                        >
                              <FaTrash style={{ color: 'red' }}/>
                        </button>
                    )}
                </div>
            ))}
            {slidesdata[currentSlideIndex]?.ImageData?.ImageOption.length < 4 && (
                <button onClick={handleAddOption} style={{boxShadow: '0px 0px 25px 0px #00000026',ciolor:'#9F9F9F', height: '1.875rem',width: '9.375rem',borderRadius: '.3rem',borderStyle: 'none',marginTop: '.625rem',marginLeft:'10px'}}>Add Option</button>
            )}
        </div>
    );
};

export default ImageUrl;
