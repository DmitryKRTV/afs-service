import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteLayoutComponent } from '../core/layouts/site-layout/site-layout.component'
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component'

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [{ path: '', component: AnalyticsPageComponent }],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
