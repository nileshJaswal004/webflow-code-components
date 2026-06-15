import React from 'react';
import './Button.css';

export const Button = ({
  label = 'Click Me',
  variant = 'Primary',
  size = 'Medium',
}) => {
  const className = [
    'wf-button',
    `wf-button--${variant.toLowerCase()}`,
    `wf-button--${size.toLowerCase()}`,
  ].join(' ');

  return (
    <button className={className}>
      {label}
    </button>
  );
};
