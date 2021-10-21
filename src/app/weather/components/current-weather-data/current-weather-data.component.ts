import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { faThermometerQuarter } from '@fortawesome/free-solid-svg-icons';

import { WeatherFacadeService } from 'src/app/core/facades/weather-facade.service';
import { CurrentReadingsModel } from 'src/app/models/current-readings.model';

@UntilDestroy()
@Component({
  selector: 'app-current-weather-data',
  templateUrl: './current-weather-data.component.html',
  styleUrls: ['./current-weather-data.component.scss'],
})
export class CurrentWeatherDataComponent implements OnInit {
  currentWeatherData: CurrentReadingsModel | null = null;
  today = new Date();
  thermometerIcon = faThermometerQuarter;

  constructor(private weatherFacadeService: WeatherFacadeService) {}

  ngOnInit(): void {
    this.weatherFacadeService
      .currentWeatherData$()
      .pipe(untilDestroyed(this))
      .subscribe((currentWeatherData) => {
        this.currentWeatherData = currentWeatherData;
      });
  }
}
