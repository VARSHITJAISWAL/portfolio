import { useState, useEffect, useRef } from "react";
import styles from "./Portfolio.module.css";
import emailjs from '@emailjs/browser';

// ─── SVG ICONS ───────────────────────────────────────────────────────────────

const IconJava = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
    <path d="M8.5 19.5c0 0 -1.5 1 3.5 1s5 -1 5 -1"/>
    <path d="M8.5 22c0 0 -1 .5 3.5 .5s5 -.5 5 -.5"/>
    <path d="M9 13c0 0 -1.5 .5 -1.5 2s1 2 4.5 2s4.5 -1 4.5 -2s-1.5 -2 -1.5 -2"/>
    <path d="M6 2c0 0 6 3 4 7s-6 4 -4 8"/>
    <path d="M10 2c0 0 6 3 4 7s-6 4 -4 8"/>
  </svg>
);

const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const IconDSA = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const IconWeb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconDB = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const IconBrain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z"/>
  </svg>
);

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const IconGrad = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12"/>
    <path d="M2 12h20"/>
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const IconTrain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="52" height="52">
    <rect x="4" y="3" width="16" height="14" rx="3"/>
    <path d="M4 11h16"/>
    <path d="M12 3v8"/>
    <path d="M8 19l-2 3"/>
    <path d="M16 19l2 3"/>
    <path d="M8 19h8"/>
    <circle cx="8.5" cy="15.5" r="1"/>
    <circle cx="15.5" cy="15.5" r="1"/>
  </svg>
);

const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="52" height="52">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconAward = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const IconAI = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
    <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4"/>
    <path d="M12 10v4"/>
    <path d="M8 14h8"/>
    <path d="M6 18a6 6 0 0 1 12 0"/>
    <circle cx="6" cy="6" r="2"/>
    <circle cx="18" cy="6" r="2"/>
    <line x1="6" y1="6" x2="8" y2="14"/>
    <line x1="18" y1="6" x2="16" y2="14"/>
  </svg>
);

const IconSoftware = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="26" height="26">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8"/>
    <path d="M12 17v4"/>
    <path d="M7 8l2 2-2 2"/>
    <path d="M11 12h4"/>
  </svg>
);

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Contact"];

const SKILLS = [
  { name: "Java", level: 85, Icon: IconJava, tag: "LANGUAGE" },
  { name: "Python", level: 65, Icon: IconCode, tag: "LANGUAGE" },
  { name: "DSA in Java", level: 80, Icon: IconDSA, tag: "CORE" },
  { name: "HTML & CSS", level: 70, Icon: IconWeb, tag: "WEB" },
  { name: "SQL", level: 65, Icon: IconDB, tag: "DATABASE" },
  { name: "Artificial Intelligence", level: 15, Icon: IconBrain, tag: "LEARNING" },
];

const EDUCATION = [
  {
    degree: "B.Tech in Computer Science Engineering",
    school: "Bansal Group of Institutions, Bhopal",
    detail: "Expected 2027 · CGPA 6.94",
  },
  {
    degree: "Class 12th — Senior Secondary",
    school: "Maharishi Vidya Mandir, Hamirpur, U.P.",
    detail: "66.4%",
  },
  {
    degree: "Class 10th — Secondary",
    school: "Maharishi Vidya Mandir, Hamirpur, U.P.",
    detail: "68.4%",
  },
];

const EXPERIENCE = [
  {
    title: "Frontend Development Trainee Intern",
    company: "Codveda",
    date: "",
    stipend: "",
    badge: "Internship",
    points: [
      "Worked on real-world frontend development tasks and feature builds.",
      "Gained practical exposure to modern web development workflows.",
      "Collaborated with a team, learning communication and code-review etiquette.",
    ],
  },
  {
    title: "Backend Developer Intern",
    company: "Softech Infinite Solution, Indore",
    date: "25/04/2026 — 25/06/2026",
    stipend: "Stipend ₹5,000/month",
    badge: "Internship",
    points: [
      "Working on backend design and deployment for production-grade applications.",
      "Building scalable APIs and handling server-side architecture decisions.",
      "Managing deployment workflows and ensuring reliable service delivery.",
    ],
  },
];

