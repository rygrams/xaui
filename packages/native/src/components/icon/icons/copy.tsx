import React from 'react'
import { View } from 'react-native'
import Svg, { Path, G } from 'react-native-svg'
import { styles } from '../icon.style'
import type { IconProps } from '../icon.type'

const VIEWBOX_SIZE = 24

const ThinVariant: React.FC<{ color: string }> = ({ color }) => (
  <>
    <Path
      d="M16 7C16 5.34315 14.6569 4 13 4H7C5.34315 4 4 5.34315 4 7V13C4 14.6569 5.34315 16 7 16H13C14.6569 16 16 14.6569 16 13V7Z"
      stroke={color}
      strokeWidth={0.8}
      fill="none"
    />
    <Path
      d="M12 4V3C12 1.34315 10.6569 0 9 0H4C1.79086 0 0 1.79086 0 4V9C0 10.6569 1.34315 12 3 12H4"
      stroke={color}
      strokeWidth={0.8}
      fill="none"
      transform="translate(8, 8)"
    />
  </>
)

const StrokeVariant: React.FC<{ color: string }> = ({ color }) => (
  <>
    <Path
      d="M20 11C20 9.34315 18.6569 8 17 8H11C9.34315 8 8 9.34315 8 11V17C8 18.6569 9.34315 20 11 20H17C18.6569 20 20 18.6569 20 17V11Z"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
    />
    <Path
      d="M16 8V7C16 5.34315 14.6569 4 13 4H8C5.79086 4 4 5.79086 4 8V13C4 14.6569 5.34315 16 7 16H8"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
    />
  </>
)

const SolidVariant: React.FC<{ color: string }> = ({ color }) => (
  <>
    <Path
      d="M8 3.25C5.37665 3.25 3.25 5.37665 3.25 8V13C3.25 14.902 4.66586 16.4732 6.50124 16.7171C6.77486 16.7535 7 16.5261 7 16.25V11C7 8.79086 8.79086 7 11 7H16.25C16.5261 7 16.7535 6.77486 16.7171 6.50124C16.4732 4.66586 14.902 3.25 13 3.25H8Z"
      fill={color}
    />
    <Path
      d="M20 11C20 9.34315 18.6569 8 17 8H11C9.34315 8 8 9.34315 8 11V17C8 18.6569 9.34315 20 11 20H17C18.6569 20 20 18.6569 20 17V11Z"
      fill={color}
    />
  </>
)

const ContrastVariant: React.FC<{ color: string }> = ({ color }) => (
  <>
    <Path
      d="M7.25 8C7.25 5.37665 9.37665 3.25 12 3.25H17C19.0711 3.25 20.75 4.92893 20.75 7V8H21C22.6569 8 24 9.34315 24 11V17C24 18.6569 22.6569 20 21 20H15C13.3431 20 12 18.6569 12 17V16.75H11C8.92893 16.75 7.25 15.0711 7.25 13V8Z"
      fill="#E6E8EA"
    />
    <Path
      d="M20 11C20 9.34315 18.6569 8 17 8H11C9.34315 8 8 9.34315 8 11V17C8 18.6569 9.34315 20 11 20H17C18.6569 20 20 18.6569 20 17V11Z"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
    />
    <Path
      d="M16 8V7C16 5.34315 14.6569 4 13 4H8C5.79086 4 4 5.79086 4 8V13C4 14.6569 5.34315 16 7 16H8"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
    />
  </>
)

const DuoStrokeVariant: React.FC<{ color: string; secondaryColor: string }> = ({
  color,
  secondaryColor,
}) => (
  <>
    <Path
      d="M16 8V7C16 5.34315 14.6569 4 13 4H8C5.79086 4 4 5.79086 4 8V13C4 14.6569 5.34315 16 7 16H8"
      stroke={secondaryColor}
      strokeWidth={1.5}
      fill="none"
    />
    <Path
      d="M20 11C20 9.34315 18.6569 8 17 8H11C9.34315 8 8 9.34315 8 11V17C8 18.6569 9.34315 20 11 20H17C18.6569 20 20 18.6569 20 17V11Z"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
    />
  </>
)

const DuoSolidVariant: React.FC<{ color: string; secondaryColor: string }> = ({
  color,
  secondaryColor,
}) => (
  <>
    <Path
      d="M20 11C20 9.34315 18.6569 8 17 8H11C9.34315 8 8 9.34315 8 11V17C8 18.6569 9.34315 20 11 20H17C18.6569 20 20 18.6569 20 17V11Z"
      fill={color}
    />
    <Path
      d="M8 3.25C5.37665 3.25 3.25 5.37665 3.25 8V13C3.25 14.902 4.66586 16.4732 6.50124 16.7171C6.77486 16.7535 7 16.5261 7 16.25V11C7 8.79086 8.79086 7 11 7H16.25C16.5261 7 16.7535 6.77486 16.7171 6.50124C16.4732 4.66586 14.902 3.25 13 3.25H8Z"
      fill={secondaryColor}
    />
  </>
)

export const CopyIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#000000',
  secondaryColor = '#666666',
  variant = 'stroke',
  style,
}) => {
  const renderVariant = () => {
    switch (variant) {
      case 'thin':
        return <ThinVariant color={color} />
      case 'stroke':
        return <StrokeVariant color={color} />
      case 'solid':
        return <SolidVariant color={color} />
      case 'contrast':
        return <ContrastVariant color={color} />
      case 'duo-stroke':
        return <DuoStrokeVariant color={color} secondaryColor={secondaryColor} />
      case 'duo-solid':
        return <DuoSolidVariant color={color} secondaryColor={secondaryColor} />
    }
  }

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        fill="none"
      >
        <G>{renderVariant()}</G>
      </Svg>
    </View>
  )
}
