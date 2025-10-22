import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface TableMeta<TData extends Record<string, any>> {
    updateData?: (updatedRow: TData, cellId?: string) => Promise<void> | void
    onRowDelete?: (id: number) => Promise<boolean> | void
    onRowClick?: (row: TData) => void
    loadingCells?: Set<string>
  }
}
