import { TestBed } from '@angular/core/testing';

import { WeatherFacadeService } from './weather-facade.service';

describe('WeatherFacadeService', () => {
  let service: WeatherFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
