import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(
    private toast: ToastrService
  ) { }
  success(){
    this.toast.success('Successful')
  }
  err(err: any, mess?: string) {
    let status = err && err.status || ''
    this.toast.error(mess || null)
  }
  warning(mess: string, title: string) {
    title ? this.toast.warning(mess) : this.toast.warning(mess, title)
  }
}
