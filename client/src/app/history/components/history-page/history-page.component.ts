import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MaterialInstance, MaterialService } from '../../../shared/services/material.service'
import { OrdersService } from '../../../shared/services/orders.service'
import { SubscriptionLike } from 'rxjs'
import { Order } from '../../../shared/models/order.model'
import { Filter } from '../../../shared/models/filter.model'

const STEP = 2

@Component({
  selector: 'afs-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef!: ElementRef
  tooltip!: MaterialInstance
  filterVisibility = true
  offset = 0
  limit = STEP
  subscriptions$: SubscriptionLike[] = []
  ordersList: Order[] = []
  filter: Filter = {}
  loading = false
  reloading = false
  noMoreOrders = false

  constructor(private materialService: MaterialService, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.reloading = true
    this.fetchOrders()
  }

  ngAfterViewInit(): void {
    this.tooltip = this.materialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    this.tooltip.destroy()
    this.subscriptions$.forEach(subscription$ => subscription$.unsubscribe())
    this.subscriptions$ = []
  }

  isFilterVisible() {
    this.filterVisibility = !this.filterVisibility
  }

  loadMore() {
    this.offset += STEP
    this.loading = true
    this.fetchOrders()
  }

  applyFilter(filter: Filter) {
    this.ordersList = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetchOrders()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

  private fetchOrders() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit,
    })
    this.subscriptions$.push(
      this.ordersService.fetch(params).subscribe(orders => {
        this.ordersList = this.ordersList.concat(orders)
        this.noMoreOrders = false
        if (orders.length < STEP) {
          this.noMoreOrders = true
          this.materialService.toast('Заказов более не найдено')
        }
        this.loading = false
        this.reloading = false
      })
    )
  }
}
