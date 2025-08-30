import { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import gameData from "./Data";
import "./QuizPage.css";

const QuizPage = () => {
  const { categoryTitle } = useParams();
  const location = useLocation();

  const { teamNames: initialTeamNames } = location.state || {};
  const teamNames =
    initialTeamNames && initialTeamNames.length > 0
      ? initialTeamNames.map((name, i) =>
          name.trim() === "" ? `فريق ${i + 1}` : name
        )
      : ["فريق 1"];

  const numberOfTeams = teamNames.length;

  const categoryData = gameData.find(
    (cat) => cat.category === decodeURIComponent(categoryTitle || "")
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [scores, setScores] = useState(new Array(numberOfTeams).fill(0));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!categoryData) {
    return (
      <div className="quiz-page-container">
        <div className="results-card">
          <h2>الصنف غير موجود</h2>
          <Link to="/" className="back-to-home-btn">
            القائمة الرئيسية{" "}
          </Link>
        </div>
      </div>
    );
  }

  const { questions } = categoryData;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

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
    const nextTeamIndex = (currentTeamIndex + 1) % numberOfTeams;
    setCurrentTeamIndex(nextTeamIndex);
    if (nextTeamIndex === 0) {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setShowResults(true);
      }
    }
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setCurrentTeamIndex(0);
    setScores(new Array(numberOfTeams).fill(0));
    setShowResults(false);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  if (showResults) {
    const maxScore = Math.max(...scores);
    const winners = scores
      .map((score, index) => (score === maxScore ? teamNames[index] : null))
      .filter((name) => name !== null);

    return (
      <div className="quiz-page-container">
        <div className="results-card final-results">
          <h2>🏆 اللعبة وفات، يعطيكم الصحة! 🏆</h2>{" "}
          <div className="team-final-scores">
            {scores.map((score, index) => (
              <div
                key={index}
                className={`team-score-item ${
                  winners.includes(teamNames[index]) ? "winner" : ""
                }`}>
                {teamNames[index]}: <strong>{score}</strong>
              </div>
            ))}
          </div>
          <p className="winner-announcement">الفائز: {winners.join(" و ")}</p>
          <button className="play-again-btn" onClick={handlePlayAgain}>
            نعاودو طرح آخر؟{" "}
          </button>
          <Link to="/" className="back-to-home-btn">
            القائمة الرئيسية{" "}
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
                disabled={isAnswered}>
                {choice}
              </button>
            );
          })}
        </div>
        {isAnswered && (
          <div className="quiz-footer">
            <button className="next-question-btn" onClick={handleNextQuestion}>
              {currentQuestionIndex === totalQuestions - 1 &&
              currentTeamIndex === numberOfTeams - 1
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
