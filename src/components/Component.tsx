import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import useWeatherConditions, { FullWeatherWeekData, DailyWeatherData } from '../common/queries/weatherData'

export default function WeatherComponent() {
  const [cityName, setCityName] = useState('')
  const weatherMutation = useWeatherConditions({ cityName })
  const [weatherData, setWeatherData] = useState<FullWeatherWeekData | undefined>()

  const handleGetWeather = async () => {
    try {
      const data = await weatherMutation.mutateAsync()
      setWeatherData(data)
    } catch (error) {
      // @ts-ignore
      console.error('Error fetching weather data:', error.message)
    }
  }

  return (
    <>
      <TextInput
        placeholder='City name'
        onChangeText={setCityName}
      />
      <TouchableOpacity onPress={handleGetWeather}>
        <Text>Get Weather Data</Text>
      </TouchableOpacity>

      {weatherMutation.isPending ? (
        <Text>Loading...</Text>
      ) : weatherMutation.isError ? (
        <Text>Error: {weatherMutation.error?.message}</Text>
      ) : weatherData ? (
        <WeatherDisplay weatherData={weatherData} />
      ) : null}
    </>
  )
}

function WeatherDisplay({ weatherData }: { weatherData: FullWeatherWeekData }) {
  const { location, current, forecast } = weatherData

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>{location.name}</Text>
      <Image
        source={{ uri: current.condition.icon.replace('//', 'https://') }}
        style={{ width: 50, height: 50 }}
      />
      <Text style={{ fontSize: 18 }}>{current.condition.text}</Text>
      <Text style={{ fontSize: 18 }}>Temperature {current.temp_c}°</Text>
      <Text style={{ fontSize: 18 }}>Humidity {current.humidity}%</Text>
      <ScrollView
        horizontal
        style={{ marginTop: 24 }}
        showsHorizontalScrollIndicator={false}
      >
        {forecast.forecastday.map((day: DailyWeatherData, index: number) => (
          <WeatherForecast
            key={index}
            day={day}
          />
        ))}
      </ScrollView>
    </View>
  )
}

function WeatherForecast({ day }: { day: DailyWeatherData }) {
  const { date, day: dayData } = day

  return (
    <View style={{ marginRight: 12, alignItems: 'center' }}>
      <Text>{date}</Text>
      <Image
        source={{ uri: dayData.condition.icon.replace('//', 'https://') }}
        style={{ width: 24, height: 24 }}
      />
      <Text>Min: {dayData.mintemp_c}°</Text>
      <Text>Max: {dayData.maxtemp_c}°</Text>
    </View>
  )
}
