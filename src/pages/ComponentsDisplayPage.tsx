// ─────────────────────────────────────────────────────────────────────────────
// ComponentsDisplayPage.tsx
//
// STEP 1 OF 2 — Import your component at the top of this file.
// STEP 2 OF 2 — Add an entry to the `components` array below.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useMemo } from 'react';

// ── STEP 1: Import components ─────────────────────────────────────────────
import { Button }           from '../components/Button';
import { Badge }            from '../components/Badge';
import { Alert }            from '../components/Alert';
import { Card }             from '../components/Card';
import { Tabs }             from '../components/Tabs';
import { Countdown }        from '../components/Countdown';
import { FAQAccordion }     from '../components/FAQAccordion';
import { InteractiveForm }  from '../components/InteractiveForm';
import { Modal }            from '../components/Modal';
import { SwiperCarousel }   from '../components/SwiperCarousel';
import { Toast }            from '../components/Toast';

// ── Types ─────────────────────────────────────────────────────────────────
interface PlaygroundProp {
  name: string;
  label: string;
  type: 'string' | 'boolean' | 'variant' | 'number';
  default: unknown;
  options?: string[];
}

interface PropDoc {
  name: string;
  type: string;
  defaultVal: string;
}

interface ComponentDef {
  name: string;
  group: string;
  description: string;
  propsDocs: PropDoc[];
  playgroundProps: PlaygroundProp[];
  render: (props: Record<string, unknown>) => React.ReactNode;
}

