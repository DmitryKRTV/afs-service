import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteLayoutComponent } from '../core/layouts/site-layout/site-layout.component'
import { OverviewPageComponent } from './overview-page/overview-page.component'

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [{ path: '', component: OverviewPageComponent }],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverviewRoutingModule {}
