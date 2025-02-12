import '@testing-library/jest-dom'

declare module '@testing-library/jest-dom' {
  export interface Matchers<R> {
    toBeInTheDocument(): R
    toHaveAttribute(attr: string, value?: string): R
  }
} 