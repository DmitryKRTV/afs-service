import { ElementRef, Injectable } from '@angular/core'

declare let M: any

export interface MaterialInstance {
  open: () => void
  close: () => void
  destroy: () => void
}

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

  initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  initTooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement)
  }
}
