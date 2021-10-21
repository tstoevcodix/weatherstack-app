import { Injectable } from '@angular/core';
import { EMPTY, Subject, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NotifierService } from 'angular-notifier';

import { LocationModel } from 'src/app/models/location.model';
import { ApiService } from '../services/api/api.service';
import { StoreService } from '../services/store/store.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiResponseModel } from 'src/app/models/api-response.model';
import { UtilService } from '../services/util/util.service';
import { HistoricalReadingsModel } from 'src/app/models/historical-readings.model';
import { CurrentReadingsModel } from 'src/app/models/current-readings.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class WeatherFacadeService {
  private getWeather$ = new Subject<string>();
  private currentLocation: LocationModel | null = null;
  private bookmarkedLocations: Array<LocationModel> = [];

  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private notifierService: NotifierService,
    private utilService: UtilService
  ) {
    this.handleGetWeather();
    this.handleBookmarkedLocationsChange();

    this.getCurrentLocation$()
      .pipe(untilDestroyed(this))
      .subscribe((currentLocation: LocationModel | null) => {
        this.currentLocation = currentLocation;
      });
  }

  getCurrentLocation$(): Observable<LocationModel | null> {
    return this.storeService.currentLocation$;
  }

  getWeatherReport(location: string): void {
    this.getWeather$.next(location);
  }

  getBookmarkedLocations$(): Observable<Array<LocationModel>> {
    return this.storeService.bookmarkedLocations$;
  }

  bookmarkCurrentLocation(): void {
    this.storeService.addBookmarkedLocation(
      this.currentLocation as LocationModel
    );
  }

  unmarkLocation(location: LocationModel): void {
    this.storeService.removeBookmarkedLocation(location);
  }

  unmarkCurrentLocation(): void {
    this.unmarkLocation(this.currentLocation as LocationModel);
  }

  isCurrentLocationBookmarked(): boolean {
    return this.bookmarkedLocations.some((location) =>
      this.utilService.areEqual(this.currentLocation, location)
    );
  }

  historicalData$(): Observable<Array<HistoricalReadingsModel>> {
    return this.storeService.historicalData$;
  }

  currentWeatherData$(): Observable<CurrentReadingsModel | null> {
    return this.storeService.currentWeatherData$;
  }

  private setState(response: ApiResponseModel): void {
    if (response.error) {
      this.notifierService.notify('error', response.error.info);

      this.currentLocation = null;
      this.storeService.setCurrentLocation(null);

      this.storeService.setCurrentWeatherData(null);
      this.storeService.setHistoricalWeatherData([]);

      return;
    }

    const location = this.utilService.pick(response.location, [
      'name',
      'region',
      'country',
    ]);
    this.currentLocation = location;
    this.storeService.setCurrentLocation(location);

    this.storeService.setCurrentWeatherData(
      this.utilService.pick(response.current, [
        'observation_time',
        'temperature',
        'weather_icons',
        'weather_descriptions',
        'wind_speed',
        'humidity',
        'preasure',
      ])
    );

    this.storeService.setHistoricalWeatherData(
      Object.values(response.historical).map((historicalWeatherData) =>
        this.utilService.pick(historicalWeatherData, [
          'mintemp',
          'maxtemp',
          'date',
        ])
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
        tap((response: ApiResponseModel) => this.setState(response)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private handleBookmarkedLocationsChange(): void {
    this.storeService.bookmarkedLocations$
      .pipe(
        tap((locations: Array<LocationModel>) => {
          this.bookmarkedLocations = locations;
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
