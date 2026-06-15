import React from 'react';
import './RichCard.css';

export const RichCard = ({
  imageUrl = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
  showBadge = true,
  title = 'Premium Webflow Course',
  rating = 5,
  buttonUrl = '#',
  theme = 'Light'
}) => {
  // Simple array trick to render stars based on the rating number
  const stars = Array.from({ length: Math.min(Math.max(rating, 0), 5) });

  return (
    <div className={`rich-card rich-card--${theme.toLowerCase()}`}>
      <div className="rich-card__image-wrapper">
        <img src={imageUrl} alt={title} className="rich-card__image" />
        {showBadge && <span className="rich-card__badge">NEW</span>}
      </div>
      
      <div className="rich-card__content">
        <h3 className="rich-card__title">{title}</h3>
        
        <div className="rich-card__rating">
          {stars.map((_, i) => <span key={i} className="rich-card__star">★</span>)}
          <span className="rich-card__rating-number">({rating}/5)</span>
        </div>
        
        <a href={buttonUrl} className="rich-card__button">
          Learn More
        </a>
      </div>
    </div>
  );
};
