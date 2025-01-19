import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function CategoryList() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl + "/api/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => {
        setCategory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error loading categories</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-11">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Categories
      </h1>

      {category.length === 0 ? (
        <div className="text-center text-gray-500">No categories available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.map((category) => (
            <Link
              to={`/update/category/${category._id}`}
              key={category._id}
              className="block group"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={category.Image}
                      alt={category.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/300";
                        e.target.alt = "Category image placeholder";
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>

                  {category.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryList;
