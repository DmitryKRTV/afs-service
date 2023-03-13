import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OverviewRoutingModule } from './overview-routing.module'
import { OverviewPageComponent } from './overview-page/overview-page.component'
import { CoreModule } from '../core/core.module'

@NgModule({
  declarations: [OverviewPageComponent],
  imports: [CommonModule, OverviewRoutingModule, CoreModule],
})
export class OverviewModule {}
