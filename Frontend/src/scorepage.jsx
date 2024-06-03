import React from 'react';
import { useLocation } from 'react-router-dom';

const ScorePage = () => {
    const location = useLocation();
    const { quizData, totalCount } = location.state || {};
    const totalslides = quizData.slides.length;

    return (
        <div style={{ height: '100vh', width: '100vw', background: '#041325', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ height: '25rem', width: '31.25rem', borderRadius: '.5rem', borderStyle: 'none', display: 'flex', flexDirection: 'column', background: 'white', padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.875rem', color: '#474444', marginBottom: '1rem' }}>Congrats, the quiz is completed</div>
                <img src="trophyimg.png" style={{ height: '18.75rem', width: '18.75rem', margin: 'auto' }} alt="Trophy" />
                <div style={{ fontSize: '1.875rem', color: '#474444', marginTop: '2rem' }}>Your Score is <span style={{ fontSize: '1.875rem', color: '#60B84B', fontWeight: 'bold' }}>{`${totalCount}/${totalslides}`}</span></div>
            </div>
        </div>
    );
}

export default ScorePage;
