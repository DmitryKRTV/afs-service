import { Component, Input } from '@angular/core'
import { Order } from '../../../../../shared/models/order.model'

@Component({
  selector: 'afs-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
})
export class HistoryListComponent {
  @Input() ordersList!: Order[]
}
