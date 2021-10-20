import { Injectable } from '@angular/core';
import { EMPTY, Subject, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NotifierService } from 'angular-notifier';
import { pick } from 'lodash';

import { LocationModel } from 'src/app/models/location.model';
import { ApiService } from '../services/api/api.service';
import { StoreService } from '../services/store/store.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiResponseModel } from 'src/app/models/api-response.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class WeatherFacadeService {
  private getWeather$ = new Subject<string>();

  constructor(
    private storeService: StoreService,
    private notifierService: NotifierService,
    apiService: ApiService
  ) {
    this.getWeather$
      .pipe(
        switchMap((location: string) =>
          apiService.getWeatherReport(location).pipe(catchError(() => EMPTY))
        ),
        tap((response: ApiResponseModel) => this.setState(response)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  getCurrentLocation$(): Observable<LocationModel | null> {
    return this.storeService.currentLocation$;
  }

  getWeatherReport(location: string): void {
    this.getWeather$.next(location);
  }

  private setState(response: ApiResponseModel): void {
    if (response.error) {
      this.notifierService.notify('error', response.error.info);

      this.storeService.setCurrentLocation(null);
      this.storeService.setCurrentWeatherData(null);
      this.storeService.setHistoricalWeatherData([]);

      return;
    }

    this.storeService.setCurrentLocation(
      pick(response.location, ['name', 'region', 'country'])
    );

    this.storeService.setCurrentWeatherData(
      pick(response.current, [
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
        pick(historicalWeatherData, ['mintemp', 'maxtemp', 'date'])
      )
    );
  }
}
