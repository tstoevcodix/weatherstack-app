import { CurrentWeatherData } from './current-weather-data.model';
import { HistoricalWeatherData } from './historical-weather-data.model';
import { Location } from './location.model';

export interface ApplicationState {
  bookmarkedLocations: Array<Location>;
  currentLocation: Location | null;
  currentWeatherData: CurrentWeatherData | null;
  historicalWeatherData: Array<HistoricalWeatherData>;
}
