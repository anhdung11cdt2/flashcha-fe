import { Component, OnInit, Input } from '@angular/core';
import { Flashcard } from 'src/app/_types/flashcard';
import { Lesson } from 'src/app/_types/lesson';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {
  @Input()flashcards: Flashcard[]
  @Input()lesson: Lesson
  archived = []
  inArchive = []
  constructor() { }

  ngOnInit() {
    console.log(this.lesson);
    console.log(this.flashcards);
    
    if (this.flashcards.length) {
      this.inArchive = this.flashcards.filter(f => f.word)
    }
  }

}
