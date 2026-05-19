import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Toast.css';

type ToastType = 'Info' | 'Success' | 'Warning' | 'Error';
type ToastPosition =
  | 'Top Right'
  | 'Top Left'
  | 'Bottom Right'
  | 'Bottom Left'
  | 'Top Center'
  | 'Bottom Center';

const ICONS: Record<ToastType, string> = {
  Info: 'ℹ️',
  Success: '✅',
  Warning: '⚠️',
  Error: '❌',
};

const POSITION_CLASS: Record<ToastPosition, string> = {
  'Top Right': 'wf-toast--top-right',
  'Top Left': 'wf-toast--top-left',
  'Bottom Right': 'wf-toast--bottom-right',
  'Bottom Left': 'wf-toast--bottom-left',
  'Top Center': 'wf-toast--top-center',
  'Bottom Center': 'wf-toast--bottom-center',
};

export interface ToastProps {
  message?: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  buttonText?: string;
}

export const Toast = ({
  message = 'This is a notification message.',
  type = 'Info',
  duration = 3000,
  position = 'Top Right',
  buttonText = 'Show Toast',
}: ToastProps) => {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  // Auto-dismiss after `duration` ms
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [visible, duration]);

  const toastEl = visible
    ? ReactDOM.createPortal(
        <div
          className={`wf-toast wf-toast--${type.toLowerCase()} ${POSITION_CLASS[position]}`}
          role="alert"
          aria-live="assertive"
        >
          <span className="wf-toast__icon">{ICONS[type]}</span>
          <span className="wf-toast__message">{message}</span>
          <button className="wf-toast__close" onClick={() => setVisible(false)} aria-label="Dismiss">
            ✕
          </button>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button className={`wf-toast-trigger wf-toast-trigger--${type.toLowerCase()}`} onClick={show}>
        {buttonText}
      </button>
      {toastEl}
    </>
  );
};
