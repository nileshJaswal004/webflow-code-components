import React, { useState, useEffect } from 'react';
import './LiveCandidateFeed.css';

export const LiveCandidateFeed = ({
  title = "Recently Active Candidates",
  resultsCount = 3
}) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live data from an external public API
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        // Using randomuser.me as a safe, CORS-friendly mock for a "Live Candidate / Job Board"
        const response = await fetch(`https://randomuser.me/api/?results=${resultsCount}&nat=us,gb`);
        const data = await response.json();
        setCandidates(data.results);
      } catch (error) {
        console.error("Error fetching live data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [resultsCount]);

  return (
    <div className="live-feed">
      <div className="live-feed__header">
        <h3 className="live-feed__title">{title}</h3>
        <span className="live-feed__pulse-badge">
          <span className="live-feed__pulse-dot"></span>
          Live
        </span>
      </div>
      
      {loading ? (
        <div className="live-feed__loading">
          <span className="live-feed__spinner"></span>
          Fetching live data...
        </div>
      ) : (
        <div className="live-feed__list">
          {candidates.map((candidate, idx) => (
            <div key={idx} className="live-feed__card">
              <img 
                src={candidate.picture.medium} 
                alt={`${candidate.name.first} ${candidate.name.last}`} 
                className="live-feed__avatar"
              />
              <div className="live-feed__info">
                <h4 className="live-feed__name">
                  {candidate.name.first} {candidate.name.last}
                </h4>
                <p className="live-feed__location">
                  {candidate.location.city}, {candidate.location.country}
                </p>
              </div>
              <button className="live-feed__action">View Profile</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
