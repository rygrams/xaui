import React from 'react'
import { View } from 'react-native'
import Svg, { Path, Circle, G } from 'react-native-svg'
import { styles } from '../icon.style'
import type { IconProps } from '../icon.type'

const VIEWBOX_SIZE = 24

const ThinVariant: React.FC<{ color: string }> = ({ color }) => (
  <>
    <Path
      d="M8 2L6 8H18L16 2H8Z"
      stroke={color}
      strokeWidth={0.8}
      fill="none"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={15.5} r={5.5} stroke={color} strokeWidth={0.8} fill="none" />
    <Path
      d="M12 12.5V15.5L13.5 17"
      stroke={color}
      strokeWidth={0.8}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 8V10" stroke={color} strokeWidth={0.8} strokeLinecap="round" />
    <Path d="M15 8V10" stroke={color} strokeWidth={0.8} strokeLinecap="round" />
  </>
)

const StrokeVariant: React.FC<{ color: string }> = ({ color }) => (
  <>
    <Path
      d="M8 2L6 8H18L16 2H8Z"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={15.5} r={5.5} stroke={color} strokeWidth={1.5} fill="none" />
    <Path
      d="M12 12.5V15.5L13.5 17"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 8V10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M15 8V10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </>
)

const SolidVariant: React.FC<{ color: string }> = ({ color }) => (
  <>
    <Path d="M8 2L6 8H18L16 2H8Z" fill={color} />
    <Circle cx={12} cy={15.5} r={6.5} fill={color} />
    <Path
      d="M12 12.5V15.5L13.5 17"
      stroke="#FFFFFF"
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 8V10.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M15 8V10.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </>
)

const ContrastVariant: React.FC<{ color: string }> = ({ color }) => (
  <>
    <Path d="M8 2L6 8H18L16 2H8Z" fill={color} />
    <Circle cx={12} cy={15.5} r={6.5} fill={color} />
    <Circle cx={12} cy={15.5} r={4} fill="#FFFFFF" />
    <Path
      d="M12 13V15.5L13.5 17"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 8V10.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M15 8V10.5" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </>
)

const DuoStrokeVariant: React.FC<{ color: string; secondaryColor: string }> = ({
  color,
  secondaryColor,
}) => (
  <>
    <Path
      d="M8 2L6 8H18L16 2H8Z"
      stroke={secondaryColor}
      strokeWidth={1.5}
      fill="none"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={15.5} r={5.5} stroke={color} strokeWidth={1.5} fill="none" />
    <Path
      d="M12 12.5V15.5L13.5 17"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 8V10" stroke={secondaryColor} strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M15 8V10" stroke={secondaryColor} strokeWidth={1.5} strokeLinecap="round" />
  </>
)

const DuoSolidVariant: React.FC<{ color: string; secondaryColor: string }> = ({
  color,
  secondaryColor,
}) => (
  <>
    <Path d="M8 2L6 8H18L16 2H8Z" fill={secondaryColor} />
    <Circle cx={12} cy={15.5} r={6.5} fill={color} />
    <Path
      d="M12 12.5V15.5L13.5 17"
      stroke="#FFFFFF"
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 8V10.5" stroke={secondaryColor} strokeWidth={2} strokeLinecap="round" />
    <Path d="M15 8V10.5" stroke={secondaryColor} strokeWidth={2} strokeLinecap="round" />
  </>
)

export const PrizeFirstIcon: React.FC<IconProps> = ({
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
