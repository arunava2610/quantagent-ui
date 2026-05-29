import React, { useState, useEffect } from 'react';
import './Projects.css';

function Projects() {
  // Report Downloader Tool State Matrix
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [feedback, setFeedback] = useState('');
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

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/companies')
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
      alert("Please select at least one corporate equity card.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companies: selectedCompanies,
          custom_feedback: feedback
        })
      });

      if (!response.ok) throw new Error("The backend cluster failed to serialize your word artifact.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'QuantAgent_Custom_Report.docx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="projects-container pt-5" id="portfolio">
      <h3 className="projects-main-title mb-4 pb-3">🚀 Engineering Workshops & Portfolios</h3>

      {/* 🛠️ LIVE INTERACTIVE APPLICATION INTERFACE BLOCK */}
      <div className="live-tool-wrapper card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
        <div className="tool-banner p-4">
          <div className="d-flex align-items-center gap-2">
            <span className="badge live-indicator">LIVE SYSTEM TOOL</span>
            <h4 className="m-0 fw-bold text-white">QuantAgent Portfolio Report Compiler</h4>
          </div>
          <p className="m-0 mt-2 text-light-blue small">
            Select listed entities and stream direct operational configurations down into custom MS Word decks via Gemini AI.
          </p>
        </div>

        <div className="tool-body p-4">
          {error && (
            <div className="alert custom-error-alert d-flex align-items-center gap-2 small" role="alert">
              <span>⚠️</span>
              <div><strong>Gateway Alert:</strong> {error} (Confirm <code>server.py</code> is running locally).</div>
            </div>
          )}

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="fw-semibold form-label-text small">📁 Check Target Securities for Evaluation Grid:</label>
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
            <label className="fw-semibold form-label-text small mb-2">🧠 Custom Strategic Guidelines for Gemini AI:</label>
            <textarea
              rows="3"
              placeholder="e.g., Run margin risk matrices, flag inflation vulnerabilities, and isolate any high overhead concerns."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="form-control custom-textarea"
            />
          </div>

          <button onClick={handleGenerateReport} disabled={loading} className="btn w-100 generate-action-btn py-3">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center gap-2">
                <span className="spinner-border spinner-border-sm" role="status"></span>
                <span>Assembling Agent Assets & Compiling File...</span>
              </div>
            ) : (
              <span>📥 Compile Portfolio Rationale & Download Report</span>
            )}
          </button>
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