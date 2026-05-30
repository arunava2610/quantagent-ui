import React, { useState, useEffect } from 'react';
import './Projects.css';

function Projects() {
  // Report Downloader Tool State Matrix
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState(''); // NEW: Email delivery state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Static reference project portfolios
  const otherProjects = [
    {
      title: "Corporate Valuation Deck — Ather Energy",
      domain: "Corporate Finance",
      description: "Rigorous valuation profiling, automated asset yield forecasts, and cash flow evaluations within the high-growth Indian EV market matrix."
    },
    {
      title: "Technalytics: Analytica Summit Lead",
      domain: "Strategic Engineering Leadership",
      description: "Directed the analytics division conference framework, arranging enterprise panels, tracking corporate strategy datasets, and managing industry mentorship connections."
    }
  ];

  // Fetch the dynamic companies list from the backend (which pulls from Drive)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/companies`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not link to the report engine gateway.");
        return res.json();
      })
      .then((data) => setCompanies(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleCheckboxChange = (ticker) => {
    if (selectedCompanies.includes(ticker)) {
      setSelectedCompanies(selectedCompanies.filter((c) => c !== ticker));
    } else {
      setSelectedCompanies([...selectedCompanies, ticker]);
    }
  };

  const handleGenerateReport = async () => {
    if (selectedCompanies.length === 0) {
      alert("Please select at least one enterprise entity.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companies: selectedCompanies,
          custom_feedback: feedback,
          email: email.trim() // Pass the email to the backend
        })
      });

      if (!response.ok) throw new Error("The backend cluster failed to process the request.");

      // Check if the backend sent JSON (Email Success) or a File (Direct Download)
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        // Email routing success
        const data = await response.json();
        alert(`✅ ${data.message}`);
      } else {
        // Standard browser download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'NIFTY_Custom_Screening_Report.docx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="projects-container pt-5" id="portfolio">
      <h3 className="projects-main-title mb-4 pb-3">🚀 AI Strategy & Engineering Portfolios</h3>

      {/* 🛠️ LIVE INTERACTIVE APPLICATION INTERFACE BLOCK */}
      <div className="live-tool-wrapper card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
        <div className="tool-banner p-4">
          <div className="d-flex align-items-center gap-2">
            <span className="badge live-indicator">LIVE SYSTEM TOOL</span>
            <h4 className="m-0 fw-bold text-white">GenAI Enterprise Transformation Screener</h4>
          </div>
          <p className="m-0 mt-2 text-light-blue small">
            Select industry leaders to dynamically generate automated AI readiness reports via Gemini.
          </p>
        </div>

        <div className="tool-body p-4">
          {error && (
            <div className="alert custom-error-alert d-flex align-items-center gap-2 small" role="alert">
              <span>⚠️</span>
              <div><strong>Gateway Alert:</strong> {error}</div>
            </div>
          )}

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="fw-semibold form-label-text small">📁 Target Enterprises for Evaluation:</label>
              <span className="selected-counter">Selected: {selectedCompanies.length}</span>
            </div>

            <div className="company-selection-grid">
              {companies.map((comp) => {
                const checked = selectedCompanies.includes(comp.ticker);
                return (
                  <label key={comp.ticker} className={`company-check-card ${checked ? 'active-card' : ''}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCheckboxChange(comp.ticker)}
                      className="form-check-input custom-checkbox"
                    />
                    <span className="check-text-label">
                      <strong>{comp.ticker.replace('.NS', '')}</strong>
                      <span className="company-dot-name"> • {comp.name}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <label className="fw-semibold form-label-text small mb-2">🧠 Strategic Guidelines for Gemini AI Agent:</label>
            <textarea
              rows="3"
              placeholder="e.g., Flag legacy infrastructure bottlenecks, outline machine learning ROI timelines, and assess data privacy risks."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="form-control custom-textarea"
            />
          </div>

          {/* NEW: Email Routing Field */}
          <div className="mb-4">
            <label className="fw-semibold form-label-text small mb-2">📧 Delivery Routing (Optional):</label>
            <input
              type="email"
              placeholder="Enter email to dispatch report directly, or leave blank to download locally."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control custom-textarea py-2"
              style={{ minHeight: '45px' }}
            />
          </div>

          <button onClick={handleGenerateReport} disabled={loading} className="btn w-100 generate-action-btn py-3 mb-3">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center gap-2">
                <span className="spinner-border spinner-border-sm" role="status"></span>
                <span>Assembling Agent Assets & Compiling File...</span>
              </div>
            ) : (
              <span>{email.includes('@') ? '📤 Compile & Dispatch to Email' : '📥 Compile Portfolio Rationale & Download Report'}</span>
            )}
          </button>

          {/* Direct Google Drive Excel Download Button */}
          <a
            href="https://drive.google.com/uc?export=download&id=1WQljak5wURGcg5izR_jPFfMwcqza97jx"
            className="btn w-100 py-3"
            style={{
              backgroundColor: '#1e293b',
              color: '#00ffcc',
              border: '1px dashed #334155',
              fontWeight: '600',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-block',
              textAlign: 'center'
            }}
          >
            📊 Download Complete Financial Matrix (Excel)
          </a>

        </div>
      </div>

      {/* 📚 STATIC REFERENCE PORTFOLIO ENTRIES */}
      <h4 className="form-label-text fw-semibold mb-3 fs-5 text-start">Additional Research & Works</h4>
      <div className="row g-3">
        {otherProjects.map((item, id) => (
          <div key={id} className="col-md-6">
            <div className="card h-100 reference-project-card border-0 p-4 rounded-4">
              <span className="badge static-domain-badge align-self-start mb-3">{item.domain}</span>
              <h5 className="fw-bold card-title-text mb-2">{item.title}</h5>
              <p className="small m-0 card-description-text">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;