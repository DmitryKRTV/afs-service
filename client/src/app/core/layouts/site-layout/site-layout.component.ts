import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { MaterialService } from '../../../shared/services/material.service'

@Component({
  selector: 'afs-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css'],
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floating') floatingRef!: ElementRef
  links = [
    { url: '/overview', name: 'Обзор' },
    { url: '/analytics', name: 'Аналитика' },
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Ассортимент' },
  ]

  constructor(private authService: AuthService, private materialService: MaterialService) {}

  ngAfterViewInit(): void {
    this.materialService.initializeFloatingButton(this.floatingRef)
  }

  onLogout(event: MouseEvent) {
    event.preventDefault()
    this.authService.logout()
  }
}
