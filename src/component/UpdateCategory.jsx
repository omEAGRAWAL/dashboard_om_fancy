import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function CategoryEdit() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    // Fetch category by ID
    fetch(`${apiUrl}/api/categories`)
      .then((response) => response.json())
      .then((data) => {


        setCategory(data.find((item) => item._id === id));
        console.log(data.find((item) => item._id === id));

        setFormData({
          name: data.name,
          description: data.description,
          image: data.Image,
        });
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Category updated successfully!");
        navigate("/");
      } else {
        alert("Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Category deleted successfully!");
        navigate("/");
      } else {
        alert("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <form onSubmit={handleUpdate}>
        <label className="block mb-2 font-medium">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            defaultValue={category.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </label>
        <label className="block mb-2 font-medium">
          Description
          <textarea
            name="description"
            value={formData.description}
            defaultValue={category.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </label>
        <label className="block mb-2 font-medium">
          Image
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border rounded p-2"
          />
        </label>

        <img src={category.image} alt="Preview" className="w-20 h-20" />

        {formData.image && (
          <div className="mb-2">
            <img src={formData.image} alt="Preview" className="w-20 h-20" />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default CategoryEdit;
