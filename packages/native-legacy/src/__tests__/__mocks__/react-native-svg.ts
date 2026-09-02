import React from 'react'

type SvgProps = {
  [key: string]: unknown
}

export const Circle: React.FC<SvgProps> = props =>
  React.createElement('circle', props)

const Svg: React.FC<SvgProps> = props => React.createElement('svg', props)

export default Svg
