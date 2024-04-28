import { useEffect, useState } from 'react'
import questionsData from "./question.json";
import './App.css'

function App() {
  const [currentQues, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
   const handleAnswerClick = (selectedOption) => {
    if(selectedOption === questionsData[currentQues].correctOption){
      setScore((prevScore)=>prevScore +1);
    }
    if (currentQues < questionsData.length -1){
      setCurrentQuestion((preQuestion)=>
      preQuestion + 1);
      setTimer(10);
    }
    else{
      setShowScore(true);
    }
   }


   useEffect(()=>{
    let interval;
    if(timer>0 && !showScore){
      interval=setInterval(()=>{
        setTimer((prevTimer)=> prevTimer - 1);
      },1000);
    } else{
      clearInterval(interval);
      setShowScore(true);
    }
    return ()=> clearInterval(interval);
   },[timer,showScore]);
   const handleRestartQuiz =()=>{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
   };
  return (
    <>
      <div className="quiz-app">
       {showScore ? (<div className="score-section" >
              <h3>your score:{score}/{questionsData.length}</h3>
              <button onClick={handleRestartQuiz}>Restart</button>
        </div> ): (<div className='question-section'>
          <h2>Question {currentQues + 1}</h2>
          <p>{questionsData[currentQues].question}</p>
          <div className='options'>
          {questionsData[currentQues].options.map((option,index) => (
            <button key={index} onClick={()=>handleAnswerClick(option)}>{option}</button>
          ))}
          </div>
          <div className='timer'>
              Timer Left:<span>{timer}s</span>
          </div>
        </div>)}
        
        
      </div>
    </>
  );
}

export default App
