import PropTypes from "prop-types";

const FinalScore = ({ score, leaderboard, onRestart, onShare }) => {
  return (
    <div className="final-score">
      <h2>Quiz Completed!</h2>
      <p className="score-text">Your final score: {score}</p>

      <div className="leaderboard">
        <h3>Top Scores</h3>
        {leaderboard.map((score, index) => (
          <div key={index} className="leaderboard-item">
            #{index + 1}: {score} points
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button
          onClick={onShare}
          className="share-button"
          aria-label="Share score"
        >
          Share Score
        </button>
        <button
          onClick={onRestart}
          className="restart-button"
          aria-label="Restart quiz"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

FinalScore.propTypes = {
  score: PropTypes.number.isRequired,
  leaderboard: PropTypes.arrayOf(PropTypes.number).isRequired,
  onRestart: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
};

export default FinalScore;
