import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { WeatherFacadeService } from 'src/app/core/facades/weather-facade.service';
import { LocationModel } from 'src/app/models/location.model';

@UntilDestroy()
@Component({
  selector: 'app-weather-location',
  templateUrl: './weather-location.component.html',
  styleUrls: ['./weather-location.component.scss'],
})
export class WeatherLocationComponent implements OnInit {
  location = '';
  heartIcon = faHeart;

  isBookmarked = false;

  constructor(private weatherFacadeService: WeatherFacadeService) {}

  ngOnInit(): void {
    this.weatherFacadeService
      .getCurrentLocation$()
      .pipe(untilDestroyed(this))
      .subscribe(async (location: LocationModel | null) => {
        if (!location) {
          this.location = '';

          return;
        }

        this.location = `${location.name}, ${location.region}, ${location.country}`;
        this.isBookmarked =
          await this.weatherFacadeService.isCurrentLocationBookmarked();
      });
  }

  handleLocationBookmark(): void {
    this.isBookmarked = !this.isBookmarked;
    this.weatherFacadeService.bookmarkCurrentLocation();
  }
}
