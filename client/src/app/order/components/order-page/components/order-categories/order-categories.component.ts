import { Component, OnInit } from '@angular/core'
import { CategoriesService } from '../../../../../shared/services/categories.service'
import { Observable } from 'rxjs'
import { Category } from '../../../../../shared/models/categories.model'
import { environment } from '../../../../../../environments/environment'

@Component({
  selector: 'afs-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css'],
})
export class OrderCategoriesComponent implements OnInit {
  categories$!: Observable<Category[]>
  domain = environment.domain

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
  }
}
