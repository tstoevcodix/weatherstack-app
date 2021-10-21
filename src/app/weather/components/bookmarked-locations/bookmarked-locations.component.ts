import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { LocationModel } from 'src/app/models/location.model';

@Component({
  selector: 'app-bookmarked-locations',
  templateUrl: './bookmarked-locations.component.html',
  styleUrls: ['./bookmarked-locations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkedLocationsComponent {
  @Input() bookmarkedLocations: Array<LocationModel> = [];
  @Output() handleUnmarkLocation = new EventEmitter<LocationModel>();

  removeIcon = faTimes;
}
