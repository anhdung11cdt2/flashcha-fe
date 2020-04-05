import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { Kotoba } from 'src/app/types/kotoba';
import { FlashcardLearnService } from 'src/app/services/flashcardLearn.service';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DragulaService } from 'ng2-dragula';
import { Course } from 'src/app/_types/course';
import { Lesson } from 'src/app/_types/lesson';
import { CoursesService } from 'src/app/_services/courses.service';
import { ToastService } from 'src/app/_services/toast.service';
import { LessonsService } from 'src/app/_services/lessons.service';
import { FlashcardsService } from 'src/app/_services/flashcards.service';
import { Flashcard } from 'src/app/_types/flashcard';
import { CardTranslation } from 'src/app/_types/card-translation';
import { CardTranslatesService } from 'src/app/_services/card-translates.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit, OnDestroy {
  courses: Course[]
  selectCourse: Course

  lessons: Lesson[]
  selectLesson: Lesson

  flashcards: Flashcard[]
  inArchiveCards: Flashcard[]
  archivedCards: Flashcard[]
  selectFlashcard: Flashcard
  translations: {}

  @Input() data: Kotoba[]
  inArchive: Kotoba[] = []
  archived: Kotoba[] = []
  isLoad = true;
  selectWord: Kotoba
  flipped = false;
  expand: boolean = false
  sub = new Subscription
  constructor(
    private dragular: DragulaService,
    private courseSer: CoursesService,
    private lessonSer: LessonsService,
    private flashcardSer: FlashcardsService,
    private translationSer: CardTranslatesService,
    private toast: ToastService
  ) {
    if (!this.dragular) this.dragular.createGroup('flashcard', null)
  }
  ngOnDestroy() {
    this.dragular.remove('flashcard')
    this.dragular.cancel()
  }
  ngOnInit() {
    let sub = this.courseSer.getAll().pipe(switchMap((res: Course[]) => {
      this.courses = res
      this.selectCourse = this.selectLesson ? this.courses.find(course => course.id === this.selectLesson.course_id) : this.courses[0]
      return this.lessonSer.getData(this.selectCourse.id)
    })).subscribe((res: Lesson[]) => {
      this.lessons = res
      this.selectLesson = this.selectLesson || this.lessons[0]
      this.loadFlashCards(this.selectLesson.id)
      sub.unsubscribe()

    }, err => this.toast.err(err))
    this.data.map(d => {
      if (d.archive) this.archived.push(d)
      else this.inArchive.push(d)
    })
    this.selectWord = this.inArchive[0]
    this.isLoad = false
  }
  clickCourse(course: Course) {
    this.selectCourse = course
    this.lessonSer.getData(this.selectCourse.id).subscribe((lessons: Lesson[]) => {
      this.lessons = lessons
      this.selectLesson = this.lessons[0]
      this.loadFlashCards(this.selectLesson.id)
    }, err => this.toast.err(err))
  }
  loadFlashCards(lesson_id: string) {
    let sub = this.flashcardSer.getIndex([lesson_id]).pipe(switchMap((res: any) => {
      if (!res[lesson_id]) return of(false)
        this.flashcards = res[lesson_id]
        this.inArchiveCards = this.flashcards.filter(c => !c['isArchive'])
        this.archivedCards = this.flashcards.filter(c => c['isArchive'])
        this.selectFlashcard = this.inArchiveCards[0]
        if (!this.flashcards.length) return of(false)
        return this.translationSer.getTranslations(this.flashcards.map(f => {return f.id}))
    })).subscribe((res: any) => {
      if (res) {
        const translation_ids = Object.keys(res)
        if (!this.translations) this.translations = {}
        translation_ids.map(id => this.translations[id] = res[id])
      }
      sub.unsubscribe()
    }, err => this.toast.err(err))
  }
  selectNext() {
    let i = this.findI()
    // if (this.inArchive[i + 1]) this.selectWord = this.inArchive[i + 1]
    if (this.inArchiveCards[i + 1]) this.selectFlashcard = this.inArchiveCards[i + 1]
  }
  selectBack() {
    let i = this.findI()
    if (this.inArchiveCards[i - 1]) this.selectFlashcard = this.inArchiveCards[i - 1]
  }
  findI(selectFlashcard?: Flashcard) {
    const card = selectFlashcard || this.selectFlashcard 
    return this.inArchiveCards.findIndex(e => card && e.id == card.id)
  }
  fLetter(s: string) { return s.slice(0, 1).toUpperCase() + s.slice(1) }

  processRatio() {
    return Math.round((this.findI() + 1) * 100 / this.inArchiveCards.length)
  }

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
