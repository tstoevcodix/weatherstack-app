import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

import { WeatherFacadeService } from 'src/app/core/facades/weather-facade.service';
import { CurrentWeatherData } from 'src/app/models/current-weather-data.model';
import { HistoricalWeatherData } from 'src/app/models/historical-weather-data.model';
import { Location } from 'src/app/models/location.model';

@UntilDestroy()
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnInit {
  bookmarkedLocations = new Array<Location>();
  currentLocation = '';
  isCurrentLocationBookmarked = false;
  currentWeatherData: CurrentWeatherData | null = null;
  historicalData = new Array<HistoricalWeatherData>();

  constructor(
    private weatherFacadeService: WeatherFacadeService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.handleBookmarkedLocationChange();
    this.handleCurrentLocationChange();
    this.handleCurrentWeatherDataChange();
    this.handleHistoricalWeatherDataChange();
  }

  unmarkCurrentLocation(): void {
    this.weatherFacadeService.unmarkCurrentLocation();
  }

  unmarkLocation(location: Location): void {
    this.weatherFacadeService.unmarkLocation(location);
  }

  bookmarkLocation(): void {
    this.weatherFacadeService.bookmarkCurrentLocation();
  }

  getWeather(location: string): void {
    this.weatherFacadeService.getWeatherReport(location);
  }

  private handleBookmarkedLocationChange(): void {
    this.weatherFacadeService
      .getBookmarkedLocations$()
      .pipe(untilDestroyed(this))
      .subscribe((locations) => {
        this.bookmarkedLocations = locations;
        this.changeDetector.markForCheck();
      });
  }

  private handleCurrentLocationChange(): void {
    this.weatherFacadeService
      .getCurrentLocation$()
      .pipe(
        untilDestroyed(this),
        filter((location: Location | null) => location !== null)
      )
      .subscribe((location) => {
        this.currentLocation = `${location?.name}, ${location?.region}, ${location?.country}`;
        this.isCurrentLocationBookmarked =
          this.weatherFacadeService.isCurrentLocationBookmarked();
        this.changeDetector.markForCheck();
      });
  }

  private handleCurrentWeatherDataChange(): void {
    this.weatherFacadeService
      .currentWeatherData$()
      .pipe(untilDestroyed(this))
      .subscribe((currentWeatherData) => {
        this.currentWeatherData = currentWeatherData;
        this.changeDetector.markForCheck();
      });
  }

  private handleHistoricalWeatherDataChange(): void {
    this.weatherFacadeService
      .historicalData$()
      .pipe(untilDestroyed(this))
      .subscribe((historicalData) => {
        this.historicalData = historicalData;
        this.changeDetector.markForCheck();
      });
  }
}
