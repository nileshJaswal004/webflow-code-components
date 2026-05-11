import React from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Alert } from '../components/Alert';

const ComponentsDisplayPage: React.FC = () => {
  const components = [
    {
      name: 'Button',
      description: 'A flexible call-to-action button with three variants (Primary, Secondary, Outline), three sizes, a disabled state, and optional link support. Demonstrates props.String, props.Variant, props.Boolean.',
      render: (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
          <Button label="Primary" variant="Primary" size="Medium" />
          <Button label="Secondary" variant="Secondary" size="Medium" />
          <Button label="Outline" variant="Outline" size="Medium" />
          <Button label="Small" variant="Primary" size="Small" />
          <Button label="Large" variant="Primary" size="Large" />
          <Button label="Disabled" variant="Primary" size="Medium" disabled />
        </div>
      ),
    },
    {
      name: 'Badge',
      description: 'A small inline status label. Use it to tag content with contextual meaning — Default, Success, Warning, or Error. Demonstrates props.String and props.Variant.',
      render: (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }}>
          <Badge text="Default" variant="Default" />
          <Badge text="Success" variant="Success" />
          <Badge text="Warning" variant="Warning" />
          <Badge text="Error" variant="Error" />
          <Badge text="New Feature" variant="Default" />
          <Badge text="Beta" variant="Warning" />
        </div>
      ),
    },
    {
      name: 'Alert',
      description: 'An inline notification banner with four types and an optional dismiss button. Uses useState internally to handle dismiss — a useful React state pattern. Demonstrates props.String, props.Variant, props.Boolean.',
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '540px' }}>
          <Alert message="Your file has been saved successfully." type="Success" dismissible />
          <Alert message="Please review the terms before continuing." type="Info" dismissible />
          <Alert message="Your session will expire in 5 minutes." type="Warning" dismissible />
          <Alert message="Something went wrong. Please try again." type="Error" dismissible />
        </div>
      ),
    },
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Component Library</h1>
        <p>3 starter components — each one demonstrates a different set of Webflow prop types.</p>
      </header>

      <div className="component-stack">
        {components.map((comp, idx) => (
          <section key={idx} className="component-section">
            <div className="component-info">
              <div className="component-meta">
                <span className="badge">React</span>
                <span className="badge secondary">Webflow Ready</span>
              </div>
              <h2 className="component-title">{comp.name}</h2>
              <p className="component-desc">{comp.description}</p>
            </div>
            <div className="component-full-preview">
              {comp.render}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ComponentsDisplayPage;
