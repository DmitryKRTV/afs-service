import { Component, OnDestroy } from '@angular/core'
import { catchError, EMPTY, SubscriptionLike } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../core/services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'
import { MaterialService } from '../../../shared/services/material.service'

@Component({
  selector: 'afs-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent implements OnDestroy {
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

  onRegistrationSubmit() {
    this.loginFrom.disable()
    const values = this.loginFrom.value
    this.subscriptions$.push(
      this.authService
        .registration(values)
        .pipe(catchError(this.errorHandler.bind(this)))
        .subscribe(() => {
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true,
            },
          })
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
