import React, { useState, useEffect } from 'react';
import AuthDashboard from './authdashboard';
import AuthDashboardDetailed from './authdashboarddetailed';
import { FiEye } from 'react-icons/fi';

const Homepage = () => {
  const [dashboard, setdashboard] = useState({
    count_quiz: "-",
    count_impressions: "-",
    count_questions: "-"
  });
  const [dashboardDetailed, setdashboardDetailed] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
        try {
            const data = await AuthDashboard();
            setdashboard(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const fetchDetailedSummary = async () => {
      try {
          const data = await AuthDashboardDetailed();
          setdashboardDetailed(data);
      } catch (error) {
          console.error('Error fetching dashboard data:', error);
      }
  };

    fetchSummary();
    fetchDetailedSummary();

}, []); 

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
};

// Function to split the detailed data into chunks of three
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

  return (
    <>
      <div style={{ height: '100vh', width: '100vw', background: '#EDEDED', display: 'flex', flexDirection: 'column',overflowY:'hidden'}}>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%', marginLeft: '6%' }}>
          <div style={{ height: '6rem', width: '12rem', color: '#FF5D01', fontSize: '1.25rem', fontWeight: 'bold', background: 'white', marginLeft: '5%', textAlign: 'center', paddingTop: '0.2rem', borderRadius: '.625rem',display:'flex',flexDirection:'row' }}>
            <div style={{marginLeft:'40px',fontSize:'50px'}}>{dashboard.count_quiz}</div><div style={{marginLeft:'20px',fontSize:'30px',marginTop:'8px'}}>Quiz</div><br/> <p style={{position:'absolute',marginLeft:'37px',marginTop:'50px',fontSize:'30px'}}>created</p></div>

            <div style={{ height: '6rem', width: '12rem', color: '#60B84B', fontSize: '1.25rem', fontWeight: 'bold', background: 'white', marginLeft: '5%', textAlign: 'center', paddingTop: '0.5rem', borderRadius: '.625rem',display:'flex',flexDirection:'row' }}>
            <div style={{marginLeft:'20px',fontSize:'50px'}}>{dashboard.count_questions}</div><div style={{marginLeft:'10px',fontSize:'30px',marginTop:'5px'}}>Question</div><br/> <p style={{position:'absolute',marginLeft:'23px',marginTop:'50px',fontSize:'30px'}}>created</p></div>
          
            <div style={{ height: '6rem', width: '12rem', color: '#5076FF', fontSize: '1.25rem', fontWeight: 'bold', background: 'white', marginLeft: '5%', textAlign: 'center', paddingTop: '0.5rem', borderRadius: '.625rem',display:'flex',flexDirection:'row' }}>
            <div style={{marginLeft:'10px',fontSize:'50px'}}>{dashboard.count_impressions}</div><div style={{marginLeft:'20px',fontSize:'30px',marginTop:'8px'}}>Total</div><br/> <p style={{position:'absolute',marginLeft:'18px',marginTop:'50px',fontSize:'30px'}}>Impressions</p></div>

        </div>
        <div style={{ fontSize: '1.875rem', fontWeight: 'bold', marginTop: '2rem', marginLeft: '11%' }}>Trending Quizzes</div>

        {dashboardDetailed && chunkArray(dashboardDetailed, 4).map((chunk, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'row',marginLeft:'10%', marginTop: '1.5rem' }}>
            {chunk.map(item => (
              <div key={item._id} style={{ height: '5rem', width: '11rem', background: 'white', display: 'flex',alignItems: 'center', margin: '0 1rem', borderRadius: '.625rem' }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '8rem', textAlign: 'center',marginBottom:'30px',marginLeft:'10px' }}>
                  {item.title.length > 7 ? `${item.title.slice(0, 7)}...` : item.title}
                </div>
                <div style={{ color: '#FF5D01',marginLeft:'30px',marginBottom:'30px'}}> {item.impressions} <FiEye style={{ color: '#FF5D01' }} /></div>
                <p style={{ color: '#60B84B',position:'absolute',marginTop:'75px',marginLeft:'5px'}}>Created on: {formatDate(item.createdAt)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Homepage;
