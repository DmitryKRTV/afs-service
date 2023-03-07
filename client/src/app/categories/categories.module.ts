import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesRoutingModule } from './categories-routing.module'
import { CategoriesPageComponent } from './components/categories-page/categories-page.component'
import { CoreModule } from '../core/core.module'

@NgModule({
  declarations: [CategoriesPageComponent],
  imports: [CommonModule, CategoriesRoutingModule, CoreModule],
})
export class CategoriesModule {}
