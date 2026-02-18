/**
 * Assignments Icon Component
 *
 * Converted from public/icons/ui/Assignments.svg
 */

import type { ComponentPropsWithoutRef } from 'react'

export interface AssignmentsIconProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height'> {
  readonly width?: number | string
  readonly height?: number | string
}

export function AssignmentsIcon({ width = 75, height = 75, className, ...props }: AssignmentsIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g filter="url(#filter0_i_1226_593)">
        <rect width="75" height="75" rx="37.5" fill="#F6EDDF" />
        <path
          d="M42.5 40.4999C42.5 40.7652 42.3946 41.0195 42.2071 41.207C42.0196 41.3946 41.7652 41.4999 41.5 41.4999H33.5C33.2348 41.4999 32.9804 41.3946 32.7929 41.207C32.6054 41.0195 32.5 40.7652 32.5 40.4999C32.5 40.2347 32.6054 39.9804 32.7929 39.7928C32.9804 39.6053 33.2348 39.4999 33.5 39.4999H41.5C41.7652 39.4999 42.0196 39.6053 42.2071 39.7928C42.3946 39.9804 42.5 40.2347 42.5 40.4999ZM41.5 35.4999H33.5C33.2348 35.4999 32.9804 35.6053 32.7929 35.7928C32.6054 35.9804 32.5 36.2347 32.5 36.4999C32.5 36.7652 32.6054 37.0195 32.7929 37.207C32.9804 37.3946 33.2348 37.4999 33.5 37.4999H41.5C41.7652 37.4999 42.0196 37.3946 42.2071 37.207C42.3946 37.0195 42.5 36.7652 42.5 36.4999C42.5 36.2347 42.3946 35.9804 42.2071 35.7928C42.0196 35.6053 41.7652 35.4999 41.5 35.4999ZM48.5 27.4999V48.4999C48.5 49.0304 48.2893 49.5391 47.9142 49.9142C47.5391 50.2892 47.0304 50.4999 46.5 50.4999H28.5C27.9696 50.4999 27.4609 50.2892 27.0858 49.9142C26.7107 49.5391 26.5 49.0304 26.5 48.4999V27.4999C26.5 26.9695 26.7107 26.4608 27.0858 26.0857C27.4609 25.7107 27.9696 25.4999 28.5 25.4999H33.0325C33.5944 24.8708 34.2828 24.3675 35.0527 24.0229C35.8225 23.6783 36.6565 23.5001 37.5 23.5001C38.3435 23.5001 39.1775 23.6783 39.9473 24.0229C40.7172 24.3675 41.4056 24.8708 41.9675 25.4999H46.5C47.0304 25.4999 47.5391 25.7107 47.9142 26.0857C48.2893 26.4608 48.5 26.9695 48.5 27.4999ZM33.5 29.4999H41.5C41.5 28.4391 41.0786 27.4217 40.3284 26.6715C39.5783 25.9214 38.5609 25.4999 37.5 25.4999C36.4391 25.4999 35.4217 25.9214 34.6716 26.6715C33.9214 27.4217 33.5 28.4391 33.5 29.4999ZM46.5 27.4999H43.1562C43.3837 28.1422 43.5 28.8186 43.5 29.4999V30.4999C43.5 30.7652 43.3946 31.0195 43.2071 31.207C43.0196 31.3946 42.7652 31.4999 42.5 31.4999H32.5C32.2348 31.4999 31.9804 31.3946 31.7929 31.207C31.6054 31.0195 31.5 30.7652 31.5 30.4999V29.4999C31.5 28.8186 31.6163 28.1422 31.8438 27.4999H28.5V48.4999H46.5V27.4999Z"
          fill="#535353"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_1226_593"
          x="0"
          y="0"
          width="75"
          height="75"
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
          <feGaussianBlur stdDeviation="1.25" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.368627 0 0 0 0 0.368627 0 0 0 0 0.368627 0 0 0 0.4 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1226_593" />
        </filter>
      </defs>
    </svg>
  )
}
