import { describe, it, expect } from 'vitest'
import { SkeletonProps } from '../../../components/skeleton'

describe('Skeleton Types', () => {
  it('exports SkeletonProps type', () => {
    const props: SkeletonProps = {
      children: 'Skeleton',
      isLoaded: false,
      disableAnimation: true,
      skeletonColor: '#e4e4e7',
      width: 120,
      height: 16,
      radius: 'lg',
    }

    expect(props).toBeDefined()
    expect(props.isLoaded).toBe(false)
    expect(props.radius).toBe('lg')
  })

  it('accepts style props', () => {
    const props: SkeletonProps = {
      children: 'Skeleton',
      isLoaded: true,
      style: { borderRadius: 10 },
    }

    expect(props.style).toBeDefined()
  })
})
