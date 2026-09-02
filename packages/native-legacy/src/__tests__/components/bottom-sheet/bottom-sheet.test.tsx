import { describe, it, expect } from 'vitest'
import type {
  BottomSheetProps,
  BottomSheetEvents,
} from '../../../components/bottom-sheet'

describe('BottomSheet Types', () => {
  it('exports BottomSheetProps type with required props', () => {
    const props: BottomSheetProps = {
      children: 'Sheet content',
      isOpen: true,
    }

    expect(props).toBeDefined()
    expect(props.children).toBe('Sheet content')
    expect(props.isOpen).toBe(true)
  })

  it('accepts all optional props', () => {
    const props: BottomSheetProps = {
      children: 'Content',
      isOpen: true,
      snapPoints: [0.3, 0.6, 0.9],
      initialSnapIndex: 0,
      themeColor: 'primary',
      radius: 'lg',
      showBackdrop: true,
      closeOnBackdropPress: true,
      enableSwipeToDismiss: true,
      showHandle: true,
      disableAnimation: false,
    }

    expect(props.snapPoints).toEqual([0.3, 0.6, 0.9])
    expect(props.initialSnapIndex).toBe(0)
    expect(props.themeColor).toBe('primary')
    expect(props.radius).toBe('lg')
    expect(props.showBackdrop).toBe(true)
    expect(props.closeOnBackdropPress).toBe(true)
    expect(props.enableSwipeToDismiss).toBe(true)
    expect(props.showHandle).toBe(true)
    expect(props.disableAnimation).toBe(false)
  })

  it('accepts all theme colors', () => {
    const colors: Array<BottomSheetProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(color => {
      const props: BottomSheetProps = {
        children: 'Content',
        isOpen: false,
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<BottomSheetProps['radius']> = [
      'none',
      'sm',
      'md',
      'lg',
      'full',
    ]

    radii.forEach(radius => {
      const props: BottomSheetProps = {
        children: 'Content',
        isOpen: false,
        radius,
      }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts snap points with at least one value', () => {
    const singleSnap: BottomSheetProps = {
      children: 'Content',
      isOpen: false,
      snapPoints: [0.5],
    }
    expect(singleSnap.snapPoints).toHaveLength(1)

    const multiSnap: BottomSheetProps = {
      children: 'Content',
      isOpen: false,
      snapPoints: [0.3, 0.6, 0.9],
    }
    expect(multiSnap.snapPoints).toHaveLength(3)
  })

  it('accepts event handlers', () => {
    const events: BottomSheetEvents = {
      onClose: () => {},
      onSnapChange: () => {},
    }

    const props: BottomSheetProps = {
      children: 'Content',
      isOpen: false,
      ...events,
    }

    expect(props.onClose).toBeDefined()
    expect(props.onSnapChange).toBeDefined()
  })

  it('accepts boolean toggle props', () => {
    const props: BottomSheetProps = {
      children: 'Content',
      isOpen: true,
      showBackdrop: false,
      closeOnBackdropPress: false,
      enableSwipeToDismiss: false,
      showHandle: false,
      disableAnimation: true,
    }

    expect(props.showBackdrop).toBe(false)
    expect(props.closeOnBackdropPress).toBe(false)
    expect(props.enableSwipeToDismiss).toBe(false)
    expect(props.showHandle).toBe(false)
    expect(props.disableAnimation).toBe(true)
  })

  it('accepts custom handle content', () => {
    const props: BottomSheetProps = {
      children: 'Content',
      isOpen: false,
      handleContent: 'Custom handle',
    }

    expect(props.handleContent).toBe('Custom handle')
  })
})
