import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthLayoutComponent } from '../core/layouts/auth-layout/auth-layout.component'
import { LoginPageComponent } from './components/login-page/login-page.component'
import { RegistrationPageComponent } from './components/registration-page/registration-page.component'

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'registration', component: RegistrationPageComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
