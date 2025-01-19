// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { X } from "lucide-react";

// const ProductManager = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     images: [],
//     categories: [],
//     tags: [],
//     variants: [],
//   });

//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [uploading, setUploading] = useState(false);

//   const handleImageUpload = async (e) => {
//     setUploading(true);
//     const files = Array.from(e.target.files);

//     try {
//       const uploadPromises = files.map(async (file) => {
//         const uploadFormData = new FormData();
//         uploadFormData.append("file", file);

//         const response = await fetch(`${apiUrl}/api/upload`, {
//           method: "POST",
//           body: uploadFormData,
//         });
//         const data = await response.json();
//         return data.fileUrl;
//       });

//       const newImageUrls = await Promise.all(uploadPromises);
//       setFormData((prev) => ({
//         ...prev,
//         images: [...prev.images, ...newImageUrls],
//       }));
//     } catch (error) {
//       console.error("Error uploading images:", error);
//       alert("Failed to upload one or more images. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleRemoveImage = (indexToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, index) => index !== indexToRemove),
//     }));
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get(`${apiUrl}/api/products`, {
//           params: { storeid: "676f82c37ea3d34df66c6bd0" },
//         });
//         const selectedProduct = data.find((item) => item._id === id);
//         if (selectedProduct) {
//           setProduct(selectedProduct);
//           setFormData({
//             name: selectedProduct.name,
//             description: selectedProduct.description,
//             price: selectedProduct.price,
//             images: selectedProduct.images,
//             categories: selectedProduct.categories,
//             tags: selectedProduct.tags,
//             variants: selectedProduct.variants,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put(
//         `${apiUrl}/api/products/${id}`,
//         formData
//       );
//       alert("Product updated successfully!");
//       setProduct(data);
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update the product. Please try again.");
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`${apiUrl}/api/products/${id}`);
//         alert("Product deleted successfully!");
//         window.location.href = "/";
//       } catch (error) {
//         console.error("Error deleting product:", error);
//         alert("Failed to delete the product. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//         Product Manager
//       </h1>
//       {product ? (
//         <form onSubmit={handleUpdate} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={4}
//               className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Price
//             </label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product Images
//             </label>
//             <input
//               type="file"
//               onChange={handleImageUpload}
//               className="w-full border rounded-lg p-2 mb-4"
//               multiple
//               accept="image/*"
//             />

//             {uploading && (
//               <div className="mb-4">
//                 <p className="text-blue-500">Uploading images...</p>
//               </div>
//             )}

//             {formData.images.length > 0 && (
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
//                 {formData.images.map((imageUrl, index) => (
//                   <div key={index} className="relative group">
//                     <img
//                       src={imageUrl}
//                       alt={`Product ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg border border-gray-200"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveImage(index)}
//                       className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                       aria-label="Remove image"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="flex justify-between pt-6">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition-colors"
//             >
//               Update Product
//             </button>
//             <button
//               type="button"
//               onClick={handleDelete}
//               className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition-colors"
//             >
//               Delete Product
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="flex items-center justify-center h-40">
//           <div className="animate-pulse text-gray-500">Loading product...</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductManager;
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";

const ProductManager = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    categories: [],
    tags: [],
    variants: [],
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const [uploading, setUploading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = async (e) => {
    setUploading(true);
    const files = Array.from(e.target.files);

    try {
      const uploadPromises = files.map(async (file) => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const response = await fetch(`${apiUrl}/api/upload`, {
          method: "POST",
          body: uploadFormData,
        });
        const data = await response.json();
        return data.fileUrl;
      });

      const newImageUrls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImageUrls],
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload one or more images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      categories: selectedOptions,
    }));
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== categoryToRemove),
    }));
  };

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
      const { data } = await axios.put(
        `${apiUrl}/api/products/${id}`,
        formData
      );
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
        await axios.delete(`${apiUrl}/api/products/${id}`);
        alert("Product deleted successfully!");
        window.location.href = "/";
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Product Manager
      </h1>
      {product ? (
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <select
              multiple
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
              onChange={handleCategoryChange}
              value={formData.categories}
            >
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mb-2">
              Hold Ctrl (Cmd on Mac) to select multiple categories
            </p>

            {formData.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full border rounded-lg p-2 mb-4"
              multiple
              accept="image/*"
            />

            {uploading && (
              <div className="mb-4">
                <p className="text-blue-500">Uploading images...</p>
              </div>
            )}

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {formData.images.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between pt-6 pb-8">  
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition-colors"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition-colors"
            >
              Delete Product
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-center h-40">
          <div className="animate-pulse text-gray-500">Loading product...</div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
