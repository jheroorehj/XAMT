import React from 'react';

interface FamilyAvatarProps {
  role: 'parent' | 'child';
  size?: number;
  className?: string;
  /** Draw a soft ivory disc behind the animal, for use on photos or dark chips. */
  withBackground?: boolean;
}

/**
 * Hand-drawn stand-ins for the family: a fawn for the parent out on the steppe
 * and a lamb for the child. They replace the 🦌 / 🐑 emoji so the two faces
 * render identically on every platform and sit in the ХАМТ palette.
 */
export const FamilyAvatar: React.FC<FamilyAvatarProps> = ({
  role,
  size = 20,
  className = '',
  withBackground = false,
}) => {
  const isParent = role === 'parent';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {withBackground && <circle cx="24" cy="24" r="24" fill="#FAF7F0" />}

      {isParent ? (
        /* Fawn — branched antlers on top, leaf ears, dappled back */
        <g>
          {/* Antlers: main beam plus two prongs each side */}
          <g stroke="#8A6A45" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18.5 17C17.5 12 15 9.5 12.5 8" />
            <path d="M15.6 11.6C14.2 10 12.3 9.6 10.6 9.8" />
            <path d="M17.3 14.6C16.2 13.5 14.8 13.2 13.6 13.4" />
            <path d="M29.5 17C30.5 12 33 9.5 35.5 8" />
            <path d="M32.4 11.6C33.8 10 35.7 9.6 37.4 9.8" />
            <path d="M30.7 14.6C31.8 13.5 33.2 13.2 34.4 13.4" />
          </g>

          {/* Ears, tucked under the antlers */}
          <g>
            <ellipse cx="11.8" cy="23.4" rx="3.3" ry="5.1" fill="#C08E5E" transform="rotate(-32 11.8 23.4)" />
            <ellipse cx="11.8" cy="23.4" rx="1.5" ry="3" fill="#EFD2B0" transform="rotate(-32 11.8 23.4)" />
            <ellipse cx="36.2" cy="23.4" rx="3.3" ry="5.1" fill="#C08E5E" transform="rotate(32 36.2 23.4)" />
            <ellipse cx="36.2" cy="23.4" rx="1.5" ry="3" fill="#EFD2B0" transform="rotate(32 36.2 23.4)" />
          </g>

          {/* Head */}
          <path
            d="M24 13.6C31 13.6 34.8 18.6 34.8 25.6C34.8 33.4 30 38.9 24 38.9C18 38.9 13.2 33.4 13.2 25.6C13.2 18.6 17 13.6 24 13.6Z"
            fill="#D9A971"
          />

          {/* Fawn dapples */}
          <g fill="#F7E7CE" opacity="0.7">
            <circle cx="17.4" cy="20.2" r="1.05" />
            <circle cx="20.9" cy="18.2" r="0.9" />
            <circle cx="27.1" cy="18.2" r="0.9" />
            <circle cx="30.6" cy="20.2" r="1.05" />
          </g>

          {/* Muzzle */}
          <ellipse cx="24" cy="31" rx="7" ry="5.6" fill="#F4E3CA" />

          {/* Eyes */}
          <ellipse cx="19.3" cy="24.6" rx="2.2" ry="2.5" fill="#35251A" />
          <ellipse cx="28.7" cy="24.6" rx="2.2" ry="2.5" fill="#35251A" />
          <circle cx="20.1" cy="23.7" r="0.78" fill="#FFFFFF" />
          <circle cx="29.5" cy="23.7" r="0.78" fill="#FFFFFF" />

          {/* Nose + smile */}
          <ellipse cx="24" cy="28.9" rx="2.2" ry="1.7" fill="#6E4E32" />
          <path
            d="M21.9 31.9C22.8 33.2 25.2 33.2 26.1 31.9"
            stroke="#6E4E32"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* Cheeks */}
          <ellipse cx="15.6" cy="29.4" rx="2.1" ry="1.4" fill="#E4907C" opacity="0.45" />
          <ellipse cx="32.4" cy="29.4" rx="2.1" ry="1.4" fill="#E4907C" opacity="0.45" />
        </g>
      ) : (
        /* Lamb — cloud of wool over the brow, long drooping ears */
        <g>
          {/* Drooping ears, behind the face */}
          <g>
            <ellipse cx="12.4" cy="27.8" rx="4.8" ry="2.9" fill="#C7C0B1" transform="rotate(-30 12.4 27.8)" />
            <ellipse cx="12.7" cy="27.6" rx="2.7" ry="1.4" fill="#E8E2D6" transform="rotate(-30 12.7 27.6)" />
            <ellipse cx="35.6" cy="27.8" rx="4.8" ry="2.9" fill="#C7C0B1" transform="rotate(30 35.6 27.8)" />
            <ellipse cx="35.3" cy="27.6" rx="2.7" ry="1.4" fill="#E8E2D6" transform="rotate(30 35.3 27.6)" />
          </g>

          {/* Face */}
          <path
            d="M24 18C30.2 18 33.9 22.3 33.9 28.4C33.9 34.9 29.6 39.2 24 39.2C18.4 39.2 14.1 34.9 14.1 28.4C14.1 22.3 17.8 18 24 18Z"
            fill="#D5CFC0"
          />

          {/*
            Wool sits on ivory surfaces, so a warmer layer is drawn first and the
            white bumps slightly smaller on top — that rim keeps the cloud
            readable without adding a hard outline.
          */}
          <g fill="#E0D8C4">
            <circle cx="24" cy="13.8" r="6.5" />
            <circle cx="15.6" cy="16.8" r="5.6" />
            <circle cx="32.4" cy="16.8" r="5.6" />
            <circle cx="12.4" cy="21.6" r="4.5" />
            <circle cx="35.6" cy="21.6" r="4.5" />
            <circle cx="18.4" cy="21" r="4.9" />
            <circle cx="24" cy="19.4" r="5.3" />
            <circle cx="29.6" cy="21" r="4.9" />
          </g>
          <g fill="#FFFDF7">
            <circle cx="24" cy="13.6" r="5.7" />
            <circle cx="15.8" cy="16.6" r="4.8" />
            <circle cx="32.2" cy="16.6" r="4.8" />
            <circle cx="12.8" cy="21.4" r="3.7" />
            <circle cx="35.2" cy="21.4" r="3.7" />
            <circle cx="18.6" cy="20.8" r="4.2" />
            <circle cx="24" cy="19.2" r="4.6" />
            <circle cx="29.4" cy="20.8" r="4.2" />
          </g>

          {/* Eyes */}
          <ellipse cx="20.1" cy="28.6" rx="2.25" ry="2.55" fill="#3A362E" />
          <ellipse cx="27.9" cy="28.6" rx="2.25" ry="2.55" fill="#3A362E" />
          <circle cx="20.9" cy="27.7" r="0.78" fill="#FFFFFF" />
          <circle cx="28.7" cy="27.7" r="0.78" fill="#FFFFFF" />

          {/* Nose + smile */}
          <path
            d="M24 31.6C25.35 31.6 25.95 32.5 25.25 33.35C24.85 33.85 24.3 34.15 24 34.15C23.7 34.15 23.15 33.85 22.75 33.35C22.05 32.5 22.65 31.6 24 31.6Z"
            fill="#87806F"
          />
          <path
            d="M21.8 35C22.6 36 25.4 36 26.2 35"
            stroke="#87806F"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Cheeks */}
          <ellipse cx="16.6" cy="32.2" rx="2.05" ry="1.4" fill="#E4907C" opacity="0.42" />
          <ellipse cx="31.4" cy="32.2" rx="2.05" ry="1.4" fill="#E4907C" opacity="0.42" />
        </g>
      )}
    </svg>
  );
};
