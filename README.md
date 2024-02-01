# Weather App

This is a simple weather app that uses the WeatherAPI to get the current weather for a given city. The app is built using react-native.

This project is done as the final project of the 2024 Winter semester mobile programming class at UQAC.

## Installation

To program on Android you need to have your Android environment set up. You can follow the instructions [here](https://reactnative.dev/docs/environment-setup).

You also need to have Java installed on your computer, between version 17 and 21.

To be able to do API calls, you'll need to create a .env file at the root of the project and add the following line to it:

```TS
WEATHER_API_KEY="your_api_key"
```

You can get an API key by creating an account on the [WeatherAPI website](https://www.weatherapi.com/).

Once you have your environment set up and your API key, you can run the following commands to start the app:

```bash
yarn install

# To run the app on an Android emulator
yarn android

# To run the app on an iOS emulator
npx pod-install
yarn ios
```

## Authors

<table>
    <tbody>
        <tr>
            <td align="center"><a href="https://github.com/JohanCDev"><img src="https://avatars.githubusercontent.com/u/25590592?v=4" width="100px;" alt="JohanCDev"/><br/><sub><b>Johan Chrillesen</b></sub></a><br/></td>
            <td align="center"><a href="https://github.com/LouisVilledieu"><img src="https://avatars.githubusercontent.com/u/72012406?v=4" width="100px;" alt="Louis Villedieu"/><br/><sub><b>Louis Villedieu</b></sub></a><br/></td>
            <td align="center"><a href="https://github.com/MaximeHff"><img src="https://avatars.githubusercontent.com/u/70428762?v=4" width="100px;" alt="Maxime Hoffbeck"/><br/><sub><b>Maxime Hoffbeck</b></sub></a><br/></td>
        </tr>
    </tbody>
</table>

## 📝 License

Copyright © 2023 - Johan CHRILLESEN, Maxime HOFFBECK, Louis VILLEDIEU.<br />
This project is under the [MIT License](https://github.com/johan-uqac/IMO-Final-Project/blob/main/LICENSE.md) licensed.
