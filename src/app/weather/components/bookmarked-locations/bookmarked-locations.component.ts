import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { WeatherFacadeService } from 'src/app/core/facades/weather-facade.service';
import { LocationModel } from 'src/app/models/location.model';

@UntilDestroy()
@Component({
  selector: 'app-bookmarked-locations',
  templateUrl: './bookmarked-locations.component.html',
  styleUrls: ['./bookmarked-locations.component.scss'],
})
export class BookmarkedLocationsComponent implements OnInit {
  bookmarkedLocations: Array<LocationModel> = [];

  removeIcon = faTimes;

  constructor(private weatherFacadeService: WeatherFacadeService) {}

  ngOnInit(): void {
    this.weatherFacadeService
      .getBookmarkedLocations$()
      .pipe(untilDestroyed(this))
      .subscribe((locations) => {
        this.bookmarkedLocations = locations;
      });
  }

  handleUnmarkLocation(location: LocationModel): void {
    this.weatherFacadeService.unmarkLocation(location);
  }
}
