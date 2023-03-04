import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../core/services/auth.service'
import { catchError, EMPTY, SubscriptionLike } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'
import { MaterialService } from '../../../shared/services/material.service'

@Component({
  selector: 'afs-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  subscriptions$: SubscriptionLike[] = []
  loginFrom = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,5}$'),
      ],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
  })

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService
  ) {}

  get email() {
    return this.loginFrom.get('email')
  }

  get password() {
    return this.loginFrom.get('password')
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('registered')) {
      this.materialService.toast('Введите данные для входа в систему.')
    } else if (this.route.snapshot.queryParamMap.get('accessDenied')) {
      this.materialService.toast('Необходимо зарегистрироваться!')
    } else if (this.route.snapshot.queryParamMap.get('sessionFailed')) {
      this.materialService.toast('Время доступа в систему истекло, пожалуйста, войдите заново.')
    }
  }

  onLoginSubmit() {
    this.loginFrom.disable()
    const values = this.loginFrom.value
    this.subscriptions$.push(
      this.authService
        .login(values)
        .pipe(catchError(this.errorHandler.bind(this)))
        .subscribe(() => {
          this.router.navigate(['/'])
        })
    )
    this.loginFrom.enable()
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription$ => subscription$.unsubscribe())
    this.subscriptions$ = []
  }

  private errorHandler(error: HttpErrorResponse) {
    this.materialService.toast(error.error.message)
    return EMPTY
  }
}
