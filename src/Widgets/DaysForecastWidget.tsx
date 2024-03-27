import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import getHourIcon from 'src/common/helpers/getHourIcon'
import { DailyWeatherData } from 'src/common/queries/weatherData'

type DaysWeatherForecastProps = {
  day: DailyWeatherData
}

function ColoredLine({ minTemp, maxTemp }: { minTemp: number; maxTemp: number }) {
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

function DayWeatherForecast({ day }: DaysWeatherForecastProps) {
  const { date, day: dayData } = day
  const forecastDate = new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' })
  const finalIcon = getHourIcon({ conditionText: dayData.condition.text, isDay: true })

  return (
    <View style={styles.dayContainer}>
      <Text style={styles.dayText}>{forecastDate.charAt(0).toUpperCase() + forecastDate.slice(1)}</Text>
      <View style={{ flex: 1 }}>
        <Image
          source={finalIcon.image()}
          style={[styles.weatherIcon, finalIcon.style]}
        />
      </View>
      <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.tempText}>↓ {dayData.mintemp_c.toFixed()}°</Text>
        <View style={{ marginHorizontal: 8, width: '50%' }}>
          <ColoredLine
            minTemp={parseInt(dayData.mintemp_c.toFixed(), 10)}
            maxTemp={parseInt(dayData.maxtemp_c.toFixed(), 10)}
          />
        </View>
        <Text style={styles.tempText}>↑ {dayData.maxtemp_c.toFixed()}°</Text>
      </View>
    </View>
  )
}

type DaysForecastWidgetProps = {
  forecastDay: DailyWeatherData[]
}

export default function DaysForecastWidget({ forecastDay }: DaysForecastWidgetProps) {
  return (
    <BlurView
      style={styles.container}
      blurType='light'
      blurAmount={10}
    >
      {forecastDay.slice(1).map((day: DailyWeatherData) => (
        <DayWeatherForecast
          key={day.date_epoch}
          day={day}
        />
      ))}
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',
    padding: 5,
    marginTop: 24,
  },
  dayContainer: {
    marginRight: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 4,
    flex: 1,
  },
  weatherIcon: {
    width: 42,
    height: 42,
    marginRight: 4,
  },
  tempText: {
    fontSize: 18,
  },
})
