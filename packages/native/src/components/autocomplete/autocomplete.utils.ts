import type { ReactNode } from 'react'

export const getTextValue = (node: ReactNode): string | null => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  return null
}

export const defaultFilterFunction = (textValue: string, inputValue: string): boolean => {
  const normalizedText = textValue.toLowerCase().trim()
  const normalizedInput = inputValue.toLowerCase().trim()

  return normalizedText.includes(normalizedInput)
}
