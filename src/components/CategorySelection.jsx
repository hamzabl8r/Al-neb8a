import CategoryCard from "./CategoryCard";

const categoryColors = {
  التاريخ: {
    color: "#CC552A",
    itemImage: "/his.png",
  },
  المطبخ: {
    color: "#7E96A4",
    itemImage: "/kit.png",
  },
  "أمثال شعبية": {
    color: "#4A2A69",
    itemImage: "/proverbes.png",
  },
  سينما: {
    color: "#C4B239",
    itemImage: "/ci.png",
  },
  رياضة: {
    color: "#C08497",
    itemImage: "sportt.png",
  },
  جغرافيا: {
    color: "#9F8170",
    itemImage: "/geo.png",
  },
  موسيقى: {
    color: "#1E7884",
    itemImage: "/g-clef.gif",
  },
  تلفزيون: {
    color: "#D9885A",
    itemImage: "/tvvv.png",
  },
};

const CategorySelection = () => {
  const img = "./logoo.png";
  return (
    <div className="Cat">
      <header className="app-header">
        <h1 className="logo-text"> النابغة</h1>
        <img src={img} alt="" className="img" />
      </header>
      <div className="category-grid">
        {Object.keys(categoryColors).map((categoryName) => (
          <CategoryCard
            key={categoryName}
            title={categoryName}
            backgroundColor={categoryColors[categoryName].color}
            itemImage={categoryColors[categoryName].itemImage}
            to={`/setup/${categoryName}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;