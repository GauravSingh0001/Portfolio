import React from 'react';
import Badge from './Badge';
import resumePdf from '../../assets/Gaurav_Singh_Resume.pdf';
import { FaDownload, FaArrowRight, FaLinkedin, FaGithub, FaEnvelope, FaCode } from 'react-icons/fa';

function Hero() {
  const techStack = [
    'React 19',
    'Node.js',
    'Java',
    'Python',
    'SQL',
    'Tailwind CSS',
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden transition-colors duration-300">
      {/* Ambient Background Accents using Palette Variables */}
      <div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-500"
        style={{ backgroundColor: 'var(--ambient-1)' }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-500"
        style={{ backgroundColor: 'var(--ambient-2)' }}
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Hero Content & Bio */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-app-primary leading-[1.1] transition-colors duration-300">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--accent-main)]">
                Gaurav Singh
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-app-secondary tracking-tight transition-colors duration-300">
              Full Stack Developer & Backend Engineer
            </p>
          </div>

          {/* Introduction Paragraph */}
          <p className="text-base sm:text-lg text-app-secondary max-w-2xl leading-relaxed font-normal transition-colors duration-300">
            Building performant, scalable web applications with modern architecture and delightful user experiences.
            Focused on the React ecosystem, robust APIs, and interactive interfaces engineered with precision.
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-app-muted mr-2 font-mono flex items-center gap-1.5">
              <FaCode className="text-app-accent" /> Stack:
            </span>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md text-xs font-semibold bg-app-chip border border-app-main text-app-primary shadow-2xs hover:border-app-accent transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href={resumePdf}
              download="Gaurav_Singh_Resume.pdf"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-app-btn-primary font-bold text-sm shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 hover:opacity-90"
              title="Download Gaurav Singh's Resume"
            >
              <FaDownload className="text-xs" />
              <span>Download Resume</span>
            </a>

            <a
              href="https://linkedin.com/in/GauravSinghDev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-app-btn-secondary border border-app-main font-semibold text-sm shadow-xs hover:border-app-accent transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Connect on LinkedIn</span>
              <FaArrowRight className="text-xs text-app-accent" />
            </a>
          </div>

          {/* Social Links & Clearance Hint */}
          <div className="flex items-center gap-4 pt-2 text-app-primary">
            <a
              href="https://github.com/GauravSingh0001"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-app-chip border border-app-main hover:border-app-accent shadow-2xs transition-colors"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <FaGithub className="text-lg" />
            </a>
            <a
              href="https://linkedin.com/in/GauravSinghDev"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full bg-app-chip border border-app-main hover:border-app-accent shadow-2xs transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a
              href="mailto:contact@gauravsingh.dev"
              className="p-2.5 rounded-full bg-app-chip border border-app-main hover:border-app-accent shadow-2xs transition-colors"
              aria-label="Email Gaurav"
              title="Send an Email"
            >
              <FaEnvelope className="text-lg" />
            </a>
            <span className="text-xs text-app-muted font-mono tracking-tight hidden sm:inline-block pl-2 border-l border-app-main">
              Hover & tilt badge to inspect credentials
            </span>
          </div>
        </div>

        {/* Right Column: Interactive ID Badge */}
        <div className="lg:col-span-5 flex items-center justify-center pt-6 lg:pt-0">
        <Badge />
        </div>
      </div>
    </section>
  );
}

export default Hero;