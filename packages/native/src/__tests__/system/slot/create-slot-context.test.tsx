import { renderHook } from '@testing-library/react'
import { createElement } from 'react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { createSlotContext } from '../../../system/slot/create-slot-context'

type ButtonContext = { size: string }

/**
 * The one hook this repo tests. The rule sends component hooks to their demo screen, and
 * a factory in `system/` has no screen to be verified on — while "a hook used outside its
 * parent raises a named error" is a stated acceptance criterion of P1.2.
 */
describe('createSlotContext', () => {
  it('hands the root value to a slot inside it', () => {
    const [Provider, useButton] = createSlotContext<ButtonContext>('Button')
    const value = { size: 'md' }

    const { result } = renderHook(() => useButton(), {
      wrapper: ({ children }: { children: ReactNode }) =>
        createElement(Provider, { value }, children),
    })

    expect(result.current).toBe(value)
  })

  it('names the hook and its root when a slot is used outside one', () => {
    const [, useButton] = createSlotContext<ButtonContext>('Button')

    expect(() => renderHook(() => useButton())).toThrow(
      /useButton must be called inside <Button>/
    )
  })

  it('says why, not just what', () => {
    const [, useSelect] = createSlotContext<ButtonContext>('Select')

    expect(() => renderHook(() => useSelect())).toThrow(/values its root resolved/)
  })
})
