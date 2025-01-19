import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";

const NavigationBar = () => {
  return (
    //fixed bottom-0 left-0 w-full bg-gray-800 text-white p-2"
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white shadow-md z-50 mt-10">
      <div className="flex justify-around items-center ">
        {/* Home Link */}
        <Link
          to="/"
          className="flex flex-col items-center text-lg hover:text-gray-400"
        >
          {/* <CiHome className="text-2xl mb-1" /> */}
          <span className="text-2xl mb-1">🏚</span>
          <span className="text-sm">Home</span>
        </Link>

        {/* Create Product Link */}
        <Link
          to="/product"
          className="flex flex-col items-center text-lg hover:text-gray-400"
        >
          <span className="text-2xl mb-1">📦</span>
          <span className="text-sm">Create Product</span>
        </Link>

        {/* Create Category Link */}
        <Link
          to="/category"
          className="flex flex-col items-center text-lg hover:text-gray-400"
        >
          <span className="text-2xl mb-1">📂</span>
          <span className="text-sm">Create Category</span>
        </Link>

        {/* Category List Link */}
        <Link
          to="/categorylist"
          className="flex flex-col items-center text-lg hover:text-gray-400"
        >
          <span className="text-2xl mb-1">📋</span>
          <span className="text-sm">Category List</span>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
