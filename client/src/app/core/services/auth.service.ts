import { Injectable } from '@angular/core'
import { LoginResponse, User } from '../models/auth.model'
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null
  private domain = environment.domain

  constructor(private http: HttpClient, private router: Router) {}

  login(user: Partial<User>): Observable<{ token: string }> {
    console.log(this.domain)
    return this.http.post<{ token: string }>(`${this.domain}/api/auth/login`, user).pipe(
      tap(({ token }: LoginResponse) => {
        localStorage.setItem('auth-token', token)
        this.setToken(token)
      })
    )
  }

  setToken(token: string | null) {
    this.token = token
  }

  getToken(): string | null {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  registration(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.domain}/api/auth/register`, user)
  }
}
