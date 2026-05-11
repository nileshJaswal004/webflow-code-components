import React, { useState } from 'react';
import './InteractiveForm.css';

export interface InteractiveFormProps {
  formTitle?: string;
  submitButtonText?: string;
  successMessage?: string;
}

export const InteractiveForm = ({
  formTitle = 'Contact Us',
  submitButtonText = 'Send Message',
  successMessage = 'Thank you! Your message has been received.',
}: InteractiveFormProps) => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for form submission status
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser form submission
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill out all fields.');
      setStatus('error');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    // Simulate an API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="wf-form-success">
        <div className="wf-form-success__icon">✅</div>
        <h3 className="wf-form-success__title">Success</h3>
        <p className="wf-form-success__message">{successMessage}</p>
        <button 
          className="wf-form-success__button" 
          onClick={() => setStatus('idle')}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="wf-form" onSubmit={handleSubmit} noValidate>
      {formTitle && <h2 className="wf-form__title">{formTitle}</h2>}
      
      {status === 'error' && (
        <div className="wf-form__error-banner">{errorMsg}</div>
      )}

      <div className="wf-form__group">
        <label htmlFor="name" className="wf-form__label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="wf-form__input"
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'submitting'}
          placeholder="Jane Doe"
        />
      </div>

      <div className="wf-form__group">
        <label htmlFor="email" className="wf-form__label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="wf-form__input"
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'submitting'}
          placeholder="jane@example.com"
        />
      </div>

      <div className="wf-form__group">
        <label htmlFor="message" className="wf-form__label">Message</label>
        <textarea
          id="message"
          name="message"
          className="wf-form__textarea"
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
          placeholder="How can we help?"
          rows={4}
        />
      </div>

      <button 
        type="submit" 
        className={`wf-form__submit ${status === 'submitting' ? 'wf-form__submit--loading' : ''}`}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : submitButtonText}
      </button>
    </form>
  );
};
