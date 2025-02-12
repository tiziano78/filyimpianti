import '@testing-library/jest-dom'
import { expect } from '@jest/globals'

expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null && received !== undefined
    return {
      message: () => `expected ${received} to be in the document`,
      pass,
    }
  },
  toHaveAttribute(received, attr, value) {
    const element = received as HTMLElement
    const hasAttr = element.hasAttribute(attr)
    const attrValue = element.getAttribute(attr)
    const pass = value ? hasAttr && attrValue === value : hasAttr
    return {
      message: () => `expected ${received} to have attribute ${attr}${value ? ` with value ${value}` : ''}`,
      pass,
    }
  },
})
