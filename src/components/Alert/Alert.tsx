import React, { useState } from 'react';
import './Alert.css';

export interface AlertProps {
  message?: string;
  type?: 'Info' | 'Success' | 'Warning' | 'Error';
  dismissible?: boolean;
}

const icons: Record<string, string> = {
  Info: 'ℹ️',
  Success: '✅',
  Warning: '⚠️',
  Error: '❌',
};

export const Alert = ({
  message = 'This is an alert message.',
  type = 'Info',
  dismissible = true,
}: AlertProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={`wf-alert wf-alert--${type.toLowerCase()}`} role="alert">
      <span className="wf-alert__icon">{icons[type]}</span>
      <p className="wf-alert__message">{message}</p>
      {dismissible && (
        <button
          className="wf-alert__close"
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
};
