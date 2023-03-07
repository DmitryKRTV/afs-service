import { Component, OnInit } from '@angular/core'
import { CategoriesService } from '../../services/categories.service'
import { Category } from '../../models/categories.model'

@Component({
  selector: 'afs-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent implements OnInit {
  categories: Category[] = []

  isLoading = false

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.isLoading = true
    this.categoriesService.fetch().subscribe(categories => {
      this.isLoading = false
      this.categories = categories
      console.log(categories)
    })
  }
}
