import { useState, useCallback } from 'react';
import QUESTIONS from '../data/questions';

import Question from './Question';
import Summary from './Summary';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState('');

  const activeQuestionIndex = userAnswers.length;

  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (answer) => {
      setAnswerState('answered');
      setUserAnswers([...userAnswers, answer]);

      setTimeout(() => {
        if (userAnswers === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }

        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex, userAnswers]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsCompleted) {
    return <Summary answers={userAnswers} />;
  }

  return (
    <Question
      key={activeQuestionIndex}
      index={activeQuestionIndex}
      onSelectAnswer={handleSelectAnswer}
      onSkipAnswer={handleSkipAnswer}
    />
  );
};

export default Quiz;
