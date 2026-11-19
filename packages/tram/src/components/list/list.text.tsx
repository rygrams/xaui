import type { ReactNode } from 'react'
import { Text } from 'react-native'
import type { StyleProp, TextStyle } from 'react-native'
import { textRuns } from './list.runs'

/** R3 for a slot that holds a glyph beside its words: each run of text set in `style`. */
export function wrapText(
  children: ReactNode,
  style: StyleProp<TextStyle>
): ReactNode[] {
  return textRuns(children).map((run, index) =>
    typeof run === 'string' ? (
      <Text key={`text-${index}`} style={style}>
        {run}
      </Text>
    ) : (
      run
    )
  )
}
