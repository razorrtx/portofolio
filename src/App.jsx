import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ==============================
   DATA
   ============================== */
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Tech', href: '#tech' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  {
    title: 'Website Development',
    desc: 'Custom-built websites engineered for speed, SEO, and conversions helping your business stand out and grow online.',
  },
  {
    title: 'Front-End Development',
    desc: 'Building responsive, interactive, and user friendly interfaces using modern technologies to deliver seamless user experiences.',
  },
  {
    title: 'Back-End Development',
    desc: 'Developing secure, scalable, and efficient server-side systems, APIs, and databases to power your applications.',
  },
  {
    icon: '⚙️',
    title: 'Full-Stack Development',
    desc: 'End-to-end web development covering both front-end and back-end to create complete, high-performance digital solutions.',
  },
]

const TECH_STACK = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML5', color: '#e34f26' },
      { name: 'CSS3', color: '#1572b6' },
      { name: 'JavaScript', color: '#f7df1e' },
      { name: 'React', color: '#61dafb' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', color: '#339933' },
      { name: 'PHP', color: '#777bb4' },
      { name: 'Laravel', color: '#ff2d20' },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'MySQL', color: '#4479a1' },
      { name: 'PostgreSQL', color: '#4169e1' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', color: '#f05032' },
      { name: 'Figma', color: '#a259ff' },
      { name: 'VS Code', color: '#007acc' },
      { name: 'Docker', color: '#2496ed' },
    ],
  },
]

const PROJECTS = [
  {
    tag: 'News Website',
    title: 'Mobile News Platform',
    desc: 'A mobile-first news application featuring dynamic news feeds, category filtering, and real-time content updates integrated with external News APIs to automatically fetch and display the latest articles within the project.',
    problem: 'Client needed a responsive mobile news interface with seamless API integration to deliver fast, up-to-date, and easily accessible news content.',
    tech: ['flutter', 'Dart', 'python', 'tailwind CSS'],
    bgClass: 'news',
    previewText: 'News-Mobile',
  },
  {
    tag: 'Government',
    title: 'Sistem Informasi Praktik Kerja Lapangan',
    desc: 'A government-based internship management system designed to streamline PKL registration, document submission, approval workflow, and reporting within a public institution.',
    problem: 'Manual registration process, scattered documents, slow approval flow, and lack of centralized monitoring.',
    tech: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS'],
    bgClass: 'goverment',
    previewText: 'PKL',
  },
]

const PROCESS_STEPS = [
  { icon: '🔍', title: 'Research', desc: 'Understanding goals, audience, and requirements' },
  { icon: '📐', title: 'Planning', desc: 'Architecture, wireframes, and tech decisions' },
  { icon: '💻', title: 'Development', desc: 'performant, and maintainable code' },
  { icon: '🧪', title: 'Testing', desc: 'Debugging, responsive, and performance QA' },
  { icon: '🚀', title: 'Deployment', desc: 'Launch, monitoring, and ongoing support' },
]

/* ==============================
   HOOK: Intersection Observer
   ============================== */
function useInView() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    const targets = el.querySelectorAll('.animate-in')
    targets.forEach((t) => observer.observe(t))
    return () => targets.forEach((t) => observer.unobserve(t))
  }, [])
  return ref
}

/* ==============================
   COMPONENT: Navbar
   ============================== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#" className="navbar-logo gradient-text">GIA RIZKY LINGGARDI</a>
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => handleNav(e, l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button
          className={`mobile-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

/* ==============================
   COMPONENT: Hero
   ============================== */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-grid" />
      </div>
      <div className="container hero-content">
        <div className="hero-badge">
          <span className="dot" />
          Available for freelance, Part-time, and full-time
        </div>
        <h1 className="heading-xl">
          Freelance Web Developer<br />
          <span className="gradient-text">Building Modern, High-Performance Websites</span>
        </h1>
        <p className="hero-subtitle">
          I help businesses and startups build modern, scalable, and conversion-driven websites
          that elevate their digital presence and accelerate growth.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Hire Me →
          </a>
          <a href="#projects" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
            View My Work
          </a>
        </div> <br />
      </div>
    </section>
  )
}

