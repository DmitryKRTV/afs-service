import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CategoriesService } from '../../../services/categories.service'
import { catchError, EMPTY, of, switchMap } from 'rxjs'
import { MaterialService } from '../../../../shared/services/material.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'afs-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit {
  isNew = true

  form = new FormGroup({
    name: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
  })

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private materialService: MaterialService
  ) {}

  get name() {
    return this.form.get('name')
  }

  ngOnInit(): void {
    this.form.disable()
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.categoriesService.getById(params['id'])
          }
          return of(null)
        }),
        catchError(this.errorHandler.bind(this))
      )
      .subscribe(category => {
        if (category) {
          this.form.patchValue({
            name: category.name,
          })
        }
        this.materialService.updateTextFields()
      })
    this.form.enable()
  }

  onSubmit() {}

  private errorHandler(error: HttpErrorResponse) {
    this.materialService.toast(error.error.message)
    return EMPTY
  }
}
