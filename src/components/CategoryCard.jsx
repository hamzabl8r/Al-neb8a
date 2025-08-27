import { Link } from "react-router-dom";

const CategoryCard = ({ backgroundColor, title, image, to }) => {
  const cardStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <Link to={to} className="category-link">
      <div className="category-card" style={cardStyle}>
        {/* {image && <img src={image} alt={title} className="category-image" />} */}
        <p className="category-title">{title}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;