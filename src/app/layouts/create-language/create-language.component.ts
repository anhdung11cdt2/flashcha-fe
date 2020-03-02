import { Component, OnInit } from '@angular/core';
import { Language, isoLangs } from 'src/app/_types/language';
import { LanguagesService } from 'src/app/_services/languages.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-language',
  templateUrl: './create-language.component.html',
  styleUrls: ['./create-language.component.scss']
})
export class CreateLanguageComponent implements OnInit {
  isoLangs = isoLangs
  objKeys = (d) => {return Object.keys(d)}

  constructor(
    private langSer: LanguagesService,
    private activeModal: NgbActiveModal
  ) { }
  ngOnInit() {
  }
  createLang(lang_code) {
    const body = {name: isoLangs[lang_code].name, lang_code:lang_code}
    this.langSer.create(body).subscribe((res: Language[]) => {
      if (res.length) {this.activeModal.close(res.find(lang => lang.lang_code === lang_code))}
    })
  }
}