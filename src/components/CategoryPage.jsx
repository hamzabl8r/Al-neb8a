import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import gameData from "./Data";
import "./QuizPage.css";

const QuizPage = () => {
  const { categoryTitle } = useParams();
  const location = useLocation();
  const [turn, setTurn] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const { teamNames: initialTeamNames } = location.state || {};
  const teamNames =
    initialTeamNames && initialTeamNames.length > 0
      ? initialTeamNames.map((name, i) =>
          name.trim() === "" ? `فريق ${i + 1}` : name
        )
      : ["فريق 1"];

  const numberOfTeams = teamNames.length;
  const [scores, setScores] = useState(new Array(numberOfTeams).fill(0));

  useEffect(() => {
    if (isAnswered) return;
    if (timer <= 0) {
      setIsAnswered(true);
      return;
    }
    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer, isAnswered]);

  const categoryData = gameData.find(
    (cat) => cat.category === decodeURIComponent(categoryTitle || "")
  );

  if (!categoryData) {
    return (
      <div className="quiz-page-container">
        <div className="results-card">
          <h2>الصنف غير موجود</h2>
          <Link to="/" className="back-to-home-btn">
            القائمة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const { questions } = categoryData;
  const totalQuestions = questions.length;

  const currentTeamIndex = turn % numberOfTeams;
  const currentQuestionIndex = turn; 
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion && !showResults) {
    setShowResults(true);
  }

  const handleAnswerClick = (choice) => {
    if (isAnswered) return;
    setSelectedAnswer(choice);
    setIsAnswered(true);
    if (choice === currentQuestion.answer) {
      const newScores = [...scores];
      newScores[currentTeamIndex] += 1;
      setScores(newScores);
    }
  };

  const handleNextQuestion = () => {
    if (turn + 1 >= totalQuestions) {
      setShowResults(true);
    } else {
      setTurn((prevTurn) => prevTurn + 1);
    }

    setIsAnswered(false);
    setSelectedAnswer(null);
    setTimer(15);
  };

  const handlePlayAgain = () => {
    setTurn(0); 
    setScores(new Array(numberOfTeams).fill(0));
    setShowResults(false);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setTimer(15);
  };
  
  if (showResults || !currentQuestion) {
    const maxScore = Math.max(...scores);
    const winners = scores
      .map((score, index) => (score === maxScore ? teamNames[index] : null))
      .filter((name) => name !== null);

    return (
      <div className="quiz-page-container">
        <div className="results-card final-results">
          <h2>🏆 اللعبة وفات، يعطيكم الصحة! 🏆</h2>
          <div className="team-final-scores">
            {scores.map((score, index) => (
              <div
                key={index}
                className={`team-score-item ${
                  winners.includes(teamNames[index]) ? "winner" : ""
                }`}
              >
                {teamNames[index]}: <strong>{score}</strong>
              </div>
            ))}
          </div>
          <p className="winner-announcement">الفائز: {winners.join(" و ")}</p>
          <button className="play-again-btn" onClick={handlePlayAgain}>
            نعاودو طرح آخر؟
          </button>
          <Link to="/" className="back-to-home-btn">
            القائمة الرئيسية
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="quiz-page-container">
      <div className="quiz-card">
        <div className="quiz-header">
          <h2 className="turn-indicator">
            الدور على: {teamNames[currentTeamIndex]}
          </h2>
          <div className="timer">⏳ الوقت: {timer}</div>
          <div className="team-scores-container">
            {scores.map((score, index) => (
              <span key={index} className="team-score">
                {teamNames[index]}: <strong>{score}</strong>
              </span>
            ))}
          </div>
        </div>
        <div className="question-section">
          <p className="question-text">{currentQuestion.question}</p>
        </div>
        <div className="choices-container">
          {currentQuestion.choices.map((choice, index) => {
            let buttonClass = "choice-btn";
            if (isAnswered) {
              if (choice === currentQuestion.answer) buttonClass += " correct";
              else if (choice === selectedAnswer) buttonClass += " incorrect";
            }
            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswerClick(choice)}
                disabled={isAnswered}
              >
                {choice}
              </button>
            );
          })}
        </div>
        {isAnswered && (
          <div className="quiz-footer">
            <button className="next-question-btn" onClick={handleNextQuestion}>
              {turn === totalQuestions - 1
                ? "عرض النتيجة"
                : "الدور التالي"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;