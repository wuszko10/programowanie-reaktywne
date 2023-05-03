import React, {useState} from "react";

import questions from '../questions.json';
import Question from "./question";
import Answers from "./answers";
import Results from "./results";
import Actions from "./actions";

const styles ={
    display: 'flex',
    justifyContent: 'center'
};

const QuizComponent = (props) => {

    const [currentIndex, setIndex] = useState(0);
    const [currentQuestion, setQuestion] = useState(questions[currentIndex]);
    const [currentPoints, setPoints] = useState(0);
    const [allowToChoose, changePermission] = useState(true);
    const [markedAnswer, markAnswer] = useState({key:-1, variant: ''});

    const handleNextQuestion = () => {
        const nextValue = currentIndex+1;
        if (nextValue > questions.length-1) {
            setIndex(questions.length-1);
            return;
        }

        setIndex(nextValue);
        setQuestion(questions[nextValue]);
        changePermission(true);
        markAnswer({key:-1, variant: ''});
    };

    const handlePrevQuestion = () => {
        const prevValue = currentIndex -1;

        if (prevValue < 0) {
            setIndex(0);
            return;
        }

        setIndex(prevValue);
        setQuestion(questions[prevValue]);
        changePermission(true);
        markAnswer({key: -1, variant: ''});
    };

    const handleCheckAnswer = (chosenOption, key) => {
        if (!allowToChoose){
            return;
        }

        if (currentQuestion.correct_answer === chosenOption) {
            const points = currentPoints+1;
            setPoints(points);
            changePermission(false);
            markAnswer({key, variant: 'bg-success'})
        } else {
            changePermission(false);
            markAnswer({key, variant: 'bg-danger'})
        }
    };

    return (
        <div style={styles}>
            <div className="container">
                <Question
                    className="col-12"
                    currentQuestion={currentQuestion.question}
                    currentIndex={currentIndex + 1}
                    allQuestions={questions.length}/>
                
                <Answers 
                    className="col-12" 
                    checkAnswer={handleCheckAnswer} 
                    currentAnswers={currentQuestion.answers} 
                    markedAnswer={markedAnswer}/>
                
                <Results 
                    points={currentPoints}/>
                
                <Actions 
                    disablePrev={currentIndex>0}
                    disableNext={currentIndex !== questions.length-1}
                    prev={handlePrevQuestion} 
                    next={handleNextQuestion}/>
            </div>
        </div>
        
    )

};

export default QuizComponent;