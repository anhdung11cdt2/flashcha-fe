import { Component, OnInit } from '@angular/core';
import { Language, isoLangs } from 'src/app/_types/language';
import { LanguagesService } from 'src/app/_services/languages.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/_services/toast.service';
import { compareStr } from 'src/app/_help/searcher';

@Component({
  selector: 'app-create-language',
  templateUrl: './create-language.component.html',
  styleUrls: ['./create-language.component.scss']
})
export class CreateLanguageComponent implements OnInit {
  isoLangs = isoLangs
  objKeys = (d) => { return Object.keys(d) }
  searchTerm: string = ''
  constructor(
    private langSer: LanguagesService,
    private activeModal: NgbActiveModal,
    private toast: ToastService
  ) { }
  ngOnInit() {
  }
  createLang(lang_code) {
    const body = { name: isoLangs[lang_code].name, lang_code: lang_code }
    this.langSer.create(body).subscribe((res: Language[]) => {
      if (res.length) { this.activeModal.close(res.find(lang => lang.lang_code === lang_code)) }
    }, err => { this.toast.err(err) })
  }
  onSearch() {
    this.isoLangs = isoLangs
    let filteredLangs:any = {}
    this.objKeys(this.isoLangs).map(lang_code => {
      if (compareStr(this.isoLangs[lang_code].name, this.searchTerm)) {
        filteredLangs[lang_code] = this.isoLangs[lang_code]
      }
    })
    this.isoLangs = filteredLangs
  }
}
