export const getErrorMessage = (error: any): string => {
  const itHasAtLeastOneError = error?.context?.errors && Array.isArray(error.context.errors) && error.context.errors.length > 0
  if (itHasAtLeastOneError) {
    const firstError = error.context.errors[0]
    if (firstError.constraints && typeof firstError.constraints === 'object') {
      const firstConstraintKey = Object.keys(firstError.constraints)[0]
      if (firstConstraintKey) {
        return firstError.constraints[firstConstraintKey]
      }
    }
  }

  // Fallback for other error structures or simple strings
  if (typeof error === 'string') return error
  if (error?.message) return error.message

  return 'An unexpected error occurred.'
}
