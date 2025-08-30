import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategorySelection from "./components/CategorySelection";
import GameSetup from "./components/GameSetup";
import QuizPage from "./components/CategoryPage";
import "./App.css";


function App() {
  return (<>
      <Routes>
        <Route path="/" element={<CategorySelection />} />
        <Route path="/setup/:categoryTitle" element={<GameSetup />} />
        <Route path="/gamestart/:categoryTitle" element={<QuizPage />} />
      </Routes>
      </>
  );
}

export default App;
