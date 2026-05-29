import React from 'react';
import './About.css';
import myPhoto from '../assets/arunava-profile.jpg';
import myCV from '../assets/Arunava Chakraborty_CV.pdf';

function About() {
    const recentExperiences = [
        {
            role: "Consultant — Business Consulting",
            company: "Infosys",
            timeline: "Incoming May 2026",
            desc: "Spearheading enterprise-scale digital transformation initiatives, cloud architecture transitions, and macro analytics system frameworks."
        },
        {
            role: "Data Analyst Intern",
            company: "Pretium Enterprise Services",
            timeline: "Summer Internship",
            desc: "Architected a dual-stage machine learning predictive engine tracking automated email intelligence loops and logistic fleet asset arrays."
        },
        {
            role: "Rental Operations Intern",
            company: "Progress Residential",
            timeline: "June 2025",
            desc: "Engineered multi-market real estate risk models, asset optimization sheets, and data-driven corporate evaluation metrics."
        }
    ];

    const corporateTenure = [
        {
            role: "IT Analyst (ITA)",
            company: "Tata Consultancy Services (TCS)",
            timeline: "2024",
            desc: "Promoted to drive complex technical problem-solving and manage high-impact enterprise systems following a strong trajectory of continuous learning and delivery."
        },
        {
            role: "Java Developer",
            company: "Tata Consultancy Services (TCS)",
            timeline: "2020 — 2024",
            desc: "Honed foundational technical skills by contributing to various high-impact enterprise projects, building robust backend architectures across a 3.5-year tenure."
        }
    ];

    const leadershipAndCredentials = [
        {
            role: "Committee Leader, Technalytics",
            company: "IIM Udaipur",
            timeline: "2024 — 2026",
            desc: "Spearheaded the Analytics and IT Club, directing strategic initiatives and organizing the flagship summit, Analytica. Fostered collaborative academic and professional engagement."
        },
        {
            role: "Quantum Computing & Supply Chain Management",
            company: "IIT Madras & NPTEL",
            timeline: "Certification",
            desc: "Completed advanced professional coursework to integrate emerging quantum computational theories with operational supply chain architectures."
        },
        {
            role: "Lean Six Sigma Green Belt",
            company: "Professional Certification",
            timeline: "Certification",
            desc: "Certified in advanced process optimization and statistical quality control methodologies."
        }
    ];

    return (
        <div className="webflow-hero-container" id="profile">

            {/* SECTION 1: HERO BANNER */}
            <div className="webflow-hero-grid">
                <div className="hero-text-block">
                    <div className="status-pill">
                        <span className="pulse-dot"></span> Available for strategic consultations
                    </div>
                    <h1 className="webflow-title">
                        Hi, I'm <span className="gradient-text">Arunava Chakraborty</span>.
                    </h1>
                    <h2 className="webflow-subtitle">
                        Bridging Quant Engineering & Corporate Financial Architectures.
                    </h2>
                    <p className="webflow-bio">
                        An engineer turned finance professional (MBA, IIM Udaipur, Class of 2026). I build high-performance
                        full-stack tools, scale algorithmic model screeners, and optimize financial decision
                        pipelines with data science.
                    </p>

                    <div className="webflow-btn-group">
                        <a href="mailto:your.email@example.com" className="wf-btn btn-primary">
                            Let's Talk <span>→</span>
                        </a>
                        <a href="https://www.linkedin.com/in/arunava-chakraborty-iimu/" target="_blank" rel="noreferrer" className="wf-btn btn-secondary">
                            LinkedIn
                        </a>
                        <a
                            href={myCV}
                            download="Arunava_Chakraborty_CV.pdf"
                            className="wf-btn btn-tertiary"
                        >
                            📄 Download CV
                        </a>
                    </div>
                </div>

                <div className="hero-image-block">
                    <div className="image-frame-wrapper">
                        <img
                            src={myPhoto}
                            alt="Arunava Chakraborty"
                            className="webflow-profile-img"
                        />
                        <div className="frame-decoration-glow"></div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: RECENT ROLES */}
            <div className="webflow-experience-section" id="experience">
                <div className="section-header-block">
                    <span className="section-counter-tag">// 01. TIMELINE</span>
                    <h3 className="section-main-title">Professional Milestones</h3>
                </div>
                <div className="webflow-timeline-stack">
                    {recentExperiences.map((exp, index) => (
                        <div key={`recent-${index}`} className="wf-experience-row">
                            <div className="wf-time-col">
                                <span className="wf-date-label">{exp.timeline}</span>
                            </div>
                            <div className="wf-dot-col">
                                <div className="wf-timeline-node"></div>
                            </div>
                            <div className="wf-content-col">
                                <h4 className="wf-role-title">{exp.role}</h4>
                                <h5 className="wf-company-subtext">{exp.company}</h5>
                                <p className="wf-details-body">{exp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 3: FOUNDATION */}
            <div className="webflow-experience-section" id="foundation">
                <div className="section-header-block">
                    <span className="section-counter-tag">// 02. FOUNDATION</span>
                    <h3 className="section-main-title">Pre-MBA Corporate Tenure</h3>
                </div>
                <div className="webflow-timeline-stack">
                    {corporateTenure.map((exp, index) => (
                        <div key={`corp-${index}`} className="wf-experience-row">
                            <div className="wf-time-col">
                                <span className="wf-date-label">{exp.timeline}</span>
                            </div>
                            <div className="wf-dot-col">
                                <div className="wf-timeline-node"></div>
                            </div>
                            <div className="wf-content-col">
                                <h4 className="wf-role-title">{exp.role}</h4>
                                <h5 className="wf-company-subtext">{exp.company}</h5>
                                <p className="wf-details-body">{exp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 4: LEADERSHIP */}
            <div className="webflow-experience-section" id="leadership">
                <div className="section-header-block">
                    <span className="section-counter-tag">// 03. EXECUTIVE</span>
                    <h3 className="section-main-title">Leadership & Certifications</h3>
                </div>
                <div className="webflow-timeline-stack">
                    {leadershipAndCredentials.map((exp, index) => (
                        <div key={`lead-${index}`} className="wf-experience-row">
                            <div className="wf-time-col">
                                <span className="wf-date-label">{exp.timeline}</span>
                            </div>
                            <div className="wf-dot-col">
                                <div className="wf-timeline-node"></div>
                            </div>
                            <div className="wf-content-col">
                                <h4 className="wf-role-title">{exp.role}</h4>
                                <h5 className="wf-company-subtext">{exp.company}</h5>
                                <p className="wf-details-body">{exp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default About;