// ─────────────────────────────────────────────────────────────────────────────
// ComponentsDisplayPage.tsx
//
// STEP 1 OF 2 — Import your component at the top of this file.
// STEP 2 OF 2 — Add an entry to the `components` array below.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useMemo } from 'react';

// ── STEP 1: Import components ─────────────────────────────────────────────
import { Button }           from '../components/Button';

// ── Types ─────────────────────────────────────────────────────────────────



// ── ComponentSection — manages its own playground state ───────────────────
const ComponentSection = ({ comp }) => {
  const [values, setValues] = useState(
    Object.fromEntries(comp.playgroundProps.map(p => [p.name, p.default]))
  );
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateProp = (name, value) =>
    setValues(prev => ({ ...prev, [name]: value }));

  const generateJSX = () => {
    const lines = [
      `import { ${comp.name.replace(/\s+/g, '')} } from '../components';`,
      '',
      `<${comp.name.replace(/\s+/g, '')}`,
    ];
    comp.playgroundProps.forEach(p => {
      const v = values[p.name];
      if (p.type === 'boolean' || p.type === 'number') {
        lines.push(`  ${p.name}={${v}}`);
      } else {
        lines.push(`  ${p.name}="${v}"`);
      }
    });
    lines.push('/>');
    return lines.join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateJSX());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="component-section">
      {/* ── Info + Playground ── */}
      <div className="component-info">
        <div className="component-meta">
          <span className="badge">{comp.group}</span>
        </div>
        <h2 className="component-title">{comp.name}</h2>
        <p className="component-desc">{comp.description}</p>

        {comp.playgroundProps.length > 0 && (
          <div className="playground-panel">
            <div className="playground-header">
              <span className="playground-heading">Props</span>
              <button
                className={`code-toggle-btn ${showCode ? 'active' : ''}`}
                onClick={() => setShowCode(p => !p)}
              >
                {showCode ? '← Props' : '</> Code'}
              </button>
            </div>

            {showCode ? (
              <div className="playground-code">
                <pre className="playground-pre">{generateJSX()}</pre>
                <button
                  className={`copy-jsx-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopy}
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            ) : (
              <div className="playground-controls">
                {comp.playgroundProps.map(prop => (
                  <div key={prop.name} className="playground-prop">
                    <label className="playground-label">{prop.label}</label>
                    {prop.type === 'boolean' && (
                      <button
                        className={`toggle-btn ${values[prop.name] ? 'on' : 'off'}`}
                        onClick={() => updateProp(prop.name, !values[prop.name])}
                      >
                        {String(values[prop.name])}
                      </button>
                    )}
                    {prop.type === 'string' && (
                      <input
                        type="text"
                        value={String(values[prop.name] ?? '')}
                        onChange={e => updateProp(prop.name, e.target.value)}
                        className="playground-input"
                      />
                    )}
                    {prop.type === 'variant' && (
                      <select
                        value={String(values[prop.name] ?? '')}
                        onChange={e => updateProp(prop.name, e.target.value)}
                        className="playground-select"
                      >
                        {prop.options && prop.options.map(opt => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                    {prop.type === 'number' && (
                      <input
                        type="number"
                        value={Number(values[prop.name])}
                        onChange={e => updateProp(prop.name, Number(e.target.value))}
                        className="playground-input playground-input--number"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Props Table ── */}
        <div className="props-table-container">
          <h4 className="props-table-title">Webflow Props</h4>
          <table className="props-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              {comp.propsDocs.map((p, i) => (
                <tr key={i}>
                  <td className="prop-name">
                    <code>{p.name}</code>
                  </td>
                  <td className="prop-type">{p.type}</td>
                  <td className="prop-default">
                    <code>{p.defaultVal}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Live Preview ── */}
      <div className="component-full-preview">
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          {comp.render(values)}
        </div>
      </div>
    </section>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────
const ComponentsDisplayPage = () => {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('All');

  // ── STEP 2: Add component entries here ───────────────────────────────
  const components = [
    {
      name: 'Button',
      group: 'Basic',
      description: 'A versatile button component with multiple sizes and variants.',
      propsDocs: [
        { name: 'label', type: 'String', defaultVal: 'Click Me' },
        { name: 'variant', type: 'Variant', defaultVal: 'Primary' },
        { name: 'size', type: 'Variant', defaultVal: 'Medium' },
      ],
      playgroundProps: [
        { name: 'label', label: 'Label', type: 'string', default: 'Click Me' },
        { name: 'variant', label: 'Variant', type: 'variant', default: 'Primary', options: ['Primary', 'Secondary', 'Outline'] },
        { name: 'size', label: 'Size', type: 'variant', default: 'Medium', options: ['Small', 'Medium', 'Large'] },
      ],
      render: p => (
        <Button
          label={String(p.label)}
          variant={p.variant}
          size={p.size}
        />
      ),
    },
  ];

  // ── Search + Filter ─────────────────────────────────────────────────────
  const groups = useMemo(
    () => ['All', ...Array.from(new Set(components.map(c => c.group)))],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filtered = useMemo(
    () =>
      components.filter(c => {
        const matchGroup = activeGroup === 'All' || c.group === activeGroup;
        const matchSearch =
          !search ||
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase());
        return matchGroup && matchSearch;
      }),
    [search, activeGroup, components]
  );

  return (
    <div className="page-container">
      {/* ── Page header ── */}
      <header className="page-header">
        <h1>Component Library</h1>
        <p>
          {components.length} components — edit props live, copy JSX, and preview before importing
          to Webflow.
        </p>
      </header>

      {/* ── Search + Filter bar ── */}
      <div className="comp-toolbar">
        <div className="comp-search-wrap">
          <span className="comp-search-icon">🔍</span>
          <input
            id="component-search"
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="comp-search"
          />
          {search && (
            <button className="comp-search-clear" onClick={() => setSearch('')}>
              ✕
            </button>
          )}
        </div>

        <div className="comp-group-filters">
          {groups.map(g => (
            <button
              key={g}
              className={`comp-filter-pill ${activeGroup === g ? 'active' : ''}`}
              onClick={() => setActiveGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* ── Component list ── */}
      {filtered.length === 0 ? (
        <div className="comp-empty">
          <p>No components match "{search}"</p>
          <button onClick={() => { setSearch(''); setActiveGroup('All'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="component-stack">
          {filtered.map(comp => (
            <ComponentSection key={comp.name} comp={comp} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentsDisplayPage;
