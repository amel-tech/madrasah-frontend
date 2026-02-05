/**
 * Brand Logo Component
 *
 * Converted from public/logos/brand/logo.svg
 * Used in Header and Footer sections
 */

import type { ComponentPropsWithoutRef } from 'react'

export interface BrandLogoProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height'> {
  readonly width?: number | string
  readonly height?: number | string
}

export function BrandLogo({ width = 45, height = 45, className, ...props }: BrandLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g filter="url(#filter0_dd_1209_2592)">
        <rect x="2.34204" y="2.34212" width="40" height="40" rx="6.24563" fill="#004F80" />
      </g>
      <g filter="url(#filter1_i_1209_2592)">
        <path
          d="M14.2985 22.0621V33.6882C14.2985 34.335 14.8228 34.8593 15.4695 34.8593H22.0357V8.85928C14.8326 9.92762 14.7186 15.8718 15.6318 18.8593C13.9651 19.526 14.2985 21.1926 14.2985 22.0621Z"
          fill="#DEE8FF"
        />
        <path
          d="M30.0358 22.0621V33.6882C30.0358 34.335 29.5115 34.8593 28.8647 34.8593H22.2986V8.85928C29.5016 9.92762 29.6157 15.8718 28.7024 18.8593C30.3691 19.526 30.0358 21.1926 30.0358 22.0621Z"
          fill="#DEE8FF"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_1209_2592"
          x="-6.93798e-05"
          y="6.91414e-06"
          width="44.6842"
          height="44.6842"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.390352" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.164706 0 0 0 0 0.364706 0 0 0 0 0.2 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1209_2592" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.17106" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_1209_2592" result="effect2_dropShadow_1209_2592" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1209_2592" result="shape" />
        </filter>
        <filter
          id="filter1_i_1209_2592"
          x="14.2712"
          y="8.85928"
          width="15.7917"
          height="26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.292764" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1209_2592" />
        </filter>
      </defs>
    </svg>
  )
}
