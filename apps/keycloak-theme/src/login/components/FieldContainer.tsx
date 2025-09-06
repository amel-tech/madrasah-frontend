import type { ReactNode } from 'react'
import { cn } from '@madrasah/ui/lib/utils'

export function FieldContainer(props: {
  children: ReactNode
  className?: string
}) {
  const { children, className } = props

  return (
    <div className={cn('grid w-full max-w-sm items-center gap-2', className)}>
      {' '}
      {/* Modüler field container - tüm input'lar için standart genişlik */}
      {children}
    </div>
  )
}
