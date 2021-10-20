import { LocationModel } from './location.model';

export interface ApplicationState {
  bookmarkedLocations: Array<LocationModel>;
  currentLocation: LocationModel | null;
}
