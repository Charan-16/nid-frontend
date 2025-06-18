import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🎓 Student Projects Gallery</h2>
      <div className="row">
        {projects.length === 0 && (
          <div className="text-center py-5">
            <h5>No projects found.</h5>
          </div>
        )}

        {projects.map((project) => (
          <div className="col-md-4 mb-4" key={project._id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={project.imageUrl}
                className="card-img-top"
                alt={project.projectTitle}
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{project.projectTitle}</h5>
                <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                  {project.description.substring(0, 100)}...
                </p>
                <span className="badge bg-info text-dark mb-2">{project.department}</span>
                {project.innovative && (
                  <span className="badge bg-warning text-dark mb-2">🌟 Innovative</span>
                )}
                <div className="mt-auto">
                  <small className="text-muted d-block">👨‍🎓 {project.studentName}</small>
                  <small className="text-muted d-block">🧑‍🏫 {project.coordinatorName}</small>
                  <small className="text-muted d-block">🗓 {new Date(project.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
