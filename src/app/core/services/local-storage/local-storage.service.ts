import { Injectable } from '@angular/core';
import { ApplicationState } from 'src/app/models/application-state.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly appState = 'Application_State';
  private readonly defaultState: ApplicationState = {
    bookmarkedLocations: [],
    currentLocation: null,
    currentWeatherData: null,
    historicalWeatherData: [],
  };

  setState(state: ApplicationState): void {
    localStorage.setItem(this.appState, JSON.stringify(state));
  }

  getState(): ApplicationState {
    const state = localStorage.getItem(this.appState);
    if (!state) {
      return this.defaultState;
    }

    return JSON.parse(state);
  }
}
