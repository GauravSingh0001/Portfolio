import './Project.css';
import vokl from '../../assets/project/laptop.png'
import resume from '../../assets/project/desktop.png'
import bithide from '../../assets/project/bithide.png'

const projects = [
  {
    title: "Vokl - AI Voice Studio",
    image: vokl,
    description:
      "Engineered a full-stack MERN + AWS SaaS platform featuring serverless TTS, custom voice replication, usage tracking, and quota management. Optimized multi-lingual audio processing pipeline for low latency.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "AWS"],
    link: "https://github.com/GauravSingh0001",
    demo:'https://voklstudio.vercel.app'
  },
  {
    title: "MyResume ATS Builder",
    image: resume,
    description:
      "Built a complete MERN stack application with server-side PDF generation, Redux Toolkit for complex form state, and real-time preview. Ensured 100% client-side data privacy with CI/CD on Vercel.",
    tags: ["React.js", "Redux", "Node.js", "MongoDB", "Tailwind CSS"],
    link: "https://github.com/GauravSingh0001",
    demo:'https://quickmyresume.vercel.app/'
  },
  {
    title: "BitHide Steganography",
    image: bithide,
    description:
      "Developed a full-stack Flask application to securely hide AES-256 encrypted payloads inside images, audio, and PDF files. Implemented PBKDF2 key derivation and deployed on Render.",
    tags: ["Python", "Flask", "AES-256", "REST APIs", "Render"],
    link: "https://github.com/GauravSingh0001",
    demo:'https://bithide-frontend.onrender.com/'
  },
];


export default function ProjectShowcase() {
  return (
    <section id="projects" className="showcase">
      <h2 className="showcase-title">Featured <span >Projects</span></h2>
      {projects.map((project, index) => (
        <article
          className={`showcase-row ${
            index % 2 !== 0 ? "reverse" : ""
          }`}
          key={project.title}
        >
          {/* IMAGE CARD */}
          <div className="project-card">
            <img src={project.image} alt={project.title} />
            <div className="card-overlay">
            </div>
          </div>

          {/* DETAILS */}
          <div className="project-details">
            <span className="project-number">
              0{index + 1}
            </span>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <button>
                View Project 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <button>
                View Demo 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}