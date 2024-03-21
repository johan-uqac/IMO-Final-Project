/* eslint-disable global-require */
import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { HourlyWeatherData } from 'src/common/queries/weatherData'
import getHourIcon, { HourIconData } from '../common/helpers/getHourIcon'

type HourForecastProps = {
  hour: HourlyWeatherData
}

function HourForecast({ hour }: HourForecastProps) {
  const hourArray = hour.time.split(' ')
  const forecastHour = hourArray[1].split(':')[0]
  const currentHour = new Date().getHours()
  const finalText =
    currentHour === Number(forecastHour) ? 'Now' : `${forecastHour.length === 1 ? '0' : ''} ${forecastHour} h`
  const iconData: HourIconData = getHourIcon({ conditionText: hour.condition.text, isDay: Boolean(hour.is_day) })

  return (
    <View style={styles.hourForecastContainer}>
      <Text style={styles.hourForecastHourText}>{finalText}</Text>
      <Image
        source={iconData.image()}
        style={[styles.hourForecastIcon, iconData.style]}
      />
      <Text style={styles.hourForecastTempText}>{hour.temp_c.toFixed()}°</Text>
    </View>
  )
}

type HourForecastWidgetProps = {
  currentDayHourForecast: HourlyWeatherData[]
}

export default function HourForecastWidget({ currentDayHourForecast }: HourForecastWidgetProps) {
  return (
    <BlurView
      style={styles.container}
      blurType='light'
      blurAmount={10}
    >
      <Text>Current day / hour</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.hourContainer}>
          {currentDayHourForecast.map((hour: HourlyWeatherData) => (
            <HourForecast
              key={hour.time_epoch}
              hour={hour}
            />
          ))}
        </View>
      </ScrollView>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    maxHeight: 130,
    flexDirection: 'column',
    borderRadius: 10,
    padding: 5,
  },
  hourContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  hourForecastContainer: {
    marginRight: 12,
    alignItems: 'center',
  },
  hourForecastHourText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hourForecastIcon: {
    height: 30,
    aspectRatio: 1.5,
  },
  hourForecastTempText: {
    fontSize: 18,
  },
})
