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
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  new_flashcards: Flashcard[]
  card_translation: CardTranslation[] = []
  card_headers = ['word', 'hiragana', 'sino', 'ipa', 'example']
  cardTr_headers = ['meaning', 'sino_vi', 'ex_meaning']
  getFirstKey(o) { return Object.keys(o).length ? Object.keys(o)[0] : null }
  objectKeys(o) { return Object.keys(o).length ? Object.keys(o) : null }
  allowHeaders = [...this.card_headers, ...this.cardTr_headers]
  headersIndex
  langs: Language[]
  selectedLang: Language
  failedData = []
  constructor(
    private flashcardSer: FlashcardsService,
    private cardTransSer: CardTranslatesService,
    private langSer: LanguagesService,
    private toast: ToastService,
    private modal: NgbModal,
    private activeModal: NgbActiveModal
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

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

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
        return row
      })
    };
    reader.readAsBinaryString(target.files[0]);

  }
  onGridChange(evt: Event) {
    console.log(evt);
  }
  importData() {
    this.failedData = []
    const cards = this.filterByHeaders(this.card_headers, this.allowedData)
    const card_trs = this.filterByHeaders(this.cardTr_headers, this.allowedData)
    if (this.failedData.length) {
      this.toast.warning('Card number ' + this.failedData.map(d => { return parseInt(d) + 1 }).toString() + ' is invalid!', null)
      return
    }
    if (!this.selectedLang) { this.toast.warning('Please select language of meaning', null); return }
    if (cards.length !== card_trs.length) { this.toast.warning('Some word or meaning is missing', 'Data length Error'); return }
    if (!cards.length) { this.toast.warning('Words is empty!', null); return }
    if (!card_trs.length) { this.toast.warning('Meanings is empty', null); return }

    // ------ Start Import --------
    let body = { lesson_id: this.lesson.id, flash_cards: cards }
    console.log(body);
    this.flashcardSer.createArrayFlashCards(body).pipe(switchMap((res: any) => {
      this.new_flashcards = res[this.lesson.id]
      console.log('NEW FLASHCARDS');
      console.log(this.new_flashcards);

      if (this.new_flashcards && this.new_flashcards.length) {
        let arr_cardTrs = []
        this.new_flashcards.map(new_card => {
          const word_i = cards.findIndex(card => card.word === new_card['word'])
          if (word_i !== -1) {
            arr_cardTrs.push(Object.assign(card_trs[word_i], { flash_card_id: new_card.id }))
          }
        })
        console.log(arr_cardTrs);
        if (arr_cardTrs.length) {
          const body = { language_id: this.selectedLang.id, card_translates: arr_cardTrs }
          console.log(body);
          return this.cardTransSer.createArrayCardTrs(body)
        } else { this.toast.err('Meaning is empty'); return of(false) }
      } else { this.toast.err('Empty results'); return of(false) }
    })).subscribe((res: CardTranslation[]) => {
      if (res && res.length) {
        console.log('FLASHCARDS_TRANSLATION');
        console.log(res);
        this.toast.success('Imported ' + res.length + ' cards')
        this.activeModal.close({ flashcards: this.new_flashcards })
      }
    }, err => this.toast.err(err))
  }
  filterByHeaders(headers, source) {
    return source.map((row, row_i) => {
      let item = {}
      headers.map(k => { if (row[k]) item[k] = row[k] })
      if (Object.keys(item).length === 0) { this.failedData.push(row_i) }
      return item
    })
  }
  openCreateLanguageModal() {
    const ref = this.modal.open(CreateLanguageComponent, { size: 'sm', backdrop: true })
    ref.result.then(res => {
      if (res.id) {
        this.langs.push(res)
      }
    }, reject => { })
  }
  findFailedCards(cards, card_trs) {

  }
}