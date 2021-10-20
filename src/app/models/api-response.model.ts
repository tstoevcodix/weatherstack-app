import { CurrentReadingsModel } from './current-readings.model';
import { HistoricalReadingsModel } from './historical-readings.model';
import { LocationModel } from './location.model';

export interface ApiResponseModel {
  error?: {
    code: number;
    info: string;
  };
  location: LocationModel;
  current: CurrentReadingsModel;
  historical: { [key: string]: HistoricalReadingsModel };
}
