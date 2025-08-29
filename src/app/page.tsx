'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

// Typewriter component
function TypewriterText({ text, speed = 50, className = "" }: { text: string; speed?: number; className?: string }) {
  const [displayText, setDisplayText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('typewriter-trigger');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || isComplete) return;

    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [hasStarted, displayText, text, speed, isComplete]);

  return (
    <span className={className} id="typewriter-trigger">
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

// ProjectCard component
function ProjectCard({ title, description, codeLink, demoLink, tech }: {
  title: string;
  description: string;
  codeLink?: string;
  demoLink?: string;
  tech: string[];
}) {
  return (
    <div className="group relative overflow-hidden bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 mb-4 leading-relaxed text-sm">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <span key={item} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-medium group-hover:bg-blue-600/20 group-hover:text-blue-300 transition-colors duration-300">
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium hover:shadow-lg"
              aria-label={`View code for ${title}`}
            >
              View Code
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 text-sm font-medium"
              aria-label={`View demo for ${title}`}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ExperienceCard component
function ExperienceCard({ title, company, period, description, achievements, tech, metrics }: {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements?: string[];
  tech: string[];
  metrics?: string[];
}) {
  return (
    <div className="group relative bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full group-hover:w-2 transition-all duration-300"></div>
      <div className="ml-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-blue-400 font-semibold text-lg">{company} • {period}</p>
          </div>
          <div className="hidden md:flex w-16 h-16 bg-blue-600/20 rounded-full items-center justify-center group-hover:bg-blue-600/40 transition-colors">
            <span className="text-2xl">💼</span>
          </div>
        </div>
        
        <p className="text-gray-300 mb-6 leading-relaxed text-lg">{description}</p>
        
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-3 text-center group-hover:bg-gray-700 transition-colors">
                <div className="text-blue-400 font-bold text-lg">{metric}</div>
              </div>
            ))}
          </div>
        )}
        
        {achievements && (
          <div className="mb-6">
            <h4 className="font-semibold text-white mb-3 text-lg">Key Achievements:</h4>
            <ul className="space-y-3">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-blue-400 mt-1 flex-shrink-0">▶</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-wrap gap-3">
          {tech.map((item) => (
            <span key={item} className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.animate-on-scroll');
    animatableElements.forEach((el) => observer.observe(el));
    
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'leadership', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
        
        // Auto-scroll navigation on mobile based on current section
        if (window.innerWidth < 768) {
          const navContainer = document.querySelector('.scrollbar-hide') as HTMLElement;
          if (navContainer) {
            // If in the first 4 sections (about, skills, projects, experience), scroll to beginning
            if (['about', 'skills', 'projects', 'experience'].includes(current)) {
              navContainer.scrollLeft = 0;
            }
            // If in the last 4 sections (education, certifications, leadership, contact), scroll to show them
            else if (['education', 'certifications', 'leadership', 'contact'].includes(current)) {
              const educationLink = document.querySelector('a[href="#education"]') as HTMLElement;
              if (educationLink) {
                navContainer.scrollLeft = educationLink.offsetLeft - 20;
              }
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const skills = {
    languages: ['Python', 'Java', 'C', 'SQL', 'HTML/CSS', 'PHP', 'TypeScript'],
    frameworks: ['React Native', 'Next.js', 'FastAPI', 'SvelteKit', 'Tailwind CSS'],
    databases: ['MySQL', 'SQLite', 'PostgreSQL', 'CockroachDB'],
    tools: ['Git/GitHub', 'MS Office Suite', 'AWS', 'VS Code', 'FileZilla', 'Wireshark', 'Cursor'],
    operatingSystems: ['Windows', 'Linux', 'macOS', 'Unix', 'Ubuntu'],
    specialties: ['Data Analysis', 'Machine Learning', 'Full-Stack Development', 'Mobile Development']
  };

  return (
    <div className="min-h-screen scroll-smooth bg-gray-900 text-white transition-colors duration-300 overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-blue-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-start md:justify-center space-x-4 md:space-x-6 overflow-x-auto scrollbar-hide">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'leadership', label: 'Leadership' },
              { id: 'contact', label: 'Contact' }
            ].map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap flex-shrink-0 ${
                  activeSection === id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <section id="hero" className="py-28 md:py-36 text-center relative">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Profile Image */}
            <div className="mb-6 relative">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto relative">
                <Image
                  src="/profileImage.jpg"
                  alt="Sabas Rojas"
                  width={160}
                  height={160}
                  className="rounded-full mx-auto shadow-2xl border-4 border-gray-700"
                  onError={() => {}}
                />
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-4 text-white leading-tight">
              Sabas Rojas
            </h1>
            
            <div className="relative inline-block mb-6">
              <p className="text-2xl md:text-3xl font-bold text-gray-200 mb-2">
                Computer Science Graduate
              </p>
              <p className="text-lg md:text-xl text-blue-400 font-semibold">
                Software Developer • Passionate About Technology & Innovation • 22 Years Old
              </p>
              <p className="text-base text-gray-400 mt-2">
                El Paso, Texas • Fluent in English, Spanish & Basic French
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a
                href="mailto:rojassabas17@gmail.com"
                className="group flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold hover:shadow-2xl hover:scale-105"
                aria-label="Send email"
              >
                <span>Get In Touch</span>
              </a>
              <a
                href="https://github.com/SabasRojas"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold hover:shadow-xl hover:scale-105"
                aria-label="View GitHub profile"
              >
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/sabas-rojas/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 font-semibold hover:shadow-xl hover:scale-105"
                aria-label="View LinkedIn profile"
              >
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {/* Resume Download Section - Separate for better visibility */}
        <section className="py-8 text-center animate-on-scroll opacity-0">
          <div className="relative inline-block">
            {/* Moving blue lights orbiting around button */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/80"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: '0 -40px',
                  animation: 'spin 4s linear infinite'
                }}
              ></div>
              <div 
                className="absolute w-1.5 h-1.5 bg-blue-300 rounded-full shadow-md shadow-blue-300/60"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: '0 -35px',
                  animation: 'spin 3s linear infinite reverse'
                }}
              ></div>
              <div 
                className="absolute w-1 h-1 bg-blue-500 rounded-full shadow-sm shadow-blue-500/40"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: '0 -42px',
                  animation: 'spin 5s linear infinite',
                  animationDelay: '-1s'
                }}
              ></div>
            </div>
            
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-md animate-pulse pointer-events-none"></div>
            
            {/* Main button */}
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-gray-300 rounded-full hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 font-medium hover:scale-105 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-blue-500 z-10"
            >
              <span>Download Résumé</span>
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 animate-on-scroll opacity-0">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-white">
              About Me
            </h2>
            <div className="max-w-4xl mx-auto">
              <TypewriterText 
                text="Born in El Paso, Texas, and raised across both Ciudad Juárez, México and El Paso, TX, I bring a cross-cultural perspective to technology and problem-solving. As recent Computer Science graduate from UTEP, I’m passionate about building clean, practical solutions and am currently seeking opportunities in software engineering, cloud, mobile/web, or AI/ML driven tech."
                speed={12}
                className="text-xl text-gray-300 leading-relaxed mb-8 block"
              />
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">Cross-Cultural</h3>
                  <p className="text-gray-400 text-sm">Bicultural upbringing fostering adaptability and global perspective</p>
                </div>
                <div className="text-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">Software Developer</h3>
                  <p className="text-gray-400 text-sm">Focused on delivering clean, maintainable, and scalable code</p>
                </div>
                <div className="text-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">Problem Solver</h3>
                  <p className="text-gray-400 text-sm">Strategic thinking with focus on practical solutions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-gray-800/50 -mx-6 px-6 animate-on-scroll opacity-0">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold mb-3 text-white">
              Technical Arsenal
            </h2>
            <p className="text-xl text-gray-300">Comprehensive skill set across multiple domains</p>
          </div>
          <div className="max-w-6xl mx-auto -mt-2">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, items], index) => (
                <div key={category} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10" style={{ animationDelay: `${index * 200}ms` }}>
                  <h3 className="text-xl font-bold mb-4 text-white capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span key={skill} className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 animate-on-scroll opacity-0">
          <div className="text-center mb-12 mt-12">
            <h2 className="text-5xl font-bold mb-4 text-white">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300">Showcasing technical expertise and innovation across diverse technologies</p>
          </div>
          
          {/* Main Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div style={{ animationDelay: '0ms' }} className="animate-on-scroll opacity-0">
              <ProjectCard
                title="Medical AI Diagnostic Agent"
                description="Advanced AI system that diagnoses medical conditions using Bayesian inference algorithms. Processes comprehensive CSV health datasets and models joint probabilities to deliver accurate diagnostic predictions with statistical confidence intervals."
                tech={['Python', 'Bayesian Inference', 'Data Processing', 'Machine Learning', 'Statistical Modeling']}
                codeLink="https://github.com/SabasRojas/Health_Diagnostics_AI"
              />
            </div>
            <div style={{ animationDelay: '200ms' }} className="animate-on-scroll opacity-0">
              <ProjectCard
                title="TRACE – Targeted Reconnaissance for Advanced Content Exploitation"
                description="U.S. Army DEVCOM capstone project consolidating enterprise penetration-testing utilities into a modern web application. Features AI-driven username/password generation, real-time dashboards, network visualization, and DoD STIG/NIST 800-53 compliance for cybersecurity assessments."
                tech={['Python', 'SvelteKit', 'Neo4j', 'AI Algorithms', 'Cybersecurity', 'DoD Compliance']}
                codeLink="https://github.com/SabasRojas/TRACE"
              />
            </div>
            <div style={{ animationDelay: '400ms' }} className="animate-on-scroll opacity-0">
              <ProjectCard
                title="Machine Learning LOL Item Predictor"
                description="Sophisticated machine learning system leveraging Riot Games' API to analyze League of Legends item statistics and predict gold cost efficiency. Features comprehensive data preprocessing, regression pipelines, and performance optimization algorithms."
                tech={['Python', 'Random Forest', 'scikit-learn', 'pandas', 'API Integration', 'Data Science']}
                codeLink="https://github.com/SabasRojas/MachineLearning_Item_Analysis"
              />
            </div>
            <div style={{ animationDelay: '600ms' }} className="animate-on-scroll opacity-0">
              <ProjectCard
                title="Portfolio Website"
                description="Modern responsive portfolio built with Next.js, featuring advanced animations, scroll-triggered effects, dynamic lighting elements, and optimized performance. Deployed and hosted on AWS using S3 for static hosting and CloudFront for global content delivery."
                tech={['Next.js', 'Tailwind CSS', 'TypeScript', 'React', 'Animation', 'AWS S3', 'CloudFront']}
                codeLink="https://github.com/SabasRojas/sabas-site"
              />
            </div>
            <div style={{ animationDelay: '800ms' }} className="animate-on-scroll opacity-0">
              <ProjectCard
                title="Event Ticketing System"
                description="Java-based concert ticket management system simulating Ticketmaster functionality with event creation, ticket browsing, purchasing, and inventory management. Built collaboratively using advanced OOP principles, UML design patterns, and persistent CSV/TXT file storage."
                tech={['Java', 'Advanced OOP', 'UML Diagrams', 'File I/O', 'CSV/TXT', 'Team Collaboration']}
                codeLink="https://github.com/SabasRojas/event-ticketing-system"
              />
            </div>
            <div style={{ animationDelay: '1000ms' }} className="animate-on-scroll opacity-0">
              <ProjectCard
                title="Interactive Gamification Platform"
                description="Full-stack web application designed for gamification systems with robust MySQL backend architecture. Features comprehensive user management, interactive frontend elements, and server-side logic for dynamic content delivery."
                tech={['MySQL', 'PHP', 'HTML/CSS', 'Database Design', 'Web Development']}
                codeLink="https://github.com/SabasRojas/gamification-platform"
              />
            </div>
          </div>

          {/* Show More Projects Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setShowMoreProjects(!showMoreProjects)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-300 font-medium hover:scale-105 border border-gray-600 hover:border-gray-500"
            >
              <span>{showMoreProjects ? '− Show Less' : '+ Show More'}</span>
            </button>
          </div>

          {/* Additional Projects - Expandable */}
          <div className={`transition-all duration-500 ease-in-out ${showMoreProjects ? 'max-h-[800px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
            <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto pt-4 pb-8">
              <div className={`transition-all duration-500 ease-out ${showMoreProjects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: showMoreProjects ? '200ms' : '0ms' }}>
                <ProjectCard
                  title="Omok Strategy Game"
                  description="Advanced two-player strategy game implementation in Haskell featuring sophisticated AI algorithms. Supports Player vs. Player and Player vs. CPU modes with intelligent decision-making on a 15x15 board matrix."
                  tech={['Haskell', 'Functional Programming', 'AI Algorithms', 'Game Theory', 'Strategy Patterns']}
                  codeLink="https://github.com/SabasRojas/omok-game"
                />
              </div>
              <div className={`transition-all duration-500 ease-out ${showMoreProjects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: showMoreProjects ? '300ms' : '0ms' }}>
                <ProjectCard
                  title="Airline Management System"
                  description="Comprehensive terminal-based airline customer interface simulation. Allows users to add flights, view trips, manage bookings, checkout, and navigate through a complete airline menu system. Demonstrates advanced object-oriented programming and user experience design."
                  tech={['Java', 'Terminal Interface', 'OOP', 'System Design', 'User Experience', 'Menu Systems']}
                  codeLink="https://github.com/SabasRojas/Airline-Menu"
                />
              </div>
            </div>
          </div>
          
          {/* Skills highlight section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 text-white">Technical Diversity & Innovation</h3>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🤖</span>
                  </div>
                  <h4 className="font-semibold text-blue-400 text-center">AI & Machine Learning</h4>
                  <p className="text-gray-300 text-sm text-center">Machine learning algorithms, predictive modeling, and data-driven solutions</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🔒</span>
                  </div>
                  <h4 className="font-semibold text-blue-400 text-center">Cybersecurity & Defense</h4>
                  <p className="text-gray-300 text-sm text-center">Penetration testing, DoD compliance, and security assessment tools</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🌐</span>
                  </div>
                  <h4 className="font-semibold text-blue-400 text-center">Full-Stack Development</h4>
                  <p className="text-gray-300 text-sm text-center">Modern web technologies with database integration and responsive and modern design</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-gray-800/30 -mx-6 px-6 animate-on-scroll opacity-0">
          <div className="text-center mb-12 mt-12">
            <h2 className="text-5xl font-bold mb-4 text-white">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-300">Building expertise through real-world impact</p>
          </div>
          <div className="space-y-12 max-w-6xl mx-auto">
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0ms' }}>
              <ExperienceCard
                title="Software Engineering Intern"
                company="JUSDA"
                period="Jan 2023 - May 2023"
                description="Developed enterprise mobile solutions for IT asset management in a fast-paced international logistics company."
                metrics={["40% efficiency improvement", "3-person agile team", "React Native expertise"]}
                achievements={[
                  "Built complete Android application using React Native and TypeScript for barcode-based IT asset tracking system",
                  "Implemented robust offline data handling with SQLite, ensuring 100% data integrity during network outages",
                  "Collaborated with international development team using Git/GitHub, participating in code reviews and sprint planning",
                  "Delivered production-ready features that improved IT asset management efficiency by 40%"
                ]}
                tech={['React Native', 'TypeScript', 'SQLite', 'Git/GitHub', 'Mobile Development', 'Agile']}
              />
            </div>
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '200ms' }}>
              <ExperienceCard
                title="Customer Service Representative"
                company="Family Dollar"
                period="Nov 2024 - Feb 2025"
                description="Delivered exceptional customer service in high-volume retail environment while developing essential professional skills."
                metrics={["100+ customers daily", "Excellent performance", "Fast-paced operations"]}
                achievements={[
                  "Handled 100+ customer transactions daily maintaining excellent accuracy in high-pressure environment",
                  "Maintained store organization, inventory management, and cleanliness standards consistently",
                  "Developed exceptional multitasking abilities and communication skills essential for team collaboration",
                  "Gained valuable real-world experience in customer relations and operational efficiency"
                ]}
                tech={['Customer Service', 'Operations Management', 'Multitasking', 'Communication', 'Problem Solving']}
              />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 animate-on-scroll opacity-0">
          <div className="text-center mb-12 mt-12">
            <h2 className="text-5xl font-bold mb-4 text-white">
              Academic Excellence
            </h2>
            <p className="text-xl text-gray-300">Strong foundation in computer science and innovation</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-800 rounded-2xl p-10 border border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/50">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">Bachelor of Engineering in Computer Science</h3>
                <p className="text-xl font-semibold text-blue-400 mb-6">University of Texas at El Paso (UTEP) • May 2025 • Cum Laude</p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 bg-gray-700 rounded-xl">
                    <span className="block text-2xl mb-2">📊</span>
                    <span className="font-bold text-blue-400">GPA 3.61</span>
                  </div>
                  <div className="p-4 bg-gray-700 rounded-xl">
                    <span className="block text-2xl mb-2">🏆</span>
                    <span className="font-bold text-white">Honors Program</span>
                  </div>
                  <div className="p-4 bg-gray-700 rounded-xl">
                    <span className="block text-2xl mb-2">📚</span>
                    <span className="font-bold text-white">Dean's List (7x)</span>
                  </div>
                  <div className="p-4 bg-gray-700 rounded-xl">
                    <span className="block text-2xl mb-2">👥</span>
                    <span className="font-bold text-white">ACM Member</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-1 gap-8 text-left">
                  <div className="p-6 bg-blue-900/30 rounded-xl">
                    <h4 className="font-bold text-white mb-3">🔍 Google In-Residence Program</h4>
                    <p className="text-gray-300 text-sm">
                      Advanced data structures and algorithms training directly from a Google engineer (Marlon Gamez), focusing on industry-standard practices and optimization techniques.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-2xl font-bold mb-6 text-white text-center">Relevant Coursework</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-700/50 rounded-xl text-center">
                      <h5 className="font-semibold text-blue-400 mb-2">Core Programming</h5>
                      <div className="text-gray-300 text-sm space-y-1">
                        <p>Data Structures & Algorithms</p>
                        <p>Object-Oriented Programming</p>
                        <p>Programming Language Concepts</p>
                        <p>Discrete Structures I & II</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-700/50 rounded-xl text-center">
                      <h5 className="font-semibold text-blue-400 mb-2">Systems & Architecture</h5>
                      <div className="text-gray-300 text-sm space-y-1">
                        <p>Computer Architecture</p>
                        <p>Operating Systems</p>
                        <p>Database Systems</p>
                        <p>Digital Systems Design</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-700/50 rounded-xl text-center">
                      <h5 className="font-semibold text-blue-400 mb-2">AI & Advanced Topics</h5>
                      <div className="text-gray-300 text-sm space-y-1">
                        <p>Machine Learning</p>
                        <p>Artificial Intelligence</p>
                        <p>Data Mining</p>
                        <p>Parallel Computing</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-700/50 rounded-xl text-center">
                      <h5 className="font-semibold text-blue-400 mb-2">Software Engineering</h5>
                      <div className="text-gray-300 text-sm space-y-1">
                        <p>Requirements Engineering</p>
                        <p>Design & Implementation</p>
                        <p>Computer Security</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 bg-gray-800/30 -mx-6 px-6 animate-on-scroll opacity-0">
          <div className="text-center mb-12 mt-12">
            <h2 className="text-5xl font-bold mb-4 text-white">
              Certifications & Training
            </h2>
            <p className="text-xl text-gray-300">Professional development and continuous learning</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Completed Certifications */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/50">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">☁️</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white text-center">AWS Cloud Practitioner Essentials</h3>
                <p className="text-blue-400 font-semibold text-center mb-4">Amazon Web Services</p>
                <p className="text-gray-300 text-sm text-center mb-6">
                  Comprehensive training covering AWS cloud fundamentals, core services, security, architecture, and pricing models.
                </p>
                <div className="flex justify-center">
                  <div className="flex gap-3">
                    <span className="inline-block px-4 py-2 bg-green-600/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                      ✓ Completed
                    </span>
                    <a
                      href="/aws-essentials-certificate.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
                    >
                      View Certificate
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/50">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white text-center">CEO Certification</h3>
                <p className="text-blue-400 font-semibold text-center mb-4">Studio G (NMSU Startup Accelerator)</p>
                <p className="text-gray-300 text-sm text-center mb-6">
                  Entrepreneurship and business leadership certification through intensive startup accelerator program.
                </p>
                <div className="flex justify-center">
                  <div className="flex gap-3">
                    <span className="inline-block px-4 py-2 bg-green-600/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                      ✓ Completed
                    </span>
                    <a
                      href="/CEO-SabasRojas-2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
                    >
                      View Certificate
                    </a>
                  </div>
                </div>
              </div>

              {/* Currently Pursuing */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/50">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white text-center">AWS Cloud Practitioner Certification</h3>
                <p className="text-blue-400 font-semibold text-center mb-4">Amazon Web Services</p>
                <p className="text-gray-300 text-sm text-center mb-6">
                  Currently studying for the official AWS Cloud Practitioner certification exam to validate cloud knowledge.
                </p>
                <div className="flex justify-center">
                  <span className="inline-block px-4 py-2 bg-orange-600/20 text-orange-400 rounded-full text-sm font-medium border border-orange-500/30">
                    📖 In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section id="leadership" className="py-20 bg-gray-800/30 -mx-6 px-6 animate-on-scroll opacity-0">
          <div className="text-center mb-12 mt-12">
            <h2 className="text-5xl font-bold mb-4 text-white">
              Leadership & Initiative
            </h2>
            <p className="text-xl text-gray-300">Demonstrating organizational skills and team building</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-2xl p-10 border border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/50">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⚽</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Founder & Captain - Caudillos Football Club</h3>
                  <p className="text-blue-400 font-semibold mb-4">Ciudad Juárez, Chihuahua, Mexico • July 2023 - Present</p>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Founded and organized a competitive amateur soccer team from the ground up, demonstrating entrepreneurial spirit and leadership capabilities while balancing academic and professional commitments.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Key Responsibilities:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Team recruitment and talent evaluation</li>
                        <li>• Financial management and budgeting</li>
                        <li>• League coordination and scheduling</li>
                        <li>• Training program development</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Skills Developed:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Leadership and team management</li>
                        <li>• Strategic planning and logistics</li>
                        <li>• Conflict resolution</li>
                        <li>• Building competitive culture</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 animate-on-scroll opacity-0">
          <div className="text-center mb-12 mt-12">
            <h2 className="text-5xl font-bold mb-4 text-white">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-300">Ready to discuss opportunities and collaborations</p>
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-800 rounded-2xl p-12 border border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-500/50">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-2xl font-semibold mb-8 text-gray-200">
                Let&apos;s discuss how we can work together.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:rojassabas17@gmail.com"
                  className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-4 md:py-5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 font-bold text-lg md:text-xl hover:shadow-2xl hover:scale-105 max-w-full overflow-hidden"
                  aria-label="Send email to Sabas Rojas"
                >
                  <span>📧</span>
                  <span className="truncate">rojassabas17@gmail.com</span>
                </a>
                <div className="pt-4">
                  <button
                    onClick={(event) => {
                      navigator.clipboard.writeText('rojassabas17@gmail.com');
                      // Show a brief feedback
                      const btn = event.target as HTMLButtonElement;
                      const originalText = btn.textContent;
                      btn.textContent = 'Copied!';
                      setTimeout(() => {
                        btn.textContent = originalText;
                      }, 2000);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-all duration-300 font-medium hover:scale-105"
                    aria-label="Copy email to clipboard"
                  >
                    <span>📋</span>
                    <span>Copy Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-800 text-center">
          <div className="space-y-4">
            <p className="text-gray-400">
              © 2025 Sabas Rojas. Crafted with passion using Next.js and Tailwind CSS.
            </p>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/SabasRojas" className="text-gray-500 hover:text-white transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/sabas-rojas/" className="text-gray-500 hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="mailto:rojassabas17@gmail.com" className="text-gray-500 hover:text-white transition-colors">Email</a>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        /* Hide scrollbar but keep functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
