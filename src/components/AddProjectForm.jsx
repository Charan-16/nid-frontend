import React, { useState } from "react";
import API from "../api"; // uses baseURL from .env
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
      const res = await API.post("/api/projects", formData);
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
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            placeholder="Project Title"
            required
          />
          <textarea
            className="form-control mb-3"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project Description"
            required
          />
          <input
            className="form-control mb-3"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            required
          />
          <input
            className="form-control mb-3"
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Student Name"
            required
          />
          <input
            className="form-control mb-3"
            type="text"
            name="coordinatorName"
            value={formData.coordinatorName}
            onChange={handleChange}
            placeholder="Coordinator Name"
            required
          />
          <input
            className="form-control mb-3"
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="innovative"
              checked={formData.innovative}
              onChange={handleChange}
              id="innovativeCheckbox"
            />
            <label className="form-check-label" htmlFor="innovativeCheckbox">
              Innovative Project?
            </label>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default AddProjectForm;
