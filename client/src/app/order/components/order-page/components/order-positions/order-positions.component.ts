import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { PositionsService } from '../../../../../shared/services/positions.service'
import { Observable, SubscriptionLike } from 'rxjs'
import { Position } from '../../../../../shared/models/position.model'
import { OrderService } from '../../../../services/order.service'
import { MaterialService } from '../../../../../shared/services/material.service'

@Component({
  selector: 'afs-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css'],
})
export class OrderPositionsComponent implements OnInit, OnDestroy {
  positions$!: Observable<Position[]>
  subscriptions$: SubscriptionLike[] = []

  constructor(
    private route: ActivatedRoute,
    private positionService: PositionsService,
    private orderService: OrderService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.positions$ = this.positionService.orderPositions$
    this.subscriptions$.push(
      this.route.params.subscribe((params: Params) => {
        this.positionService.fetchForOrder(params['id'])
      })
    )
  }

  addToOrder(position: Position) {
    this.materialService.toast(`Добавлено x${position.quantity}`)
    this.orderService.add(position)
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription$ => subscription$.unsubscribe())
    this.subscriptions$ = []
  }
}
