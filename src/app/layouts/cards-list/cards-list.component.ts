import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Flashcard } from 'src/app/_types/flashcard';
import { Lesson } from 'src/app/_types/lesson';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SingleImportComponent } from '../single-import/single-import.component';
import { LessonsService } from 'src/app/_services/lessons.service';
import { ToastService } from 'src/app/_services/toast.service';
@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit {
  @Input()flashcards: Flashcard[]
  @Input()lesson: Lesson
  @Output()actions = new EventEmitter<{}>()
  archived = []
  inArchive = []
  selectWord: Flashcard
  constructor(
    public modalSer: NgbModal,
    private lessonSer: LessonsService,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }
  openImport() {
    let modal = this.modalSer.open(SingleImportComponent, {size: 'xl', backdrop: 'static', windowClass: 'import-modal'})
    modal.componentInstance.lesson = this.lesson
    modal.result.then(res => {
      if (!this.flashcards) this.flashcards = []
      if (res && res.flashcards) res.flashcards.map(f => {Object.assign(f, {isNew: true}); this.flashcards.push(f)})
    }, reject => {})
  }
  deleteLesson(id: string) {
    let sub = this.lessonSer.deleteLesson(id).subscribe((res: Lesson[]) => {
      if (res && !res.find(l => l.id === id)) this.actions.emit({action: 'delete', id: id})
      sub.unsubscribe()
    }, err => this.toast.err(err))
  }
}
