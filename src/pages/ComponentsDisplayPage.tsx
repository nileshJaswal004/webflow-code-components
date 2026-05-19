import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 OF 2 — Import your component here
// Pattern: import { MyComponent } from '../components/MyComponent';
// ─────────────────────────────────────────────────────────────────────────────
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Alert } from '../components/Alert';
import { Countdown } from '../components/Countdown';
import { FAQAccordion } from '../components/FAQAccordion';
import { InteractiveForm } from '../components/InteractiveForm';
import { Modal } from '../components/Modal';

interface PropDef {
  name: string;
  type: string;
  defaultVal: string;
}

interface ComponentDef {
  name: string;
  description: string;
  propsList: PropDef[];
  render: React.ReactNode;
}

const ComponentsDisplayPage: React.FC = () => {
  // ─────────────────────────────────────────────────────────────────────────────
  // STEP 2 OF 2 — Add a preview entry for your component in this array
  // Copy the object shape below and fill in your component's details.
  // ─────────────────────────────────────────────────────────────────────────────
  const components: ComponentDef[] = [
    {
      name: 'Button',
      description: 'A flexible call-to-action button with three variants, three sizes, a disabled state, and optional link support.',
      propsList: [
        { name: 'label', type: 'String', defaultVal: '"Click Me"' },
        { name: 'variant', type: 'Variant (Primary, Secondary, Outline)', defaultVal: '"Primary"' },
        { name: 'size', type: 'Variant (Small, Medium, Large)', defaultVal: '"Medium"' },
        { name: 'disabled', type: 'Boolean', defaultVal: 'false' },
        { name: 'href', type: 'String', defaultVal: '""' },
      ],
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
      description: 'A small inline status label. Use it to tag content with contextual meaning.',
      propsList: [
        { name: 'text', type: 'String', defaultVal: '"Badge"' },
        { name: 'variant', type: 'Variant (Default, Success, Warning, Error)', defaultVal: '"Default"' },
      ],
      render: (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' }}>
          <Badge text="Default" variant="Default" />
          <Badge text="Success" variant="Success" />
          <Badge text="Warning" variant="Warning" />
          <Badge text="Error" variant="Error" />
        </div>
      ),
    },
    {
      name: 'Alert',
      description: 'An inline notification banner with four types and an optional dismiss button. Uses useState.',
      propsList: [
        { name: 'message', type: 'String', defaultVal: '"This is an alert message."' },
        { name: 'type', type: 'Variant (Info, Success, Warning, Error)', defaultVal: '"Info"' },
        { name: 'dismissible', type: 'Boolean', defaultVal: 'true' },
      ],
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '540px' }}>
          <Alert message="Your file has been saved successfully." type="Success" dismissible />
          <Alert message="Please review the terms before continuing." type="Info" dismissible />
          <Alert message="Your session will expire in 5 minutes." type="Warning" dismissible />
          <Alert message="Something went wrong. Please try again." type="Error" dismissible />
        </div>
      ),
    },
    {
      name: 'Countdown Timer',
      description: 'A dynamic real-time countdown to a target date. Teaches React hooks (useState, useEffect) and cleanup.',
      propsList: [
        { name: 'targetDate', type: 'String (ISO 8601)', defaultVal: '"2026-01-01T00:00:00"' },
        { name: 'title', type: 'String', defaultVal: '"Countdown"' },
        { name: 'showLabels', type: 'Boolean', defaultVal: 'true' },
      ],
      render: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center' }}>
          <Countdown targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString()} title="Event Starts In" />
        </div>
      ),
    },
    {
      name: 'FAQ Accordion',
      description: 'An interactive accordion for FAQs. Teaches array mapping, and single vs multiple active items.',
      propsList: [
        { name: 'title', type: 'String', defaultVal: '"Frequently Asked Questions"' },
        { name: 'allowMultiple', type: 'Boolean', defaultVal: 'false' },
        { name: 'q1', type: 'String', defaultVal: '"How do I use this component?"' },
        { name: 'a1', type: 'String', defaultVal: '"Simply drag it..."' },
        { name: 'q2', type: 'String', defaultVal: '"Can I customize the styles?"' },
        { name: 'a2', type: 'String', defaultVal: '"Yes! The component..."' },
        { name: 'q3', type: 'String', defaultVal: '"Is it accessible?"' },
        { name: 'a3', type: 'String', defaultVal: '"It uses standard..."' },
      ],
      render: (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <FAQAccordion allowMultiple={false} />
        </div>
      ),
    },
    {
      name: 'Interactive Form',
      description: 'A contact form demonstrating controlled inputs, form validation, and simulated API submission states.',
      propsList: [
        { name: 'formTitle', type: 'String', defaultVal: '"Contact Us"' },
        { name: 'submitButtonText', type: 'String', defaultVal: '"Send Message"' },
        { name: 'successMessage', type: 'String', defaultVal: '"Thank you! Your message has been received."' },
      ],
      render: (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <InteractiveForm />
        </div>
      ),
    },
    {
      name: 'Modal Overlay',
      description: 'A popup modal demonstrating conditional rendering over the entire screen, escape key close, and click-outside detection.',
      propsList: [
        { name: 'buttonText', type: 'String', defaultVal: '"Open Modal"' },
        { name: 'title', type: 'String', defaultVal: '"Modal Title"' },
        { name: 'content', type: 'String', defaultVal: '"This is the modal content..."' },
        { name: 'closeText', type: 'String', defaultVal: '"Close"' },
      ],
      render: (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Modal />
        </div>
      ),
    },
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Component Library</h1>
        <p>7 starter components — from basic props to advanced React hooks and interaction patterns.</p>
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
              
              <div className="props-table-container">
                <h4 className="props-table-title">Editable Webflow Props</h4>
                <table className="props-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Type</th>
                      <th>Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.propsList.map((prop, i) => (
                      <tr key={i}>
                        <td className="prop-name"><code>{prop.name}</code></td>
                        <td className="prop-type">{prop.type}</td>
                        <td className="prop-default"><code>{prop.defaultVal}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
