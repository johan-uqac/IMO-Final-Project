import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { HourlyWeatherData } from 'src/common/queries/weatherData'

type HourForecastProps = {
  hour: HourlyWeatherData
}

function HourForecast({ hour }: HourForecastProps) {
  const hourArray = hour.time.split(' ')
  const forecastHour = hourArray[1].split(':')[0]

  return (
    <View style={{ marginRight: 12, alignItems: 'center' }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {(forecastHour.length === 1 ? '0' : '') + forecastHour} h
      </Text>
      <Image
        source={{ uri: hour.condition.icon.replace('//', 'https://') }}
        style={{ width: 50, height: 50 }}
      />
      <Text
        style={{
          fontSize: 18,
        }}
      >
        {hour.temp_c.toFixed()}°
      </Text>
    </View>
  )
}

type HourForecastWidgetProps = {
  currentDayHourForecast: HourlyWeatherData[]
}

export default function HourForecastWidget({ currentDayHourForecast }: HourForecastWidgetProps) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      <BlurView
        style={styles.blurview}
        blurType='light'
        blurAmount={10}
      >
        <Text>Current day / hour</Text>
        <View style={styles.hourContainer}>
          {currentDayHourForecast.map((hour: HourlyWeatherData) => (
            <HourForecast
              key={hour.time_epoch}
              hour={hour}
            />
          ))}
        </View>
      </BlurView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    borderRadius: 10,
    maxHeight: 130,
  },
  blurview: {
    flexDirection: 'column',
    borderRadius: 10,
    padding: 5,
  },
  hourContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
})
