interface PaginationWrapperProps {
  currentPage: number
  totalPages: number
  basePath?: string
  queryParams?: Record<string, string>
}