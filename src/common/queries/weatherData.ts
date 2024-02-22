import { useMutation } from '@tanstack/react-query'
import { WEATHER_API_KEY } from '@env'

type WeatherConditionsProps = {
  cityName: string
}

type LocationData = {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export type CurrentWeatherData = {
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    is_day: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    precip_mm: number
    humidity: number
    cloud: number
    feelslike_c: number
    vis_km: number
    uv: number
    gust_kph: number
  }
}

export type HourlyWeatherData = {
  time_epoch: number // Time at GMT
  time: string
  temp_c: number
  is_day: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  precip_mm: number
  snow_cm: number
  humidity: number
  cloud: number
  feelslike_c: number
  windchill_c: number
  heatindex_c: number
  dewpoint_c: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  gust_kph: number
  uv: number
  short_rad: number
  diff_rad: number
}

export type DailyWeatherData = {
  date: string
  date_epoch: number
  day: {
    maxtemp_c: number
    mintemp_c: number
    avgtemp_c: number
    maxwind_mph: number
    totalprecip_mm: number
    totalsnow_cm: number
    avgvis_km: number
    avghumidity: number
    daily_will_it_rain: number
    daily_chance_of_rain: number
    daily_will_it_snow: number
    daily_chance_of_snow: number
    condition: {
      text: string
      icon: string
      code: number
    }
    uv: number
  }
  astro: {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: number
    is_moon_up: number
    is_sun_up: number
  }
  hour: HourlyWeatherData[]
}

export type FullWeatherDayData = DailyWeatherData

export type FullWeatherWeekData = {
  forecast: {
    forecastday: FullWeatherDayData[]
  }
  location: LocationData
} & CurrentWeatherData

async function getWeather(cityName: string): Promise<FullWeatherWeekData> {
  // eslint-disable-next-line no-useless-catch
  try {
    const weatherWeekResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${cityName}&days=10&aqi=yes&alerts=no`
    )

    const weatherWeekData = await weatherWeekResponse.json()

    if (weatherWeekData.error) {
      throw new Error(weatherWeekData.error.message)
    }

    // if (weatherWeekData.)

    return {
      current: weatherWeekData.current,
      forecast: weatherWeekData.forecast,
      location: weatherWeekData.location,
    }
  } catch (err) {
    throw err
  }
}

export default function useWeatherConditions({ cityName }: WeatherConditionsProps) {
  const mutation = useMutation<FullWeatherWeekData>({
    mutationFn: () => getWeather(cityName),
    onError: error => {
      throw error
    },
  })

  return mutation
}
