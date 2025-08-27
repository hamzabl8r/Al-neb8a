import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gameData from './Data'; 

const CategoryPage = () => {
  const { categoryTitle } = useParams();
  const [answers, setAnswers] = useState({});

  const categoryData = gameData.find(
    (cat) => cat.category === decodeURIComponent(categoryTitle || '')
  );
console.log(categoryData.questions)
};

export default CategoryPage;