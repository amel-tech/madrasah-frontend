import * as XLSX from 'xlsx'

type FlashcardColumn = 'id' | 'type' | 'contentFront' | 'contentBack'
type FlashcardFileOptions = {
  columns: FlashcardColumn[]
}

export class FlashcardFile {
  MAX_FILE_SIZE = 1024 * 1024 // 1MB
  REPRESENTATION_COLUMNS: FlashcardColumn[] = ['id', 'type', 'contentFront', 'contentBack']

  constructor(options: FlashcardFileOptions) {
    this.REPRESENTATION_COLUMNS = options.columns
  }

  checkIfValidFileSize(file: File): boolean {
    return file.size <= this.MAX_FILE_SIZE
  }

  checkIfValidExtension(file: File): boolean {
    const validExtensions = ['xlsx', 'xls', 'csv']
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''
    return validExtensions.includes(fileExtension)
  }

  checkIfColumnsValid(columns: string[], requiredColumns: string[]): boolean {
    return requiredColumns.every(col => columns.includes(col))
  }

  validateFile(file: File, requiredColumns: string[]): string | null {
    if (!this.checkIfValidFileSize(file)) {
      throw new Error(`File size must be less than ${this.MAX_FILE_SIZE / (1024 * 1024)}MB.`)
    }
    if (!this.checkIfValidFileSize(file)) {
      throw new Error(`File size must be less than ${this.MAX_FILE_SIZE / (1024 * 1024)}MB.`)
    }
    if (!requiredColumns || requiredColumns.length === 0) {
      throw new Error('No required columns specified.')
    }
    return null
  }

  async readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return await file.arrayBuffer()
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  convertRawJSONtoRepresentationJSONFormat<T>(rawJson: any[]): T[] {
    return rawJson.map((row) => {
      const result: any = {}
      this.REPRESENTATION_COLUMNS.forEach((column) => {
        result[column] = row[column]
      })
      return result
    }) as T[]
  }

  async parseExcelFileAsJSON<T>(file: File): Promise<T[]> {
    this.validateFile(file, this.REPRESENTATION_COLUMNS)
    const data = await this.readFileAsArrayBuffer(file)
    if (!data) {
      throw new Error('Failed to read the uploaded file.')
    }

    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0] || ''
    const worksheet = workbook.Sheets[sheetName]
    if (!worksheet) {
      throw new Error('No worksheet found in the uploaded file.')
    }

    const json = XLSX.utils.sheet_to_json<T>(worksheet)
    if (this.checkIfColumnsValid(Object.keys(json[0] || {}), this.REPRESENTATION_COLUMNS) === false) {
      throw new Error('Uploaded file does not contain all the required columns: ' + this.REPRESENTATION_COLUMNS.join(', '))
    }

    if (json.length === 0) {
      throw new Error('The uploaded file has no data rows.')
    }

    return this.convertRawJSONtoRepresentationJSONFormat(json)
  }

  static createSampleFile<T>(data: T[], fileName: string): Blob {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SampleFlashcards')
    return XLSX.writeFile(workbook, fileName, { bookType: 'xlsx', type: 'array' })
  }
}
