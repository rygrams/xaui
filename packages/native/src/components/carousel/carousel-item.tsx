import React from 'react'
import { View } from 'react-native'
import { styles } from './carousel.style'
import type { CarouselItemProps } from './carousel.type'

export const CarouselItem: React.FC<CarouselItemProps> = ({
  children,
  width,
  height,
  radius,
  spacing,
  isLast,
  customStyle,
}) => (
  <View
    style={[
      styles.item,
      {
        width,
        height,
        borderRadius: radius,
        marginRight: isLast ? 0 : spacing,
      },
      customStyle,
    ]}
  >
    {children}
  </View>
)
