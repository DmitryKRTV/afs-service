import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Analytics, Overview } from '../models/analytics.model'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<Overview> {
    return this.http.get<Overview>('/api/analytics/overview')
  }

  getAnalytics(): Observable<Analytics> {
    return this.http.get<Analytics>('/api/analytics/analytics')
  }
}
