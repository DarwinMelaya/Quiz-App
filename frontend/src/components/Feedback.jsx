import PropTypes from "prop-types";

const Feedback = ({ isCorrect }) => {
  return (
    <div
      className={`feedback ${isCorrect ? "correct" : "incorrect"}`}
      role="alert"
      aria-live="polite"
    >
      {isCorrect ? "Correct!" : "Incorrect!"}
    </div>
  );
};

Feedback.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
};

export default Feedback;
