import { Injectable } from '@angular/core'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated()) {
      request = request.clone({
        headers: new HttpHeaders().append('Authorization', this.authService.getToken() || ''),
      })
    }
    return next.handle(request).pipe(catchError(this.errorHandler.bind(this)))
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true,
        },
      })
    }

    return throwError(error)
  }
}
