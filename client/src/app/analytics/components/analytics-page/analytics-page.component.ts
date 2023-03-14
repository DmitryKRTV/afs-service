import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core'
import { AnalyticsService } from '../../../shared/services/analytics.service'
import { Analytics } from '../../../shared/models/analytics.model'
import { SubscriptionLike } from 'rxjs'
import { Chart, ChartConfiguration, registerables } from 'chart.js'

@Component({
  selector: 'afs-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css'],
})
export class AnalyticsPageComponent implements OnDestroy, AfterViewInit {
  @ViewChild('margin') marginRef!: ElementRef
  @ViewChild('order') orderRef!: ElementRef
  average!: number
  pending = true
  subscriptions$: SubscriptionLike[] = []

  constructor(private analyticsService: AnalyticsService) {
    Chart.register(...registerables)
  }

  ngAfterViewInit(): void {
    const marginConfig: ChartStartConfig = {
      label: 'Выручка',
      color: 'rgb(255,99,132)',
      labels: [],
      data: [],
    }
    const orderConfig: ChartStartConfig = {
      label: 'Заказы',
      color: 'rgb(54,162,235)',
      labels: [],
      data: [],
    }
    this.subscriptions$.push(
      this.analyticsService.getAnalytics().subscribe((data: Analytics) => {
        this.average = data.average
        marginConfig.labels = data.chart.map(item => item.date)
        marginConfig.data = data.chart.map(item => item.margin)
        orderConfig.labels = data.chart.map(item => item.date)
        orderConfig.data = data.chart.map(item => item.order)
        //-------temporary-data-margin-start------------
        marginConfig.labels.push('15.03.2023')
        marginConfig.labels.push('16.03.2023')
        marginConfig.labels.push('17.03.2023')
        marginConfig.data.push(150)
        marginConfig.data.push(80)
        marginConfig.data.push(200)
        //-------temporary-data-margin-end------------
        //-------temporary-data-order-start------------
        orderConfig.labels.push('15.03.2023')
        orderConfig.labels.push('16.03.2023')
        orderConfig.labels.push('17.03.2023')
        orderConfig.data.push(20)
        orderConfig.data.push(5)
        orderConfig.data.push(13)
        //-------temporary-data-order-end------------
        const marginCtx = this.marginRef.nativeElement.getContext('2d')
        const orderCtx = this.orderRef.nativeElement.getContext('2d')
        marginCtx.canvas.height = '300px'
        orderCtx.canvas.height = '300px'
        new Chart(marginCtx, this.createChartConfig(marginConfig))
        new Chart(orderCtx, this.createChartConfig(orderConfig))
        this.pending = false
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription$ => subscription$.unsubscribe())
    this.subscriptions$ = []
  }

  private createChartConfig({ labels, data, label, color }: ChartStartConfig) {
    return {
      type: 'line',
      options: {
        responsive: true,
      },
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: color,
            stepped: false,
            fill: false,
          },
        ],
      },
    } as ChartConfiguration
  }
}

interface ChartStartConfig {
  label: string
  color: string
  labels: string[]
  data: number[]
}
