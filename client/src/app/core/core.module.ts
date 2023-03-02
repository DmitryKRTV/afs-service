import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CoreRoutingModule } from './core-routing.module'
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component'
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component'

@NgModule({
  declarations: [AuthLayoutComponent, SiteLayoutComponent],
  imports: [CommonModule, CoreRoutingModule],
  exports: [AuthLayoutComponent, SiteLayoutComponent],
})
export class CoreModule {}
