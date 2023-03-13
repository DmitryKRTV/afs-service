import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AnalyticsService } from '../../shared/services/analytics.service'
import { Observable } from 'rxjs'
import { Overview } from '../../shared/models/analytics.model'
import { MaterialInstance, MaterialService } from '../../shared/services/material.service'

@Component({
  selector: 'afs-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css'],
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget') tapTargetRef!: ElementRef
  tapTarget!: MaterialInstance
  analyticsData$!: Observable<Overview>
  yesterday = new Date()

  constructor(
    private analyticsService: AnalyticsService,
    private materialService: MaterialService
  ) {}

  ngAfterViewInit(): void {
    this.tapTarget = this.materialService.initTapTarget(this.tapTargetRef)
  }

  ngOnDestroy(): void {
    if (this.tapTarget) {
      this.tapTarget.destroy()
    }
  }

  ngOnInit(): void {
    this.analyticsData$ = this.analyticsService.getOverview()
    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  openInfo() {
    this.tapTarget.open()
  }
}
