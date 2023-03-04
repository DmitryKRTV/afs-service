import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  toast(message: string) {
    M.toast({ html: message })
  }
}

declare let M: any
