/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
import { ImageSourcePropType, ImageStyle } from 'react-native'

export type HourIconData = {
  image: () => ImageSourcePropType
  style: ImageStyle
}

export default function getHourIcon({ conditionText, isDay }: { conditionText: string; isDay: boolean }): HourIconData {
  const condition = conditionText.toLowerCase()

  if (condition.includes('partly cloudy')) {
    return {
      image: () => (isDay ? require('../../../assets/png/CloudSun.png') : require('../../../assets/png/CloudMoon.png')),
      style: {
        aspectRatio: 1.5,
      },
    }
  }
  if (condition.includes('cloudy') || condition.includes('overcast')) {
    return {
      image: () => require('../../../assets/png/Cloud.png'),
      style: {
        aspectRatio: 1.5,
      },
    }
  }
  if (
    condition.includes('light snow') ||
    condition.includes('moderate snow') ||
    condition.includes('heavy snow') ||
    condition.includes('snow showers')
  ) {
    return {
      image: () => require('../../../assets/png/Snowflake.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('Blizzard')) {
    return {
      image: () => require('../../../assets/png/CloudSnow.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (
    condition.includes('patchy rain nearby') ||
    condition.includes('patchy light rain') ||
    condition.includes('rain shower')
  ) {
    return {
      image: () =>
        isDay ? require('../../../assets/png/CloudSunRain.png') : require('../../../assets/png/CloudMoonRain.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (
    condition.includes('patchy snow nearby') ||
    condition.includes('blowing snow') ||
    condition.includes('blizzard') ||
    condition.includes('light freeezing rain') ||
    condition.includes('light snow') ||
    condition.includes('moderate snow') ||
    condition.includes('heavy snow')
  ) {
    return {
      image: () => require('../../../assets/png/CloudSnow.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (
    condition.includes('patchy sleet nearby') ||
    condition.includes('patchy freezing drizzle nearby') ||
    condition.includes('moderate or heavy freezing rain') ||
    condition.includes('blowing snow') ||
    condition.includes('ice pellets')
  ) {
    return {
      image: () => require('../../../assets/png/CloudHail.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('clear') || condition.includes('sunny')) {
    return {
      image: () =>
        isDay
          ? require('../../../assets/png/SunMax.png')
          : condition.includes('clear')
            ? require('../../../assets/png/Moon.png')
            : require('../../../assets/png/MoonStars.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('mist')) {
    return {
      image: () => (isDay ? require('../../../assets/png/SunHaze.png') : require('../../../assets/png/MoonHaze.png')),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('thundery outbreaks in nearby')) {
    return {
      image: () =>
        isDay ? require('../../../assets/png/CloudBolt.png') : require('../../../assets/png/CloudMoonBolt.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('fog')) {
    return {
      image: () => require('../../../assets/png/CloudFog.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('patchy light drizzle') || condition.includes('light drizzle')) {
    return {
      image: () => require('../../../assets/png/CloudDrizzle.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (
    condition.includes('heavy freezing drizzle') ||
    condition.includes('freezing drizzle') ||
    condition.includes('sleet')
  ) {
    return {
      image: () => require('../../../assets/png/CloudSleet.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (
    condition.includes('light rain') ||
    condition.includes('moderate rain at times') ||
    condition.includes('moderate rain')
  ) {
    return {
      image: () => require('../../../assets/png/CloudRain.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('heavy rain') || condition.includes('heavy rain at times')) {
    return {
      image: () => require('../../../assets/png/CloudHeavyrain.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('light snow') || condition.includes('moderate snow')) {
    return {
      image: () => require('../../../assets/png/CloudSnow.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('light rain shower')) {
    return {
      image: () => require('../../../assets/png/CloudSunRain.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('patchy light rain in area with thunder')) {
    return {
      image: () =>
        isDay ? require('../../../assets/png/CloudSunBolt.png') : require('../../../assets/png/CloudMoonBolt.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('moderate or heavy rain in area with thunder')) {
    return {
      image: () => require('../../../assets/png/CloudBoltRain.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  if (condition.includes('snow in area with thunder')) {
    return {
      image: () => require('../../../assets/png/CloudSnow.png'),
      style: {
        aspectRatio: 1,
      },
    }
  }
  return {
    image: () => require('../../../assets/png/SunMax.png'),
    style: {
      height: 30,
      aspectRatio: 1,
    },
  }
}
