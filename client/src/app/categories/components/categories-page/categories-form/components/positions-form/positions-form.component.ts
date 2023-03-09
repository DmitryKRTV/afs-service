import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { PositionsService } from '../../../../../../shared/services/positions.service'
import { Position } from '../../../../../../shared/models/position.model'
import {
  MaterialInstance,
  MaterialService,
} from '../../../../../../shared/services/material.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { SubscriptionLike } from 'rxjs'

@Component({
  selector: 'afs-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css'],
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() categoryId!: string | undefined
  @ViewChild('modal') modalRef!: ElementRef
  modal!: MaterialInstance
  positions: Position[] = []
  loading = false
  positionId: string | null = null

  subscriptions$: SubscriptionLike[] = []

  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    coast: new FormControl<number>(1, {
      validators: [Validators.required, Validators.min(1)],
    }),
  })

  constructor(
    private positionsService: PositionsService,
    private materialService: MaterialService
  ) {}

  get name() {
    return this.form.get('name')
  }

  get coast() {
    return this.form.get('coast')
  }

  ngOnInit(): void {
    this.loading = true
    if (this.categoryId) {
      this.subscriptions$.push(
        this.positionsService.fetch(this.categoryId).subscribe(positions => {
          this.positions = positions
          this.loading = false
        })
      )
    }
  }

  ngAfterViewInit(): void {
    this.modal = this.materialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy()
    this.subscriptions$.forEach(subscription$ => subscription$.unsubscribe())
    this.subscriptions$ = []
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id as string
    this.form.patchValue({
      name: position.name,
      coast: position.cost,
    })
    this.modal.open()
    this.materialService.updateTextFields()
  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({
      name: '',
      coast: 1,
    })
    this.modal.open()
    this.materialService.updateTextFields()
  }

  closeModal() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()
    const newPosition: Partial<Position> = {
      name: this.form.value.name as string,
      cost: this.form.value.coast as number,
      category: this.categoryId,
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.subscriptions$.push(
        this.positionsService.update(newPosition).subscribe(
          position => {
            const idx = this.positions.findIndex(p => p._id === position._id)
            this.positions[idx] = position
            this.materialService.toast('Позиция обновлена успешно')
          },
          error => this.materialService.toast(error.error.message),
          () => this.onComplete()
        )
      )
    } else {
      this.subscriptions$.push(
        this.positionsService.create(newPosition).subscribe(
          position => {
            this.materialService.toast('Позиция создана успешно')
            this.positions.push(position)
          },
          error => this.materialService.toast(error.error.message),
          () => this.onComplete()
        )
      )
    }
  }

  onDeletePosition(event: MouseEvent, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию ${position.name}?`)

    if (decision) {
      this.subscriptions$.push(
        this.positionsService.delete(position).subscribe(
          response => {
            const idx = this.positions.findIndex(p => p._id === position._id)
            this.positions.splice(idx, 1)
            this.materialService.toast(response.message)
          },
          error => {
            this.materialService.toast(error.error.message)
          }
        )
      )
    }
  }

  private onComplete = () => {
    this.modal.close()
    this.form.reset({ name: '', coast: 1 })
    this.form.enable()
  }
}