// ── ComponentSection — manages its own playground state ───────────────────
const ComponentSection: React.FC<{ comp: ComponentDef }> = ({ comp }) => {
  const [values, setValues] = useState<Record<string, unknown>>(
    Object.fromEntries(comp.playgroundProps.map(p => [p.name, p.default]))
  );
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateProp = (name: string, value: unknown) =>
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
                        {prop.options!.map(opt => (
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
      <div className="component-full-preview">{comp.render(values)}</div>
    </section>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────
const ComponentsDisplayPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('All');

  // ── STEP 2: Add component entries here ───────────────────────────────
  const components: ComponentDef[] = [
    {
      name: 'Button',
      group: 'Basic',
      description:
        'A versatile button with three variants (Primary, Secondary, Outline) and three sizes. Use it as a standalone CTA or within forms.',
      propsDocs: [
        { name: 'label',    type: 'String',  defaultVal: 'Click Me' },
        { name: 'variant',  type: 'Variant', defaultVal: 'Primary' },
        { name: 'size',     type: 'Variant', defaultVal: 'Medium' },
        { name: 'disabled', type: 'Boolean', defaultVal: 'false' },
      ],
      playgroundProps: [
        { name: 'label',    label: 'Label',    type: 'string',  default: 'Click Me' },
        { name: 'variant',  label: 'Variant',  type: 'variant', default: 'Primary',  options: ['Primary', 'Secondary', 'Outline'] },
        { name: 'size',     label: 'Size',     type: 'variant', default: 'Medium',   options: ['Small', 'Medium', 'Large'] },
        { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
      ],
      render: p => (
        <Button
          label={String(p.label)}
          variant={p.variant as 'Primary' | 'Secondary' | 'Outline'}
          size={p.size as 'Small' | 'Medium' | 'Large'}
          disabled={Boolean(p.disabled)}
        />
      ),
    },
    {
      name: 'Badge',
      group: 'Basic',
      description:
        'A small inline label for statuses, categories, or highlights. Four semantic variants: Default, Success, Warning, Error.',
      propsDocs: [
        { name: 'text',    type: 'String',  defaultVal: 'Badge' },
        { name: 'variant', type: 'Variant', defaultVal: 'Default' },
      ],
      playgroundProps: [
        { name: 'text',    label: 'Text',    type: 'string',  default: 'New' },
        { name: 'variant', label: 'Variant', type: 'variant', default: 'Default', options: ['Default', 'Success', 'Warning', 'Error'] },
      ],
      render: p => (
        <Badge
          text={String(p.text)}
          variant={p.variant as 'Default' | 'Success' | 'Warning' | 'Error'}
        />
      ),
    },
    {
      name: 'Alert',
      group: 'Feedback',
      description:
        'A dismissible inline alert for info, success, warning, or error messages. Includes an icon, message, and close button.',
      propsDocs: [
        { name: 'message',     type: 'String',  defaultVal: 'Alert message' },
        { name: 'type',        type: 'Variant', defaultVal: 'Info' },
        { name: 'dismissible', type: 'Boolean', defaultVal: 'true' },
      ],
      playgroundProps: [
        { name: 'message',     label: 'Message',     type: 'string',  default: 'This action was completed successfully.' },
        { name: 'type',        label: 'Type',        type: 'variant', default: 'Info', options: ['Info', 'Success', 'Warning', 'Error'] },
        { name: 'dismissible', label: 'Dismissible', type: 'boolean', default: true },
      ],
      render: p => (
        <Alert
          message={String(p.message)}
          type={p.type as 'Info' | 'Success' | 'Warning' | 'Error'}
          dismissible={Boolean(p.dismissible)}
        />
      ),
    },
    {
      name: 'Card',
      group: 'Content',
      description:
        'A content card with optional badge, title, description, and CTA link. Three variants: Default, Outlined, and Elevated.',
      propsDocs: [
        { name: 'title',       type: 'String',  defaultVal: 'Card Title' },
        { name: 'description', type: 'String',  defaultVal: 'A short description.' },
        { name: 'badge',       type: 'String',  defaultVal: '' },
        { name: 'ctaText',     type: 'String',  defaultVal: 'Learn More' },
        { name: 'ctaUrl',      type: 'String',  defaultVal: '#' },
        { name: 'variant',     type: 'Variant', defaultVal: 'Default' },
      ],
      playgroundProps: [
        { name: 'title',       label: 'Title',       type: 'string',  default: 'Getting Started' },
        { name: 'description', label: 'Description', type: 'string',  default: 'Everything you need to build and deploy your first Webflow code component.' },
        { name: 'badge',       label: 'Badge',       type: 'string',  default: 'New' },
        { name: 'ctaText',     label: 'CTA Text',    type: 'string',  default: 'Read More' },
        { name: 'variant',     label: 'Variant',     type: 'variant', default: 'Default', options: ['Default', 'Outlined', 'Elevated'] },
      ],
      render: p => (
        <Card
          title={String(p.title)}
          description={String(p.description)}
          badge={String(p.badge)}
          ctaText={String(p.ctaText)}
          ctaUrl="#"
          variant={p.variant as 'Default' | 'Outlined' | 'Elevated'}
        />
      ),
    },
    {
      name: 'Tabs',
      group: 'Navigation',
      description:
        'An accessible tabbed content switcher with proper ARIA roles. Configure 3 tab labels and content panels from Webflow Designer.',
      propsDocs: [
        { name: 'tab1Label',   type: 'String',  defaultVal: 'Overview' },
        { name: 'tab1Content', type: 'String',  defaultVal: '...' },
        { name: 'tab2Label',   type: 'String',  defaultVal: 'Features' },
        { name: 'tab2Content', type: 'String',  defaultVal: '...' },
        { name: 'tab3Label',   type: 'String',  defaultVal: 'Details' },
        { name: 'tab3Content', type: 'String',  defaultVal: '...' },
        { name: 'defaultTab',  type: 'Variant', defaultVal: 'Tab 1' },
      ],
      playgroundProps: [
        { name: 'tab1Label',   label: 'Tab 1 Label',   type: 'string',  default: 'Overview' },
        { name: 'tab1Content', label: 'Tab 1 Content', type: 'string',  default: 'Welcome to the overview tab. This is where you introduce your topic.' },
        { name: 'tab2Label',   label: 'Tab 2 Label',   type: 'string',  default: 'Features' },
        { name: 'tab2Content', label: 'Tab 2 Content', type: 'string',  default: 'List the key features and capabilities here.' },
        { name: 'tab3Label',   label: 'Tab 3 Label',   type: 'string',  default: 'Details' },
        { name: 'tab3Content', label: 'Tab 3 Content', type: 'string',  default: 'Provide technical details and specifications here.' },
      ],
      render: p => (
        <Tabs
          tab1Label={String(p.tab1Label)}
          tab1Content={String(p.tab1Content)}
          tab2Label={String(p.tab2Label)}
          tab2Content={String(p.tab2Content)}
          tab3Label={String(p.tab3Label)}
          tab3Content={String(p.tab3Content)}
        />
      ),
    },
    {
      name: 'Toast',
      group: 'Feedback',
      description:
        'A portal-rendered toast notification that renders above all content via ReactDOM.createPortal. Auto-dismisses after a configurable duration.',
      propsDocs: [
        { name: 'message',    type: 'String',  defaultVal: 'This is a notification.' },
        { name: 'type',       type: 'Variant', defaultVal: 'Info' },
        { name: 'duration',   type: 'Number',  defaultVal: '3000' },
        { name: 'position',   type: 'Variant', defaultVal: 'Top Right' },
        { name: 'buttonText', type: 'String',  defaultVal: 'Show Toast' },
      ],
      playgroundProps: [
        { name: 'message',    label: 'Message',    type: 'string',  default: 'Action completed successfully!' },
        { name: 'type',       label: 'Type',       type: 'variant', default: 'Info',      options: ['Info', 'Success', 'Warning', 'Error'] },
        { name: 'duration',   label: 'Duration ms',type: 'number',  default: 3000 },
        { name: 'position',   label: 'Position',   type: 'variant', default: 'Top Right', options: ['Top Right', 'Top Left', 'Bottom Right', 'Bottom Left', 'Top Center', 'Bottom Center'] },
        { name: 'buttonText', label: 'Button Text',type: 'string',  default: 'Show Toast' },
      ],
      render: p => (
        <Toast
          message={String(p.message)}
          type={p.type as 'Info' | 'Success' | 'Warning' | 'Error'}
          duration={Number(p.duration)}
          position={p.position as 'Top Right' | 'Top Left' | 'Bottom Right' | 'Bottom Left' | 'Top Center' | 'Bottom Center'}
          buttonText={String(p.buttonText)}
        />
      ),
    },
    {
      name: 'Swiper Carousel',
      group: 'Media',
      description:
        'A touch-friendly, mobile-optimised carousel powered by Swiper.js. Supports autoplay, loop, navigation arrows, and pagination dots.',
      propsDocs: [
        { name: 'slide1Title',       type: 'String',  defaultVal: 'Slide One' },
        { name: 'slide1Description', type: 'String',  defaultVal: '...' },
        { name: 'autoplay',          type: 'Boolean', defaultVal: 'false' },
        { name: 'loop',              type: 'Boolean', defaultVal: 'true' },
        { name: 'showNavigation',    type: 'Boolean', defaultVal: 'true' },
        { name: 'showPagination',    type: 'Boolean', defaultVal: 'true' },
      ],
      playgroundProps: [
        { name: 'slide1Title',       label: 'Slide 1 Title', type: 'string',  default: 'First Slide' },
        { name: 'slide1Description', label: 'Slide 1 Text',  type: 'string',  default: 'Add compelling content for your first slide here.' },
        { name: 'slide2Title',       label: 'Slide 2 Title', type: 'string',  default: 'Second Slide' },
        { name: 'slide2Description', label: 'Slide 2 Text',  type: 'string',  default: 'Add compelling content for your second slide here.' },
        { name: 'slide3Title',       label: 'Slide 3 Title', type: 'string',  default: 'Third Slide' },
        { name: 'slide3Description', label: 'Slide 3 Text',  type: 'string',  default: 'Add compelling content for your third slide here.' },
        { name: 'autoplay',          label: 'Autoplay',        type: 'boolean', default: false },
        { name: 'loop',              label: 'Loop',             type: 'boolean', default: true },
        { name: 'showNavigation',    label: 'Show Navigation',  type: 'boolean', default: true },
        { name: 'showPagination',    label: 'Show Pagination',  type: 'boolean', default: true },
      ],
      render: p => (
        <SwiperCarousel
          slide1Title={String(p.slide1Title)}
          slide1Description={String(p.slide1Description)}
          slide2Title={String(p.slide2Title)}
          slide2Description={String(p.slide2Description)}
          slide3Title={String(p.slide3Title)}
          slide3Description={String(p.slide3Description)}
          autoplay={Boolean(p.autoplay)}
          loop={Boolean(p.loop)}
          showNavigation={Boolean(p.showNavigation)}
          showPagination={Boolean(p.showPagination)}
        />
      ),
    },
    {
      name: 'Countdown',
      group: 'Advanced',
      description:
        'A real-time countdown timer to a specific date. Uses useState + useEffect to tick every second. Configurable title and label visibility.',
      propsDocs: [
        { name: 'targetDate', type: 'String',  defaultVal: '2026-01-01T00:00:00' },
        { name: 'title',      type: 'String',  defaultVal: 'Countdown' },
        { name: 'showLabels', type: 'Boolean', defaultVal: 'true' },
      ],
      playgroundProps: [
        { name: 'targetDate', label: 'Target Date', type: 'string',  default: '2027-01-01T00:00:00' },
        { name: 'title',      label: 'Title',       type: 'string',  default: 'Countdown to Launch' },
        { name: 'showLabels', label: 'Show Labels', type: 'boolean', default: true },
      ],
      render: p => (
        <Countdown
          targetDate={String(p.targetDate)}
          title={String(p.title)}
          showLabels={Boolean(p.showLabels)}
        />
      ),
    },
    {
      name: 'FAQ Accordion',
      group: 'Content',
      description:
        'An expandable FAQ accordion. Items open and close independently. Up to 5 Q&A pairs configurable from the Webflow Designer.',
      propsDocs: [
        { name: 'title',      type: 'String', defaultVal: 'FAQ' },
        { name: 'question1',  type: 'String', defaultVal: 'Question 1' },
        { name: 'answer1',    type: 'String', defaultVal: 'Answer 1' },
      ],
      playgroundProps: [
        { name: 'title',     label: 'Title',      type: 'string', default: 'Frequently Asked Questions' },
        { name: 'question1', label: 'Question 1', type: 'string', default: 'What is Webflow Code Components?' },
        { name: 'answer1',   label: 'Answer 1',   type: 'string', default: 'Webflow Code Components let you build custom React components and import them directly into the Webflow Designer.' },
        { name: 'question2', label: 'Question 2', type: 'string', default: 'Do I need to know React?' },
        { name: 'answer2',   label: 'Answer 2',   type: 'string', default: 'Yes, a basic understanding of React is required to build custom components.' },
      ],
      render: p => (
        <FAQAccordion
          title={String(p.title)}
          question1={String(p.question1)}
          answer1={String(p.answer1)}
          question2={String(p.question2)}
          answer2={String(p.answer2)}
        />
      ),
    },
    {
      name: 'Interactive Form',
      group: 'Advanced',
      description:
        'A validated contact form with client-side error handling and a success state. Demonstrates controlled inputs and conditional rendering.',
      propsDocs: [
        { name: 'title',       type: 'String', defaultVal: 'Contact Us' },
        { name: 'submitLabel', type: 'String', defaultVal: 'Send Message' },
        { name: 'successMsg',  type: 'String', defaultVal: 'Message sent!' },
      ],
      playgroundProps: [
        { name: 'title',       label: 'Form Title',       type: 'string', default: 'Get in Touch' },
        { name: 'submitLabel', label: 'Submit Button',    type: 'string', default: 'Send Message' },
        { name: 'successMsg',  label: 'Success Message',  type: 'string', default: "Thanks! We'll get back to you soon." },
      ],
      render: p => (
        <InteractiveForm
          title={String(p.title)}
          submitLabel={String(p.submitLabel)}
          successMsg={String(p.successMsg)}
        />
      ),
    },
    {
      name: 'Modal',
      group: 'Advanced',
      description:
        'A dialog modal with overlay, header, body, and footer. Demonstrates event handling, overlay click-to-close, and focus management.',
      propsDocs: [
        { name: 'triggerLabel', type: 'String', defaultVal: 'Open Modal' },
        { name: 'title',        type: 'String', defaultVal: 'Modal Title' },
        { name: 'body',         type: 'String', defaultVal: 'Modal body text.' },
      ],
      playgroundProps: [
        { name: 'triggerLabel', label: 'Trigger Label', type: 'string', default: 'Open Modal' },
        { name: 'title',        label: 'Modal Title',   type: 'string', default: 'Confirm Action' },
        { name: 'body',         label: 'Body Text',     type: 'string', default: 'Are you sure you want to continue? This action cannot be undone.' },
      ],
      render: p => (
        <Modal
          triggerLabel={String(p.triggerLabel)}
          title={String(p.title)}
          body={String(p.body)}
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
