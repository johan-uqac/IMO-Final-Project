import React, { useState } from 'react'
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import HourForecastWidget from 'src/Widgets/HourForcastWidget'
import DaysForecastWidget from 'src/Widgets/DaysForecastWidget'
import HeaderWidget from 'src/Widgets/HeaderWidget'
import getColorWithWeatherCode from '../common/reducers/getColorWithWeatherCode'
import useWeatherConditions, { FullWeatherWeekData } from '../common/queries/weatherData'

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
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
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
    <View style={styles.weatherDisplayContainer}>
      <HeaderWidget
        city={location.name}
        temperature={current.temp_c}
        condition={current.condition.text}
        minTemp={forecast.forecastday[0].day.mintemp_c.toFixed()}
        maxTemp={forecast.forecastday[0].day.maxtemp_c.toFixed()}
      />
      <ScrollView>
        <HourForecastWidget currentDayHourForecast={forecast.forecastday[0].hour} />
        <DaysForecastWidget forecastDay={forecast.forecastday} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherDisplayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
})
