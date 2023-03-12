import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HistoryRoutingModule } from './history-routing.module'
import { HistoryPageComponent } from './components/history-page/history-page.component'
import { HistoryListComponent } from './components/history-page/components/history-list/history-list.component'
import { HistoryFilterComponent } from './components/history-page/components/history-filter/history-filter.component'
import { CoreModule } from '../core/core.module'

@NgModule({
  declarations: [HistoryPageComponent, HistoryListComponent, HistoryFilterComponent],
  imports: [CommonModule, HistoryRoutingModule, CoreModule],
})
export class HistoryModule {}
