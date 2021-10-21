import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faThermometerQuarter } from '@fortawesome/free-solid-svg-icons';

import { CurrentReadingsModel } from 'src/app/models/current-readings.model';

@Component({
  selector: 'app-current-weather-data',
  templateUrl: './current-weather-data.component.html',
  styleUrls: ['./current-weather-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherDataComponent {
  @Input() currentWeatherData: CurrentReadingsModel | null = null;

  today = new Date();
  thermometerIcon = faThermometerQuarter;
}