/* ==============================
   COMPONENT: Problem & Solution
   ============================== */
function ProblemSolution() {
  const ref = useInView()
  return (
    <section className="section problem-solution" id="problem-solution" ref={ref}>
      <div className="container">
        <div className="animate-in" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">Why It Matters</span>
          <h2 className="heading-lg">Your Website Should Work <span className="gradient-text">For You</span></h2>
        </div>
        <div className="ps-grid">
          <div className="card ps-card problem animate-in delay-1">
            <h3>The Problem</h3>
            <ul>
              <li><span className="icon">⚠️</span> Slow loading speeds that drive visitors away</li>
              <li><span className="icon">⚠️</span> Not mobile-friendly, losing 60%+ of traffic</li>
              <li><span className="icon">⚠️</span> Outdated design that undermines brand trust</li>
              <li><span className="icon">⚠️</span> Poor conversion — visitors don't become customers</li>
            </ul>
          </div>
          <div className="card ps-card solution animate-in delay-2">
            <h3>My Solution</h3>
            <ul>
              <li><span className="icon">✅</span> Lightning-fast performance, optimized to the core</li>
              <li><span className="icon">✅</span> Fully responsive across every device and screen</li>
              <li><span className="icon">✅</span> Modern design that builds instant credibility</li>
              <li><span className="icon">✅</span> Conversion-focused layout and UX strategies</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==============================
   COMPONENT: About
   ============================== */
function About() {
  const ref = useInView()
  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className="animate-in" style={{ marginBottom: 48 }}>
          <span className="section-label">About Me</span>
          <h2 className="heading-lg">Passionate About Crafting<br/><span className="gradient-text">Exceptional Web Experiences</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-text animate-in delay-1">
            <p>
              I'm a web developer who thrives on building high-performance, scalable, and maintainable applications. I care deeply about performance optimization, and creating seamless user experiences. 
            </p>
            <p>
              From responsive landing pages and corporate websites to complex dashboards
              and full-stack web applications I bring a systematic, detail-oriented
              approach to every project I take on.
            </p>
            <p>
              I'm available for remote freelance projects, contract work, and full-time
              opportunities. Let's build something great together.
            </p>
            <div className="about-traits">
              <span className="trait-badge">🎯 Detail-Oriented</span>
              <span className="trait-badge">🧩 Problem Solver</span>
              <span className="trait-badge">⚡ Fast Learner</span>
              <span className="trait-badge">🤝 Team Player</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==============================
   COMPONENT: Services
   ============================== */
function Services() {
  const ref = useInView()
  return (
    <section className="section services" id="services" ref={ref}>
      <div className="container">
        <div className="animate-in" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">Services</span>
          <h2 className="heading-lg">Solutions That <span className="gradient-text">Drive Results</span></h2>
          <p className="text-body" style={{ maxWidth: 560, margin: '12px auto 0' }}>
            I offer end-to-end web development services designed to help businesses
            grow, convert, and scale effectively.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className={`card service-card animate-in delay-${i + 1}`} key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==============================
   COMPONENT: Tech Stack
   ============================== */
function TechStack() {
  const ref = useInView()
  return (
    <section className="section" id="tech" ref={ref}>
      <div className="container">
        <div className="animate-in" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">Tech Stack</span>
          <h2 className="heading-lg">Tools & Technologies <span className="gradient-text">I Work With</span></h2>
        </div>
        <div className="tech-categories animate-in delay-1">
          {TECH_STACK.map((cat) => (
            <div className="tech-category" key={cat.category}>
              <h3>{cat.category}</h3>
              <div className="tech-list">
                {cat.items.map((item) => (
                  <div className="tech-item" key={item.name}>
                    <div
                      className="tech-icon"
                      style={{ background: `${item.color}20`, color: item.color }}
                    >
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==============================
   COMPONENT: Projects
   ============================== */
function FeaturedProjects() {
  const ref = useInView()
  return (
    <section className="section projects" id="projects" ref={ref}>
      <div className="container">
        <div className="animate-in" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">Featured Projects</span>
          <h2 className="heading-lg">Real Work, <span className="gradient-text">Real Results</span></h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div className={`card project-card animate-in delay-${i + 1}`} key={p.title}>
              <div className="project-preview">
                <div className={`project-preview-bg ${p.bgClass}`}>{p.previewText}</div>
              </div>
              <div className="project-info">
                <span className="project-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href="https://github.com/grzkyl" className="btn btn-primary btn-sm">Github</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==============================
   COMPONENT: Work Process
   ============================== */
function WorkProcess() {
  const ref = useInView()
  return (
    <section className="section" id="process" ref={ref}>
      <div className="container">
        <div className="animate-in" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">My Working Method</span>
          <h2 className="heading-lg">A Systematic <span className="gradient-text">Approach</span></h2>
          <p className="text-body" style={{ maxWidth: 520, margin: '12px auto 0' }}>
            Every project follows a proven process to ensure quality delivery, clear communication, and on-time results.
          </p>
        </div>
        <div className="process-timeline animate-in delay-1">
          {PROCESS_STEPS.map((s, i) => (
            <div className="process-step" key={s.title}>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
 

/* ==============================
   COMPONENT: CTA
   ============================== */
function CTA() {
  const ref = useInView()
  return (
    <section className="section cta-section" ref={ref}>
      <div className="cta-bg" />
      <div className="container cta-content">
        <div className="animate-in">
          <span className="section-label">Ready to Start?</span>
          <h2 className="heading-lg">Let's Build Something<br /><span className="gradient-text">Great Together</span></h2>
          <p>
            Whether you need a stunning landing page, a robust web application,
            or a complete digital transformation — I'm here to help you bring your
            vision to life.
          </p>
          <div className="cta-buttons">
            <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Contact Me →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==============================
   COMPONENT: Contact
   ============================== */
function Contact() {
  const ref = useInView()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="container">
        <div className="animate-in" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">Get In Touch</span>
          <h2 className="heading-lg">Let's Talk About <span className="gradient-text">Your Project</span></h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info animate-in delay-1">
            <p className="text-body" style={{ marginBottom: 24 }}>
              Have a project idea, a job opportunity, or just want to say hi?
              I'd love to hear from you. Feel free to reach out through any of
              these channels or use the form.
            </p>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-item-text">
                <div className="label">Email</div>
                <div className="value">gialinggardy156@gmail.com</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">💼</div>
              <div className="contact-item-text">
                <div className="label">LinkedIn</div>
                <div className="value">linkedin.com/in/gia-rizky-linggardi-5424a3371</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🐙</div>
              <div className="contact-item-text">
                <div className="label">GitHub</div>
                <div className="value">github.com/grzkyl</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📅</div>
              <div className="contact-item-text">
                <div className="label">Instagram</div>
                <div className="value">instagram.com/grizkyl</div>
              </div>
            </div>
          </div>
          <form className="contact-form animate-in delay-2" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Project inquiry" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell me about your project..." value={formData.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ==============================
   COMPONENT: Footer
   ============================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-logo gradient-text">GIA RIZKY LINGGARDI</span>
        <ul className="footer-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <span className="footer-copy">© 2026 Gia Rizky Linggardi. All rights reserved.</span>
      </div>
    </footer>
  )
}

/* ==============================
   APP
   ============================== */
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemSolution />
      <About />
      <Services />
      <TechStack />
      <FeaturedProjects />
      <WorkProcess />
      <CTA />
      <Contact />
      <Footer />
    </>
  )
}

export default App
