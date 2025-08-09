import React, { RefAttributes } from 'react';
import { IconProps } from '@phosphor-icons/react';

// Example custom icon - replace with your own
export const MadrasahLogo: React.FC<IconProps> = ({ size = 24, color = 'currentColor', weight = 'regular', ...props }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...(props as RefAttributes<SVGSVGElement>)}>
      {/* Add your custom SVG path here */}
      <path
        d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"
        stroke={color}
        strokeWidth={weight === 'thin' ? 1 : weight === 'light' ? 1.5 : weight === 'bold' ? 2.5 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={weight === 'fill' ? color : 'none'}
      />
    </svg>
  );
};

// Add more custom icons here
// export const AnotherCustomIcon: React.FC<IconProps> = ({ ... }) => { ... };
