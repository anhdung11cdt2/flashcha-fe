import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Flashcard } from 'src/app/_types/flashcard';
import { CardTranslation } from 'src/app/_types/card-translation';
import { Lesson } from 'src/app/_types/lesson';
type AOA = any[][];
import * as canvasDatagrid from 'canvas-datagrid';
import { FlashcardsService } from 'src/app/_services/flashcards.service';
import { CardTranslatesService } from 'src/app/_services/card-translates.service';
import { ToastService } from 'src/app/_services/toast.service';
import { switchMap } from "rxjs/operators";
import { of } from 'rxjs';
import { LanguagesService } from 'src/app/_services/languages.service';
import { Language } from 'src/app/_types/language';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateLanguageComponent } from '../create-language/create-language.component';
@Component({
  selector: 'app-single-import',
  templateUrl: './single-import.component.html',
  styleUrls: ['./single-import.component.scss']
})
export class SingleImportComponent implements OnInit {
  lesson: Lesson
  data: AOA
  allowedData: any[]
  flashcard: Flashcard[] = []
  card_translation: CardTranslation[] = []
  card_headers = ['word', 'hiragana', 'sino', 'ipa', 'example']
  cardTr_headers = ['meaning', 'sino_vi', 'ex_meaning']
  getFirstKey(o) { return Object.keys(o).length ? Object.keys(o)[0] : null }
  objectKeys(o) { return Object.keys(o).length ? Object.keys(o) : null }
  allowHeaders = [...this.card_headers, ...this.cardTr_headers]
  headersIndex
  langs: Language[]
  selectedLang: Language
  constructor(
    private flashcardSer: FlashcardsService,
    private cardTransSer: CardTranslatesService,
    private langSer: LanguagesService,
    private toast: ToastService,
    private modal: NgbModal,
  ) { }

  ngOnInit() {
    console.log(this.lesson);
    this.langSer.getAll().subscribe((res: Language[]) => {
      console.log(res)
      this.langs = res
    }, err => this.toast.err(err))
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      // console.log(wb);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      // console.log(ws);

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      // check headers

      this.data[0].map((k, i) => {
        if (this.allowHeaders.includes(k)) {
          if (!this.headersIndex) this.headersIndex = {}
          return this.headersIndex[k] = i
        }
      })

      this.data = this.data.filter(d => d.length)
      this.data.splice(0, 1)
      this.allowedData = this.data.map(d => {
        let row = {}
        Object.keys(this.headersIndex).map(header_key => {
          row[header_key] = d[this.headersIndex[header_key]]
        })
        // console.log(row);
        return row
      })

      // let grid_data = []
      // let keys = headersIndex
      // for (let row_i = 1; row_i < this.data.length; row_i++) {
      //   let row = {}
      //   Object.keys(keys).map((key) => {
      //     row[key] = this.data[row_i][headersIndex[key]]
      //   })
      //   grid_data.push(row)
      // }

      //to create grid
      // var grid = canvasDatagrid({
      //   parentNode: document.getElementById('gridctr'),
      //   data: []
      // });
      // grid.data = grid_data
    };
    reader.readAsBinaryString(target.files[0]);

  }
  onGridChange(evt: Event) {
    console.log(evt);
  }
  importData() {
    const cards = this.filterByHeaders(this.card_headers, this.allowedData)
    const card_trs = this.filterByHeaders(this.cardTr_headers, this.allowedData)
    console.log(cards);
    console.log(card_trs);
    console.log(this.selectedLang)
    // this.cardTr_headers.map(h => h.includes('_vi'))
    // if (cards.length) {
    //   let body = { lesson_id: this.lesson.id, flashcards: cards }
    //   console.log(body);
    //   this.flashcardSer.createArrayFlashCards(body).pipe(switchMap((res: any) => {
    //     const new_flashcards = res[this.lesson.id]
    //     if (new_flashcards.length) {
    //       let arr_cardTrs = []
    //       new_flashcards.map(new_card => {
    //         const word_i = this.allowedData.findIndex(d => d[new_card['word']])
    //         if (word_i !== -1) {
    //           arr_cardTrs.push(Object.assign(card_trs[word_i], {flash_card_id: new_card.id}))
    //         }
    //       })
    //       const body = {language_id: 'vi', }
    //       const req = this.cardTransSer.createArrayCardTrs({})
    //       return 
    //     } else return of(false)
    //   })).subscribe()
    // } else this.toast.warning('Emtpy data', 'Import')
  }
  filterByHeaders(headers, source) {
    return source.map(row => {
      let item = {}
      headers.map(k => { if (row[k]) item[k] = row[k] })
      return item
    })
  }
  openCreateLanguageModal() {
    const ref = this.modal.open(CreateLanguageComponent, {size: 'sm', backdrop: true})
    ref.result.then(res => {
      if (res.id) {
        this.langs.push(res)
      }
    }, reject => {})
  }
}