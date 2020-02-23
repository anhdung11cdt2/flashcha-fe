import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Flashcard } from 'src/app/_types/flashcard';
import { CardTranslation } from 'src/app/_types/card-translation';
import { Lesson } from 'src/app/_types/lesson';
type AOA = any[][];
import * as canvasDatagrid from 'canvas-datagrid';
import { FlashcardsService } from 'src/app/_services/flashcards.service';
import { CardTranslatesService } from 'src/app/_services/card-translates.service';

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
  allowHeaders = ['word', 'hiragana', 'sino', 'ipa', 'example', 'meaning_vi', 'sino_vi', 'ex_meaning']
  headersIndex
  constructor(
    private flashcardSer: FlashcardsService,
    private cardTransSer: CardTranslatesService,
    ) { }

  ngOnInit() {
    console.log(this.lesson);

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
      this.data.splice(0,1)
      this.allowedData = this.data.map(d => {
        let row = {}
        Object.keys(this.headersIndex).map(header_key => {
          row[header_key] = d[this.headersIndex[header_key]]
        })
        // console.log(row);
        return row
      })
      console.log(this.objectKeys(this.headersIndex));
      
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
  getFirstKey(o) { return Object.keys(o).length ? Object.keys(o)[0] : null }
  objectKeys(o) { return Object.keys(o).length ? Object.keys(o) : null }
  onGridChange(evt: Event) {
    console.log(evt);
  }
  importData() {
    console.log(this.allowedData);
    console.log(this.lesson);
    for (let i = 1; i < this.allowedData.length; i++) {
      const header = this.allowedData[i];
      const element = this.allowedData[i];
    }
    // this.flashcardSer.
  }
}