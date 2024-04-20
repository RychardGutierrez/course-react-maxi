import { useRef } from 'react';

const Answers = ({ answers, selectedAnswer, answerState, onSelectAnswer }) => {
  const shufflerAnswers = useRef();

  if (!shufflerAnswers.current) {
    shufflerAnswers.current = [...answers];
    shufflerAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shufflerAnswers.current.map((answer, index) => {
        const isSelected = selectedAnswer === answer;

        let cssClasses = '';

        if (answerState === 'answered' && isSelected) {
          cssClasses = 'selected';
        }

        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
          cssClasses = answerState;
        }

        return (
          <li key={index} className="answer">
            <button
              onClick={() => onSelectAnswer(answer)}
              className={cssClasses}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
