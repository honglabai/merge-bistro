import React from 'react';

interface CobwebGraphicProps {
  className?: string;
}

export const CobwebGraphic: React.FC<CobwebGraphicProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* Radial Spokes - bright slate/silver threads */}
        <line x1="50" y1="50" x2="100" y2="50" stroke="#F1F5F9" strokeWidth="1.4" strokeOpacity="0.9" />
        <line x1="50" y1="50" x2="100" y2="100" stroke="#F1F5F9" strokeWidth="1.4" strokeOpacity="0.9" />
        <line x1="50" y1="50" x2="50" y2="100" stroke="#F1F5F9" strokeWidth="1.4" strokeOpacity="0.9" />
        <line x1="50" y1="50" x2="0" y2="100" stroke="#F1F5F9" strokeWidth="1.4" strokeOpacity="0.9" />
        <line x1="50" y1="50" x2="0" y2="50" stroke="#F1F5F9" strokeWidth="1.4" strokeOpacity="0.9" />
        <line x1="50" y1="50" x2="0" y2="0" stroke="#F1F5F9" strokeWidth="1.4" strokeOpacity="0.9" />
        <line x1="50" y1="50" x2="50" y2="0" stroke="#F1F5F9" strokeWidth="1.4" strokeOpacity="0.9" />
        <line x1="50" y1="50" x2="100" y2="0" stroke="#F1F5F9" strokeWidth="1.4" strokeOpacity="0.9" />

        {/* Delicate Corner Anchor Arcs */}
        <path d="M 0 24 Q 14 14 24 0" fill="none" stroke="#E2E8F0" strokeWidth="1.0" strokeOpacity="0.8" />
        <path d="M 0 36 Q 20 20 36 0" fill="none" stroke="#E2E8F0" strokeWidth="1.0" strokeOpacity="0.8" />
        <path d="M 76 0 Q 86 14 100 24" fill="none" stroke="#E2E8F0" strokeWidth="1.0" strokeOpacity="0.8" />
        <path d="M 64 0 Q 80 20 100 36" fill="none" stroke="#E2E8F0" strokeWidth="1.0" strokeOpacity="0.8" />
        <path d="M 100 76 Q 86 86 76 100" fill="none" stroke="#E2E8F0" strokeWidth="1.0" strokeOpacity="0.8" />
        <path d="M 100 64 Q 80 80 64 100" fill="none" stroke="#E2E8F0" strokeWidth="1.0" strokeOpacity="0.8" />
        <path d="M 24 100 Q 14 86 0 76" fill="none" stroke="#E2E8F0" strokeWidth="1.0" strokeOpacity="0.8" />
        <path d="M 36 100 Q 20 80 0 64" fill="none" stroke="#E2E8F0" strokeWidth="1.0" strokeOpacity="0.8" />

        {/* Concentric Drooping Web Silk Rings */}
        <path
          d="M 62.0 50.0 Q 59.1 53.8 58.5 58.5 Q 53.8 59.1 50.0 62.0 Q 46.2 59.1 41.5 58.5 Q 40.9 53.8 38.0 50.0 Q 40.9 46.2 41.5 41.5 Q 46.2 40.9 50.0 38.0 Q 53.8 40.9 58.5 41.5 Q 59.1 46.2 62.0 50.0"
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="1.2"
          strokeOpacity="0.9"
        />
        <path
          d="M 72.0 50.0 Q 66.7 56.9 65.6 65.6 Q 56.9 66.7 50.0 72.0 Q 43.1 66.7 34.4 65.6 Q 33.3 56.9 28.0 50.0 Q 33.3 43.1 34.4 34.4 Q 43.1 33.3 50.0 28.0 Q 56.9 33.3 65.6 34.4 Q 66.7 43.1 72.0 50.0"
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="1.2"
          strokeOpacity="0.9"
        />
        <path
          d="M 83.0 50.0 Q 75.0 60.4 73.3 73.3 Q 60.4 75.0 50.0 83.0 Q 39.6 75.0 26.7 73.3 Q 25.0 60.4 17.0 50.0 Q 25.0 39.6 26.7 26.7 Q 39.6 25.0 50.0 17.0 Q 60.4 25.0 73.3 26.7 Q 75.0 39.6 83.0 50.0"
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="1.2"
          strokeOpacity="0.9"
        />
        <path
          d="M 94.0 50.0 Q 83.3 63.8 81.1 81.1 Q 63.8 83.3 50.0 94.0 Q 36.2 83.3 18.9 81.1 Q 16.7 63.8 6.0 50.0 Q 16.7 36.2 18.9 18.9 Q 36.2 16.7 50.0 6.0 Q 63.8 16.7 81.1 18.9 Q 83.3 36.2 94.0 50.0"
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="1.2"
          strokeOpacity="0.9"
        />

        {/* Center Hub & Glistening Dew Specks */}
        <circle cx="50" cy="50" r="2.5" fill="none" stroke="#F1F5F9" strokeWidth="1.3" strokeOpacity="0.95" />
        <circle cx="66.3" cy="66.3" r="1.2" fill="#FFFFFF" opacity="0.95" />
        <circle cx="33.7" cy="33.7" r="1.1" fill="#FFFFFF" opacity="0.95" />
        <circle cx="50" cy="27" r="1.0" fill="#FFFFFF" opacity="0.95" />
        <circle cx="73" cy="50" r="1.1" fill="#FFFFFF" opacity="0.95" />
      </g>
    </svg>
  );
};
