import React from 'react';
import { useState } from 'react';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/course/quiz/ProgressBar';
import { QuizOption } from '../../../components/course/quiz/QuizOption';

const QuizPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean>(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const questions = [
    {
      question: 'smth',
      choices: ['1', '2', '3', '4'],
      correctAnswer: 1,
    },
  ];
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setShowAnswer(false);
    if (!selectedAnswer) {
      return;
    }
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion(prev => prev + 1);
    } else {
      setActiveQuestion(0);
      setEndQuiz(true);
    }
  };

  const onAnswerSelected = index => {
    setSelectedAnswerIndex(index);
    if (index === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const validateQuestion = () => {
    if (selectedAnswerIndex) {
      setShowAnswer(true);
    }
  };

  return (
    <div className='quiz-container'>
      {!endQuiz ? (
        <div>
          <div>
            <ProgressBar progress={activeQuestion / questions.length} />
          </div>
          <div className='flex flex-col'>
            <div className='flex'>
              <h2 className='w-4/5'>{question}</h2>
              <Button className='w-1/5' variant='green-outline' onClick={() => onClickNext()} disabled={!showAnswer && selectedAnswer}>
                {showAnswer && !selectedAnswer ? 'Redo Question' : 'Next Question'}
              </Button>
            </div>
            {choices.map((answer, index) => (
              <QuizOption
                onClick={() => onAnswerSelected(index)}
                key={answer}
                isCorrect={index == correctAnswer}
                isShow={showAnswer}
                isSelected={index == selectedAnswerIndex}
              >
                {answer}
              </QuizOption>
            ))}
          </div>
          <div className='flex-right'>
            <Button onClick={() => validateQuestion()} disabled={selectedAnswerIndex === null}>
              {'Submit'}
            </Button>
          </div>
        </div>
      ) : (
        <div className='result'>
          <h3>Congratulations!</h3>
          <div className='flex'>
            <p>To proceed to the next page, click &aposNext&apos</p>
            <Button variant='green-outline'>{'Next'}</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
