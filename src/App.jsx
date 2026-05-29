import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import Projects from './components/Projects'; // Now officially uncommented and active!

function App() {
  return (
    <Router>
      <div style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0b0f19',
        boxSizing: 'border-box'
      }}>
        <div className="container" style={{ maxWidth: '1100px', padding: '60px 20px', margin: '0 auto' }}>

          {/* Centered Navigation */}
          <nav className="top-navigation pb-4 mb-5" style={{ 
            position: 'relative', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            borderBottom: '1px solid #1e293b' 
          }}>
            
            {/* Logo pinned to the left */}
            <span className="nav-logo" style={{ 
              position: 'absolute', 
              left: '0', 
              fontWeight: '800', 
              color: '#ffffff', 
              fontSize: '22px', 
              letterSpacing: '-1px' 
            }}>
              AC<span style={{ color: '#00ffcc' }}>.</span>
            </span>

            {/* Links Container */}
            <div className="nav-links d-flex gap-4 align-items-center">
              {/* Notice the forward slash '/' added to these hrefs. 
                  This ensures that if you are on the Projects page, clicking Profile takes you back Home! */}
              <a href="/#profile" className="nav-item">Profile</a>
              <a href="/#experience" className="nav-item">Timeline</a>
              <a href="/#foundation" className="nav-item">Foundation</a>
              <a href="/#leadership" className="nav-item">Leadership</a>
              
              <div className="nav-dropdown">
                <span className="nav-item" style={{ cursor: 'pointer' }}>My Work ▾</span>
                <div className="dropdown-content">
                  {/* React Router Link prevents page reloads and routes instantly */}
                  <Link to="/projects" className="dropdown-link">Nifty 50 Report</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* THIS IS THE ROUTER ENGINE: It swaps components based on the URL */}
          <Routes>
            {/* When URL is exactly "/", show the About profile */}
            <Route path="/" element={<About />} />
            
            {/* When URL is "/projects", show your work */}
            <Route path="/projects" element={<Projects />} />
          </Routes>

          <footer className="text-center small pt-5 mt-5" style={{ borderTop: '1px solid #1e293b', color: '#475569' }}>
            © 2026 Arunava Chakraborty. Built with smooth Webflow-inspired micro-interactions.
          </footer>
        </div>

        <style>{`
          html, body, #root {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: none !important;
            background-color: #0b0f19 !important;
            text-align: left !important;
          }
        `}</style>
      </div>
    </Router>
  );
}

export default App;