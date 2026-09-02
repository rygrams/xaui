'use client'

import { type ReactNode } from 'react'
import { XUIProvider } from '@xaui/hybrid-legacy/core'

type DeviceFrameProps = {
  children: ReactNode
  colorScheme?: 'light' | 'dark'
}

export function DeviceFrame({ children, colorScheme = 'light' }: DeviceFrameProps) {
  const isDark = colorScheme === 'dark'
  const barColor = isDark ? '#ffffff' : '#000000'
  const screenBg = isDark ? '#18181b' : '#ffffff'

  return (
    <>
      <style>{`.device-scroll::-webkit-scrollbar{display:none}`}</style>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
        <div
          className="device-scroll"
          style={{
            width: 300,
            height: 649,
            background: screenBg,
            borderRadius: 28,
            border: '1.5px solid #D0D0D0',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              flexShrink: 0,
              padding: '10px 12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: barColor,
                marginLeft: 5,
              }}
            >
              19:27
            </span>
            <div
              style={{
                display: 'flex',
                gap: 4,
                alignItems: 'center',
                marginRight: 8,
              }}
            >
              <svg width="11" height="8" viewBox="0 0 14 10">
                <rect x="0" y="4" width="2" height="6" rx="1" fill={barColor} />
                <rect x="3" y="3" width="2" height="7" rx="1" fill={barColor} />
                <rect x="6" y="1" width="2" height="9" rx="1" fill={barColor} />
                <rect x="9" y="0" width="2" height="10" rx="1" fill={barColor} />
              </svg>
              <svg width="11" height="8" viewBox="0 0 16 12">
                <path
                  d="M8 2C10.8 2 13.3 3.2 15 5.1L13.5 6.6C12.2 5.1 10.2 4 8 4C5.8 4 3.8 5.1 2.5 6.6L1 5.1C2.7 3.2 5.2 2 8 2Z"
                  fill={barColor}
                />
                <path
                  d="M8 5.5C10 5.5 11.7 6.4 12.9 7.8L11.4 9.2C10.5 8.2 9.3 7.5 8 7.5C6.7 7.5 5.5 8.2 4.6 9.2L3.1 7.8C4.3 6.4 6 5.5 8 5.5Z"
                  fill={barColor}
                />
                <circle cx="8" cy="11" r="1.5" fill={barColor} />
              </svg>
              <div
                style={{
                  width: 18,
                  height: 10,
                  border: `1.5px solid ${barColor}`,
                  borderRadius: 3,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 1,
                }}
              >
                <div
                  style={{
                    width: 11,
                    height: 6,
                    background: barColor,
                    borderRadius: 2,
                  }}
                />
                <div
                  style={{
                    width: 2,
                    height: 4,
                    background: barColor,
                    borderRadius: '0 1px 1px 0',
                    position: 'absolute',
                    right: -3,
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              paddingBottom: 16,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <XUIProvider
              theme={colorScheme === 'dark' ? { mode: 'dark' as const } : undefined}
            >
              {children}
            </XUIProvider>
          </div>

          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0',
            }}
          >
            <div
              style={{
                width: 80,
                height: 4,
                background: barColor,
                borderRadius: 2,
                opacity: 0.2,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
