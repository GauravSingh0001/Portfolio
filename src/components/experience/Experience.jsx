import React from 'react';
import AccordionGallery from './Experiences';
import cantilver from '../../assets/experience/cantilever.webp'
import infosys from '../../assets/experience/infosys.webp'
import marpu from '../../assets/experience/marpu.webp'
const items = [
  {
    image: cantilver,
    label: 'CantiLever Labs',
    role: 'Full Stack Web Developer Intern',
    period: 'Aug 2024 – Dec 2024',
    skills: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs', 'MongoDB'],
    certificateLink: 'https://drive.google.com/file/d/1igG2DATD-aXTUiyPYm6A8itStqyTO_to/view?usp=sharing',
    link: 'https://drive.google.com/file/d/1igG2DATD-aXTUiyPYm6A8itStqyTO_to/view?usp=sharing',
    what: 'Engineered end-to-end full-stack features for a SaaS product — spanning interactive React UIs, Node.js/Express REST APIs, and MongoDB data layers — serving thousands of active users.',
    how: 'Adopted an agile sprint workflow, shipping fortnightly feature releases. Built reusable component libraries with Tailwind CSS, integrated third-party payment gateways, and optimised bundle size by 38% through lazy-loading and code splitting.',
    why: 'To gain hands-on industry exposure in product-grade engineering, sharpen my full-stack instincts, and bridge the gap between academic knowledge and real-world software delivery under deadlines.'
  },
  {
    image: infosys,
    label: 'Infosys Springboard',
    role: 'Software Developer Intern',
    period: 'Jan 2024 – Jun 2024',
    skills: ['Python','Flask','REST API','LLM',,'Git'],
    certificateLink: 'https://drive.google.com/file/d/14B1e_KNB0sKNUcIYdwc82ZzHC0Y0znIz/view?usp=sharing',
    link: 'https://drive.google.com/file/d/14B1e_KNB0sKNUcIYdwc82ZzHC0Y0znIz/view?usp=sharing',
    what: 'Developed enterprise-grade backend modules in Java with Spring Boot for Infosys Springboards learning platform, contributing to features that supported over 5 lakh learners across India.',
    how: 'Worked within a structured Agile team, writing optimised SQL queries, building RESTful service layers, and authoring JUnit test suites achieving 85%+ code coverage. Collaborated via Git-based branching and code-review workflows.',
    why: 'To experience large-scale enterprise software development practices, deepen proficiency in backend engineering, and understand how software quality is maintained at organisation scale.'
  },
  {
    image: marpu,
    label: 'Marpu Foundation',
    role: 'Web Development & Media Intern',
    period: 'Jun 2023 – Aug 2023',
    skills: ['SEO', 'Content Strategy'],
    certificateLink: 'https://drive.google.com/file/d/1zO-V1RtzynFpB3mWmzYblJd1akOsikim/view?usp=sharing',
    link: 'https://drive.google.com/file/d/1zO-V1RtzynFpB3mWmzYblJd1akOsikim/view?usp=sharing',
    what: 'Redesigned and developed the NGO\'s public-facing web portal, improving accessibility, visual identity, and digital outreach — directly supporting community welfare campaigns.',
    how: 'Built responsive, semantic pages from scratch using vanilla HTML5/CSS3 and JavaScript. Applied WCAG accessibility guidelines, improved on-page SEO, and created graphic media assets for social campaigns.',
    why: 'To apply tech skills for social impact, gain experience in user-centred design for non-profit use cases, and contribute meaningfully to an organisation doing community development work.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="experience-section" style={{ padding: '5rem 2rem', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#0f172a', marginBottom: '3rem', fontWeight: 800 }}>
        <span style={{ color: '#0d9488' }}>Experience</span>
      </h2>
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <AccordionGallery
          items={items}
          defaultIndex={2}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#0d9488"
          overlayColor="#0f172a"
          textColor="#ffffff"
          grayscale={true}
          showLabels={true}
          duration={0.6}
          ease="power3.out"
          parallax={0.5}
          tilt={8}
          stagger={0.06}
          height={460}
          gap={10}
          radius={16}
          orientation="horizontal"
        />
      </div>
    </section>
  );
}