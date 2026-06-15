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
  return (
    <div className="documentation-page">
      <header className="doc-hero">
        <h1>Webflow Code Components Guide</h1>
        <p>A simple guide to creating and syncing React components to Webflow.</p>
      </header>

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
              <li><strong>SEO Concerns:</strong> Because React components render client-side, text inside them might not be immediately indexed by search engines, which is critical for landing page SEO.</li>
              <li><strong>Maintenance Overhead:</strong> Updating the component requires a developer to edit code, rebuild, and re-import, preventing designers from making quick layout tweaks themselves.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Step-by-Step Guide</h2>
        <div className="doc-step">
          <div className="step-number">0</div>
          <div className="step-content">
            <h3>Prerequisites</h3>
            <p>Before you begin, clone the repository, install the dependencies, and start the local preview server:</p>
            <CommandBlock code="git clone https://github.com/nileshUplers/webflow-code-components.git" />
            <CommandBlock code="cd webflow-code-components" style={{ marginTop: '0.5rem' }} />
            <CommandBlock code="npm install && npm start" style={{ marginTop: '0.5rem' }} />
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
            <h3>Create a Code Component</h3>
            <p>Run the scaffolding script to automatically generate your component files:</p>
            <CommandBlock code="npm run create:component MyComponent" />
            <p style={{ marginTop: '0.75rem', opacity: 0.8, fontSize: '0.9rem' }}>
              This creates a folder at <code>src/components/MyComponent/</code>.
            </p>
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Develop & Preview Locally</h3>
            <p>Write your React code in <code>MyComponent.jsx</code> and style it in <code>MyComponent.css</code>.</p>
            <p style={{ marginTop: '0.75rem' }}>To preview your work locally:</p>
            <ol style={{ lineHeight: 2, marginBottom: '0' }}>
              <li>Open <code>src/pages/ComponentsDisplayPage.jsx</code></li>
              <li>
                Import your component and add it to the <code>components</code> array:
                <div className="code-block" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                  {`// 1. Import at the top
import { MyComponent } from '../components';

// 2. Add to the components array
const components = [
  {
    name: 'MyComponent',
    group: 'Custom',
    description: 'My custom component.',
    propsDocs: [],
    playgroundProps: [
      { name: 'title', label: 'Title', type: 'string', default: 'Hello World' }
    ],
    render: p => <MyComponent title={String(p.title)} />
  }
];`}
                </div>
              </li>
              <li>Check your browser at <code>http://localhost:3000</code> to see it live!</li>
            </ol>
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">4</div>
          <div className="step-content">
            <h3>Add Properties for Webflow</h3>
            <p>To make your component editable in Webflow, define its properties in the <code>.webflow.jsx</code> file.</p>
            <div className="code-block">
              {`import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyComponent } from './MyComponent';

export default declareComponent(MyComponent, {
  name: 'My Component',
  description: 'A custom Webflow component.',
  group: 'Custom',
  props: {
    title: props.String({
      name: 'Title',
      defaultValue: 'Hello World',
    }),
  },
});`}
            </div>
            <p style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(255,200,0,0.1)', borderLeft: '4px solid #ffb000', borderRadius: '4px' }}>
              <strong>Crucial:</strong> Make sure you also destructure these properties in your React component (e.g., <code>export const MyComponent = ({'{'} title {'}'}) =&gt; {'{'} ... {'}'}</code>) so they actually work!
            </p>
          </div>
        </div>

        <div className="doc-step">
          <div className="step-number">5</div>
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

        <div className="doc-step">
          <div className="step-number">6</div>
          <div className="step-content">
            <h3>Delete a Component</h3>
            <p>To remove a component from your project, run the deletion script:</p>
            <CommandBlock code="npm run delete:component MyComponent" />
            <p style={{ marginTop: '0.75rem', opacity: 0.8, fontSize: '0.9rem' }}>
              This automatically deletes the component folder and removes references from the code. Afterwards, re-run <code>npm run webflow:import</code> to update your Webflow Workspace and remove the deleted component from your library.
            </p>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '2rem', opacity: 0.6 }}>
        <p>Webflow Code Components Boilerplate</p>
      </footer>
    </div>
  );
};

export default DocumentationPage;
