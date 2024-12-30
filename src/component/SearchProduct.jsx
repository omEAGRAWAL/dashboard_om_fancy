import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation to get URL parameters

const apiUrl = import.meta.env.VITE_API_URL;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation(); // Get the location object to access the URL

  // Get search query parameter from the URL
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    // Fetching the products
    fetch(apiUrl + "/api/products/?storeid=676f82c37ea3d34df66c6bd0")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    // Filter products when the searchQuery changes
    if (searchQuery) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // If no search query, show all products
    }
  }, [searchQuery, products]);

  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            to={`update/${product._id}`} // Use `to` for navigation
            key={product._id}
            className="border rounded-lg shadow-md p-4 relative bg-gray-400"
          >
            <div>
              {product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              )}
              <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <div className="flex items-center mt-2">
                <span className="text-xl font-bold text-green-600">
                  ${product.price * 0.8}
                </span>
                <span className="text-sm line-through text-gray-400 ml-2">
                  ${product.price}
                </span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
