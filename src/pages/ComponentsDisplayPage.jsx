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