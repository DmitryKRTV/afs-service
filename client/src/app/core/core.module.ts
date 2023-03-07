import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CoreRoutingModule } from './core-routing.module'
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component'
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component'
import { LoaderComponent } from './components/loader/loader.component'

@NgModule({
  declarations: [AuthLayoutComponent, SiteLayoutComponent, LoaderComponent],
  imports: [CommonModule, CoreRoutingModule],
  exports: [AuthLayoutComponent, SiteLayoutComponent, LoaderComponent],
})
export class CoreModule {}
