import { useState } from "react";
import { useForm } from "react-hook-form";
import NavigationBar from "./NavBar";

const apiUrl = import.meta.env.VITE_API_URL;
export default function CreateProduct() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
    },
  });

  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(apiUrl + "/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.fileUrl); // Assuming the API response contains the image URL
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      alert("Please upload an image before submitting.");
      return;
    }

    const productData = {
      storeId: "676f82c37ea3d34df66c6bd0", // Static storeId as per the required format
      name: data.name,
      description: data.description,
      price: data.price,
      images: imageUrl, // Use the uploaded image URL
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
        reset(); // Reset the form
        setImageUrl(""); // Clear the uploaded image
      } else {
        const errorData = await response.json();
        alert(`Failed to create product: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-8 bg-blue-700 shadow-md rounded"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Create Product</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="name">
            Product Name
          </label>
          <input
            id="name"
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register("price", { required: true })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="w-full px-4 py-2 border rounded-lg"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="image">
            Product Image
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => uploadImage(e.target.files[0])}
            className="w-full px-4 py-2 border  rounded-lg"
            accept="image/*"
          />
          {uploading && (
            <p className="mt-2 text-sm text-blue-500">Uploading image...</p>
          )}
          {imageUrl && (
            <>
              <p className="mt-2 text-sm text-green-500">
                Image uploaded successfully: <a href={imageUrl}>{imageUrl}</a>
              </p>
              <img src={imageUrl} alt="Product" className="mt-2 h-24 w-24" />
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>

      <NavigationBar />
    </div>
  );
}
