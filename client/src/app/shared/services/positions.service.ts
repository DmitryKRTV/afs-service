import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { Position } from '../models/position.model'
import { Message } from '../models/categories.model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PositionsService {
  orderPositions$ = new BehaviorSubject<Position[]>([])
  private domain = environment.domain

  constructor(private http: HttpClient) {}

  clearOrderPositions() {
    this.orderPositions$.next(
      this.orderPositions$.getValue().map(p => ({
        ...p,
        quantity: 0,
      }))
    )
  }

  fetchForOrder(categoryId: string) {
    this.fetch(categoryId)
      .pipe(
        map((positions: Position[]) => {
          return positions.map(p => ({
            ...p,
            quantity: 0,
          }))
        })
      )
      .subscribe((positions: Position[]) => {
        this.orderPositions$.next(positions)
      })
  }

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.domain}/api/position/${categoryId}`)
  }

  create(position: Partial<Position>): Observable<Position> {
    return this.http.post<Position>(`${this.domain}/api/position/`, position)
  }

  update(position: Partial<Position>): Observable<Position> {
    return this.http.patch<Position>(`${this.domain}/api/position/${position._id}`, position)
  }

  delete(position: Partial<Position>): Observable<Message> {
    return this.http.delete<Message>(`${this.domain}/api/position/${position._id}`)
  }
}
