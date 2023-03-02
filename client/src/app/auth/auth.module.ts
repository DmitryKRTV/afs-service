import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { LoginPageComponent } from './components/login-page/login-page.component'
import { CoreModule } from '../core/core.module'
import { RegistrationPageComponent } from './components/registration-page/registration-page.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent],
  imports: [CommonModule, AuthRoutingModule, CoreModule, ReactiveFormsModule],
})
export class AuthModule {}
