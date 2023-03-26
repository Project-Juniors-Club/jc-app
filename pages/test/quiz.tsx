import React from 'react';
import { useState } from 'react';
import Button from '../../components/Button';
import ProgressBar from '../../components/course/quiz/ProgressBar';
import { QuizOption } from '../../components/course/quiz/QuizOption';

const QuizPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean>(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const questions = [
    {
      question: 'smth',
      choices: [
        "1orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        '2',
        '3',
        '4',
      ],
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
      console.log('yo mam');
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
    if (selectedAnswerIndex != null) {
      setShowAnswer(true);
      setSelectedAnswer(false);
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
            <div className='m-2 flex  w-10/12 p-2'>
              <h2 className='w-10/12 '>{question}</h2>
              <Button className='w-2/12' variant='green-outline' onClick={() => onClickNext()} disabled={!showAnswer && selectedAnswer}>
                {showAnswer && selectedAnswer ? 'Redo Question' : 'Next Question'}
              </Button>
            </div>
            {choices.map((answer, index) => (
              <QuizOption
                onClick={() => onAnswerSelected(index)}
                key={answer}
                isCorrect={index == correctAnswer}
                isShow={showAnswer}
                name={String(activeQuestion)}
                currentSelected={selectedAnswerIndex}
                index={index}
                setSelected={setSelectedAnswerIndex}
              >
                {answer}
              </QuizOption>
            ))}
          </div>
          <div className='flex flex-row-reverse justify-items-end'>
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
