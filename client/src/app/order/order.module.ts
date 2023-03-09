import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { OrderRoutingModule } from './order-routing.module'
import { OrderPageComponent } from './components/order-page/order-page.component'
import { OrderCategoriesComponent } from './components/order-page/components/order-categories/order-categories.component'
import { OrderPositionsComponent } from './components/order-page/components/order-positions/order-positions.component'
import { CoreModule } from '../core/core.module'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [OrderPageComponent, OrderCategoriesComponent, OrderPositionsComponent],
  imports: [CommonModule, OrderRoutingModule, CoreModule, FormsModule],
})
export class OrderModule {}
