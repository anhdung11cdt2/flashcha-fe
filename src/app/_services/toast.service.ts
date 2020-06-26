import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  defaultErr = 'Sorry! Somethings went wrong!'
  defaultServerErr = 'Sorry! Our server has problem!'
  constructor(
    private toast: ToastrService
  ) { }
  success(mess?: string) {
    if (mess) { this.toast.success(mess); return }
    this.toast.success('Successful')
  }
  err(err: any, title?: string) {
    console.log(err);
    if (err && err.status) {
      let msg
      msg = err.statusText === "Internal Server Error" ? this.defaultServerErr : err.status + ' ' + err.statusText
      this.toast.error(msg); 
      console.log(err);
    // } else if (err && Object.keys(err).length) {
    //   let err_content = Object.values(err).reduce((str: string, val) => str += val.toString())
    //   this.toast.error(err_content.toString())
    } else this.toast.error(this.defaultErr, title)
  }
  warning(mess: string, title: string) {
    this.toast.warning(mess, title)
  }
}
