import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faThermometerQuarter } from '@fortawesome/free-solid-svg-icons';

import { CurrentWeatherData } from 'src/app/models/current-weather-data.model';

@Component({
  selector: 'app-current-weather-data',
  templateUrl: './current-weather-data.component.html',
  styleUrls: ['./current-weather-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherDataComponent {
  @Input() currentWeatherData: CurrentWeatherData | null = null;

  today = new Date();
  thermometerIcon = faThermometerQuarter;
}
