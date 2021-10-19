import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalWeatherDataComponent } from './historical-weather-data.component';

describe('HistoricalWeatherDataComponent', () => {
  let component: HistoricalWeatherDataComponent;
  let fixture: ComponentFixture<HistoricalWeatherDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalWeatherDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalWeatherDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