const PROJECTS = [
  {
    badge: "SIH National Level",
    tags: ["Hackathon", "Java", "Backend"],
    title: "Secure Ticket Resell System",
    desc: "A platform to securely resell unused IRCTC tickets — designed to reduce ticket wastage and improve resource utilization across the railway network. Built and selected at the Smart India Hackathon (national level).",
    meta: ["Team of 6", "National finalist"],
    Icon: IconTrain,
    codeUrl: "https://github.com/Shauryashri790",
    demoUrl: "#",
  },
  {
    badge: "National Level Hackathon",
    tags: ["Hackathon", "Web", "Maps & Navigation"],
    title: "EV Charging Station Locator & Navigator",
    desc: "A website that helps EV drivers locate the nearest charging stations and navigate to them in real time. Built and showcased at a national-level hackathon, focused on making electric mobility more accessible across India.",
    meta: ["Team project", "National level"],
    Icon: IconBolt,
    codeUrl: "https://github.com/Shauryashri790",
    demoUrl: "#",
  },
];

const AIMS = [
  {
    Icon: IconAI,
    title: "AI Engineer.",
    desc: "Building intelligent systems that learn, reason and solve real-world problems.",
    highlight: false,
  },
  {
    Icon: IconSoftware,
    title: "Software Developer.",
    desc: "Java with strong DSA foundations.",
    highlight: false,
  },
  {
    Icon: IconWeb,
    title: "Web Developer.",
    desc: "Crafting responsive, modern interfaces with HTML, CSS and beyond.",
    highlight: false,
  },
];

// ─── ANIMATED BAR ─────────────────────────────────────────────────────────────

function AnimatedBar({ level, animate }) {
  return (
    <div className={styles.barTrack}>
      <div
        className={styles.barFill}
        style={{ width: animate ? `${level}%` : "0%" }}
      />
    </div>
  );
}

// ─── SECTION ─────────────────────────────────────────────────────────────────

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      {children}
    </section>
  );
}

function SectionLabel({ text }) {
  return <p className={styles.sectionLabel}>— {text}</p>;
}

