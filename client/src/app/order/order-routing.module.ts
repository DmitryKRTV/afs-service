import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteLayoutComponent } from '../core/layouts/site-layout/site-layout.component'
import { OrderPageComponent } from './components/order-page/order-page.component'
import { OrderCategoriesComponent } from './components/order-page/components/order-categories/order-categories.component'
import { OrderPositionsComponent } from './components/order-page/components/order-positions/order-positions.component'

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        component: OrderPageComponent,
        children: [
          { path: '', component: OrderCategoriesComponent },
          { path: ':id', component: OrderPositionsComponent },
        ],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
