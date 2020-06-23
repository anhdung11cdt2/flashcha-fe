import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Flashcard } from 'src/app/_types/flashcard';
import { Lesson } from 'src/app/_types/lesson';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SingleImportComponent } from '../single-import/single-import.component';
import { LessonsService } from 'src/app/_services/lessons.service';
import { ToastService } from 'src/app/_services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Course } from 'src/app/_types/course';
@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit {
  @Input()flashcards: Flashcard[]
  @Input()lesson: Lesson
  @Input()course: Course
  @Output()actions = new EventEmitter<{}>()
  archived = []
  inArchive = []
  selectWord: Flashcard
  deleteLessonId: string = null
  constructor(
    public modalSer: NgbModal,
    private lessonSer: LessonsService,
    private toast: ToastService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
  }
  openImport() {
    let modal = this.modalSer.open(SingleImportComponent, {size: 'xl', backdrop: 'static', windowClass: 'import-modal'})
    modal.componentInstance.lesson = this.lesson
    modal.componentInstance.course = this.course
    modal.result.then(res => {
      if (!this.flashcards) this.flashcards = []
      if (res && res.flashcards) res.flashcards.map(f => {Object.assign(f, {isNew: true}); this.flashcards.push(f)})
      this.actions.emit({action: 'closeImport'})
    }, reject => {
    })
  }
  deleteLesson(id: string) {
    this.deleteLessonId = id
    this.spinner.show('detele_lesson_'+id)
    let sub = this.lessonSer.deleteLesson(id).subscribe((res: Lesson[]) => {
      if (res && !res.find(l => l.id === id)) this.actions.emit({action: 'delete', id: id})
      this.spinner.hide('detele_lesson_'+id)
      sub.unsubscribe()
    }, err => this.toast.err(err))
  }
}
