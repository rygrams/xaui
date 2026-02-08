import { describe, expect, it } from 'vitest'
import type {
  SnackbarItem,
  SnackbarPosition,
  SnackbarProps,
  SnackbarStackProps,
} from '../../../components/snackbar'

describe('Snackbar Types', () => {
  it('exports SnackbarProps type', () => {
    const props: SnackbarProps = {
      message: 'Saved',
      isVisible: true,
      duration: 3000,
      actionLabel: 'Undo',
      showCloseAffordance: true,
      themeColor: 'default',
      numberOfLines: 1,
      position: 'bottom',
      usePortal: true,
    }

    expect(props.message).toBe('Saved')
    expect(props.duration).toBe(3000)
    expect(props.position).toBe('bottom')
  })

  it('accepts both stack positions', () => {
    const positions: SnackbarPosition[] = ['top', 'bottom']

    positions.forEach(position => {
      const props: SnackbarProps = {
        message: 'Message',
        position,
      }

      expect(props.position).toBe(position)
    })
  })

  it('exports SnackbarItem type', () => {
    const item: SnackbarItem = {
      id: 'item-1',
      message: 'Item message',
      actionLabel: 'Action',
      showCloseAffordance: true,
      duration: 2500,
    }

    expect(item.id).toBe('item-1')
    expect(item.actionLabel).toBe('Action')
    expect(item.duration).toBe(2500)
  })

  it('exports SnackbarStackProps type', () => {
    const props: SnackbarStackProps = {
      items: [
        {
          id: 'stack-1',
          message: 'Stack message',
          showCloseAffordance: true,
        },
      ],
      position: 'top',
      spacing: 12,
      insetHorizontal: 24,
      insetVertical: 32,
      maxWidth: 420,
      defaultDuration: 2000,
      usePortal: true,
    }

    expect(props.items.length).toBe(1)
    expect(props.position).toBe('top')
    expect(props.spacing).toBe(12)
  })
})
