import React, { useState } from 'react';
import './FAQAccordion.css';

interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  title?: string;
  items?: FAQItem[];
  allowMultiple?: boolean;
}

const defaultItems: FAQItem[] = [
  {
    question: 'How do I use this component?',
    answer: 'Simply drag it into your Webflow designer and update the props in the settings panel.',
  },
  {
    question: 'Can I customize the styles?',
    answer: 'Yes! The component uses global CSS variables, so any updates to your Webflow design tokens will automatically reflect here.',
  },
  {
    question: 'Is it accessible?',
    answer: 'It uses standard HTML elements and React state to manage visibility, making it easy to navigate.',
  },
];

export const FAQAccordion = ({
  title = 'Frequently Asked Questions',
  items = defaultItems,
  allowMultiple = false,
}: FAQAccordionProps) => {
  // Store the indices of currently open items.
  // Using an array allows us to support both single and multiple open items.
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (openIndices.includes(index)) {
      // If it's already open, close it by removing it from the array
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      // If it's closed, open it. 
      // If allowMultiple is true, add to array. Otherwise, replace array.
      setOpenIndices(allowMultiple ? [...openIndices, index] : [index]);
    }
  };

  return (
    <div className="wf-faq">
      {title && <h2 className="wf-faq__title">{title}</h2>}
      <div className="wf-faq__list">
        {items.map((item, index) => {
          const isOpen = openIndices.includes(index);
          
          return (
            <div 
              key={index} 
              className={`wf-faq__item ${isOpen ? 'wf-faq__item--open' : ''}`}
            >
              <button
                className="wf-faq__question"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className="wf-faq__icon">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              
              {/* Only render the answer if this item is open */}
              {isOpen && (
                <div className="wf-faq__answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
