const MIME_TYPES = {
  csv: 'text/csv',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
} as const

export function downloadBase64File(base64Data: string, fileName: string, format: 'csv' | 'xlsx') {
  const bytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
  const blob = new Blob([bytes], { type: MIME_TYPES[format] })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}
