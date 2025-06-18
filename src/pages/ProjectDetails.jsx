import React, { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
      setProject(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching project details:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading project details...</div>;
  }

  if (!project) {
    return <div className="text-center py-5">Project not found.</div>;
  }

  return (
    <div className="container py-5">
      <Link to="/projects" className="btn btn-outline-secondary mb-4">← Back to Gallery</Link>

      <div className="card shadow p-4">
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.projectTitle}
            className="img-fluid mb-4 rounded"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        )}
        <h2 className="mb-3">{project.projectTitle}</h2>

        <p><strong>📅 Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
        <p><strong>🎓 Student:</strong> {project.studentName}</p>
        <p><strong>📘 Department:</strong> {project.department}</p>
        <p><strong>🧑‍🏫 Coordinator:</strong> {project.coordinatorName}</p>
        <p><strong>📝 Description:</strong></p>
        <p>{project.description}</p>

        {project.innovative && (
          <div className="mt-3">
            <span className="badge bg-success fs-6">🌟 Innovative Project</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
