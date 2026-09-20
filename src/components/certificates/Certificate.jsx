import React, { useState } from 'react';
import './PolaroidGallery.css';

/* ── Load full certificate files (click target) ───────────────────────── */
const certAssets = import.meta.glob(
  '../../assets/CERTIFICATE/*.{pdf,png,PDF,PNG}',
  { eager: true, query: '?url', import: 'default' }
);

/* ── Load JPEG previews (polaroid image) ──────────────────────────────── */
const previewAssets = import.meta.glob(
  '../../assets/preview_certificate/*.{jpeg,jpg,png,JPEG,JPG,PNG}',
  { eager: true, query: '?url', import: 'default' }
);

/** Resolve a URL by matching the base filename (without extension) */
function resolveUrl(assetMap, baseName) {
  const key = Object.keys(assetMap).find(
    k => k.split('/').pop().replace(/\.[^.]+$/, '') === baseName.replace(/\.[^.]+$/, '')
  );
  return key ? assetMap[key] : null;
}

/** Full cert URL (PDF/PNG) — opened on click */
function certUrl(filename) {
  return resolveUrl(certAssets, filename) ?? '#';
}

/** Preview JPEG URL — shown inside the polaroid */
function previewUrl(filename) {
  // Strip extension, look for matching JPEG preview
  return resolveUrl(previewAssets, filename);
}

/* ═══════════════════════════════════════════════════
   PRIORITY-ORDERED CERTIFICATE LIST
   Tier 1 → Internships / Employment
   Tier 2 → NPTEL / Academic
   Tier 3 → Hackathons & Competitions
   Tier 4 → Google / Coursera
   Tier 5 → LinkedIn Learning / Cloud
   Tier 6 → Domain Courses & Workshops
   ═══════════════════════════════════════════════════ */
