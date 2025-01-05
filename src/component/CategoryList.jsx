import { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
import { Link } from "react-router-dom";

function CategoryList() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch(apiUrl + "/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);

  return (
    <div>
      {category.map((category) => (
        <div
          key={category._id}
          className="border rounded-lg shadow-md p-4 relative bg-gray-400"
        >
          <Link to={`/update/category/${category._id}`}>
            <div>
              <img
                src={category.Image}
                alt={category.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-4">{category.name}</h3>
              <p className="text-gray-500 text-sm">{category.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
