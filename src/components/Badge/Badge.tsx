import React from 'react';
import './Badge.css';

export interface BadgeProps {
  text?: string;
  variant?: 'Default' | 'Success' | 'Warning' | 'Error';
}

export const Badge = ({ text = 'Badge', variant = 'Default' }: BadgeProps) => {
  return (
    <span className={`wf-badge wf-badge--${variant.toLowerCase()}`}>
      {text}
    </span>
  );
};
