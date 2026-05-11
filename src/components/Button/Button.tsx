import React from 'react';
import './Button.css';

export interface ButtonProps {
  label?: string;
  variant?: 'Primary' | 'Secondary' | 'Outline';
  size?: 'Small' | 'Medium' | 'Large';
  disabled?: boolean;
  href?: string;
}

export const Button = ({
  label = 'Click Me',
  variant = 'Primary',
  size = 'Medium',
  disabled = false,
  href,
}: ButtonProps) => {
  const className = [
    'wf-button',
    `wf-button--${variant.toLowerCase()}`,
    `wf-button--${size.toLowerCase()}`,
    disabled ? 'wf-button--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (href && !disabled) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <button className={className} disabled={disabled}>
      {label}
    </button>
  );
};
