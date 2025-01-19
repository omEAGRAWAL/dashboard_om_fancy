import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    Image: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Fetch category by ID
    fetch(`${apiUrl}/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedCategory = data.find((item) => item._id === id);
        if (fetchedCategory) {
          setCategory(fetchedCategory);
          setFormData({
            name: fetchedCategory.name,
            description: fetchedCategory.description,
            Image: fetchedCategory.Image,
          });
        }
      })
      .catch((error) => console.error("Error fetching category:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    if (!file) return;
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      const response = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: uploadFormData,
      });
      const data = await response.json();
      setFormData((prev) => ({ ...prev, Image: data.fileUrl }));
    } catch (error) {
      console.error("Error uploading Image:", error);
    }
    setUploading(false);
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
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded mb-20 pb-7">
      <form onSubmit={handleUpdate}>
        <label className="block mb-20 font-medium">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </label>
        <label className="block mb-2 font-medium">
          Description
          <textarea
            name="description"
            value={formData.description}
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

        {category.Image && (
          <div>
            <p>Existing Image:</p>
            <img src={category.Image} alt="Current" className="w-20 h-20" />
          </div>
        )}
        {uploading && <p>Uploading Image...</p>}

        {formData.Image && (
          <div>
            <p>New Image:</p>
            <img src={formData.Image} alt="Preview" className="w-20 h-20" />
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
