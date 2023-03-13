import { ElementRef, Injectable } from '@angular/core'

declare let M: any

export interface MaterialInstance {
  open: () => void
  close: () => void
  destroy: () => void
}

export interface MaterialDatePicker extends MaterialInstance {
  date?: Date
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

  initDatePicker(ref: ElementRef, onClose: () => void): MaterialDatePicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearButton: true,
      onClose,
    })
  }

  initTapTarget(ref: ElementRef): MaterialInstance {
    return M.TapTarget.init(ref.nativeElement)
  }
}
