import React from 'react';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Skills from './components/skills/Skills';
import Experience from './components/experience/Experience';
import Project from './components/projects/Project';
import Certificate from './components/certificates/Certificate';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="min-h-screen bg-app-main text-app-primary transition-colors duration-300">
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Project />
      <Certificate />
      <Footer />
    </div>
  );
}

export default App;