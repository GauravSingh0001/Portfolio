import React, { useState, useRef } from 'react';
import '../style/IDBadge.css';
import profilePic from '../assets/Profile_Picture.png';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function Badge() {
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState({});
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation between -9 and +9 degrees
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    // Calculate glare percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      '--glare-x': `${glareX.toFixed(1)}%`,
      '--glare-y': `${glareY.toFixed(1)}%`,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
  };

  return (
    <div className={`badge-swing-wrapper ${isHovered ? 'is-hovered' : ''}`}>
      {/* Hanging Lanyard Strap */}
      <div className="lanyard-strap" aria-hidden="true"></div>

      {/* Metal Clip attached to badge */}
      <div className="badge-clip-container" aria-hidden="true">
        <div className="badge-clip"></div>
      </div>

      {/* Badge Card Container with 3D Tilt */}
      <div
        ref={cardRef}
        className="badge-card"
        style={transformStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic Holographic Glare Layer */}
        <div className="card-glare" />

        {/* Left Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo" title="Wayne Enterprises">
            {/* Hexagon Nodes Logo */}
            <svg
              className="w-7 h-7 text-black fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="12 2 21 7.2 21 16.8 12 22 3 16.8 3 7.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="7.5" r="1.8" />
              <circle cx="7.5" cy="14.5" r="1.8" />
              <circle cx="16.5" cy="14.5" r="1.8" />
              <line x1="12" y1="7.5" x2="7.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="12" y1="7.5" x2="16.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="7.5" y1="14.5" x2="16.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="company-name-container">
            <div className="company-name">
              <strong>WAYNE</strong> <span>ENTERPRISES</span>
            </div>
          </div>

          <div className="open-to-work">
            OPEN TO WORK
          </div>
        </aside>

        {/* Main Badge Content Area */}
        <div className="main-content">
          <div className="header-text">CANDIDATE PROFILE</div>

          {/* Profile Photo */}
          <div className="photo-container">
            <img
              src={profilePic}
              alt="Gaurav Singh Profile Photo"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300x250/1e242c/ffffff?text=Gaurav+Singh';
              }}
            />
          </div>

          {/* Candidate Info Grid */}
          <div className="info-grid">
            <div className="info-label">NAME</div>
            <div className="info-value">Gaurav Singh</div>

            <div className="info-label">SKILL</div>
            <div className="info-value">Full Stack Developer</div>

            <div className="info-label">SEEK</div>
            <div className="info-value green-pill">Full Stack / React Roles</div>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a
              href="https://linkedin.com/in/GauravSinghDev"
              target="_blank"
              rel="noreferrer"
              className="social-pill linkedin-pill"
              title="Connect on LinkedIn"
            >
              <FaLinkedin className="text-[#0077b5] text-[15px]" />
              <span>@GauravSinghDev</span>
            </a>

            <a
              href="https://github.com/GauravSingh0001"
              target="_blank"
              rel="noreferrer"
              className="social-pill github-pill"
              title="View GitHub Profile"
            >
              <FaGithub className="text-black text-[15px]" />
              <span>@GauravSingh0001</span>
            </a>
          </div>

          {/* Barcode Section */}
          <div className="barcode-section">
            <div className="barcode-bars" aria-hidden="true"></div>
            <div className="barcode-text">WE-3826-9942-05</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Badge;
