import { useState, useEffect } from "react";
import Question from "./components/Question";
import Feedback from "./components/Feedback";
import FinalScore from "./components/FinalScore";
import Timer from "./components/Timer";
import questions from "./data/questions";
import "./App.css";

const TIMER_DURATION = 20;
const BONUS_POINTS_THRESHOLD = 10;

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [showHint, setShowHint] = useState(false);
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem("quizLeaderboard");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    let interval;
    if (!quizCompleted && !showFeedback) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            handleAnswer(-1);
            return TIMER_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentQuestion, quizCompleted, showFeedback]);

  const handleAnswer = (selectedOption) => {
    const correct = selectedOption === questions[currentQuestion].correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const timeBonus = timer > BONUS_POINTS_THRESHOLD ? 5 : 0;
      setScore((prev) => prev + 10 + timeBonus);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setShowHint(false);
      setTimer(TIMER_DURATION);

      if (currentQuestion === questions.length - 1) {
        setQuizCompleted(true);
        updateLeaderboard(score);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    }, 1500);
  };

  const updateLeaderboard = (finalScore) => {
    const newLeaderboard = [...leaderboard, finalScore]
      .sort((a, b) => b - a)
      .slice(0, 5);
    setLeaderboard(newLeaderboard);
    localStorage.setItem("quizLeaderboard", JSON.stringify(newLeaderboard));
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setQuizCompleted(false);
    setTimer(TIMER_DURATION);
    setShowHint(false);
  };

  const handleShare = () => {
    const text = `I scored ${score} points in the Quiz App!`;
    if (navigator.share) {
      navigator.share({
        title: "Quiz App Score",
        text: text,
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported on this browser");
    }
  };

  if (quizCompleted) {
    return (
      <FinalScore
        score={score}
        leaderboard={leaderboard}
        onRestart={handleRestart}
        onShare={handleShare}
      />
    );
  }

  return (
    <div className="quiz-container">
      <Timer timeLeft={timer} />
      <div className="score">Score: {score}</div>

      <Question
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        hint={questions[currentQuestion].hint}
        showHint={showHint}
        onShowHint={() => setShowHint(true)}
        onAnswer={handleAnswer}
        disabled={showFeedback}
      />

      {showFeedback && <Feedback isCorrect={isCorrect} />}
    </div>
  );
};

export default App;
