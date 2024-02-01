import { useMutation } from '@tanstack/react-query'
import { OPEN_METEO_API_KEY } from '@env'

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
    temp_f: number
    is_day: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
}

type AstronomyData = {
  astronomy: {
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
  }
}

type HourlyWeatherData = {
  time_epoch: number
  time: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  snow_cm: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
  vis_km: number
  vis_miles: number
  gust_mph: number
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
    maxtemp_f: number
    mintemp_c: number
    mintemp_f: number
    avgtemp_c: number
    avgtemp_f: number
    maxwind_mph: number
    maxwind_kph: number
    totalprecip_mm: number
    totalprecip_in: number
    totalsnow_cm: number
    avgvis_km: number
    avgvis_miles: number
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
  try {
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${OPEN_METEO_API_KEY}&q=${cityName}&aqi=yes&lang=fr`
    )

    const weatherData = await weatherResponse.json()

    const weatherWeekResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${OPEN_METEO_API_KEY}&q=${cityName}&days=7&lang=fr`
    )

    const weatherWeekData = await weatherWeekResponse.json()

    return {
      current: weatherData.current,
      forecast: weatherWeekData.forecast,
      location: weatherData.location,
    }
  } catch (err) {
    console.error('get weather', err)
    throw err
  }
}

export default function useWeatherConditions({ cityName }: WeatherConditionsProps) {
  const mutation = useMutation<FullWeatherWeekData>({
    mutationFn: () => getWeather(cityName),
    onError: error => {
      console.error(error)
    },
  })

  return mutation
}
