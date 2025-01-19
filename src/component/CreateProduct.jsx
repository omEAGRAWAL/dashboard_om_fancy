import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import NavigationBar from "./NavBar";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CreateProduct() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      categories: [],
    },
  });

  const [category, setCategory] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);

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

  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl((prevImageUrls) => [...prevImageUrls, data.fileUrl]);
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setImageUrl((prevUrls) =>
      prevUrls.filter((_, index) => index !== indexToRemove)
    );
  };

  const onSubmit = async (data) => {
    if (imageUrl.length === 0) {
      alert("Please upload at least one image before submitting.");
      return;
    }

    const selectedCategories = Array.isArray(data.categories)
      ? data.categories
      : [data.categories];

    const productData = {
      storeId: "676f82c37ea3d34df66c6bd0",
      name: data.name,
      description: data.description,
      price: data.price,
      images: imageUrl,
      categories: selectedCategories,
    };

    try {
      const response = await fetch(apiUrl + "/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product created successfully!");
        reset();
        setImageUrl([]);
      } else {
        const errorData = await response.json();
        alert(`Failed to create product: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mb-36">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-8 bg-gray-100 shadow-md rounded-lg mb-10"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Create Product
        </h2>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            id="name"
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register("price", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="categories"
          >
            Categories
          </label>
          <select
            id="categories"
            {...register("categories", { required: true })}
            multiple
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {category.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Hold Ctrl (or Cmd on Mac) to select multiple categories.
          </p>
        </div>

        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="image"
          >
            Product Images
          </label>
          <input
            type="file"
            id="file"
            multiple
            onChange={(e) => {
              Array.from(e.target.files).forEach((file) => uploadImage(file));
            }}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
          {uploading && (
            <p className="mt-2 text-sm text-blue-500">Uploading image...</p>
          )}
          {imageUrl.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">
                Uploaded Images:
              </p>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {imageUrl.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X size={16} />
                    </button>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-xs text-blue-500 hover:text-blue-700 block text-center"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Product
        </button>
      </form>

      <NavigationBar />
    </div>
  );
}
