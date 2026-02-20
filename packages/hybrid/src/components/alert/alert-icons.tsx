import React from 'react'

type AlertIconProps = {
  color: string
  size: number
}

export function InfoIcon({ color, size }: AlertIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="hidden">
      <circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
      <line x1={12} y1={10} x2={12} y2={16} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <circle cx={12} cy={7} r={1} fill={color} />
    </svg>
  )
}

export function SuccessIcon({ color, size }: AlertIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="hidden">
      <circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
      <path
        d="M7 12.5L10.2 15.5L17 9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function WarningIcon({ color, size }: AlertIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" overflow="hidden">
      <path
        d="M13 3.5L22.5 21H3.5L13 3.5Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <line x1={13} y1={10} x2={13} y2={15} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <circle cx={13} cy={18} r={1} fill={color} />
    </svg>
  )
}

export function DangerIcon({ color, size }: AlertIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="hidden">
      <circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
      <line x1={9} y1={9} x2={15} y2={15} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <line x1={15} y1={9} x2={9} y2={15} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon({ color, size }: AlertIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="hidden">
      <line x1={18} y1={6} x2={6} y2={18} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <line x1={6} y1={6} x2={18} y2={18} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}
