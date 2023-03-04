import { Component, OnInit } from '@angular/core'
import { AuthService } from './core/services/auth.service'

@Component({
  selector: 'afs-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const tempToken = localStorage.getItem('auth-token')
    if (tempToken) {
      this.authService.setToken(tempToken)
    }
  }
}
