import React, { useState } from 'react';
import Image from 'next/image';

/**
 * Accessible YouTube Embed component
 * 
 * This component provides an accessible placeholder image with proper alt text
 * before the video is loaded, fixing Lighthouse accessibility warnings.
 */
const AccessibleEmbed = ({ 
  youtubeId, 
  placeholder, 
  title, 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    setIsLoaded(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsLoaded(true);
    }
  };

  if (isLoaded) {
    return (
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Play video: ${title}`}
      className="accessible-embed-button"
    >
      <Image
        src={placeholder}
        alt={title}
        width={560}
        height={315}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
      {/* Play button overlay */}
      <span className="play-button-overlay">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <style jsx>{`
        .accessible-embed-button {
          position: relative;
          display: block;
          width: 100%;
          cursor: pointer;
          background: #000;
          border: none;
          padding: 0;
          overflow: hidden;
        }
        .accessible-embed-button:focus {
          outline: 3px solid #4A90D9;
          outline-offset: 2px;
        }
        .play-button-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 68px;
          height: 48px;
          background-color: rgba(0, 0, 0, 0.8);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }
        .accessible-embed-button:hover .play-button-overlay,
        .accessible-embed-button:focus .play-button-overlay {
          background-color: rgba(255, 0, 0, 0.9);
        }
      `}</style>
    </button>
  );
};

export default AccessibleEmbed;
