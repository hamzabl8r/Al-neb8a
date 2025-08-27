import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import gameData from './Data'; 

const categoryColors = {
  "التاريخ": "#CC552A",
  "المطبخ": "#7E96A4",
  "أمثال شعبية": "#4A2A69",
  "سينما": "#C4B239",
  "رياضة": "#C08497",
  "شخصيات معروفة": "#71834F",
  "جغرافيا": "#9F8170",
  "موسيقى": "#1E7884",
  "تلفزيون": "#D9885A", 
};

const CategoryGrid = () => {

  return (
    <div className="category-grid">
      {gameData.map((cat, index) => ( 
        <Link
          key={index}
          to={`/category/${encodeURIComponent(cat.category)}`}
          
        >
          <CategoryCard
            backgroundColor={categoryColors[cat.category] || '#CCC'} 
            title={cat.category}
            image={null} 
          />
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;