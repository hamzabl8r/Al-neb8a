import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./QuizPage.css";

const GameSetup = () => {
  const { categoryTitle } = useParams();
  const [teamCount, setTeamCount] = useState(2);
  const [teamNames, setTeamNames] = useState(["", ""]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTeamNames(new Array(teamCount).fill(""));
  }, [teamCount]);

  useEffect(() => {
    const allNamesFilled = teamNames.every((name) => name.trim() !== "");
    setIsReady(allNamesFilled);
  }, [teamNames]);

  const handleTeamCountChange = (change) => {
    setTeamCount((prev) => {
      const newCount = prev + change;
      return newCount >= 2 && newCount <= 4 ? newCount : prev;
    });
  };

  const handleTeamNameChange = (index, name) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = name;
    setTeamNames(newTeamNames);
  };

  return (
    <div className="quiz-page-container">
      <div className="results-card" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          إعدادات اللعبة
        </h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          الصنف: <strong>{decodeURIComponent(categoryTitle)}</strong>
        </p>
        {/* Number des equipes */}
        <div className="setup-section">
          <h3>1. اختر عدد الفرق</h3>
          <div className="team-count-selector">
            <button
              className="team-count-btn"
              onClick={() => handleTeamCountChange(-1)}
              disabled={teamCount <= 2}>
              -
            </button>
            <span className="team-count-display">{teamCount}</span>
            <button
              className="team-count-btn"
              onClick={() => handleTeamCountChange(1)}
              disabled={teamCount >= 4}>
              +
            </button>
          </div>
        </div>

        <div className="setup-section">
          <h3>2. أدخل أسماء الفرق</h3>
          <div className="team-name-inputs">
            {Array.from({ length: teamCount }).map((_, index) => (
              <input
                key={index}
                type="text"
                placeholder={`اسم الفريق ${index + 1}`}
                value={teamNames[index]}
                onChange={(e) => handleTeamNameChange(index, e.target.value)}
                className="team-name-input"
              />
            ))}
          </div>
        </div>

        <Link
          to={isReady ? `/gamestart/${categoryTitle}` : "#"}
          state={{ teamNames }}
          className={`play-again-btn ${!isReady ? "disabled" : ""}`}
          onClick={(e) => !isReady && e.preventDefault()}>
          هيا نبداو{" "}
        </Link>
      </div>
    </div>
  );
};

export default GameSetup;
