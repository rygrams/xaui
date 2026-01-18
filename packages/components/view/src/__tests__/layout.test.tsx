import { describe, it, expect } from 'vitest'
import type {
  ColumnProps,
  CrossAxisAlignment,
  GridProps,
  MainAxisAlignment,
  RowProps,
} from '../layout-types'

describe('Row props', () => {
  it('accepts alignments and spacing', () => {
    const mainAxis: Array<MainAxisAlignment> = [
      'start',
      'center',
      'end',
      'space-between',
      'space-around',
      'space-evenly',
    ]

    const crossAxis: Array<CrossAxisAlignment> = [
      'start',
      'center',
      'end',
      'stretch',
      'baseline',
    ]

    mainAxis.forEach((alignment) => {
      const props: RowProps = {
        children: 'Row',
        mainAxisAlignment: alignment,
      }
      expect(props.mainAxisAlignment).toBe(alignment)
    })

    crossAxis.forEach((alignment) => {
      const props: RowProps = {
        children: 'Row',
        crossAxisAlignment: alignment,
      }
      expect(props.crossAxisAlignment).toBe(alignment)
    })

    const props: RowProps = {
      children: 'Row',
      spacing: 12,
      reverse: true,
    }

    expect(props.spacing).toBe(12)
    expect(props.reverse).toBe(true)
  })
})

describe('Column props', () => {
  it('accepts alignments and spacing', () => {
    const props: ColumnProps = {
      children: 'Column',
      mainAxisAlignment: 'center',
      crossAxisAlignment: 'stretch',
      spacing: 8,
      reverse: true,
    }

    expect(props.mainAxisAlignment).toBe('center')
    expect(props.crossAxisAlignment).toBe('stretch')
    expect(props.spacing).toBe(8)
    expect(props.reverse).toBe(true)
  })
})

describe('Grid props', () => {
  it('accepts layout values', () => {
    const props: GridProps = {
      children: 'Grid',
      columns: 3,
      spacing: 12,
      rowSpacing: 16,
      columnSpacing: 20,
    }

    expect(props.columns).toBe(3)
    expect(props.spacing).toBe(12)
    expect(props.rowSpacing).toBe(16)
    expect(props.columnSpacing).toBe(20)
  })
})
