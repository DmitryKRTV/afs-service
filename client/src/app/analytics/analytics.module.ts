import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AnalyticsRoutingModule } from './analytics-routing.module'
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component'
import { CoreModule } from '../core/core.module'

@NgModule({
  declarations: [AnalyticsPageComponent],
  imports: [CommonModule, AnalyticsRoutingModule, CoreModule],
})
export class AnalyticsModule {}
