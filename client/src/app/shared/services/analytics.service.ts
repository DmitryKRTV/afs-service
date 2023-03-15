import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Analytics, Overview } from '../models/analytics.model'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private domain = environment.domain

  constructor(private http: HttpClient) {}

  getOverview(): Observable<Overview> {
    return this.http.get<Overview>(`${this.domain}/api/analytics/overview`)
  }

  getAnalytics(): Observable<Analytics> {
    return this.http.get<Analytics>(`${this.domain}/api/analytics/analytics`)
  }
}
