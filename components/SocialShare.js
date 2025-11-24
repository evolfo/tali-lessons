import React from 'react'

const SocialShare = ({ url, title, description }) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    bluesky: `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
  }

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=600')
  }

  return (
    <div className="social-share">
      <p className="social-share__label">Share this article:</p>
      <div className="social-share__buttons">
        <button
          onClick={() => handleShare('facebook')}
          className="social-share__button social-share__button--facebook"
          aria-label="Share on Facebook"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('twitter')}
          className="social-share__button social-share__button--twitter"
          aria-label="Share on Twitter/X"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('bluesky')}
          className="social-share__button social-share__button--bluesky"
          aria-label="Share on Bluesky"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('linkedin')}
          className="social-share__button social-share__button--linkedin"
          aria-label="Share on LinkedIn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('email')}
          className="social-share__button social-share__button--email"
          aria-label="Share via Email"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </button>
      </div>

      <style jsx>{`
        .social-share {
          margin: 3rem 0;
          padding: 2rem;
          background: #f8f9ff;
          border-radius: 12px;
          border: 1px solid #e0e7ff;
        }

        .social-share__label {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 1rem;
          text-align: center;
        }

        .social-share__buttons {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .social-share__button {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }

        .social-share__button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .social-share__button--facebook {
          background: #1877f2;
        }

        .social-share__button--facebook:hover {
          background: #145dbf;
        }

        .social-share__button--twitter {
          background: #000000;
        }

        .social-share__button--twitter:hover {
          background: #333333;
        }

        .social-share__button--bluesky {
          background: #0085ff;
        }

        .social-share__button--bluesky:hover {
          background: #006acc;
        }

        .social-share__button--linkedin {
          background: #0077b5;
        }

        .social-share__button--linkedin:hover {
          background: #005885;
        }

        .social-share__button--email {
          background: #667eea;
        }

        .social-share__button--email:hover {
          background: #5568d3;
        }

        @media (max-width: 767px) {
          .social-share {
            padding: 1.5rem;
            margin: 2rem 0;
          }

          .social-share__button {
            width: 44px;
            height: 44px;
          }

          .social-share__buttons {
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default SocialShare
