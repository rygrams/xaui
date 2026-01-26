import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class names using clsx and tailwind-merge.
 * Useful for handling conditional classes and resolving Tailwind conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
