import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import ComponentsDisplayPage from './pages/ComponentsDisplayPage';
import WebflowVariablesPage from './pages/WebflowVariablesPage';
import DocumentationPage from './pages/DocumentationPage';

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <div className="nav-logo">Webflow Starter <span style={{ opacity: 0.5, fontSize: '0.6em', marginLeft: '8px', letterSpacing: '2px' }}>ウェブフロー</span></div>
          <div className="nav-right">
            <div className="nav-links">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
              <NavLink to="/components" className={({ isActive }) => isActive ? 'active' : ''}>Components</NavLink>
              <NavLink to="/variables" className={({ isActive }) => isActive ? 'active' : ''}>Variables</NavLink>
              <NavLink to="/docs" className={({ isActive }) => isActive ? 'active' : ''}>Guide</NavLink>
            </div>
            <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle Theme">
              {isDarkMode ? '⚡' : '👁️'}
            </button>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="page-container">
                <div className="dashboard-hero">
                  <div className="dashboard-eyebrow">/// SYSTEM.WEBFLOW.COMPONENTS_</div>
                  <h1 className="dashboard-title">BUILD_PREVIEW_SHIP_</h1>
                  <p className="dashboard-subtitle">
                    "Wake up, Samurai. We have a dashboard to burn." <br/><br/>
                    [ACCESS GRANTED] Your team's neural workspace for building premium React components, managing design tokens, and syncing them directly into the Webflow mainframe.
                  </p>
                </div>
                <div className="dashboard-grid">
                  <div className="dashboard-card">
                    <div className="card-icon">🧩</div>
                    <div className="card-count">7</div>
                    <div className="card-label">/// MODULE_COMPONENTS_</div>
                    <p className="card-desc">Preview and test all Webflow-ready React components in a live environment before shipping.</p>
                    <NavLink to="/components" className="card-link">View Gallery</NavLink>
                  </div>
                  <div className="dashboard-card">
                    <div className="card-icon">🎨</div>
                    <div className="card-label">/// DESIGN_TOKENS_</div>
                    <p className="card-desc">Explore all global CSS variables — colors, spacing, typography, shadows — used across every component.</p>
                    <NavLink to="/variables" className="card-link">View Variables</NavLink>
                  </div>
                  <div className="dashboard-card">
                    <div className="card-icon">📖</div>
                    <div className="card-label">/// TEAM_GUIDE_</div>
                    <p className="card-desc">Step-by-step instructions for adding components, variables, and bundling them into Webflow.</p>
                    <NavLink to="/docs" className="card-link">Read the Guide</NavLink>
                  </div>
                </div>
              </div>
            } />
            <Route path="/components" element={<ComponentsDisplayPage />} />
            <Route path="/variables" element={<WebflowVariablesPage />} />
            <Route path="/docs" element={<DocumentationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
