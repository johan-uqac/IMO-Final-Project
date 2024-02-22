import React from 'react'
import { Text } from 'react-native'

type HeaderWidgetProps = {
  city: string
  temperature: number
  condition: string
  minTemp: string
  maxTemp: string
}

export default function HeaderWidget({ city, temperature, condition, minTemp, maxTemp }: HeaderWidgetProps) {
  return (
    <>
      <Text style={styles.title}>{city}</Text>
      <Text
        style={{
          fontSize: 58,
          textAlign: 'center',
        }}
      >
        {temperature}°
      </Text>
      <Text style={styles.text}>{condition}</Text>
      <Text style={styles.text}>
        ↓ {minTemp}° ↑ {maxTemp}°
      </Text>
    </>
  )
}

const styles = {
  title: {
    fontSize: 26,
    fontFamily: 'Arial',
  },
  text: {
    fontSize: 18,
  },
}
