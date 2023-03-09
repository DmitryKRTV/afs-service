import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Observable, SubscriptionLike } from 'rxjs'
import { MaterialInstance, MaterialService } from '../../../shared/services/material.service'
import { OrderService } from '../../services/order.service'
import { Order, OrderPosition } from '../../../shared/models/order.model'
import { OrdersService } from '../../../shared/services/orders.service'
import { PositionsService } from '../../../shared/services/positions.service'

@Component({
  selector: 'afs-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  modal!: MaterialInstance
  ifRoot = false
  @ViewChild('modal') modalRef!: ElementRef
  subscriptions$: SubscriptionLike[] = []

  orderList$!: Observable<OrderPosition[]>
  orderPrice$!: Observable<number>

  pending = false

  constructor(
    private router: Router,
    private materialService: MaterialService,
    private orderService: OrderService,
    private ordersService: OrdersService,
    private positionsService: PositionsService
  ) {}

  ngOnInit(): void {
    this.orderPrice$ = this.orderService.price$
    this.orderList$ = this.orderService.list$
    this.ifRoot = this.router.url === '/order'
    this.subscriptions$.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.ifRoot = this.router.url === '/order'
        }
      })
    )
  }

  ngOnDestroy() {
    this.modal.destroy
    this.subscriptions$.forEach(subscription$ => subscription$.unsubscribe())
    this.subscriptions$ = []
  }

  ngAfterViewInit(): void {
    this.modal = this.materialService.initModal(this.modalRef)
  }

  openModal() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    this.pending = true
    const order: Order = {
      list: this.orderService.getList().map(p => ({
        name: p.name,
        cost: p.cost,
        quantity: p.quantity,
      })),
    }
    this.subscriptions$.push(
      this.ordersService.create(order).subscribe(
        newOrder => {
          this.materialService.toast(`Заказ №${newOrder.order} был добавлен`)
          this.orderService.clear()
          this.positionsService.clearOrderPositions()
        },
        error => this.materialService.toast(error.error.message),
        () => {
          this.pending = false
          this.modal.close()
        }
      )
    )
  }

  removePosition(item: OrderPosition) {
    this.orderService.remove(item)
  }
}
