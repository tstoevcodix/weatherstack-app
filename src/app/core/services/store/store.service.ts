import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationState } from 'src/app/models/application-state.model';
import { CurrentReadingsModel } from 'src/app/models/current-readings.model';
import { HistoricalReadingsModel } from 'src/app/models/historical-readings.model';
import { LocationModel } from 'src/app/models/location.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly store$ = new BehaviorSubject<ApplicationState>(
    this.localStorageService.getState()
  );

  readonly bookmarkedLocations$ = this.store$.pipe(
    map((state: ApplicationState) => state.bookmarkedLocations)
  );

  readonly currentLocation$ = this.store$.pipe(
    map((state: ApplicationState) => state.currentLocation)
  );

  constructor(
    private utilService: UtilService,
    private localStorageService: LocalStorageService
  ) {}

  setCurrentLocation(currentLocation: LocationModel | null): void {
    this.store$.next({
      ...this.store$.value,
      currentLocation,
    });

    this.percistState();
  }

  addBookmarkedLocation(location: LocationModel): void {
    const bookmarkedLocations = new Set(this.store$.value.bookmarkedLocations);
    bookmarkedLocations.add(location);

    this.store$.next({
      ...this.store$.value,
      bookmarkedLocations: Array.from(bookmarkedLocations),
    });

    this.percistState();
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

    this.percistState();
  }

  setCurrentWeatherData(currentWeatherData: CurrentReadingsModel | null): void {
    this.store$.next({
      ...this.store$.value,
      currentWeatherData,
    });

    this.percistState();
  }

  setHistoricalWeatherData(
    historicalWeatherData: Array<HistoricalReadingsModel>
  ): void {
    this.store$.next({
      ...this.store$.value,
      historicalWeatherData,
    });

    this.percistState();
  }

  private percistState(): void {
    this.localStorageService.setState(this.store$.value);
  }
}