const CERTS = [
  /* ── Tier 1: Internships & Key Credentials ── */
  { title: 'Infosys Internship',           file: 'infosys internhsip.pdf',                                                          accent: '#dbeafe', tier: 1 },
  { title: 'Marpu Foundation Internship',  file: 'Marpu foundation.png',                                              accent: '#dcfce7', tier: 1 },
  { title: 'IICT Certificate',             file: 'IICT-05082660196.pdf',                                                            accent: '#f5f3ff', tier: 1 },
  { title: 'Oracle Agentic AI',            file: 'oracle agentic ai.pdf',                                                           accent: '#fed7aa', tier: 1 },
  { title: 'AWS Essential Training',       file: 'CertificateOfCompletion_AWS Essential Training for Developers.pdf',               accent: '#fff7ed', tier: 1 },
  { title: 'Amazon Cloud Practitioner',    file: 'amazon cloud Practitioner.pdf',                                                   accent: '#fff7ed', tier: 1 },

  /* ── Tier 2: Google / Coursera / NPTEL ── */
  { title: 'Google AI Essentials',         file: 'Coursera Google AI Essentials GOM75P72PUAB_Comp.pdf',                             accent: '#dbeafe', tier: 2 },
  { title: 'Google Data Analysis',         file: 'Coursera Google Data Analysis R8QIO5GR9MW4.pdf',                                  accent: '#dbeafe', tier: 2 },
  { title: 'Google Prompt Engineering',    file: 'Coursera Google Prompt 57CKZ7JUU8QE_Compm.pdf',                                  accent: '#dbeafe', tier: 2 },
  { title: 'Google Course 1',             file: 'Coursera Google FN6QUG7ANQOT.pdf',                                               accent: '#dbeafe', tier: 2 },
  { title: 'Google Course 2',             file: 'Coursera Google URH3EHIBWUDQ.pdf',                                               accent: '#dbeafe', tier: 2 },
  { title: 'Google Social Media',          file: 'Coursera SOCIAL MEDIA.pdf',                                                       accent: '#dbeafe', tier: 2 },
  { title: 'Coursera 3AF0JPSI1KI7',        file: 'Coursera 3AF0JPSI1KI7.pdf',                                                       accent: '#dbeafe', tier: 2 },
  { title: 'Ethical Hacking – NPTEL',      file: 'Ethical Hacking - NPTEL.pdf',                                                     accent: '#fef3c7', tier: 2 },
  { title: 'Privacy & Security – NPTEL',   file: 'Privacy and Security in Online Social Media - NPTEL.pdf',                          accent: '#fef3c7', tier: 2 },

  /* ── Tier 3: Hackathons & Competitions ── */
  { title: 'Google Developer Groups On Campus',         file: 'Hack2skill-Certificate.png', isImage: true,                                   accent: '#fce7f3', tier: 3 },
  { title: 'Flipkart GRiD 6.0',           file: 'Flipkart GRiD 6.0 - Software.pdf',                                               accent: '#ede9fe', tier: 3 },
  { title: 'Adobe India Hackathon',        file: 'Adobe India Hackathon.pdf',                                                       accent: '#fce7f3', tier: 3 },
  { title: 'Zopdev Summer of Code',        file: 'Zopdev Summer of Code.pdf',                                                       accent: '#ecfdf5', tier: 3 },
  { title: 'Unstop Playstorm',             file: 'Unstop Playstorm.pdf',                                                            accent: '#fff7ed', tier: 3 },
  { title: 'Shri Ram Equity Wars',         file: 'Shri Ram Equity Wars.pdf',                                                        accent: '#fff7ed', tier: 3 },
  { title: 'Shri Ram Trading Challenge',   file: 'Shri Ram Trading Challenge 2023.pdf',                                             accent: '#fff7ed', tier: 3 },

  /* ── Tier 4: DevOps / GitHub / Docker ── */
  { title: 'Docker Foundations',           file: 'CertificateOfCompletion_Docker Foundations Professional Certificate.pdf',          accent: '#dbeafe', tier: 4 },
  { title: 'Git Essential Training',       file: 'CertificateOfCompletion_Git Essential Training.pdf',                              accent: '#f3f4f6', tier: 4 },
  { title: 'GitHub Actions',              file: 'CertificateOfCompletion_Practical GitHub Actions.pdf',                             accent: '#f3f4f6', tier: 4 },
  { title: 'GitHub Copilot',              file: 'CertificateOfCompletion_Practical GitHub Copilot.pdf',                             accent: '#f3f4f6', tier: 4 },
  { title: 'GitHub Project Management',   file: 'CertificateOfCompletion_Practical GitHub Project Management and Collaboration.pdf',accent: '#f3f4f6', tier: 4 },
  { title: 'GitHub Issues & Projects',    file: 'CertificateOfCompletion_GitHub Issues and Projects for Teams.pdf',                 accent: '#f3f4f6', tier: 4 },
  { title: 'GitHub Code Search',          file: 'CertificateOfCompletion_Practical GitHub Code Search.pdf',                         accent: '#f3f4f6', tier: 4 },

  /* ── Tier 5: Cybersecurity & Domain ── */
  { title: 'Cybersecurity Analyst – TATA',file: 'Cybersecurity Analyst Job Simulation TATA.pdf',                                   accent: '#fef2f2', tier: 5 },
  { title: 'Cyber Job Simulation',         file: 'Cyber Job Simulation.pdf',                                                        accent: '#fef2f2', tier: 5 },
  { title: 'Mastering Ethical Hacking',   file: 'MASTERING ETHICAL HACKING.pdf',                                                   accent: '#fef2f2', tier: 5 },
  { title: 'Copado Certified AI',          file: 'Copado Certified Copado AI.pdf',                                                  accent: '#f0fdf4', tier: 5 },
  { title: 'MongoDB for Students',         file: 'Introduction to MongoDB for Students.pdf',                                        accent: '#ecfdf5', tier: 5 },
  { title: 'Computer Vision 101',          file: 'Computer Vision 101.pdf',                                                         accent: '#f0fdf4', tier: 5 },
  { title: 'Deep Learning Intro',          file: 'Introduction to Deep Learning.pdf',                                               accent: '#f5f3ff', tier: 5 },
  { title: 'NLP Introduction',            file: 'Introduction to Natural Language Processing.pdf',                                  accent: '#f5f3ff', tier: 5 },
  { title: 'Data Science Intro',           file: 'Introduction to Data Science.pdf',                                                accent: '#eff6ff', tier: 5 },
  { title: 'OpenAI GPT Models',           file: 'Introduction to OpenAI GPT Models.pdf',                                           accent: '#f5f3ff', tier: 5 },
  { title: 'Robotic Process Automation',  file: 'Introduction to Robotic Process Automation.pdf',                                   accent: '#f0fdf4', tier: 5 },

  /* ── Tier 6: Workshops & Soft Skills ── */
  { title: 'Agile Software Development',  file: 'AGILE OF SOFTWARE DEVELOPMENT.pdf',                                               accent: '#eff6ff', tier: 6 },
  { title: 'Advanced Agile',              file: 'Advanced Agile.pdf',                                                              accent: '#eff6ff', tier: 6 },
  { title: 'Computer Network Security',   file: 'Computer Network & Internet Security.pdf',                                         accent: '#eff6ff', tier: 6 },
  { title: 'MCU in MultiSIM',             file: 'Microprocessor Control Units (MCU) in MultiSIM.pdf',                              accent: '#fefce8', tier: 6 },
  { title: 'C Language Fundamentals',     file: 'Fundamentals of the C Language Variables & Datatypes.pdf',                        accent: '#fefce8', tier: 6 },
  { title: 'SOFT SKILL Workshop – IILM', file: 'SOFT SKILL WORKSHOP BY IILM.pdf',                                                 accent: '#f0fdf4', tier: 6 },
  { title: 'High Impact Presentations',   file: 'High Impact Presentations.pdf',                                                   accent: '#f0fdf4', tier: 6 },
  { title: 'Email Writing Skills',        file: 'Email Writing Skills.pdf',                                                         accent: '#f0fdf4', tier: 6 },
  { title: 'Time Management',             file: 'Time Management.pdf',                                                              accent: '#fefce8', tier: 6 },
  { title: 'Nestle',                      file: 'nestle.pdf',                                                                      accent: '#fdf2f8', tier: 6 },
  { title: 'Shri Ram Trading',           file: 'Shri Ram Trading.pdf',                                                            accent: '#fff7ed', tier: 6 },
];

