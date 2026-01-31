import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import type { BlurViewProps } from './blur-view.type'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
})

export const BlurView: React.FC<BlurViewProps> = ({
  children,
  unlockable = false,
  intensity = 0.6,
  overlayColor = 'rgba(0, 0, 0, 0.12)',
  style,
}) => {
  const overlayOpacity = Math.min(1, Math.max(0, intensity))
  const overlayAnim = useRef(new Animated.Value(unlockable ? 0 : overlayOpacity)).current
  const scaleAnim = useRef(new Animated.Value(unlockable ? 1 : 0.98)).current

  useEffect(() => {
    if (unlockable) {
      Animated.parallel([
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start()
      return
    }

    overlayAnim.setValue(overlayOpacity)
    scaleAnim.setValue(0.98)
  }, [overlayAnim, overlayOpacity, scaleAnim, unlockable])

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {children}
      </Animated.View>
      <Animated.View
        pointerEvents={unlockable ? 'none' : 'auto'}
        style={[styles.overlay, { opacity: overlayAnim }]}
      >
        <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
      </Animated.View>
    </View>
  )
}

BlurView.displayName = 'BlurView'
