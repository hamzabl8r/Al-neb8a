import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategorySelection from "./components/CategorySelection";
import GameSetup from "./components/GameSetup";
import QuizPage from "./components/CategoryPage";
import "./App.css";


function App() {
  return (<div className="App">
      <Routes>
        <Route path="/" element={<CategorySelection />} />
        <Route path="/setup/:categoryTitle" element={<GameSetup />} />
        <Route path="/gamestart/:categoryTitle" element={<QuizPage />} />
      </Routes>
      </div>
  );
}

export default App;
