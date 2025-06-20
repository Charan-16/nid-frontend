// src/components/AddProjectForm.jsx
import React, { useState } from "react";
import API from "../api";

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

  const [status, setStatus] = useState({ submitting: false, error: null, success: null });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, error: null, success: null });

    try {
      const response = await API.post("/api/projects", formData);
      setStatus({ submitting: false, error: null, success: "Project added successfully!" });
      setFormData({
        projectTitle: "",
        description: "",
        department: "",
        studentName: "",
        coordinatorName: "",
        imageUrl: "",
        innovative: false,
      });
    } catch (err) {
      console.error(err);
      setStatus({
        submitting: false,
        error: err?.response?.data?.message || "Error adding project",
        success: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

      <input name="projectTitle" value={formData.projectTitle} onChange={handleChange} placeholder="Project Title" className="input" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input" required />
      <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="input" required />
      <input name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Student Name" className="input" required />
      <input name="coordinatorName" value={formData.coordinatorName} onChange={handleChange} placeholder="Coordinator Name" className="input" required />
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="input" required />

      <label className="block mt-2 mb-4">
        <input type="checkbox" name="innovative" checked={formData.innovative} onChange={handleChange} />
        <span className="ml-2">Innovative</span>
      </label>

      <button type="submit" disabled={status.submitting} className="btn">
        {status.submitting ? "Submitting..." : "Add Project"}
      </button>

      {status.error && <p className="text-red-500 mt-2">{status.error}</p>}
      {status.success && <p className="text-green-600 mt-2">{status.success}</p>}
    </form>
  );
};

export default AddProjectForm;
