import { Injectable } from '@angular/core'
import { LoginResponse, User } from '../models/auth.model'
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null

  constructor(private http: HttpClient, private router: Router) {}

  login(user: Partial<User>): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`/api/auth/login`, user).pipe(
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
    return this.http.post<User>(`/api/auth/register`, user)
  }
}
