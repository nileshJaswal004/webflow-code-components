import React from 'react';
import './Card.css';

export interface CardProps {
  title?: string;
  description?: string;
  badge?: string;
  ctaText?: string;
  ctaUrl?: string;
  variant?: 'Default' | 'Outlined' | 'Elevated';
}

export const Card = ({
  title = 'Card Title',
  description = 'A short description that explains what this card is about.',
  badge = '',
  ctaText = 'Learn More',
  ctaUrl = '#',
  variant = 'Default',
}: CardProps) => {
  return (
    <div className={`wf-card wf-card--${variant.toLowerCase()}`}>
      {badge && <span className="wf-card__badge">{badge}</span>}
      <div className="wf-card__body">
        <h3 className="wf-card__title">{title}</h3>
        <p className="wf-card__description">{description}</p>
      </div>
      {ctaText && (
        <div className="wf-card__footer">
          <a href={ctaUrl} className="wf-card__cta">
            {ctaText} <span className="wf-card__cta-arrow">→</span>
          </a>
        </div>
      )}
    </div>
  );
};
