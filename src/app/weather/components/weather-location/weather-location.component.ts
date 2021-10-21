import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-location',
  templateUrl: './weather-location.component.html',
  styleUrls: ['./weather-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherLocationComponent {
  @Input() location = '';
  @Input() isBookmarked = false;

  @Output() handleBookmark = new EventEmitter();
  @Output() handleUnmark = new EventEmitter();

  heartIcon = faHeart;

  handleLocationBookmark(): void {
    this.isBookmarked ? this.handleUnmark.emit() : this.handleBookmark.emit();
  }
}
