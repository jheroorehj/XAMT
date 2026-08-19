import React from 'react';

interface XamtLogoProps {
  size?: number;
  className?: string;
}

/**
 * XAMT brand emblem — embracing family heart.
 * Shared between the loading screen and the app header.
 */
export const XamtLogo: React.FC<XamtLogoProps> = ({ size = 60, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left Parent Arc */}
    <path
      d="M38 30C28 30 20 40 20 54C20 72 45 86 50 90C50 90 52 89 54 87.5"
      stroke="#3E6B48"
      strokeWidth="7"
      strokeLinecap="round"
    />
    {/* Right Child Arc */}
    <path
      d="M62 30C72 30 80 40 80 54C80 72 55 86 50 90"
      stroke="#5B8A65"
      strokeWidth="7"
      strokeLinecap="round"
    />
    {/* Left Head */}
    <circle cx="38" cy="22" r="6.5" fill="#3E6B48" />
    {/* Right Head */}
    <circle cx="62" cy="22" r="6.5" fill="#5B8A65" />
    {/* Inner connecting leaf sprout */}
    <path
      d="M50 44C44 50 42 58 50 66C58 58 56 50 50 44Z"
      fill="#8EAA7B"
      opacity="0.9"
    />
  </svg>
);
