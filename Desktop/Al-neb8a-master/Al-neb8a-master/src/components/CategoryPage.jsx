import { useState } from "react";
import { useParams, Link, Route, Routes } from "react-router-dom";
import gameData from "./Data";
import GameStart from "./GameStart";

const CategoryPage = () => {
  const { categoryTitle } = useParams();
  const [answers, setAnswers] = useState({});

  const categoryData = gameData.find(
    (cat) => cat.category === decodeURIComponent(categoryTitle || "")
  );
  console.log(categoryData.questions);
  return (
    <div className="game">
      <Routes>
        <Route element={<GameStart />}/>
      </Routes>
    </div>
  );
};

export default CategoryPage;
