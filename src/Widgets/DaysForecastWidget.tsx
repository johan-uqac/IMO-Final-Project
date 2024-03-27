import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import getHourIcon from 'src/common/helpers/getHourIcon'
import { DailyWeatherData } from 'src/common/queries/weatherData'
import ColoredLine from 'src/Components/ColoredLine'

type DaysWeatherForecastProps = {
  day: DailyWeatherData
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
