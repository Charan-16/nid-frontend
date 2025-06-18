import React, { useState } from 'react';
import axios from 'axios';

const departments = [
  'Interaction Design',
  'Digital Game Design',
  'Universal Design',
  'Center for Bamboo Initiatives',
];

function AddProjectForm({ onProjectAdded }) {
  const [formData, setFormData] = useState({
    projectTitle: '',
    description: '',
    department: '',
    studentName: '',
    coordinatorName: '',
    imageUrl: '',
    innovative: false,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', 'nid_uploads');
    const cloudName = 'dgxlugkmd';

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formDataUpload
      );
      setFormData(prev => ({ ...prev, imageUrl: res.data.secure_url }));
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      alert('❌ Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/projects', formData);

      if (response.status === 200 || response.status === 201) {
        alert('✅ Project added successfully!');
        setFormData({
          projectTitle: '',
          description: '',
          department: '',
          studentName: '',
          coordinatorName: '',
          imageUrl: '',
          innovative: false,
        });
        if (typeof onProjectAdded === 'function') {
          onProjectAdded();
        }
      } else {
        console.warn('Unexpected response:', response);
        alert('⚠️ Something went wrong while adding the project.');
      }
    } catch (err) {
      console.error('❌ Error during submission:', err);
      alert('❌ Error adding project. See console for details.');
    }
  };

  return (
    <div className="container mt-5">
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <h4 className="mb-4 text-center">📝 Add New Project</h4>

        <div className="mb-3">
          <label className="form-label">Project Title</label>
          <input className="form-control" name="projectTitle" value={formData.projectTitle} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <select className="form-select" name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map(dep => <option key={dep}>{dep}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input className="form-control" name="studentName" value={formData.studentName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Coordinator Name</label>
          <input className="form-control" name="coordinatorName" value={formData.coordinatorName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input className="form-control" type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {uploading && <div className="text-info mb-3">⏳ Uploading image...</div>}

        {formData.imageUrl && (
          <div className="mb-3">
            <label className="form-label">Preview</label>
            <div>
              <img src={formData.imageUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            </div>
          </div>
        )}

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" name="innovative" checked={formData.innovative} onChange={handleChange} />
          <label className="form-check-label">Is Innovative?</label>
        </div>

        <button className="btn btn-primary w-100" disabled={uploading}>
          🚀 {uploading ? 'Uploading...' : 'Submit Project'}
        </button>
      </form>
    </div>
  );
}

export default AddProjectForm;
