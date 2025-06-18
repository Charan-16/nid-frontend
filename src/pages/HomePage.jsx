import { Link } from 'react-router-dom';
import hero from '../assets/hero.jpg';
import './HomePage.css';
function HomePage() {
  return (
    <div>
      {/* 🌄 Hero Section */}
      <div
        className="position-relative text-white text-center"
        style={{
          height: '80vh',
          backgroundImage: `url(${hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 hero-overlay"></div>

        <div className="position-relative hero-text d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-3 fw-bold">🎓 NID Project Showcase</h1>
          <p className="lead fs-4">Explore innovation in Game, Interaction, Universal, and Bamboo Design</p>
          <div className="mt-4">
            <Link to="/projects" className="btn btn-outline-light btn-lg me-3">
              📂 Explore Projects
            </Link>
            <Link to="/add-project" className="btn btn-warning btn-lg">
              ➕ Submit Project
            </Link>
          </div>
        </div>
      </div>

      {/* 🧾 Info Section */}
      <section className="container py-5 text-center department-section">
        <h2 className="mb-4">Explore by Department</h2>
        <div className="row text-start">
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm border-0 feature-card p-3">
              <h5>🎮 Digital Game Design</h5>
              <p>Playful storytelling, immersive environments, and innovative mechanics by NID students.</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm border-0 feature-card p-3">
              <h5>🔄 Interaction Design</h5>
              <p>Designing intuitive, human-centered interfaces for the physical and digital world.</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm border-0 feature-card p-3">
              <h5>🧠 Universal Design</h5>
              <p>Solutions that include everyone — accessible, usable, and delightful for all users.</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm border-0 feature-card p-3">
              <h5>🎋 Bamboo Initiatives</h5>
              <p>Handcrafted innovation using sustainable bamboo in product and system design.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
