import React, { useState } from 'react';

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
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

const WebflowVariablesPage: React.FC = () => {
  const colors = [
    { name: '--wf-color--primary', value: '#4353ff' },
    { name: '--wf-color--primary-light', value: 'rgba(67, 83, 255, 0.1)' },
    { name: '--wf-color--secondary', value: '#000000' },
    { name: '--wf-color--white', value: '#ffffff' },
    { name: '--wf-color--black', value: '#000000' },
    { name: '--wf-color--gray', value: '#f5f5f5' },
    { name: '--wf-color--gray-dark', value: '#333333' },
    { name: '--wf-color--success', value: '#10b981' },
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
    { name: '--wf-font-family--base', value: "'Inter', sans-serif" },
    { name: '--wf-font-family--heading', value: "'Outfit', sans-serif" },
    { name: '--wf-line-height--tight', value: '1.1' },
    { name: '--wf-line-height--base', value: '1.5' },
    { name: '--wf-font-weight--normal', value: '400' },
    { name: '--wf-font-weight--bold', value: '700' },
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
              <div className="spacing-preview" style={{ width: `var(${space.name})`, height: `var(${space.name})`, background: 'var(--wf-color--primary)' }} />
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
        <h2 className="section-title">Shadows & Utilities</h2>
        <div className="variable-grid">
          {['sm', 'md', 'lg', 'xl'].map((size) => (
            <div key={size} className="variable-card shadow-card">
              <div className="shadow-preview" style={{ boxShadow: `var(--wf-shadow--${size})`, width: '100%', height: '60px', borderRadius: '8px', background: 'white' }} />
              <div className="variable-details">
                <div className="copyable-row">
                  <code>--wf-shadow--{size}</code>
                  <CopyButton text={`--wf-shadow--${size}`} />
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
