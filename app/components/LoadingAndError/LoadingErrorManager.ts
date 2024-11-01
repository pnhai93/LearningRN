export interface LoadingErrorManagerType {
  showLoading?: () => void
  hideLoading?: () => void
  showError?: (error: string) => void
}

export const LoadingErrorManager: LoadingErrorManagerType = {
  showLoading: undefined,
  hideLoading: undefined,
  showError: undefined,
}
