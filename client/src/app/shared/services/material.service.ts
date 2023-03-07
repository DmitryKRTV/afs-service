import { ElementRef, Injectable } from '@angular/core'

declare let M: any

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  toast(message: string) {
    M.toast({ html: message })
  }

  initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  updateTextFields() {
    M.updateTextFields()
  }
}
