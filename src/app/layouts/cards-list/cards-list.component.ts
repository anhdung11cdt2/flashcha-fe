import { Component, OnInit, Input} from '@angular/core';
import { Flashcard } from 'src/app/_types/flashcard';
import { Lesson } from 'src/app/_types/lesson';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SingleImportComponent } from '../single-import/single-import.component';
@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit {
  @Input()flashcards: Flashcard[]
  @Input()lesson: Lesson
  archived = []
  inArchive = []
  new_flashcards: Flashcard[]
  constructor(
    public modalSer: NgbModal,
  ) { }

  ngOnInit() {
    console.log(this.flashcards);
    // if (this.flashcards && this.flashcards.length) {
      // this.inArchive = this.flashcards.filter(f => f.word)
    // }
  }
  openImport() {
    let modal = this.modalSer.open(SingleImportComponent, {size: 'xl', backdrop: 'static', windowClass: 'import-modal'})
    modal.componentInstance.lesson = this.lesson
    modal.result.then(res => {
      if (res && res.flashcards) res.flashcards.map(f => {Object.assign(f, {isNew: true}); this.flashcards.push(f)})
    }, reject => {})
  }
}
