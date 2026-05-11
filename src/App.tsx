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
          <div className="nav-logo">Webflow Starter</div>
          <div className="nav-right">
            <div className="nav-links">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
              <NavLink to="/components" className={({ isActive }) => isActive ? 'active' : ''}>Components</NavLink>
              <NavLink to="/variables" className={({ isActive }) => isActive ? 'active' : ''}>Variables</NavLink>
              <NavLink to="/docs" className={({ isActive }) => isActive ? 'active' : ''}>Guide</NavLink>
            </div>
            <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle Theme">
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="page-container">
                <div className="dashboard-hero">
                  <div className="dashboard-eyebrow">✦ Webflow Code Components</div>
                  <h1 className="dashboard-title">Build. Preview. Ship.</h1>
                  <p className="dashboard-subtitle">
                    Your team's workspace for building premium React components, managing design tokens, and syncing them directly into Webflow.
                  </p>
                </div>
                <div className="dashboard-grid">
                  <div className="dashboard-card">
                    <div className="card-icon">🧩</div>
                    <div className="card-count">3</div>
                    <div className="card-label">Components</div>
                    <p className="card-desc">Preview and test all Webflow-ready React components in a live environment before shipping.</p>
                    <NavLink to="/components" className="card-link">View Gallery</NavLink>
                  </div>
                  <div className="dashboard-card">
                    <div className="card-icon">🎨</div>
                    <div className="card-label">Design Tokens</div>
                    <p className="card-desc">Explore all global CSS variables — colors, spacing, typography, shadows — used across every component.</p>
                    <NavLink to="/variables" className="card-link">View Variables</NavLink>
                  </div>
                  <div className="dashboard-card">
                    <div className="card-icon">📖</div>
                    <div className="card-label">Team Guide</div>
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
