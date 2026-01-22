import { useEffect, useState } from 'react'

const MIN_VALUE = 0
const MAX_VALUE = 1

export const clampProgress = (value: number): number =>
  Math.max(MIN_VALUE, Math.min(MAX_VALUE, value))

export const useProgressAnimation = (
  value: number,
  disableAnimation?: boolean
): number => {
  const [progressValue, setProgressValue] = useState(() => clampProgress(value))

  useEffect(() => {
    setProgressValue(clampProgress(value))
  }, [value, disableAnimation])

  return progressValue
}
