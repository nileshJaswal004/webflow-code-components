import React, { useState } from 'react';
import './Tabs.css';

export interface TabsProps {
  tab1Label?: string;
  tab1Content?: string;
  tab2Label?: string;
  tab2Content?: string;
  tab3Label?: string;
  tab3Content?: string;
  defaultTab?: 'Tab 1' | 'Tab 2' | 'Tab 3';
}

export const Tabs = ({
  tab1Label = 'Overview',
  tab1Content = 'This is the content for the first tab. Replace this with your actual content.',
  tab2Label = 'Features',
  tab2Content = 'This is the content for the second tab. Replace this with your actual content.',
  tab3Label = 'Details',
  tab3Content = 'This is the content for the third tab. Replace this with your actual content.',
  defaultTab = 'Tab 1',
}: TabsProps) => {
  const tabs = [
    { id: 'Tab 1', label: tab1Label, content: tab1Content },
    { id: 'Tab 2', label: tab2Label, content: tab2Content },
    { id: 'Tab 3', label: tab3Label, content: tab3Content },
  ];

  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="wf-tabs">
      {/* Tab list */}
      <div className="wf-tabs__list" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`wf-tabs__tab ${activeTab === tab.id ? 'wf-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id as typeof defaultTab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="wf-tabs__panels">
        {tabs.map(tab => (
          <div
            key={tab.id}
            role="tabpanel"
            className={`wf-tabs__panel ${activeTab === tab.id ? 'wf-tabs__panel--active' : ''}`}
          >
            <p className="wf-tabs__content">{tab.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
