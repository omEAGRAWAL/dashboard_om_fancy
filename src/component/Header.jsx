import { useState } from "react";
import { useNavigate } from "react-router-dom"; // To programmatically navigate

const apiUrl = import.meta.env.VITE_API_URL;
const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (searchQuery) {
      navigate(`/search?search=${searchQuery}`); // Redirect to the search results page with the query
    }
  };
  return (
    <header className="bg-gray-300   text-black text-bold p-2 flex justify-between items-center">
      <h1
        className="text-lg cursor-pointer"
        onClick={() => navigate("/")} // Redirect to the home page
      >
        Om Fancy
      </h1>

      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center space-x-2"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
          placeholder="Search products..."
          className="p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
