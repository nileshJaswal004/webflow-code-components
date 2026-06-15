import React from 'react';
import './StatsBanner.css';

export const StatsBanner = ({
  stat1Value = '7',
  stat1Label = 'COMPONENTS',
  stat2Value = '45+',
  stat2Label = 'CSS TOKENS',
  stat3Value = '7',
  stat3Label = 'CATEGORIES',
  stat4Value = 'v1.0',
  stat4Label = 'VERSION'
}) => {
  const stats = [
    { value: stat1Value, label: stat1Label },
    { value: stat2Value, label: stat2Label },
    { value: stat3Value, label: stat3Label },
    { value: stat4Value, label: stat4Label }
  ];

  return (
    <div className="stats-banner">
      {stats.map((stat, index) => (
        <div className="stats-banner__item" key={index}>
          <div className="stats-banner__value">{stat.value}</div>
          <div className="stats-banner__label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
