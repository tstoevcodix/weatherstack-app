import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalWeatherCardComponent } from './historical-weather-card.component';

describe('HistoricalWeatherCardComponent', () => {
  let component: HistoricalWeatherCardComponent;
  let fixture: ComponentFixture<HistoricalWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalWeatherCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
