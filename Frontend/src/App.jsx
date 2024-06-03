import Regbody from './regbody';
import React from 'react';
import './index.css';
import SignUp from './signup';
import Login from './login';
import Sidebar from './sidebar';
import Homepage from './homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Analysis from './analysis';
import PrimaryModal from './primmodal';
import CreateQuiz from './createquiz';
import Text from './text';
import ImageUrl from './imageurl';
import TextPlusImage from './textplusimg';
import QuizLink from './quizlink';
import ScorePage from './scorepage';
import QuizExamPage from './quizexam';
import DeleteQuiz from './quizdelete';
import PollfinalPage from './pollfinalpage';
import EditQuiz from './editQuiz';

const App = () => {
    return(
      <>
      <main>
  <BrowserRouter>
  <Routes>
    <Route path ="/" element ={<Regbody/>}/>
    <Route path ="/signup" element ={<SignUp/>}/>
    <Route path ="/regbody" element ={<Regbody/>}/>
    <Route path ="/login" element ={<Login/>}/>
    <Route path ="/sidebar" element ={<Sidebar/>}/>
    <Route path ="/homepage" element ={<Homepage />}/>
    <Route path ="/analysis" element ={<Analysis/>}/>
    <Route path ="/primmodal" element ={<PrimaryModal/>}/>
    <Route path ="/createquiz" element ={<CreateQuiz/>}/>
    <Route path ="/text" element ={<Text/>}/>
    <Route path ="/imageurl" element ={<ImageUrl/>}/>
    <Route path ="/textplusimg" element ={<TextPlusImage/>}/>
    <Route path ="/quizlink" element ={<QuizLink/>}/>
    <Route path ="/scorepage" element ={<ScorePage/>}/>
    <Route path ="/attempt/:id" element ={<QuizExamPage/>}/>
    <Route path ="/quizdelete" element ={<DeleteQuiz/>}/>
    <Route path ="/pollfinalpage" element ={<PollfinalPage/>}/>
    <Route path ="/editquiz" element ={<EditQuiz/>}/>
    
    {/* <Switch>
        <Route path="/quizexam/:id" component={QuizExam} />
    </Switch> */}
    <Route path ="." element ={<h1>404 Route not found</h1>}/>
  </Routes> 
  </BrowserRouter>
  </main>
      </>
    );
}

export default App