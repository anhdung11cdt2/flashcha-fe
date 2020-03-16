import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { Kotoba } from 'src/app/types/kotoba';
import { FlashcardLearnService } from 'src/app/services/flashcardLearn.service';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit, OnDestroy {
  @Input() data: Kotoba[]
  inArchive: Kotoba[] = []
  archived: Kotoba[] = []
  isLoad = true;
  selectWord: Kotoba
  flipped = false;
  expand: boolean = false
  sub = new Subscription
  constructor(
    private dragular: DragulaService
  ) {
    if (!this.dragular) this.dragular.createGroup('flashcard', null)
  }
  ngOnDestroy(){ 
    this.dragular.remove('flashcard')
    this.dragular.cancel()
  }
  ngOnInit() {
    this.data.map(d => {
      if (d.archive) this.archived.push(d)
      else this.inArchive.push(d)
    })
    this.selectWord = this.inArchive[0]
    this.isLoad = false
  }
  selectNext() {
    let i = this.findI()
    if (this.inArchive[i + 1]) this.selectWord = this.inArchive[i + 1]
  }
  selectBack() {
    let i = this.findI()
    if (this.inArchive[i - 1]) this.selectWord = this.inArchive[i - 1]
  }
  findI(selectWord?: string) {
    return this.inArchive.findIndex(e => e == this.selectWord)
  }
  fLetter(s: string) {return s.slice(0,1).toUpperCase() + s.slice(1)}
  
  processRatio(){ return Math.round((this.findI()+1)*100/this.inArchive.length)}

  @HostListener('window:keydown', ['$event']) key(keyEvent: KeyboardEvent) {
    const k = keyEvent.code
    if (k === 'ArrowRight') {
      keyEvent.preventDefault()
      this.selectNext()
    } else if (k === 'ArrowLeft') {
      keyEvent.preventDefault()
      this.selectBack()
    } else if (k === 'Space') {
      keyEvent.preventDefault()
      this.flipped = !this.flipped
    }
  }
}
