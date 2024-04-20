import quizComplete from '../assets/quiz-complete.png';

import QUESTIONS from '../data/questions';

const Summary = ({ answers }) => {
  const skippedAnswers = answers.filter((answer) => answer == null);
  const correctAnswers = answers.filter(
    (answer, index) => answer == QUESTIONS[index].answers[0]
  );
  const incorrectAnswers = answers.filter(
    (answer, index) => answer != QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / answers.length) * 100
  );

  const correctAnswersShare = Math.round(
    (correctAnswers.length / answers.length) * 100
  );

  const incorrectAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizComplete} alt="Trophy icon " />
      <h2>Quiz Completed</h2>

      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">Answered Correct</span>
        </p>
        <p>
          <span className="number">{incorrectAnswersShare}%</span>
          <span className="text">Answered incorrectly</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, index) => {
          let cssClass = 'user-answer ';
          if (answer === null) {
            cssClass += 'skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += 'correct';
          } else {
            cssClass += 'wrong';
          }

          return (
            <li key={answer}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
