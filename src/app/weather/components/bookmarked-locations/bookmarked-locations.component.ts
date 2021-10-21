import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-bookmarked-locations',
  templateUrl: './bookmarked-locations.component.html',
  styleUrls: ['./bookmarked-locations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkedLocationsComponent {
  @Input() bookmarkedLocations: Array<Location> = [];
  @Output() handleUnmarkLocation = new EventEmitter<Location>();

  removeIcon = faTimes;

  trackByName(_: number, location: Location): string {
    return location.name;
  }
}
