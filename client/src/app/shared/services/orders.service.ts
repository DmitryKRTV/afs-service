import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Order } from '../models/order.model'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private domain = environment.domain

  constructor(private http: HttpClient) {}

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.domain}/api/order`, order)
  }

  fetch(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.domain}/api/order`, {
      params: new HttpParams({
        fromObject: params,
      }),
    })
  }
}
