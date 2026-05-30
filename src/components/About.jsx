import React, { useState } from 'react';
import './About.css';
import myPhoto from '../assets/arunava-profile.jpg';
import myCV from '../assets/Arunava_Chakraborty_CV.pdf';

function About() {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopyEmail = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText('arunava.chakraborty.2024@iimu.ac.in');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Resets the button text after 2 seconds
    };

    const recentExperiences = [
        {
            role: "Consultant — Business Consulting (FSI Domain)",
            company: "Infosys",
            timeline: "Incoming July 2026",
            desc: "Positioned to drive enterprise-scale digital transformation, AI adoption strategies, and process optimization frameworks for top-tier financial services clients."
        },
        {
            role: "Data Analyst Intern",
            company: "Pretium Enterprise Services",
            timeline: "May 2025 — June 2025",
            desc: "Architected a dual-stage machine learning predictive engine to optimize operations, demonstrating tangible ROI through advanced data analytics and intelligent automation."
        }
    ];

    const corporateTenure = [
        {
            role: "IT Analyst (ITA)",
            company: "Tata Consultancy Services (TCS)",
            timeline: "2023 — 2024",
            desc: "Led technical delivery and complex problem-solving for high-impact enterprise systems, bridging the gap between business requirements and scalable IT architectures."
        },
        {
            role: "Systems Engineer",
            company: "Tata Consultancy Services (TCS)",
            timeline: "2020 — 2023",
            desc: "Engineered robust backend solutions and contributed to enterprise-grade applications, building a strong foundation in system architecture and agile delivery methodologies."
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
                    
                    {/* Shifted focus to AI and Strategic Architecture */}
                    <h2 className="webflow-subtitle">
                        Driving Enterprise AI & Digital Transformation Strategy.
                    </h2>
                    <p className="webflow-bio">
                        An engineer turned strategic consultant (MBA, IIM Udaipur, Class of 2026). I specialize in leveraging Applied AI, data-driven frameworks, and cloud-native architectures to solve complex enterprise challenges and scale operational efficiency within the FSI sector.
                    </p>

                    <div className="webflow-btn-group">
                        {/* Interactive Copy-to-Clipboard Button */}
                        <button onClick={handleCopyEmail} className="wf-btn btn-primary tooltip-container">
                            {copySuccess ? 'Copied to Clipboard! ✓' : "Let's Talk →"}
                            <span className="tooltip-text">arunava.chakraborty.2024@iimu.ac.in</span>
                        </button>

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