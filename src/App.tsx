import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import ComponentsDisplayPage from './pages/ComponentsDisplayPage';
import WebflowVariablesPage from './pages/WebflowVariablesPage';
import DocumentationPage from './pages/DocumentationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <div className="nav-logo">⚡ Webflow Spellbook</div>
          <div className="nav-right">
            <div className="nav-links">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
              <NavLink to="/components" className={({ isActive }) => isActive ? 'active' : ''}>Components</NavLink>
              <NavLink to="/variables" className={({ isActive }) => isActive ? 'active' : ''}>Variables</NavLink>
              <NavLink to="/docs" className={({ isActive }) => isActive ? 'active' : ''}>Guide</NavLink>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="page-container">
                <div className="dashboard-hero">
                  <div className="dashboard-eyebrow">✦ The Marauder's Map — Webflow.Spellbook</div>
                  <h1 className="dashboard-title">Accio. Lumos. Expecto.</h1>
                  <p className="dashboard-subtitle">
                    <em>"It is our choices, Harry, that show what we truly are, far more than our abilities."</em>
                    <br />
                    <span style={{ fontSize: '0.85em', opacity: 0.7, fontStyle: 'normal' }}>— Albus Dumbledore, Headmaster of Hogwarts</span>
                    <br /><br />
                    Welcome to your magical workspace for building premium React components, managing design tokens, and syncing them into the Webflow grimoire.
                  </p>
                </div>
                <div className="dashboard-grid">
                  <div className="dashboard-card">
                    <div className="card-icon">📜</div>
                    <div className="card-count">7</div>
                    <div className="card-label">Component Library</div>
                    <p className="card-desc">Preview and test all Webflow-ready React components in a live environment before casting them into production.</p>
                    <NavLink to="/components" className="card-link">View Components</NavLink>
                  </div>
                  <div className="dashboard-card">
                    <div className="card-icon">🔮</div>
                    <div className="card-label">CSS Variables</div>
                    <p className="card-desc">Explore all global CSS variables — colors, spacing, typography, shadows — the design tokens that power every component.</p>
                    <NavLink to="/variables" className="card-link">View Variables</NavLink>
                  </div>
                  <div className="dashboard-card">
                    <div className="card-icon">📖</div>
                    <div className="card-label">Wizard's Guide</div>
                    <p className="card-desc">Step-by-step instructions for adding components, variables, and bundling them into the Webflow grimoire.</p>
                    <NavLink to="/docs" className="card-link">Open Grimoire</NavLink>
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
