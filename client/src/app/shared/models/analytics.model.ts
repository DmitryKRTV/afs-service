export interface Overview {
  margin: OverviewPageItem
  orders: OverviewPageItem
}

export interface OverviewPageItem {
  percent: number
  compare: number
  yesterday: number
  isHigher: number
}

export interface Analytics {
  average: number
  chart: Chart[]
}

interface Chart {
  date: string
  margin: number
  order: number
}
