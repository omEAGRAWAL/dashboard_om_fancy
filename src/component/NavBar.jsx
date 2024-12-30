
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";

const NavigationBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl hover:text-gray-400">
        <CiHome />
        
        </Link>
        <Link to="/product" className="text-xl hover:text-gray-400">
          Create Product
        </Link>
        <Link to="/category" className="text-xl hover:text-gray-400">
          Create Category
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
