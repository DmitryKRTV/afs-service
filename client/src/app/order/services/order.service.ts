import { Injectable } from '@angular/core'
import { Position } from '../../shared/models/position.model'
import { OrderPosition } from '../../shared/models/order.model'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  list$ = new BehaviorSubject<OrderPosition[]>([])
  price$ = new BehaviorSubject<number>(0)

  constructor() {}

  add(position: Position) {
    const orderPosition: OrderPosition = {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity ? position.quantity : 0,
      _id: position._id,
    }
    const list = this.list$.getValue()
    const candidate = list.find(p => p._id === position._id)
    if (candidate) {
      candidate.quantity += orderPosition.quantity
      this.list$.next(list)
    } else {
      this.list$.next([orderPosition, ...list])
    }
    this.computePrice()
  }

  remove(item: OrderPosition) {
    this.list$.next(this.list$.getValue().filter(p => p._id !== item._id))
    this.computePrice()
  }

  clear() {
    this.list$.next([])
    this.price$.next(0)
  }

  getList() {
    return this.list$.getValue()
  }

  private computePrice() {
    this.price$.next(
      this.list$.getValue().reduce((acc, curr) => {
        return acc + curr.cost * curr.quantity
      }, 0)
    )
  }
}
