import { Injectable } from '@angular/core';
import { EMPTY, Subject, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NotifierService } from 'angular-notifier';

import { Location } from 'src/app/models/location.model';
import { ApiService } from '../services/api/api.service';
import { StoreService } from '../services/store/store.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { UtilService } from '../services/util/util.service';
import { HistoricalWeatherData } from 'src/app/models/historical-weather-data.model';
import { CurrentWeatherData } from 'src/app/models/current-weather-data.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class WeatherFacadeService {
  private getWeather$ = new Subject<string>();
  private currentLocation: Location | null = null;
  private bookmarkedLocations = new Array<Location>();

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private notifierService: NotifierService,
    private utilService: UtilService
  ) {
    this.handleGetWeather();
    this.handleBookmarkedLocationsChange();
    this.handleCurrentLocationChange();
  }

  getCurrentLocation$(): Observable<Location | null> {
    return this.storeService.currentLocation$;
  }

  getWeatherReport(location: string): void {
    this.getWeather$.next(location);
  }

  getBookmarkedLocations$(): Observable<Array<Location>> {
    return this.storeService.bookmarkedLocations$;
  }

  bookmarkCurrentLocation(): void {
    this.storeService.addBookmarkedLocation(this.currentLocation as Location);

    this.notifierService.notify(
      'success',
      `${this.currentLocation?.name} has been added to bookmarked locations.`
    );
  }

  unmarkLocation(location: Location): void {
    this.storeService.removeBookmarkedLocation(location);
    this.notifierService.notify(
      'success',
      `${location.name} has been removed from bookmarked locations.`
    );
  }

  unmarkCurrentLocation(): void {
    this.unmarkLocation(this.currentLocation as Location);
  }

  isCurrentLocationBookmarked(): boolean {
    return this.bookmarkedLocations.some((location) =>
      this.utilService.areEqual(this.currentLocation, location)
    );
  }

  historicalData$(): Observable<Array<HistoricalWeatherData>> {
    return this.storeService.historicalData$;
  }

  currentWeatherData$(): Observable<CurrentWeatherData | null> {
    return this.storeService.currentWeatherData$;
  }

  private setState(response: ApiResponse): void {
    if (response.error) {
      this.notifierService.notify('error', response.error.info);

      this.currentLocation = null;
      this.storeService.setCurrentLocation(null);

      this.storeService.setCurrentWeatherData(null);
      this.storeService.setHistoricalWeatherData([]);

      return;
    }

    const location = this.utilService.mapLocation(response.location);
    this.currentLocation = location;
    this.storeService.setCurrentLocation(location);

    this.storeService.setCurrentWeatherData(
      this.utilService.mapCurrentWeatherData(response.current)
    );

    this.storeService.setHistoricalWeatherData(
      Object.values(response.historical).map((historicalWeatherData) =>
        this.utilService.mapHistoricalWeatherData(historicalWeatherData)
      )
    );
  }

  private handleGetWeather(): void {
    this.getWeather$
      .pipe(
        switchMap((location: string) =>
          this.apiService
            .getWeatherReport(location)
            .pipe(catchError(() => EMPTY))
        ),
        tap((response: ApiResponse) => this.setState(response)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private handleBookmarkedLocationsChange(): void {
    this.storeService.bookmarkedLocations$
      .pipe(
        tap((locations: Array<Location>) => {
          this.bookmarkedLocations = locations;
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private handleCurrentLocationChange(): void {
    this.getCurrentLocation$()
      .pipe(untilDestroyed(this))
      .subscribe((currentLocation: Location | null) => {
        this.currentLocation = currentLocation;
      });
  }
}
