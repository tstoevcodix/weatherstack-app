import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

import { WeatherFacadeService } from 'src/app/core/facades/weather-facade.service';
import { CurrentReadingsModel } from 'src/app/models/current-readings.model';
import { HistoricalReadingsModel } from 'src/app/models/historical-readings.model';
import { LocationModel } from 'src/app/models/location.model';

@UntilDestroy()
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  bookmarkedLocations = new Array<LocationModel>();
  currentLocation = '';
  isCurrentLocationBookmarked = false;
  currentWeatherData: CurrentReadingsModel | null = null;
  historicalData = new Array<HistoricalReadingsModel>();

  constructor(private weatherFacadeService: WeatherFacadeService) {}

  ngOnInit(): void {
    this.handleBookmarkedLocationChange();
    this.handleCurrentLocationChange();
    this.handleCurrentWeatherDataChange();
    this.handleHistoricalWeatherDataChange();
  }

  unmarkCurrentLocation(): void {
    this.weatherFacadeService.unmarkCurrentLocation();
  }

  unmarkLocation(location: LocationModel): void {
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
      });
  }

  private handleCurrentLocationChange(): void {
    this.weatherFacadeService
      .getCurrentLocation$()
      .pipe(
        untilDestroyed(this),
        filter((location: LocationModel | null) => location !== null)
      )
      .subscribe((location) => {
        this.currentLocation = `${location?.name}, ${location?.region}, ${location?.country}`;
        this.isCurrentLocationBookmarked =
          this.weatherFacadeService.isCurrentLocationBookmarked();
      });
  }

  private handleCurrentWeatherDataChange(): void {
    this.weatherFacadeService
      .currentWeatherData$()
      .pipe(untilDestroyed(this))
      .subscribe((currentWeatherData) => {
        this.currentWeatherData = currentWeatherData;
      });
  }

  private handleHistoricalWeatherDataChange(): void {
    this.weatherFacadeService
      .historicalData$()
      .pipe(untilDestroyed(this))
      .subscribe((historicalData) => {
        this.historicalData = historicalData;
      });
  }
}