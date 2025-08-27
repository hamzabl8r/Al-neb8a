import React from "react";
import CategoryGrid from "./components/CategoryGrid";
import CategoryPage from "./components/CategoryPage";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import GameStart from "./components/GameStart";

const App = () => {
  return (
    <div>
      
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryTitle" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default App;
