import PropTypes from "prop-types";

const Timer = ({ timeLeft }) => {
  return (
    <div
      className="timer"
      role="timer"
      aria-label={`${timeLeft} seconds remaining`}
    >
      Time remaining: {timeLeft}s
    </div>
  );
};

Timer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
};

export default Timer;
