
import React,{useState} from "react";
import { FaCheck } from 'react-icons/fa';

const QuizLink = ({createdQuizID,closeQuiz}) => {
    const [showshare, setShowshare] = useState(false);
    const quizLink = `${import.meta.env.VITE_REACT_URL}/attempt/${createdQuizID}`;

    const toggleDiv = () => {
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
        closeQuiz();
      };

    return(
        <>
        <div style={{display:'flex', flexDirection:'column',height:'18rem',width:'31.25rem',background:'white',borderRadius:'.9375rem',borderStyle:'none',margin:'auto',marginTop:'10%',boxShadow: '0px 0px 25px 0px #00000026'}}>
          <div style={{marginLeft:'95%',marginTop:'10px',cursor:'pointer'}} onClick={handleClose}>X</div>
        {showshare && (
            <div style={{height:'2.5rem',width:'12.5rem',background:'white',display:'flex',flexDirection:'row',marginLeft:'60%',marginTop:'.3125rem'}}>
                <div style={{ backgroundColor: 'green',borderRadius: '50%',width: '1.25rem',height: '1.25rem',display: 'flex',alignItems: 'center',justifyContent: 'center',marginTop:'1.25rem'}}>
                 <FaCheck style={{  color: 'white',fontSize: '.875rem'}} /></div>
                <div style={{marginTop:'1.25rem',marginLeft:'.3125rem',ciolor:'#9F9F9F'}}>link copied to clipboard</div> 
                <div style={{marginLeft:'.3125rem',cursor:'pointer'}} onClick={handleClose}>x</div>
            </div>
            )}
            <div style={{marginLeft:'1.25rem',marginTop:'1.25rem'}}>
                <h1 style={{ciolor:'#9F9F9F'}}>Congrats your quiz is published</h1>
            </div>
            <div style={{height:'2.5rem',width:'25rem',display:'flex',borderRadius:'.75rem',borderStyle:'none',background:'#EDEDED',marginLeft:'2.5rem',marginTop:'1.25rem'}}>
                 <p>{quizLink}</p>
            </div>
           <div><button type="submit" style={{height:'2.5rem',width:'12.5rem',background:'#60B84B',borderRadius:'.75rem',borderStyle:'none',color:'white',marginLeft:'30%',marginTop:'2.5rem',fontSize:'18px',paddingLeft:'78px'}} onClick={toggleDiv}>Share</button></div>
        </div>
        </>
    );
}

export default QuizLink; 