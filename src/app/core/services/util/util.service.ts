/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { isEqual, pick as _pick } from 'lodash';

import { CurrentWeatherData } from 'src/app/models/current-weather-data.model';
import { HistoricalWeatherData } from 'src/app/models/historical-weather-data.model';
import { Location } from 'src/app/models/location.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  areEqual(a: any, b: any): boolean {
    return isEqual(a, b);
  }

  pick(obj: any, props: Array<string>): any {
    return _pick(obj, props);
  }

  mapLocation(data: any): Location {
    return this.pick(data, ['name', 'region', 'country']);
  }

  mapCurrentWeatherData(data: any): CurrentWeatherData {
    return this.pick(data, [
      'temperature',
      'weather_icons',
      'weather_descriptions',
      'wind_speed',
      'humidity',
      'pressure',
    ]);
  }

  mapHistoricalWeatherData(data: any): HistoricalWeatherData {
    return this.pick(data, ['mintemp', 'maxtemp', 'date']);
  }
}