function SectionTitle({ children }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
      <div className={styles.navInner}>
        <div className={styles.navLogo}>
          <span className={styles.navLogoIcon}>S</span>
          <span className={styles.navLogoText}>shaurya.</span>
        </div>

        <ul className={styles.navLinks}>
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button className={styles.navLink} onClick={() => scrollTo(l)}>
                {l}
              </button>
            </li>
          ))}
        </ul>

        {/* Hire me now scrolls to contact */}
        <button
          className={styles.hireMeBtn}
          onClick={() => scrollTo("contact")}
        >
          Hire me <IconArrow />
        </button>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? styles.hamBarOpen1 : styles.hamBar} />
          <span className={menuOpen ? styles.hamBarOpen2 : styles.hamBar} />
          <span className={menuOpen ? styles.hamBarOpen3 : styles.hamBar} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={styles.mobileNavLink}
              onClick={() => scrollTo(l)}
            >
              {l}
            </button>
          ))}
          <button
            className={styles.hireMeBtn}
            onClick={() => { scrollTo("contact"); setMenuOpen(false); }}
          >
            Hire me <IconArrow />
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <Section id="hero" className={styles.heroSection}>
      <div className={styles.heroLeft}>
        <h1 className={styles.heroName}>
          Shaurya<br />Shrivastava<span className={styles.heroDot}>.</span>
        </h1>
        <div className={styles.heroUnderline} />
        <div className={styles.heroSocials}>
          <a href="https://github.com/Shauryashri790" target="_blank" rel="noreferrer" className={styles.socialIcon} title="GitHub">
            <IconGitHub />
          </a>
          <a href="https://www.linkedin.com/in/shaurya-shrivastava-aba436297/" target="_blank" rel="noreferrer" className={styles.socialIcon} title="LinkedIn">
            <IconLinkedIn />
          </a>
          <a href="https://www.instagram.com/_shauryaa.16/" target="_blank" rel="noreferrer" className={styles.socialIcon} title="Instagram">
            <IconInstagram />
          </a>
        </div>
      </div>

      <div className={styles.heroCenter}>
        <div className={styles.heroPhotoWrap}>
          <img
               src="shaurya.png"
            alt="Shaurya Shrivastava"
            className={styles.heroPhoto}
          />
          <div className={styles.heroPhotoBorder} />
        </div>
      </div>

      <div className={styles.heroRight}>
        <p className={styles.introLabel}>— INTRODUCTION</p>
        <h2 className={styles.heroTagline}>
          CSE Student & aspiring AI Engineer, based in Bhopal, India.
        </h2>
        <p className={styles.heroDesc}>
          3rd-year Computer Science student at Bansal Group of Institutions.
          Passionate about Java, Data Structures & Algorithms, and currently
          exploring Artificial Intelligence.
        </p>
        <div className={styles.heroBtns}>
          <button
            className={styles.btnPrimary}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Projects <IconArrow />
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </button>
        </div>
      </div>
    </Section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <Section id="about" className={styles.aboutSection}>
      <div className={styles.aboutLeft}>
        <SectionLabel text="ABOUT" />
        <SectionTitle>About me<span className={styles.dot}>.</span></SectionTitle>
        <p className={styles.aboutText}>
          I'm a dedicated and motivated student with a strong interest in
          software development and Artificial Intelligence. My programming
          journey started with <strong>Java</strong>, which gradually led me
          deep into the world of Data Structures & Algorithms.
        </p>
        <p className={styles.aboutText}>
          I have a basic foundation in web technologies (HTML, CSS) and a
          working knowledge of SQL. Currently, I'm focused on building
          intelligent systems and learning the principles of AI to solve
          real-world problems.
        </p>
        <a href="resumeShaurya.docx" className={styles.resumeLink}>
          <IconDownload /> Download Resume
        </a>
      </div>

      <div className={styles.aboutRight}>
        <SectionLabel text="EDUCATION" />
        <div className={styles.eduList}>
          {EDUCATION.map((e, i) => (
            <div key={i} className={styles.eduCard}>
              <span className={styles.eduIcon}><IconGrad /></span>
              <div>
                <p className={styles.eduDegree}>{e.degree}</p>
                <p className={styles.eduSchool}>{e.school}</p>
                <p className={styles.eduDetail}>{e.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function Skills() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="skills" className={styles.skillsSection}>
      <div className={styles.skillsHeader}>
        <div>
          <SectionLabel text="SKILLS" />
          <SectionTitle>My toolkit<span className={styles.dot}>.</span></SectionTitle>
        </div>
        <p className={styles.skillsSubtitle}>
          A blend of strong programming fundamentals and a curious mind always
          exploring new technologies — currently leaning into AI.
        </p>
      </div>
      <div ref={ref} className={styles.skillsGrid}>
        {SKILLS.map((s) => (
          <div key={s.name} className={styles.skillCard}>
            <div className={styles.skillCardTop}>
              <span className={styles.skillIcon}><s.Icon /></span>
              <span className={styles.skillTag}>{s.tag}</span>
            </div>
            <p className={styles.skillName}>{s.name}</p>
            <AnimatedBar level={s.level} animate={animate} />
            <p className={styles.skillLevel}>{s.level}%</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function Experience() {
  return (
    <Section id="experience" className={styles.expSection}>
      <SectionLabel text="EXPERIENCE" />
      <SectionTitle>Where I've worked<span className={styles.dot}>.</span></SectionTitle>
      <div className={styles.expTimeline}>
        {EXPERIENCE.map((e, i) => (
          <div key={i} className={styles.expRow}>
            <div className={styles.expDot}>
              <IconBriefcase />
            </div>
            <div className={styles.expCard}>
              <div className={styles.expCardHeader}>
                <div>
                  <p className={styles.expTitle}>{e.title}</p>
                  <p className={styles.expCompany}>{e.company}</p>
                  {e.date && (
                    <p className={styles.expMeta}>
                      {e.date} · {e.stipend}
                    </p>
                  )}
                </div>
                <span className={styles.expBadge}>{e.badge}</span>
              </div>
              <ul className={styles.expPoints}>
                {e.points.map((p, j) => (
                  <li key={j}>
                    <span className={styles.expBullet} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <Section id="projects" className={styles.projectsSection}>
      <div className={styles.projectsHeader}>
        <SectionTitle>Featured work<span className={styles.dot}>.</span></SectionTitle>
        <p className={styles.projectsSubtitle}>
          A selection of things I've built — from hackathons to coursework.
        </p>
      </div>
      <div className={styles.projectsList}>
        {PROJECTS.map((p, i) => (
          <div key={i} className={styles.projectCard}>
            <div className={styles.projectLeft}>
              <span className={styles.projectBadge}>{p.badge}</span>
              <div className={styles.projectIconWrap}>
                <p.Icon />
              </div>
            </div>
            <div className={styles.projectRight}>
              <div className={styles.projectTags}>
                {p.tags.map((t) => (
                  <span key={t} className={styles.projectTag}>{t}</span>
                ))}
              </div>
              <h3 className={styles.projectTitle}>{p.title}</h3>
              <p className={styles.projectDesc}>{p.desc}</p>
              <div className={styles.projectMeta}>
                {p.meta.map((m, mi) => (
                  <span key={m} className={styles.projectMetaItem}>
                    {mi === 0 ? <IconUsers /> : <IconAward />} {m}
                  </span>
                ))}
              </div>
              <div className={styles.projectBtns}>
                <a href={p.codeUrl} target="_blank" rel="noreferrer" className={styles.btnOutline}>
                  <IconGitHub /> Code
                </a>
                <a href={p.demoUrl} target="_blank" rel="noreferrer" className={styles.btnPrimary}>
                  Live demo <IconArrow />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── AIMS ────────────────────────────────────────────────────────────────────

function Aims() {
  return (
    <Section id="aims" className={styles.aimsSection}>
      <div className={styles.aimsLeft}>
        <SectionLabel text="WHAT I AIM TO DO" />
        <SectionTitle>
          The future I'm building toward<span className={styles.dot}>.</span>
        </SectionTitle>
        <p className={styles.aimsSubtitle}>
          Open to opportunities in AI, software development and web — where
          curiosity meets craft.
        </p>
      </div>
      <div className={styles.aimsCards}>
        {AIMS.map((a) => (
          <div
            key={a.title}
            className={`${styles.aimCard} ${a.highlight ? styles.aimCardHighlight : ""}`}
          >
            <span className={styles.aimIcon}><a.Icon /></span>
            <p className={styles.aimTitle}>{a.title}</p>
            <p className={styles.aimDesc}>{a.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
  e.preventDefault();

  emailjs.send(
    'service_61e8okp',
    'template_tukvhhc',
    {
      user_name: form.name,
      user_email: form.email,
      message: form.message,
    },
    'CTI2zG8nqlxdYFtwz'
  )
  .then(() => {
    setSent(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSent(false), 3000);
  })
  .catch((error) => {
    console.log(error);
    alert("Failed to Send");
  });
};

  return (
    <Section id="contact" className={styles.contactSection}>
      <div className={styles.contactLeft}>
        <SectionLabel text="CONTACT" />
        <SectionTitle>Let's work together<span className={styles.dot}>.</span></SectionTitle>
        <p className={styles.contactSubtitle}>
          Got a project, an opportunity, or just want to say hi? My inbox is
          always open.
        </p>
        <div className={styles.contactItems}>
          <a href="mailto:shauryashri9@gmail.com" className={styles.contactItem}>
            <span className={styles.contactItemIcon}><IconMail /></span>
            <div>
              <p className={styles.contactItemLabel}>EMAIL</p>
              <p className={styles.contactItemVal}>shauryashri9@gmail.com</p>
            </div>
          </a>
          <a href="tel:+918318511266" className={styles.contactItem}>
            <span className={styles.contactItemIcon}><IconPhone /></span>
            <div>
              <p className={styles.contactItemLabel}>PHONE</p>
              <p className={styles.contactItemVal}>+91 8318511266</p>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/shaurya-shrivastava-aba436297/" target="_blank" rel="noreferrer" className={styles.contactItem}>
            <span className={styles.contactItemIcon}><IconLinkedIn /></span>
            <div>
              <p className={styles.contactItemLabel}>LINKEDIN</p>
              <p className={styles.contactItemVal}>shaurya-shrivastava</p>
            </div>
          </a>
          <a href="https://github.com/Shauryashri790" target="_blank" rel="noreferrer" className={styles.contactItem}>
            <span className={styles.contactItemIcon}><IconGitHub /></span>
            <div>
              <p className={styles.contactItemLabel}>GITHUB</p>
              <p className={styles.contactItemVal}>Shauryashri790</p>
            </div>
          </a>
        </div>
      </div>

      <div className={styles.contactRight}>
        <div className={styles.contactForm}>
          <h3 className={styles.formTitle}>Send a message</h3>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>YOUR NAME</label>
            <input
              className={styles.formInput}
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>YOUR EMAIL</label>
            <input
              className={styles.formInput}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>MESSAGE</label>
            <textarea
              className={styles.formTextarea}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button className={styles.sendBtn} onClick={handleSend}>
            {sent ? (
              "Sent successfully!"
            ) : (
              <>Send message <IconSend /></>
            )}
          </button>
        </div>
      </div>
    </Section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2026 Shaurya Shrivastava. Crafted with care.</p>
      <div className={styles.footerSocials}>
        <a href="https://github.com/Shauryashri790" target="_blank" rel="noreferrer" className={styles.footerIcon}>
          <IconGitHub />
        </a>
        <a href="https://www.linkedin.com/in/shaurya-shrivastava-aba436297/" target="_blank" rel="noreferrer" className={styles.footerIcon}>
          <IconLinkedIn />
        </a>
        <a href="mailto:shauryashri9@gmail.com" className={styles.footerIcon}>
          <IconMail />
        </a>
      </div>
    </footer>
  );
}


// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <div className={styles.root}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Aims />
      <Contact />
      <Footer />
    </div>
  );
}
