import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faThermometerQuarter } from '@fortawesome/free-solid-svg-icons';

import { HistoricalReadingsModel } from 'src/app/models/historical-readings.model';

@Component({
  selector: 'app-historical-weather-card',
  templateUrl: './historical-weather-card.component.html',
  styleUrls: ['./historical-weather-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricalWeatherCardComponent {
  @Input() data!: HistoricalReadingsModel;

  themrometerIcon = faThermometerQuarter;
}
