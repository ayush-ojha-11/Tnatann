const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Automobiles",
  "Sports & Outdoors",
  "Books",
  "Toys",
  "Real Estate",
  "Services",
];

const CategoryBar = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap p-2 flex gap-2 bg-base-200 rounded-md mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`btn btn-sm rounded-full ${
            activeCategory === category ? "btn-primary" : "btn-ghost"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
export default CategoryBar;
