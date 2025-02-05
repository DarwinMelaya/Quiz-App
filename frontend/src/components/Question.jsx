import PropTypes from "prop-types";

const Question = ({
  question,
  options,
  hint,
  showHint,
  onShowHint,
  onAnswer,
  disabled,
}) => {
  return (
    <div className="question-container">
      <h2>{question}</h2>

      {showHint ? (
        <div className="hint" role="alert">
          {hint}
        </div>
      ) : (
        <button
          onClick={onShowHint}
          className="hint-button"
          aria-label="Show hint"
        >
          Show Hint
        </button>
      )}

      <div className="options-grid">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            disabled={disabled}
            className="option-button"
            aria-label={option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  hint: PropTypes.string.isRequired,
  showHint: PropTypes.bool.isRequired,
  onShowHint: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Question;
