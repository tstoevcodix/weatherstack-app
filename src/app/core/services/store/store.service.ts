import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationState } from 'src/app/models/application-state.model';
import { LocationModel } from 'src/app/models/location.model';
import { UtilService } from '../util/util.service';

const initialState: ApplicationState = {
  bookmarkedLocations: [],
  currentLocation: null,
};

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly store$ = new BehaviorSubject<ApplicationState>(initialState);
  readonly bookmarkedLocations$ = this.store$.pipe(
    map((state: ApplicationState) => state.bookmarkedLocations)
  );
  readonly currentLocation$ = this.store$.pipe(
    map((state: ApplicationState) => state.currentLocation)
  );

  constructor(private utilService: UtilService) {}

  setCurrentLocation(currentLocation: LocationModel): void {
    this.store$.next({
      ...this.store$.value,
      currentLocation,
    });
  }

  addBookmarkedLocation(location: LocationModel): void {
    const bookmarkedLocations = new Set(this.store$.value.bookmarkedLocations);
    bookmarkedLocations.add(location);

    this.store$.next({
      ...this.store$.value,
      bookmarkedLocations: Array.from(bookmarkedLocations),
    });
  }

  removeBookmarkedLocation(location: LocationModel): void {
    const bookmarkedLocations = this.store$.value.bookmarkedLocations.filter(
      (bookmarkedLocation: LocationModel) =>
        !this.utilService.areEqual(bookmarkedLocation, location)
    );

    this.store$.next({
      ...this.store$.value,
      bookmarkedLocations,
    });
  }
}
