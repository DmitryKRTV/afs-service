import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Position } from '../models/position.model'
import { Message } from '../models/categories.model'

@Injectable({
  providedIn: 'root',
})
export class PositionsService {
  constructor(private http: HttpClient) {}

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`api/position/${categoryId}`)
  }

  create(position: Partial<Position>): Observable<Position> {
    return this.http.post<Position>(`api/position/`, position)
  }

  update(position: Partial<Position>): Observable<Position> {
    return this.http.patch<Position>(`api/position/${position._id}`, position)
  }

  delete(position: Partial<Position>): Observable<Message> {
    return this.http.delete<Message>(`api/position/${position._id}`)
  }
}
