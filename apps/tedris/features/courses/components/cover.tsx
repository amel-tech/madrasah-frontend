import { cn } from '@madrasah/ui/lib/utils'

/** Arabesque-pattern cover placeholder, tinted by an OKLCH hue. */
export const CoverPlaceholder = ({
  hue = 220,
  label,
  className,
}: {
  hue?: number
  label?: string
  className?: string
}) => (
  <div
    className={cn('relative flex items-end overflow-hidden rounded-lg p-4', className)}
    style={{
      background: `linear-gradient(135deg, oklch(0.94 0.04 ${hue}) 0%, oklch(0.88 0.07 ${hue}) 100%)`,
      color: `oklch(0.32 0.08 ${hue})`,
    }}
  >
    <svg
      width="100%"
      height="100%"
      className="absolute inset-0 opacity-15"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`cover-${hue}`}
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 18a18 18 0 0 1 36 0M0 18a18 18 0 0 0 36 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#cover-${hue})`} />
    </svg>
    {label && (
      <span className="relative font-mono text-[11px] uppercase tracking-wide opacity-70">
        {label}
      </span>
    )}
  </div>
)

/** Circular avatar tinted by an OKLCH hue (initials). */
export const HueAvatar = ({
  name = 'MD',
  size = 32,
  hue = 220,
  className,
}: {
  name?: string
  size?: number
  hue?: number
  className?: string
}) => (
  <div
    className={cn(
      'grid shrink-0 place-items-center rounded-full border-2 border-white font-semibold',
      className,
    )}
    style={{
      width: size,
      height: size,
      fontSize: Math.round(size * 0.38),
      background: `oklch(0.92 0.05 ${hue})`,
      color: `oklch(0.32 0.08 ${hue})`,
    }}
  >
    {name}
  </div>
)
