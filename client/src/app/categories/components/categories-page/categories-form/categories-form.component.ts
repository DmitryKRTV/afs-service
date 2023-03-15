import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CategoriesService } from '../../../../shared/services/categories.service'
import { catchError, EMPTY, of, SubscriptionLike, switchMap } from 'rxjs'
import { MaterialService } from '../../../../shared/services/material.service'
import { HttpErrorResponse } from '@angular/common/http'
import { Category } from '../../../../shared/models/categories.model'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'afs-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css'],
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  @ViewChild('input') inputRef!: ElementRef
  isNew = true
  image!: File
  imagePreview!: string | undefined
  category!: Category
  subscriptions$: SubscriptionLike[] = []
  domain = environment.domain
  form = new FormGroup({
    name: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
  })

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private materialService: MaterialService,
    private router: Router
  ) {}

  get name() {
    return this.form.get('name')
  }

  ngOnInit(): void {
    this.form.disable()
    this.subscriptions$.push(
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
            this.category = category
            this.form.patchValue({
              name: category.name,
            })
            this.imagePreview = `${this.domain}/` + category.imageSrc
            this.materialService.updateTextFields()
          }
          this.form.enable()
        })
    )
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name || '', this.image)
    } else {
      if (this.category._id) {
        obs$ = this.categoriesService.update(
          this.category._id,
          this.form.value.name || '',
          this.image
        )
      }
    }
    if (obs$) {
      this.subscriptions$.push(
        obs$.pipe(catchError(this.errorHandler.bind(this))).subscribe(
          category => {
            this.category = category
            this.materialService.toast('Изменения сохранены')
            this.form.enable()
          },
          () => {
            this.form.enable()
          }
        )
      )
    }
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены что хотите удалить категорию ${this.category.name}`)
    if (decision && this.category._id) {
      this.subscriptions$.push(
        this.categoriesService.delete(this.category._id).subscribe(
          response => this.materialService.toast(response.message),
          error => this.materialService.toast(error.message),
          () => this.router.navigate(['/categories'])
        )
      )
    }
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription$ => subscription$.unsubscribe())
    this.subscriptions$ = []
  }

  private errorHandler(error: HttpErrorResponse) {
    this.materialService.toast(error.error.message)
    return EMPTY
  }
}
