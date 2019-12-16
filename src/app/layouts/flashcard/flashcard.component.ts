import { Component, OnInit } from '@angular/core';
import { Kotoba } from 'src/app/types/kotoba';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  inArchive: Kotoba[] = []
  archived: Kotoba[] = []
  isLoad = true;
  selectWord: Kotoba
  constructor(public flashcard: FlashcardsService) {
  }

  ngOnInit() {
    this.flashcard.data.map(d => {
      if (d.archive) this.archived.push(d) 
      else this.inArchive.push(d)
    })
    this.selectWord = this.inArchive[0]
    this.isLoad = false
    console.log(this.inArchive);
    console.log(this.archived);
  }
  selectNext(){
    let i =this.findI()
    if (this.inArchive[i+1]) this.selectWord = this.inArchive[i + 1]
  }
  selectBack(){
    let i =this.findI()
    if (this.inArchive[i-1]) this.selectWord = this.inArchive[i - 1]
  }
  findI(){
    return this.inArchive.findIndex(e => e == this.selectWord)
  }
}
