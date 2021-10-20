import { CurrentReadingsModel } from './current-readings.model';
import { HistoricalReadingsModel } from './historical-readings.model';
import { LocationModel } from './location.model';

export interface ApplicationState {
  bookmarkedLocations: Array<LocationModel>;
  currentLocation: LocationModel | null;
  currentWeatherData: CurrentReadingsModel | null;
  historicalWeatherData: Array<HistoricalReadingsModel>;
}
