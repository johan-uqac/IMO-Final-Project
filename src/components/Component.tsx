import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import moment from 'moment-timezone'
import getColorWithWeatherCode from '../common/reducers/getColorWithWeatherCode'
import useWeatherConditions, {
  FullWeatherWeekData,
  DailyWeatherData,
  HourlyWeatherData,
} from '../common/queries/weatherData'

export default function WeatherComponent() {
  const [cityName, setCityName] = useState('')
  const weatherMutation = useWeatherConditions({ cityName })
  const [weatherData, setWeatherData] = useState<FullWeatherWeekData | undefined>()
  const [backgroundColor, setBackgroundColor] = useState('')

  const handleGetWeather = async () => {
    try {
      const data = await weatherMutation.mutateAsync()
      setWeatherData(data)
      setBackgroundColor(getColorWithWeatherCode(data.current.condition.code))
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore error.message is a string
      console.error('Error fetching weather data:', error.message)
    }
  }

  return (
    <ImageBackground
      source={{ uri: backgroundColor }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TextInput
          placeholder='City name'
          onChangeText={setCityName}
        />
        <TouchableOpacity onPress={handleGetWeather}>
          <Text>Get Weather Data</Text>
        </TouchableOpacity>

        {weatherMutation.isPending && <Text>Loading...</Text>}
        {weatherMutation.isError && <Text>Error: {weatherMutation.error?.message}</Text>}
        {weatherData && <WeatherDisplay weatherData={weatherData} />}
      </SafeAreaView>
    </ImageBackground>
  )
}

function WeatherDisplay({ weatherData }: { weatherData: FullWeatherWeekData }) {
  const { location, current, forecast } = weatherData

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 12 }}>
      <Text style={{ fontSize: 26, fontFamily: 'Arial' }}>{location.name}</Text>
      <Text style={{ fontSize: 58, textAlign: 'center' }}>{current.temp_c.toFixed()}°</Text>
      <Text style={{ fontSize: 18 }}>{current.condition.text}</Text>
      <Text style={{ fontSize: 18 }}>
        ↓ {forecast.forecastday[0].day.mintemp_c.toFixed()}° ↑ {forecast.forecastday[0].day.maxtemp_c.toFixed()}°
      </Text>
      <ScrollView
        horizontal
        style={{ marginTop: 24, borderRadius: 10, maxHeight: 130 }}
        showsHorizontalScrollIndicator={false}
      >
        <BlurView
          style={{ flexDirection: 'column', borderRadius: 10, padding: 5 }}
          blurType='light'
          blurAmount={10}
        >
          <Text>Current day / hour</Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            {forecast.forecastday[0].hour.map((hour: HourlyWeatherData) => (
              <HourForecast
                key={hour.time_epoch}
                hour={hour}
              />
            ))}
          </View>
        </BlurView>
      </ScrollView>

      <BlurView
        style={{ flexDirection: 'column', borderRadius: 10, width: '100%', padding: 5, marginTop: 24 }}
        blurType='light'
        blurAmount={10}
      >
        {forecast.forecastday.slice(1).map((day: DailyWeatherData) => (
          <WeatherForecast
            key={day.date_epoch}
            day={day}
            tz={location.tz_id}
          />
        ))}
      </BlurView>
    </View>
  )
}

function HourForecast({ hour }: { hour: HourlyWeatherData }) {
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

function WeatherForecast({ day, tz }: { day: DailyWeatherData; tz: string }) {
  const { date, day: dayData } = day
  const forecastDate = moment.tz(date, tz).format('ddd.')

  return (
    <View
      style={{
        marginRight: 12,
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 24 }}>
        {forecastDate.charAt(0).toUpperCase() + forecastDate.slice(1)}
      </Text>
      <Image
        source={{ uri: dayData.condition.icon.replace('//', 'https://') }}
        style={{ width: 42, height: 42, marginRight: 42 }}
      />
      <Text style={{ fontSize: 18, marginRight: 24 }}>
        ↓ {dayData.mintemp_c.toFixed()}° ↑ {dayData.maxtemp_c.toFixed()}°
      </Text>
    </View>
  )
}
