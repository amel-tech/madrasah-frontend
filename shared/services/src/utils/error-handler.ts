export const getErrorMessage = (error: any): string => {
  console.log(error);
  const itHasAtLeastOneError = error?.context?.errors && Array.isArray(error.context.errors) && error.context.errors.length > 0
  console.log(itHasAtLeastOneError);
  if (itHasAtLeastOneError) {
    const firstError = error.context.errors[0]
    console.log(firstError);
    if (firstError.constraints && typeof firstError.constraints === 'object') {
      const firstConstraintKey = Object.keys(firstError.constraints)[0]
      if (firstConstraintKey) {
        return firstError.constraints[firstConstraintKey]
      }
    }
  }

  // Fallback for other error structures or simple strings
  if (typeof error === 'string') return error
  if (error?.errorMessage) return error.errorMessage
  if (error?.message) return error.message

  return 'An unexpected error occurred.'
}
