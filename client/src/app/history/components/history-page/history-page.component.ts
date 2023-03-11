import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core'
import { MaterialInstance, MaterialService } from '../../../shared/services/material.service'

@Component({
  selector: 'afs-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef!: ElementRef
  tooltip!: MaterialInstance
  filterVisibility = true

  constructor(private materialService: MaterialService) {}

  ngAfterViewInit(): void {
    this.tooltip = this.materialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    this.tooltip.destroy
  }

  isFilterVisible() {
    this.filterVisibility = !this.filterVisibility
  }
}
