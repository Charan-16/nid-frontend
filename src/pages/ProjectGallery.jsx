import React, { useEffect, useState } from 'react';
import API from '../api'; // ✅ Replaced axios with your configured API
import './ProjectGallery.css';
import { useNavigate } from 'react-router-dom';

const departments = [
  'All Departments',
  'Interaction Design',
  'Digital Game Design',
  'Universal Design',
  'Center for Bamboo Initiatives',
];

function ProjectGallery() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [onlyInnovative, setOnlyInnovative] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedDept, onlyInnovative, searchQuery]);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/api/projects'); // ✅ Uses dynamic base URL
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const filterProjects = () => {
    let result = [...projects];

    if (selectedDept !== 'All Departments') {
      result = result.filter(
        (p) =>
          p.department?.toLowerCase().trim() ===
          selectedDept.toLowerCase().trim()
      );
    }

    if (onlyInnovative) {
      result = result.filter((p) => p.innovative === true);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.projectTitle?.toLowerCase().includes(query) ||
          p.studentName?.toLowerCase().includes(query)
      );
    }

    setFiltered(result);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📂 Project Gallery</h2>

      {/* 🔍 Filter Controls */}
      <div className="d-flex flex-wrap gap-3 justify-content-center mb-4">
        <select
          className="form-select w-auto"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept}>{dept}</option>
          ))}
        </select>

        <div className="form-check d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id="innovativeOnly"
            checked={onlyInnovative}
            onChange={() => setOnlyInnovative((prev) => !prev)}
          />
          <label className="form-check-label" htmlFor="innovativeOnly">
            Only Innovative
          </label>
        </div>

        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search by title or student"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 🖼️ Project Cards */}
      <div className="row">
        {filtered.length === 0 ? (
          <p className="text-center">No projects found.</p>
        ) : (
          filtered.map((project, index) => (
            <div
              className="col-md-4 mb-4"
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <div className="project-card card h-100 shadow-sm">
                {project.imageUrl && (
                  <div className="project-image-wrapper">
                    <img
                      src={project.imageUrl}
                      className="card-img-top project-image"
                      alt={project.projectTitle}
                    />
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{project.projectTitle}</h5>
                  <p className="card-text">
                    <strong>Student:</strong> {project.studentName}<br />
                    <strong>Coordinator:</strong> {project.coordinatorName}<br />
                    <strong>Department:</strong> {project.department}<br />
                    <strong>Year:</strong>{' '}
                    {project.createdAt ? new Date(project.createdAt).getFullYear() : 'N/A'}
                  </p>
                  {project.innovative && (
                    <span className="badge bg-success mt-2">🌟 Innovative</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectGallery;
