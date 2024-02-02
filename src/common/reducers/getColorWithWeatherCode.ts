export default function getColorWithWeatherCode(code: number) {
  switch (code) {
    case 1000:
      return 'https://img.freepik.com/free-photo/cloud-blue-sky_1232-3108.jpg' // Sunny
    case 1003:
      return 'https://t4.ftcdn.net/jpg/05/03/95/29/360_F_503952909_nhsGUEWQElxi6Qyp0jXDgdxJxr5epOmi.jpg'
    case 1180:
    case 1183:
      return 'https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-rainy-weather-image_795021.jpg'
    case 1186:
    case 1189:
      return 'https://images.ctfassets.net/hrltx12pl8hq/5YPWx7E9hPbcm4kwqzGniH/1d6c5affe31d747a3358446340a7ff1c/rain-images.jpg'
    case 1006:
      return 'https://img.freepik.com/premium-photo/sky-dark-clouds_11208-693.jpg' // Cloudy
    case 1009:
      return 'https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/black-rain-abstract-dark-power-1-1.jpg' // Overcast
    case 1030:
      return 'https://img.freepik.com/free-photo/beautiful-shot-misty-foggy-mysterious-forest_181624-13119.jpg' // Mist
    case 1063:
    case 1066:
      return 'https://patch.com/img/cdn20/users/68471/20240125/015942/styles/patch_image/public/patch-stock-weather-sky-taliaferro-2020___25135852813.jpg' // Patchy rain nearby
    case 1069:
    case 1204:
    case 1207:
    case 1249:
    case 1252:
      return 'https://static.vecteezy.com/system/resources/previews/018/801/050/non_2x/raindrops-on-glass-blur-background-rainy-season-concept-weather-forecast-meteorological-department-weather-bad-visibility-cold-weather-sleep-to-sleep-free-photo.jpg' // Patchy sleet nearby & Light sleet & Moderate or heavy sleet & Light sleet showers & Moderate or heavy sleet showers
    case 1072:
    case 1150:
    case 1153:
    case 1171:
      return 'https://static.vecteezy.com/system/resources/thumbnails/031/715/418/small/rain-water-drops-on-glass-photo.jpg' // Patchy freezing drizzle nearby & Patchy light drizzle & Light drizzle & Heavy freezing drizzle
    case 1087:
    case 1273:
    case 1276:
      return 'https://images.ctfassets.net/hrltx12pl8hq/4GCENlb1OdADKjbkIhs7XM/dbcf42f42de3782d203a4067a10364ab/shutterstock_1145259947-min.jpg' // Thundery outbreaks in nearby & Patchy light rain in area with thunder & Moderate or heavy rain in area with thunder
    case 1114:
    case 1135:
    case 1147:
    case 1255:
    case 1258:
    case 1198:
    case 1201:
    case 1210:
    case 1213:
    case 1216:
    case 1219:
    case 1117:
    case 1222:
    case 1225:
    case 1240:
    case 1192:
    case 1195:
    case 1243:
    case 1246:
    case 1237:
    case 1261:
    case 1264:
      return 'https://www.weatheronline.co.uk/daten/gifs/blosno004.jpg' // Blowing snow & Fog & Freezing fog
    default:
      return '#FFFFFF' // Default color (black) for unknown codes
  }
}
