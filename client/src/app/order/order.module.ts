import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { OrderRoutingModule } from './order-routing.module'
import { OrderPageComponent } from './components/order-page/order-page.component'

@NgModule({
  declarations: [OrderPageComponent],
  imports: [CommonModule, OrderRoutingModule],
})
export class OrderModule {}
