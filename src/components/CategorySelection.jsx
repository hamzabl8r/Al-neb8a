import CategoryCard from "./CategoryCard"; 

const categoryColors = {
  "التاريخ": "#CC552A",
  "المطبخ": "#7E96A4",
  "أمثال شعبية": "#4A2A69",
  "سينما": "#C4B239",
  "رياضة": "#C08497",
  "جغرافيا": "#9F8170",
  "موسيقى": "#1E7884",
  "تلفزيون": "#D9885A",
};

const CategorySelection = () => {
  return (
    <div className="Cat">
    <header className="app-header">
        <h1 className="logo-text">Quiz 🧠 النابغة</h1>
      </header>
      <div className="category-grid">
        {Object.keys(categoryColors).map((categoryName) => (
          <CategoryCard
            key={categoryName}
            title={categoryName}
            backgroundColor={categoryColors[categoryName]}
            to={`/setup/${categoryName}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;

