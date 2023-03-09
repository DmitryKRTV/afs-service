import { Injectable } from '@angular/core'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { catchError, EMPTY, Observable } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { MaterialService } from '../../shared/services/material.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private materialService: MaterialService
  ) {}

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
      return EMPTY
    }
    if (error.status === 504) {
      this.materialService.toast('Сервер не отвечает. Пожалуйста, обратитесь к администратору.')
      return EMPTY
    }
    this.materialService.toast('Ошибка сети. Проверьте подключение к интернету.')
    return EMPTY
  }
}
