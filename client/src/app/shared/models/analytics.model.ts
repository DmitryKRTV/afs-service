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
