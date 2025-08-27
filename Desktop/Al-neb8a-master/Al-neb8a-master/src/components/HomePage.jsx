import React from 'react';
import gameData from './Data'; 
import '../App.css'; 

import CategoryCard from './CategoryCard';

const cardColors = [
  '#C94A3A', '#7E9DAF', '#4A3A54', '#B9A133', '#C5889B',
  '#6F8349', '#A88D7A', '#3A8F9B', '#D4865F'
];

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="app-header">
        <h1 className="logo-text">🇹🇳 Tunisian Quiz Game</h1>
      </header>
      <main>
        <div className="category-grid">
          {gameData.map((category, index) => (
            <CategoryCard
              key={category.category}
              title={category.category}
              backgroundColor={cardColors[index % cardColors.length]}
              to={`/category/${encodeURIComponent(category.category)}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;