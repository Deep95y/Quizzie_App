import React, { useState, useEffect } from 'react';
import {FaTrash } from 'react-icons/fa';

const TextPlusImage = ({ slidesdata, currentSlideIndex, onTextImgDataChange,type }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizType, setQuizType] = useState(type);

    useEffect(() => {
        if (quizType == "QnA") {
            const isCorrect = slidesdata[currentSlideIndex]?.TextImageData?.isCorrect;
            setSelectedOption(isCorrect !== undefined ? isCorrect : null);
        } else {
            setSelectedOption(null);
        }
    }, [currentSlideIndex, slidesdata]);

    const handleRadioChange = (optionId) => {
        setSelectedOption(optionId);
        const updatedSlidesData = [...slidesdata];
        updatedSlidesData[currentSlideIndex].TextImageData.isCorrect = optionId;
        onTextImgDataChange(updatedSlidesData[currentSlideIndex].TextImageData, currentSlideIndex);
    };

    const handleAddOption = () => {
        const updatedSlidesData = [...slidesdata];
        updatedSlidesData[currentSlideIndex].TextImageData = {
            TextImageOption: [
                ...(updatedSlidesData[currentSlideIndex]?.TextImageData?.TextImageOption || []),
                { text: '', imageUrl: '' }
            ]
        };
        onTextImgDataChange(updatedSlidesData[currentSlideIndex].TextImageData, currentSlideIndex);
    };

    const handleRemoveOption = (index) => {
        const updatedSlidesData = [...slidesdata];
        updatedSlidesData[currentSlideIndex].TextImageData.TextImageOption.splice(index, 1);
        onTextImgDataChange(updatedSlidesData[currentSlideIndex].TextImageData, currentSlideIndex);
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
            {(slidesdata[currentSlideIndex]?.TextImageData?.TextImageOption || []).map((option, index) => (
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
                        value={option.text}
                        onChange={(e) => {
                            const updatedSlidesData = [...slidesdata];
                            updatedSlidesData[currentSlideIndex].TextImageData.TextImageOption[index].text = e.target.value;
                            onTextImgDataChange(updatedSlidesData[currentSlideIndex].TextImageData, currentSlideIndex);
                        }}
                        placeholder="Text"
                    />
                    <input
                        type="text"
                        style={buttonStyle(index)}
                        value={option.imageUrl}
                        onChange={(e) => {
                            const updatedSlidesData = [...slidesdata];
                            updatedSlidesData[currentSlideIndex].TextImageData.TextImageOption[index].imageUrl = e.target.value;
                            onTextImgDataChange(updatedSlidesData[currentSlideIndex].TextImageData, currentSlideIndex);
                        }}
                        placeholder="Image URL"
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
            {slidesdata[currentSlideIndex]?.TextImageData?.TextImageOption.length < 4 && (
                <button onClick={handleAddOption} style={{boxShadow: '0px 0px 25px 0px #00000026',ciolor:'#9F9F9F', height: '1.875rem',width: '9.375rem',borderRadius: '.3rem',borderStyle: 'none',marginTop: '.625rem',marginLeft:'10px'}}>Add Option</button>
            )}
        </div>
    );
};

export default TextPlusImage;
