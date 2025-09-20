import React from 'react'
import { env } from '~/env'
import { WarningIcon } from '@madrasah/icons/ssr'

export const MockIndicator = () => {
  if (env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-black px-3 py-1.5 rounded-md shadow-lg z-50 text-sm font-medium flex items-center gap-2">
      <WarningIcon size={24} weight="fill" />
      Mock API Active
    </div>
  )
}
