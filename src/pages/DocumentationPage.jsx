import React, { useState } from 'react';
import './DocumentationPage.css';

const CommandBlock = ({ code, style }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="code-block-wrapper" style={style}>
      <div className="code-block">{code}</div>
      <button className={`code-block-copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

const DocumentationPage = () => {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  return (
    <div className="documentation-page">
      <header className="doc-hero">
        <h1>Webflow Code Components Guide</h1>
        <p>A simple guide to creating and syncing React components to Webflow.</p>
      </header>

      <section className="doc-section" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>What is a Webflow Code Component?</h2>
        <p style={{ marginBottom: '2rem', lineHeight: 1.8 }}>
          A Webflow Code Component allows you to write custom React code, style it, and bundle it into a reusable element that can be dragged and dropped directly inside the Webflow Designer. This gives developers the full power of React—like managing state, fetching live APIs, and utilizing complex libraries—while still allowing marketing teams to easily edit text, images, and properties using Webflow's native UI.
        </p>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <img 
            src={`${process.env.PUBLIC_URL}/code-component-showcase.jpg`} 
            alt="Webflow Code Component Showcase" 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'zoom-in' }} 
            onClick={() => setIsImageEnlarged(true)}
          />
        </div>
      </section>

      <section className="doc-section">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Step-by-Step Guide</h2>
        <div className="doc-step">
          <div className="step-number">0</div>
          <div className="step-content">
            <h3>Prerequisites</h3>
            <p>Before you begin, download the Boilerplate project folder from the <a href="https://www.dropbox.com/scl/fo/92du6m7blvc0awbcy0p9e/AA1N27WTGE9afI4luXEqFqs?rlkey=ognvv20z6mv8hhvwc13vbsroc&st=454tz2xa&dl=0" target="_blank" rel="noopener noreferrer">Dropbox link</a> and open it in your terminal. Then, install the dependencies and start the local preview server:</p>
            <CommandBlock code="npm install" />
            <CommandBlock code="npm start" style={{ marginTop: '0.5rem' }} />
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Authenticate with Webflow</h3>
            <p>Authenticate the Webflow CLI with your workspace. Run the following command in a new terminal:</p>
            <CommandBlock code="npx webflow auth login" />
            <p style={{ marginTop: '0.75rem', opacity: 0.8, fontSize: '0.9rem' }}>
              This will open a browser window for you to log into your Webflow account.
            </p>
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Define a CSS Variable</h3>
            <p>Before building components, define your design tokens (colors, spacing, typography). Open <code>src/styles/webflow-variables.css</code> and add your new variable inside the <code>:root</code> block.</p>
            <CommandBlock code={`:root {\n  /* ... existing variables ... */\n  --wf-color--brand: #ff0055;\n}`} />
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Display it on the Variables Page</h3>
            <p>To make the variable visible and copyable in your local preview, open <code>src/pages/WebflowVariablesPage.jsx</code> and add it to the corresponding array (e.g., the <code>colors</code> array).</p>
            <CommandBlock code={`const colors = [\n  // ... existing colors ...\n  { name: '--wf-color--brand', value: '#ff0055' },\n];`} />
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">4</div>
          <div className="step-content">
            <h3>Create a Component Folder</h3>
            <p>Create a new folder for your component inside the <code>src/components/</code> directory. For example, create <code>src/components/Button/</code>.</p>
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">5</div>
          <div className="step-content">
            <h3>Write the React Component</h3>
            <p>Write your React component logic in <code>Button.jsx</code>. This is where you define how the component renders based on the properties passed to it.</p>
            <CommandBlock 
              code={`import React from 'react';
import './Button.css';

export const Button = ({
  label = 'Click Me',
  variant = 'Primary',
  size = 'Medium',
}) => {
  const className = [
    'wf-button',
    \`wf-button--\${variant.toLowerCase()}\`,
    \`wf-button--\${size.toLowerCase()}\`,
  ].join(' ');

  return (
    <button className={className}>
      {label}
    </button>
  );
};`}
            />
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">6</div>
          <div className="step-content">
            <h3>Style the Component</h3>
            <p>Add your styling in <code>Button.css</code>. These styles will be bundled and applied in Webflow.</p>
            <CommandBlock 
              code={`.wf-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.2s;
  border: 1px solid transparent;
}

.wf-button:hover {
  opacity: 0.9;
}

/* ─── Variants ─── */
.wf-button--primary {
  background-color: #3b82f6;
  color: white;
}
.wf-button--secondary {
  background-color: #e5e7eb;
  color: #1f2937;
}`}
            />
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">7</div>
          <div className="step-content">
            <h3>Add Properties for Webflow</h3>
            <p>To make your component editable in Webflow, define its properties in the <code>.webflow.jsx</code> file.</p>
            <CommandBlock 
              code={`import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from './Button';

export default declareComponent(Button, {
  name: 'Button',
  description: 'A versatile button component.',
  group: 'Basic',
  props: {
    label: props.String({
      name: 'Label',
      defaultValue: 'Click Me',
    }),
  },
});`}
            />
            <p style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(255,200,0,0.1)', borderLeft: '4px solid #ffb000', borderRadius: '4px' }}>
              <strong>Crucial:</strong> Make sure you also destructure these properties in your React component (e.g., <code>export const Button = ({'{'} label {'}'}) =&gt; {'{'} ... {'}'}</code>) so they actually work!
            </p>
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">8</div>
          <div className="step-content">
            <h3>Upload Component (Add to Webflow)</h3>
            <p>Once your component is ready, bundle and upload it to your Webflow Workspace:</p>
            <CommandBlock code="npm run webflow:import" />
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>After the import succeeds:</p>
            <ol style={{ lineHeight: 2 }}>
              <li>Open your Webflow site.</li>
              <li>Press <code>L</code> → find your library → click <strong>Install</strong> (if not installed yet).</li>
              <li>Press <code>⇧C</code> → find your component.</li>
              <li>Drag it onto the canvas and edit its properties in the right panel.</li>
            </ol>
          </div>
        </div>

      </section>

      <section className="doc-section">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Additional Steps: Helpful Scripts</h2>
        <p style={{ marginBottom: '2rem', lineHeight: 1.8 }}>Once you are comfortable adding components manually, you can use these helper scripts to speed up your workflow.</p>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>Create a Component Automatically</h3>
          <p style={{ marginBottom: '1rem' }}>Run the scaffolding script to automatically generate the folder and boilerplate files for a new component:</p>
          <CommandBlock code="npm run create:component MyComponent" />
        </div>

        <div>
          <h3 style={{ marginBottom: '0.75rem' }}>Delete a Component</h3>
          <p style={{ marginBottom: '1rem' }}>To completely remove a component from your project:</p>
          <CommandBlock code="npm run delete:component MyComponent" />
          <p style={{ marginTop: '0.75rem', opacity: 0.8, fontSize: '0.9rem' }}>
            This automatically deletes the component folder and removes references. Afterwards, re-run <code>npm run webflow:import</code> to update your Webflow Workspace and remove it from your library.
          </p>
        </div>
      </section>

      <section className="doc-section" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Use Cases & Drawbacks</h2>
        <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Before adopting React Code Components in Webflow, it is important to understand when they shine and when they might not be the best fit.</p>

        <div className="doc-step" style={{ borderLeft: 'none', paddingLeft: '0' }}>
          <div className="step-content">
            <h3 style={{ color: '#4CAF50' }}>Ideal Use Cases (Landing Pages)</h3>
            <ul style={{ lineHeight: 1.8, marginBottom: '2rem', paddingLeft: '1.5rem' }}>
              <li><strong>Advanced Interactive Elements:</strong> Custom 3D graphics (e.g., Three.js), highly complex custom sliders, or advanced animations that exceed native Webflow interaction limits.</li>
              <li><strong>Interactive Tools & Calculators:</strong> ROI calculators, dynamic pricing toggles, or lead-gen quizzes embedded directly into the marketing page.</li>
              <li><strong>Dynamic Content Fetching:</strong> Pulling in live data from external sources (e.g., live job boards, real estate listings, or social feeds) into a landing page.</li>
              <li><strong>Strictly Standardized Components:</strong> Global UI elements that must remain absolutely identical across dozens of landing pages, where you only want marketing teams to tweak specific text props, not the layout.</li>
            </ul>

            <h3 style={{ color: '#e74c3c' }}>Drawbacks & Limitations</h3>
            <ul style={{ lineHeight: 1.8, paddingLeft: '1.5rem' }}>
              <li><strong>Slower for Standard UI:</strong> Building standard landing page sections in React is significantly slower than building them visually directly in Webflow.</li>
              <li><strong>Client Handoff Friction:</strong> Clients or marketing teams cannot use the Webflow Designer to drag-and-drop elements or change the layout <em>inside</em> the component; they can only edit the exposed text/image props.</li>
              <li><strong>No Dynamic Looping:</strong> You cannot use looping to dynamically add or remove multiple elements (for example, individual slides in a slider) from Webflow.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>
        <p>Webflow Code Components Boilerplate</p>
      </footer>

      {isImageEnlarged && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'zoom-out'
          }}
          onClick={() => setIsImageEnlarged(false)}
        >
          <img 
            src={`${process.env.PUBLIC_URL}/code-component-showcase.jpg`} 
            alt="Webflow Code Component Showcase Fullscreen" 
            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }} 
          />
        </div>
      )}
    </div>
  );
};

export default DocumentationPage;
