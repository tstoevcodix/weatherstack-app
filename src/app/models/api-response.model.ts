import { CurrentReadingsModel } from './current-readings.model';
import { HistoricalReadingsModel } from './historical-readings.model';
import { LocationModel } from './location.model';

export interface ApiResponseModel {
  location: LocationModel;
  current: CurrentReadingsModel;
  historical: { [key: string]: HistoricalReadingsModel };
}
