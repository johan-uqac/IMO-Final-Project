import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

type ColoredLineProps = {
  minTemp?: number
  maxTemp?: number
}

export default function ColoredLine({ minTemp = -Infinity, maxTemp = Infinity }: ColoredLineProps) {
  let colors = ['#354671', '#78aeB7', '#fbe663', '#f7b43e', '#ec513f', '#e74149', '#83222f', '#74212c']

  const tempRanges = [
    { min: -Infinity, max: 0, colorIndex: 0 },
    { min: 0, max: 10, colorIndex: 1 },
    { min: 10, max: 15, colorIndex: 2 },
    { min: 15, max: 20, colorIndex: 3 },
    { min: 20, max: 25, colorIndex: 4 },
    { min: 25, max: 30, colorIndex: 5 },
    { min: 30, max: 35, colorIndex: 6 },
    { min: 35, max: 40, colorIndex: 7 },
    { min: 40, max: Infinity, colorIndex: 8 },
  ]
  // Find the corresponding color index for minTemp and maxTemp
  const minColorIndex = tempRanges.find(range => minTemp >= range.min && minTemp < range.max)?.colorIndex ?? 0
  const maxColorIndex = tempRanges.find(range => maxTemp >= range.min && maxTemp < range.max)?.colorIndex ?? 0

  colors = colors.slice(minColorIndex, maxColorIndex + 1)

  if (colors.length === 1) {
    colors.push(colors[0])
  }

  return (
    <LinearGradient
      style={{ height: 4, width: '100%', borderRadius: 10 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={colors}
    />
  )
}
