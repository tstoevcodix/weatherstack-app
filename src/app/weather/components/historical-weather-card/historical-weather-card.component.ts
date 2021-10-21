import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faThermometerQuarter } from '@fortawesome/free-solid-svg-icons';

import { HistoricalWeatherData } from 'src/app/models/historical-weather-data.model';

@Component({
  selector: 'app-historical-weather-card',
  templateUrl: './historical-weather-card.component.html',
  styleUrls: ['./historical-weather-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricalWeatherCardComponent {
  @Input() data!: HistoricalWeatherData;

  themrometerIcon = faThermometerQuarter;
}
