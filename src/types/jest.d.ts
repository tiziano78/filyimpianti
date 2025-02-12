/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
    }
  }
}

declare module 'expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R
    toHaveAttribute(attr: string, value?: string): R
  }
  interface ExpectStatic {
    stringContaining(str: string): any
  }
}

declare module '@testing-library/jest-dom' {
  export interface Matchers<R = void> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
    stringContaining(str: string): R;
  }
} 