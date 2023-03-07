import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesRoutingModule } from './categories-routing.module'
import { CategoriesPageComponent } from './components/categories-page/categories-page.component'
import { CoreModule } from '../core/core.module'
import { CategoriesFormComponent } from './components/categories-page/categories-form/categories-form.component'
import { PositionsFormComponent } from './components/categories-page/categories-form/components/positions-form/positions-form.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [CategoriesPageComponent, CategoriesFormComponent, PositionsFormComponent],
  imports: [CommonModule, CategoriesRoutingModule, CoreModule, ReactiveFormsModule],
})
export class CategoriesModule {}
