import React, { useState } from 'react';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`copy-btn ${copied ? 'copied' : ''}`}
      title={`Copy: ${text}`}
    >
      {copied ? '✓' : '📋'}
    </button>
  );
};

const WebflowVariablesPage = () => {
  const colors = [
    { name: '--wf-color--primary', value: '#6366f1' },
    { name: '--wf-color--primary-light', value: 'rgba(99, 102, 241, 0.1)' },
    { name: '--wf-color--secondary', value: '#8b5cf6' },
    { name: '--wf-color--white', value: '#ffffff' },
    { name: '--wf-color--black', value: '#0c0e14' },
    { name: '--wf-color--gray', value: '#1e2330' },
    { name: '--wf-color--gray-dark', value: '#12151f' },
    { name: '--wf-color--success', value: '#10b981' },
    { name: '--wf-color--warning', value: '#f59e0b' },
    { name: '--wf-color--error', value: '#ef4444' },
  ];

  const fontSizeScale = [
    { name: '--wf-font-size--xs', value: '0.75rem (12px)' },
    { name: '--wf-font-size--sm', value: '0.875rem (14px)' },
    { name: '--wf-font-size--base', value: '1rem (16px)' },
    { name: '--wf-font-size--lg', value: '1.125rem (18px)' },
    { name: '--wf-font-size--xl', value: '1.25rem (20px)' },
    { name: '--wf-font-size--2xl', value: '1.5rem (24px)' },
    { name: '--wf-font-size--3xl', value: '1.875rem (30px)' },
    { name: '--wf-font-size--4xl', value: '2.25rem (36px)' },
    { name: '--wf-font-size--5xl', value: '3rem (48px)' },
  ];

  const spacingScale = [
    { name: '--wf-spacing--4xs', value: '0.125rem (2px)' },
    { name: '--wf-spacing--3xs', value: '0.25rem (4px)' },
    { name: '--wf-spacing--2xs', value: '0.5rem (8px)' },
    { name: '--wf-spacing--xs', value: '0.75rem (12px)' },
    { name: '--wf-spacing--sm', value: '1rem (16px)' },
    { name: '--wf-spacing--md', value: '1.5rem (24px)' },
    { name: '--wf-spacing--lg', value: '2rem (32px)' },
    { name: '--wf-spacing--xl', value: '3rem (48px)' },
    { name: '--wf-spacing--2xl', value: '4rem (64px)' },
  ];

  const typography = [
    { name: '--wf-font-family--base', value: "'Inter', system-ui, sans-serif" },
    { name: '--wf-font-family--heading', value: "'Outfit', 'Inter', sans-serif" },
    { name: '--wf-line-height--tight', value: '1.1' },
    { name: '--wf-line-height--base', value: '1.5' },
    { name: '--wf-font-weight--normal', value: '400' },
    { name: '--wf-font-weight--bold', value: '700' },
  ];

  const borderRadii = [
    { name: '--wf-border-radius--sm', value: '4px', preview: '4px' },
    { name: '--wf-border-radius--base', value: '6px', preview: '6px' },
    { name: '--wf-border-radius--lg', value: '10px', preview: '10px' },
    { name: '--wf-border-radius--xl', value: '16px', preview: '16px' },
    { name: '--wf-border-radius--full', value: '9999px', preview: '9999px' },
  ];

  const transitions = [
    { name: '--wf-transition--duration-fast', value: '150ms' },
    { name: '--wf-transition--duration-base', value: '300ms' },
    { name: '--wf-transition--duration-slow', value: '500ms' },
    { name: '--wf-transition--easing', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  ];

  const shadows = [
    { name: '--wf-shadow--sm', value: '0 1px 2px rgba(0, 0, 0, 0.05)' },
    { name: '--wf-shadow--md', value: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)' },
    { name: '--wf-shadow--lg', value: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)' },
    { name: '--wf-shadow--xl', value: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)' },
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Design Tokens</h1>
        <p>Global CSS variables that power every component — colors, spacing, typography, and more.</p>
      </header>

      <section className="variable-section">
        <h2 className="section-title">Color Palette</h2>
        <div className="variable-grid">
          {colors.map((color) => (
            <div key={color.name} className="variable-card color-card">
              <div
                className="color-swatch"
                style={{ backgroundColor: color.value, border: color.value === '#ffffff' ? '1px solid #ddd' : 'none' }}
              />
              <div className="variable-details">
                <div className="copyable-row">
                  <code>{color.name}</code>
                  <CopyButton text={color.name} />
                </div>
                <div className="copyable-row">
                  <span>{color.value}</span>
                  <CopyButton text={color.value} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="variable-section">
        <h2 className="section-title">Typography & Scales</h2>
        <div className="variable-stack">
          <div className="variable-item-group">
            <h3>Font Families & Weights</h3>
            <div className="variable-grid-wide">
              {typography.map((typo) => (
                <div key={typo.name} className="variable-item">
                  <div className="copyable-row">
                    <code>{typo.name}</code>
                    <CopyButton text={typo.name} />
                  </div>
                  <div className="copyable-row">
                    <span className="variable-value">{typo.value}</span>
                    <CopyButton text={typo.value} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="variable-item-group">
            <h3>Font Size Scale</h3>
            <div className="variable-grid-wide">
              {fontSizeScale.map((size) => (
                <div key={size.name} className="variable-item">
                  <div className="copyable-row">
                    <code>{size.name}</code>
                    <CopyButton text={size.name} />
                  </div>
                  <div className="copyable-row">
                    <span className="variable-value">{size.value}</span>
                    <CopyButton text={size.value.split(' (')[0]} />
                  </div>
                  <div className="typo-preview" style={{ fontSize: `var(${size.name})`, lineHeight: 1 }}>
                    Aa
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="variable-section">
        <h2 className="section-title">Spacing Scale</h2>
        <div className="variable-grid">
          {spacingScale.map((space) => (
            <div key={space.name} className="variable-card spacing-card">
              <div className="spacing-preview" style={{
                width: `max(var(${space.name}), 12px)`,
                height: `max(var(${space.name}), 12px)`,
                minWidth: '12px',
                minHeight: '12px',
                background: 'var(--wf-color--primary)'
              }} />
              <div className="variable-details">
                <div className="copyable-row">
                  <code>{space.name}</code>
                  <CopyButton text={space.name} />
                </div>
                <div className="copyable-row">
                  <span>{space.value}</span>
                  <CopyButton text={space.value.split(' (')[0]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="variable-section">
        <h2 className="section-title">Border Radius</h2>
        <div className="variable-grid">
          {borderRadii.map((radius) => (
            <div key={radius.name} className="variable-card shadow-card">
              <div className="shadow-preview" style={{
                borderRadius: `var(${radius.name})`,
                width: '100%',
                height: '60px',
                background: 'var(--bg-subtle)',
                border: '2px solid rgba(99, 102, 241, 0.5)'
              }} />
              <div className="variable-details">
                <div className="copyable-row">
                  <code>{radius.name}</code>
                  <CopyButton text={radius.name} />
                </div>
                <div className="copyable-row">
                  <span>{radius.value}</span>
                  <CopyButton text={radius.value} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="variable-section">
        <h2 className="section-title">Transitions</h2>
        <div className="variable-grid">
          {transitions.map((trans) => (
            <div key={trans.name} className="variable-card shadow-card">
              <div className="variable-details">
                <div className="copyable-row">
                  <code>{trans.name}</code>
                  <CopyButton text={trans.name} />
                </div>
                <div className="copyable-row">
                  <span>{trans.value}</span>
                  <CopyButton text={trans.value} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="variable-section">
        <h2 className="section-title">Shadows & Utilities</h2>
        <div className="variable-grid">
          {shadows.map((shadow) => (
            <div key={shadow.name} className="variable-card shadow-card">
              <div className="shadow-preview" style={{
                boxShadow: `var(${shadow.name})`,
                width: '100%',
                height: '60px',
                borderRadius: '8px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--glass-border)'
              }} />
              <div className="variable-details">
                <div className="copyable-row">
                  <code>{shadow.name}</code>
                  <CopyButton text={shadow.name} />
                </div>
                <div className="copyable-row">
                  <span>{shadow.value}</span>
                  <CopyButton text={shadow.value} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WebflowVariablesPage;
