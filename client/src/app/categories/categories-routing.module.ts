import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteLayoutComponent } from '../core/layouts/site-layout/site-layout.component'
import { CategoriesPageComponent } from './components/categories-page/categories-page.component'
import { CategoriesFormComponent } from './components/categories-page/categories-form/categories-form.component'

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: CategoriesPageComponent },
      { path: 'new', component: CategoriesFormComponent },
      { path: 'new/:id', component: CategoriesFormComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
