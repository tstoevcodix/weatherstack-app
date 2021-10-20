import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WeatherComponent } from './pages/weather/weather.component';
import { BookmarkedLocationsComponent } from './components/bookmarked-locations/bookmarked-locations.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherDataPreviewComponent } from './components/weather-data-preview/weather-data-preview.component';
import { WeatherLocationComponent } from './components/weather-location/weather-location.component';
import { CurrentWeatherDataComponent } from './components/current-weather-data/current-weather-data.component';
import { HistoricalWeatherDataComponent } from './components/historical-weather-data/historical-weather-data.component';
import { HistoricalWeatherCardComponent } from './components/historical-weather-card/historical-weather-card.component';
import { FormsModule } from '@angular/forms';

const components = [
  WeatherComponent,
  BookmarkedLocationsComponent,
  SearchBarComponent,
  WeatherDataPreviewComponent,
  WeatherLocationComponent,
  CurrentWeatherDataComponent,
  HistoricalWeatherDataComponent,
  HistoricalWeatherCardComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  exports: [...components],
})
export class WeatherModule {}
