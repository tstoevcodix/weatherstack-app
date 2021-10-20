import { Component, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

import { WeatherFacadeService } from 'src/app/core/facades/weather-facade.service';
import { LocationModel } from 'src/app/models/location.model';

@UntilDestroy()
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  location = '';

  constructor(private weatherFacade: WeatherFacadeService) {}

  ngOnInit(): void {
    this.weatherFacade
      .getCurrentLocation$()
      .pipe(
        untilDestroyed(this),
        filter((location: LocationModel | null) => location !== null)
      )
      .subscribe(
        (location) =>
          (this.location = `${location?.name}, ${location?.region}, ${location?.country}`)
      );
  }

  @HostListener('keydown.enter')
  handleGetWeather(): void {
    this.weatherFacade.getWeatherReport(this.location);
  }
}
