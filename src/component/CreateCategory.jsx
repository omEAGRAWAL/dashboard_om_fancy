import { useState } from "react";
import { useForm } from "react-hook-form";
//import env
import NavigationBar from "./NavBar";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CreateCategory() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      storeId: "676f82c37ea3d34df66c6bd0",
      // Predefined storeId
      Image: imageUrl,
    },
  });

  // Function to upload image
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
        setImageUrl(data.fileUrl); // Assuming the API returns { fileUrl: "image_url" }
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  // Function to handle form submission
  const onSubmit = async (data) => {
    if (!imageUrl) {
      alert("Please upload an image before submitting.");
      return;
    }

    const categoryData = {
      storeId: data.storeId,
      name: data.name,
      description: data.description,
      Image: imageUrl, // Changed to 'Image' instead of 'image'
    };

    try {
      const response = await fetch(apiUrl + "/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        alert("Category created successfully!");
        reset(); // Reset the form
        setImageUrl(""); // Clear the uploaded image
      } else {
        alert("Failed to create category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-8 bg-white shadow-md rounded"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Create Category</h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="name">
            Category Name
          </label>
          <input
            id="name"
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Description Field */}
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

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="Image">
            Category Image
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => uploadImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-lg"
            accept="image/*"
          />
          {uploading && (
            <p className="mt-2 text-sm text-blue-500">Uploading image...</p>
          )}
          {imageUrl && (
            <>
              {" "}
              <p className="mt-2 text-sm text-green-500">
                Image uploaded successfully: <a href={imageUrl}>{imageUrl}</a>
              </p>
              <img src={imageUrl} className="w-40" alt="ded" />
            </>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Create Category
        </button>
      </form>
      <NavigationBar />
    </div>
  );
}
