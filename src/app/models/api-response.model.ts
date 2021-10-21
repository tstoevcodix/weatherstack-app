import { CurrentWeatherData } from './current-weather-data.model';
import { HistoricalWeatherData } from './historical-weather-data.model';
import { Location } from './location.model';

export interface ApiResponse {
  error?: {
    code: number;
    info: string;
  };
  location: Location;
  current: CurrentWeatherData;
  historical: { [key: string]: HistoricalWeatherData };
}
