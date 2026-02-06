import { describe, it, expect } from 'vitest'
import {
  runOpenAnimation,
  runCloseAnimation,
  runSnapAnimation,
} from '../../../components/bottom-sheet/bottom-sheet.animation'
import { Animated } from 'react-native'

describe('BottomSheet Animation', () => {
  it('runOpenAnimation returns a composite animation', () => {
    const translateY = new Animated.Value(812)
    const backdropOpacity = new Animated.Value(0)

    const animation = runOpenAnimation(translateY, backdropOpacity, 487)
    expect(animation).toBeDefined()
    expect(animation).toHaveProperty('start')
    expect(animation).toHaveProperty('stop')
  })

  it('runCloseAnimation returns a composite animation', () => {
    const translateY = new Animated.Value(400)
    const backdropOpacity = new Animated.Value(1)

    const animation = runCloseAnimation(translateY, backdropOpacity, 812)
    expect(animation).toBeDefined()
    expect(animation).toHaveProperty('start')
    expect(animation).toHaveProperty('stop')
  })

  it('runCloseAnimation calls onComplete callback', () => {
    const translateY = new Animated.Value(400)
    const backdropOpacity = new Animated.Value(1)
    let completed = false

    runCloseAnimation(translateY, backdropOpacity, 812, () => {
      completed = true
    })

    expect(completed).toBe(true)
  })

  it('runSnapAnimation returns a composite animation', () => {
    const translateY = new Animated.Value(400)

    const animation = runSnapAnimation(translateY, 200)
    expect(animation).toBeDefined()
    expect(animation).toHaveProperty('start')
    expect(animation).toHaveProperty('stop')
  })
})
