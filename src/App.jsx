import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css';
import ComponentsDisplayPage from './pages/ComponentsDisplayPage';
import WebflowVariablesPage from './pages/WebflowVariablesPage';
import DocumentationPage from './pages/DocumentationPage';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <div className="nav-logo">
            <span className="logo-icon">W</span>
            Component Studio
          </div>
          <div className="nav-right">
            <div className="nav-links">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
              <NavLink to="/components" className={({ isActive }) => isActive ? 'active' : ''}>Components</NavLink>
              <NavLink to="/variables" className={({ isActive }) => isActive ? 'active' : ''}>Variables</NavLink>
              <NavLink to="/docs" className={({ isActive }) => isActive ? 'active' : ''}>Guide</NavLink>
            </div>

            <button
              id="mobile-menu-toggle"
              className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="mobile-nav-overlay" onClick={() => setMenuOpen(false)}>
            <nav className="mobile-nav-drawer" onClick={e => e.stopPropagation()}>
              <NavLink to="/" end onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
              <NavLink to="/components" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Components</NavLink>
              <NavLink to="/variables" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Variables</NavLink>
              <NavLink to="/docs" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Guide</NavLink>
            </nav>
          </div>
        )}

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="page-container">
                <div className="dashboard-hero">
                  <div className="dashboard-eyebrow">⬡ Webflow Code Components — Developer Boilerplate</div>
                  <h1 className="dashboard-title">
                    Build.{' '}
                    <span className="gradient-word">Preview.</span>{' '}
                    Ship.
                  </h1>
                  <p className="dashboard-subtitle">
                    A structured workspace for building, previewing, and importing custom React
                    components into Webflow. Manage your design tokens, document your work, and
                    deliver production-ready components with confidence.
                  </p>
                </div>

                {/* Stats bar */}
                <div className="dashboard-stats">
                  <div className="stat-item"><span className="stat-value">7</span><span className="stat-label">Components</span></div>
                  <div className="stat-item"><span className="stat-value">45+</span><span className="stat-label">CSS Tokens</span></div>
                  <div className="stat-item"><span className="stat-value">7</span><span className="stat-label">Categories</span></div>
                  <div className="stat-item"><span className="stat-value">v1.0</span><span className="stat-label">Version</span></div>
                </div>

                <div className="dashboard-grid">
                  <div className="dashboard-card">
                    <div className="card-icon">⚛️</div>
                    <div className="card-label">Component Library</div>
                    <p className="card-desc">
                      Preview and test all Webflow-ready React components in a live environment.
                      Each component includes its props table and a fully interactive demo.
                    </p>
                    <NavLink to="/components" className="card-link">View Components</NavLink>
                  </div>
                  <div className="dashboard-card">
                    <div className="card-icon">🎨</div>
                    <div className="card-label">Design Tokens</div>
                    <p className="card-desc">
                      Explore all global CSS variables — colors, spacing, typography, and shadows.
                      Click any token to copy it to your clipboard instantly.
                    </p>
                    <NavLink to="/variables" className="card-link">View Variables</NavLink>
                  </div>
                  <div className="dashboard-card">
                    <div className="card-icon">📋</div>
                    <div className="card-label">Developer Guide</div>
                    <p className="card-desc">
                      Step-by-step instructions for adding components, managing design tokens,
                      and bundling everything for import into your Webflow Workspace.
                    </p>
                    <NavLink to="/docs" className="card-link">Open Guide</NavLink>
                  </div>
                </div>
              </div>
            } />
            <Route path="/components" element={<ComponentsDisplayPage />} />
            <Route path="/variables" element={<WebflowVariablesPage />} />
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
