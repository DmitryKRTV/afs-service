import { Component, OnInit } from '@angular/core'
import { CategoriesService } from '../../../shared/services/categories.service'
import { Category } from '../../../shared/models/categories.model'
import { Observable } from 'rxjs'

@Component({
  selector: 'afs-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent implements OnInit {
  categories$!: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch()
  }
}
