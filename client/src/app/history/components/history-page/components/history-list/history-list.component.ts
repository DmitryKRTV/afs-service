import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core'
import { Order } from '../../../../../shared/models/order.model'
import { MaterialInstance, MaterialService } from '../../../../../shared/services/material.service'

@Component({
  selector: 'afs-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() ordersList!: Order[]
  @ViewChild('modal') modalRef!: ElementRef
  selectedOrder!: Order
  modal!: MaterialInstance

  constructor(private materialService: MaterialService) {}

  ngAfterViewInit(): void {
    this.modal = this.materialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  computePrice(order: Order): number {
    return order.list.reduce((acc, curr) => {
      console.log(curr)
      return (acc += curr.quantity * curr.cost)
    }, 0)
  }

  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }
}
