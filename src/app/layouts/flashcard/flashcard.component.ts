import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Kotoba } from 'src/app/types/kotoba';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  @Input() data: Kotoba[]
  inArchive: Kotoba[] = []
  archived: Kotoba[] = []
  isLoad = true;
  selectWord: Kotoba
  showExplain = true;
  constructor() {
  }

  ngOnInit() {
    this.data.map(d => {
      if (d.archive) this.archived.push(d)
      else this.inArchive.push(d)
    })
    this.selectWord = this.inArchive[0]
    this.isLoad = false
    console.log(this.inArchive);
    console.log(this.archived);
  }
  selectNext() {
    let i = this.findI()
    if (this.inArchive[i + 1]) this.selectWord = this.inArchive[i + 1]
  }
  selectBack() {
    let i = this.findI()
    if (this.inArchive[i - 1]) this.selectWord = this.inArchive[i - 1]
  }
  findI() {
    return this.inArchive.findIndex(e => e == this.selectWord)
  }

  @HostListener('window:keydown', ['$event']) key(keyEvent: KeyboardEvent) {
    const k = keyEvent.code
    if (k === 'ArrowRight') {
      this.selectNext()
    } else if (k === 'ArrowLeft') {
      this.selectBack()
    } else if (k === 'Space') {
      this.showExplain = !this.showExplain
    }
  }
}
