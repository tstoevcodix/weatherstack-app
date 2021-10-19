export interface CurrentReadingsModel {
  observation_time: string;
  temperature: number;
  weather_icons: Array<string>;
  weather_descriptions: Array<string>;
  wind_speed: number;
  humidity: number;
  preasure: number;
}
