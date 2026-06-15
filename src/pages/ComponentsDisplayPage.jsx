// ─────────────────────────────────────────────────────────────────────────────
// ComponentsDisplayPage.tsx
//
// STEP 1 OF 2 — Import your component at the top of this file.
// STEP 2 OF 2 — Add an entry to the `components` array below.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useMemo } from 'react';

// ── STEP 1: Import components ─────────────────────────────────────────────
import { Button }            from '../components/Button';
import { RichCard }          from '../components/RichCard';
import { LiveCandidateFeed } from '../components/LiveCandidateFeed';
// ── ComponentSection — Simplified Static Preview ──────────────────────────
const ComponentSection = ({ comp }) => {
  // Extract default values to render a static preview
  const defaultValues = Object.fromEntries(
    (comp.playgroundProps || []).map(p => [p.name, p.default])
  );

  return (
    <section style={{ 
      border: '1px solid #eaeaea', 
      borderRadius: '8px', 
      padding: '2rem', 
      marginBottom: '2rem', 
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
    }}>
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid #eaeaea', paddingBottom: '1.5rem' }}>
        <span style={{ display: 'inline-block', backgroundColor: '#f0f0f0', color: '#555', padding: '0.3rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {comp.group}
        </span>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', color: '#111' }}>{comp.name}</h2>
        <p style={{ margin: '0 0 1.5rem 0', color: '#666', lineHeight: 1.5 }}>{comp.description}</p>

        {/* ── Props Table ── */}
        {comp.propsDocs && comp.propsDocs.length > 0 && (
          <div>
            <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '1.1rem', color: '#333' }}>Available Properties</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eaeaea', color: '#888' }}>
                  <th style={{ padding: '0.8rem 0.5rem', fontWeight: 600 }}>Property</th>
                  <th style={{ padding: '0.8rem 0.5rem', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '0.8rem 0.5rem', fontWeight: 600 }}>Default Value</th>
                </tr>
              </thead>
              <tbody>
                {comp.propsDocs.map((p, i) => {
                  const pgProp = (comp.playgroundProps || []).find(pg => pg.name === p.name);
                  const options = pgProp?.options;
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                      <td style={{ padding: '0.8rem 0.5rem', fontFamily: 'monospace', color: '#d63384', fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: '0.8rem 0.5rem', color: '#555' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
                          <span style={{ backgroundColor: '#f8f9fa', border: '1px solid #ddd', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>{p.type}</span>
                          {options && (
                            <span style={{ fontSize: '0.75rem', color: '#888', fontStyle: 'italic' }}>
                              [ {options.join(', ')} ]
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem', fontFamily: 'monospace', color: '#666' }}>{p.defaultVal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Live Static Preview ── */}
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#333', textAlign: 'center' }}>Component Preview</h4>
        <div style={{ width: '100%', margin: '0 auto', padding: '2rem', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px dashed #ccc' }}>
          {comp.render(defaultValues)}
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
  const components = useMemo(() => [
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%' }}>
          {['Small', 'Medium', 'Large'].map(size => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%', borderBottom: size !== 'Large' ? '1px dashed #eaeaea' : 'none', paddingBottom: size !== 'Large' ? '2rem' : '0' }}>
              <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{size} SIZE</span>
              <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                {['Primary', 'Secondary', 'Outline'].map(variant => (
                  <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase' }}>{variant}</span>
                    <Button label={String(p.label)} variant={variant} size={size} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: 'Rich Card',
      group: 'Reference',
      description: 'A kitchen-sink component demonstrating all available Webflow prop types (String, Number, Boolean, Link, Image, Variant).',
      propsDocs: [
        { name: 'imageUrl', type: 'Image', defaultVal: 'https://images.unsplash.com/...' },
        { name: 'showBadge', type: 'Boolean', defaultVal: 'true' },
        { name: 'title', type: 'String', defaultVal: 'Premium Webflow Course' },
        { name: 'rating', type: 'Number', defaultVal: '5' },
        { name: 'buttonUrl', type: 'Link', defaultVal: '#' },
        { name: 'theme', type: 'Variant', defaultVal: 'Light' },
      ],
      playgroundProps: [
        { name: 'imageUrl', label: 'Image URL', type: 'string', default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80' },
        { name: 'showBadge', label: 'Show Badge', type: 'boolean', default: true },
        { name: 'title', label: 'Title', type: 'string', default: 'Premium Webflow Course' },
        { name: 'rating', label: 'Rating (1-5)', type: 'number', default: 5 },
        { name: 'buttonUrl', label: 'Button URL', type: 'string', default: '#' },
        { name: 'theme', label: 'Theme', type: 'variant', default: 'Light', options: ['Light', 'Dark'] },
      ],
      render: p => (
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Light', 'Dark'].map(theme => (
             <div key={theme} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>{theme} THEME</span>
              <RichCard 
                imageUrl={String(p.imageUrl)} 
                showBadge={Boolean(p.showBadge)} 
                title={String(p.title)} 
                rating={Number(p.rating)} 
                buttonUrl={String(p.buttonUrl)} 
                theme={theme} 
              />
            </div>
          ))}
        </div>
      )
    },
    {
      name: 'Live Candidate Feed',
      group: 'Dynamic',
      description: 'Fetches live mock candidate data from randomuser.me API. A great example of pulling external data into Webflow.',
      propsDocs: [
        { name: 'title', type: 'String', defaultVal: 'Recently Active Candidates' },
        { name: 'resultsCount', type: 'Number', defaultVal: '3' },
      ],
      playgroundProps: [
        { name: 'title', label: 'Feed Title', type: 'string', default: 'Recently Active Candidates' },
        { name: 'resultsCount', label: 'Number of Candidates', type: 'number', default: 3 },
      ],
      render: p => (
        <LiveCandidateFeed 
          title={String(p.title)}
          resultsCount={Number(p.resultsCount)}
        />
      )
    }
  ], []);

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
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem', fontFamily: 'sans-serif' }}>
      {/* ── Page header ── */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111', marginBottom: '0.5rem' }}>Component Library</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Browse your Webflow Code Components, view their available properties, and see a static preview of how they render.
        </p>
      </header>

      {/* ── Search + Filter bar ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search components..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', padding: '0.8rem 1.2rem', fontSize: '1rem', borderRadius: '30px', border: '1px solid #ccc', outline: 'none', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}
        />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {groups.map(g => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                backgroundColor: activeGroup === g ? '#111' : '#f0f0f0',
                color: activeGroup === g ? '#fff' : '#555',
                transition: 'all 0.2s ease'
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* ── Component list ── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
          <p>No components match "{search}"</p>
          <button 
            onClick={() => { setSearch(''); setActiveGroup('All'); }}
            style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(comp => (
            <ComponentSection key={comp.name} comp={comp} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentsDisplayPage;