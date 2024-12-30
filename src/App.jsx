import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateProduct from "./component/CreateProduct";
import CreateCategory from "./component/CreateCategory";
import UpdateProduct from "./component/UpdateProduct";
import ProductList from "./component/ProductList";
import SearchProduct from "./component/SearchProduct";
import Header from "./component/Header";
import NavigationBar from "./component/NavBar";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <h1>Om Fancy</h1> */}
        <Header />
        <Routes>
          <Route path="/product" element={<CreateProduct />} />
          <Route path="/category" element={<CreateCategory />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/" element={<ProductList />} />
          {/* Search route without the '?' in the path */}
          <Route path="/search" element={<SearchProduct />} />
        </Routes>
        <NavigationBar />
      </div>
    </Router>
  );
}

export default App;
