import CategoryPage from "./components/CategoryPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import GameStart from "./components/GameStart";
import CategorySelection from "./components/CategorySelection";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CategorySelection />} />
        <Route path="/gamestart" element={<GameStart />} />
        
        <Route path="/category/:categoryTitle" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default App;
