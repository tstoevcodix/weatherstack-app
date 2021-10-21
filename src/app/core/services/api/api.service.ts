import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private accessKey = 'efb01dd815ec0a2e6a410e5b03a6524d';
  private apiUrl = 'https://api.weatherstack.com/historical';

  constructor(private http: HttpClient) {}

  getWeatherReport(location: string): Observable<ApiResponse> {
    const today = new Date();
    const historical_date = [
      this.removeDays(today, 1),
      this.removeDays(today, 2),
      this.removeDays(today, 3),
    ].join(';');

    const params = {
      access_key: this.accessKey,
      query: location,
      historical_date,
    };

    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }

  private removeDays(date: Date, days: number): string {
    const d = new Date(date);
    d.setDate(d.getDate() - days);

    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
