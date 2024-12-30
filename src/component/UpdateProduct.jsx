import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProductManager = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [""],
    categories: [],
    tags: [],
    variants: [],
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/products`, {
          params: { storeid: "676f82c37ea3d34df66c6bd0" },
        });
        const selectedProduct = data.find((item) => item._id === id);
        if (selectedProduct) {
          setProduct(selectedProduct);
          setFormData({
            name: selectedProduct.name,
            description: selectedProduct.description,
            price: selectedProduct.price,
            images: selectedProduct.images,
            categories: selectedProduct.categories,
            tags: selectedProduct.tags,
            variants: selectedProduct.variants,
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${apiUrl}api/products/${id}`, formData);
      alert("Product updated successfully!");
      setProduct(data);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${apiUrl}api/products/${id}`);
        alert("Product deleted successfully!");
        window.location.href = "/";
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Product Manager
      </h1>
      {product ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <input
              type="text"
              name="images"
              value={formData.images[0] || ""}
              onChange={(e) =>
                setFormData({ ...formData, images: [e.target.value] })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600"
            >
              Delete Product
            </button>
          </div>
        </form>
      ) : (
        <p className="text-center text-gray-500">Loading product...</p>
      )}
    </div>
  );
};

export default ProductManager;
