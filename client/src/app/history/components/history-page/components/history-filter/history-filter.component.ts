import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core'
import { Filter } from '../../../../../shared/models/filter.model'
import {
  MaterialDatePicker,
  MaterialService,
} from '../../../../../shared/services/material.service'

@Component({
  selector: 'afs-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css'],
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {
  @Output() OnFilter = new EventEmitter<Filter>()
  start!: MaterialDatePicker
  end!: MaterialDatePicker
  order!: number
  @ViewChild('start') startRef!: ElementRef
  @ViewChild('end') endRef!: ElementRef
  isValid = true

  constructor(private materialService: MaterialService) {}

  ngAfterViewInit(): void {
    this.start = this.materialService.initDatePicker(this.startRef, this.validate.bind(this))
    this.end = this.materialService.initDatePicker(this.endRef, this.validate.bind(this))
  }

  validate() {
    if (this.start.date && this.end.date) {
      this.isValid = this.start.date < this.end.date
    } else {
      this.isValid = true
      return
    }
  }

  ngOnDestroy(): void {
    this.start.destroy()
    this.end.destroy()
  }

  submitFilter() {
    const filter: Filter = {}
    if (this.order) {
      filter.order = this.order
    }
    if (this.start.date) {
      filter.start = this.start.date
    }
    if (this.end.date) {
      filter.end = this.end.date
    }
    this.OnFilter.emit(filter)
  }
}
