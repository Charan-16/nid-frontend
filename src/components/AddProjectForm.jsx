import React, { useState } from "react";
import axios from "axios";
import "../ProjectGallery.css";

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    description: "",
    department: "",
    studentName: "",
    coordinatorName: "",
    imageUrl: "",
    innovative: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/projects`,
        formData
      );
      console.log("✅ Project added:", res.data);
      setMessage("✅ Project added successfully!");
      setFormData({
        projectTitle: "",
        description: "",
        department: "",
        studentName: "",
        coordinatorName: "",
        imageUrl: "",
        innovative: false,
      });
    } catch (error) {
      console.error("❌ Error adding project:", error);
      setMessage("❌ Error adding project. See console for details.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit} className="project-form">
        <input
          type="text"
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleChange}
          placeholder="Project Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          required
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Student Name"
          required
        />
        <input
          type="text"
          name="coordinatorName"
          value={formData.coordinatorName}
          onChange={handleChange}
          placeholder="Coordinator Name"
          required
        />
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <label>
          <input
            type="checkbox"
            name="innovative"
            checked={formData.innovative}
            onChange={handleChange}
          />
          Innovative Project?
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default AddProjectForm;
