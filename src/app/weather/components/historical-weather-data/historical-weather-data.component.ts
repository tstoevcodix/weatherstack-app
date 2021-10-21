import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { WeatherFacadeService } from 'src/app/core/facades/weather-facade.service';
import { HistoricalReadingsModel } from 'src/app/models/historical-readings.model';

@UntilDestroy()
@Component({
  selector: 'app-historical-weather-data',
  templateUrl: './historical-weather-data.component.html',
  styleUrls: ['./historical-weather-data.component.scss'],
})
export class HistoricalWeatherDataComponent implements OnInit {
  historicalData: Array<HistoricalReadingsModel> = [];

  constructor(private weatherFacadeService: WeatherFacadeService) {}

  ngOnInit(): void {
    this.weatherFacadeService
      .historicalData$()
      .pipe(untilDestroyed(this))
      .subscribe((historicalData) => {
        this.historicalData = historicalData;
      });
  }
}
