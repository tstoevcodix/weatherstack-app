export interface CurrentWeatherData {
  temperature: number;
  weather_icons: Array<string>;
  weather_descriptions: Array<string>;
  wind_speed: number;
  humidity: number;
  pressure: number;
}