/* Slight tilt values for each of the 9 grid positions */
const TILTS = [-3.5, 2.5, -2, 4, -1.5, 3, -4.5, 2, -3];

/* Tier badge colours */
const TIER_COLORS = {
  1: '#0d9488', // teal  — internships
  2: '#7c3aed', // purple — NPTEL
  3: '#ea580c', // orange — hackathons
  4: '#2563eb', // blue   — Google/Coursera
  5: '#0891b2', // cyan   — cloud/devops
  6: '#64748b', // slate  — others
};

const PER_PAGE = 9;

export default function Certificate() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(CERTS.length / PER_PAGE);
  const start = page * PER_PAGE;
  const visible = CERTS.slice(start, start + PER_PAGE);

  const goTo = (p) => {
    setPage(p);
    // Scroll to top of section smoothly
    document.querySelector('.cert-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="certificates" className="cert-section">
      {/* Header */}
      <div className="cert-header">
        <h2>My <span>Certifications</span></h2>
        <p className="cert-count">
          {CERTS.length} certificates &nbsp;·&nbsp; Page {page + 1} of {totalPages}
        </p>
      </div>

      {/* Board */}
      <div className="cert-board">
        {/* Graph-paper grid background */}
        <div className="cert-grid-bg" aria-hidden="true" />

        {/* 3 × 3 polaroid grid */}
        <div className="cert-polaroid-grid">
          {visible.map((cert, idx) => {
            const tilt       = TILTS[idx % TILTS.length];
            const url        = certUrl(cert.file);
            const preview    = previewUrl(cert.file);
            const tierColor  = TIER_COLORS[cert.tier];

            return (
              <a
                key={cert.file}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="polaroid"
                style={{ '--tilt': `${tilt}deg`, '--accent': cert.accent }}
                aria-label={`Open ${cert.title} certificate`}
              >
                {/* Tier indicator dot */}
                <div
                  className="polaroid-tier"
                  style={{ background: tierColor }}
                  title={`Tier ${cert.tier}`}
                />

                {/* Wooden clothespin */}
                <div className="polaroid-clip" aria-hidden="true" />

                {/* Photo area — always show JPEG preview */}
                <div className="polaroid-photo">
                  {preview ? (
                    <img src={preview} alt={cert.title} loading="lazy" decoding="async" />
                  ) : (
                    /* Fallback if no preview found */
                    <div className="polaroid-pdf" style={{ '--accent': cert.accent }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="9" y1="13" x2="15" y2="13"/>
                        <line x1="9" y1="17" x2="15" y2="17"/>
                        <line x1="9" y1="9" x2="11" y2="9"/>
                      </svg>
                      <span className="polaroid-pdf-badge">PDF</span>
                    </div>
                  )}
                </div>

                {/* Caption strip */}
                <div className="polaroid-caption">{cert.title}</div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <nav className="cert-pagination" aria-label="Certificate pages">
        <button
          className="cert-page-btn"
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          aria-label="Previous page"
        >
          ← Prev
        </button>

        <div className="cert-page-dots" role="list">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              role="listitem"
              className={`cert-dot${i === page ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page ? 'page' : undefined}
            />
          ))}
        </div>

        <button
          className="cert-page-btn"
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages - 1}
          aria-label="Next page"
        >
          Next →
        </button>
      </nav>
    </section>
  );
}
