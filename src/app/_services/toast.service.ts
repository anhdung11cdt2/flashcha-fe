import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(
    private toast: ToastrService
  ) { }
  success(mess?: string) {
    if (mess) { this.toast.success(mess); return }
    this.toast.success('Successful')
  }
  err(err: any, title?: string) {
    if (err && err.status) {
      this.toast.error(err.status + ' ' + err.statusText); console.log(err);
    // } else if (err && Object.keys(err).length) {
    //   let err_content = Object.values(err).reduce((str: string, val) => str += val.toString())
    //   this.toast.error(err_content.toString())
    } else this.toast.error('Sorry! Somethings went wrong!', title)
  }
  warning(mess: string, title: string) {
    this.toast.warning(mess, title)
  }
}
