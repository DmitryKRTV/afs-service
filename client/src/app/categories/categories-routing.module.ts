import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteLayoutComponent } from '../core/layouts/site-layout/site-layout.component'
import { CategoriesPageComponent } from './components/categories-page/categories-page.component'

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [{ path: '', component: CategoriesPageComponent }],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
