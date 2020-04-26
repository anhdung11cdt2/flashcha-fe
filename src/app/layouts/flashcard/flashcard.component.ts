import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { Kotoba } from 'src/app/types/kotoba';
import { FlashcardLearnService } from 'src/app/_services/flashcardLearn.service';
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
      console.log(res);
      const selectCourseId = localStorage.getItem('selectCourseId')
      this.selectCourse = this.courses.find(course => course.id === selectCourseId) || this.courses[0]
      console.log(this.selectCourse);
      
      if (!this.selectCourse) {this.toast.warning('Not found', 'Course'); return of(false)}
      return this.lessonSer.getData(this.selectCourse.id)
    })).subscribe((res: Lesson[]) => {
      if (res) {
        this.lessons = res
        const selectLessonId = localStorage.getItem('selectLessonId')
        this.selectLesson = this.lessons.find(lesson => lesson.id === selectLessonId ) || this.lessons[0]
        if (!this.selectLesson) this.toast.warning('Not found', 'Lesson')
        else this.loadFlashCards(this.selectLesson.id)
      }
      sub.unsubscribe()
    }, err => this.toast.err(err, 'Load Data'))
    this.data.map(d => {
      if (d.archive) this.archived.push(d)
      else this.inArchive.push(d)
    })
    this.selectWord = this.inArchive[0]
    this.isLoad = false
  }
  onSelectCourse(course: Course) {
    if (!course) return
    this.selectCourse = course
    localStorage.setItem('selectCourseId', this.selectCourse.id)
    this.resetLesson()
    this.resetFlashcards()
    this.lessonSer.getData(this.selectCourse.id).subscribe((lessons: Lesson[]) => {
      this.lessons = lessons
      this.selectLesson = this.lessons[0]
      if (this.selectLesson) this.loadFlashCards(this.selectLesson.id)
    }, err => this.toast.err(err, 'Select Course'))
  }
  onSelectLesson(lesson: Lesson) {
    if (!lesson.id) return
    this.selectLesson = lesson; this.loadFlashCards(lesson.id)
    localStorage.setItem('selectLessonId', this.selectLesson.id)
  }
  loadFlashCards(lesson_id: string) {
    if (!lesson_id) return
    let sub = this.flashcardSer.getIndex([lesson_id]).pipe(switchMap((res: any) => {
      if (!res[lesson_id]) return of(false)
        this.flashcards = res[lesson_id]
        if (!this.flashcards || !this.flashcards.length) return of(false)

        this.inArchiveCards = this.flashcards.filter(c => !c['isArchive'])
        this.archivedCards = this.flashcards.filter(c => c['isArchive'])
        this.selectFlashcard = this.inArchiveCards[0]
        return this.translationSer.getTranslations(this.flashcards.map(f => {return f.id}))
    })).subscribe((res: any) => {
      if (res) {
        const translation_ids = Object.keys(res)
        if (!this.translations) this.translations = {}
        translation_ids.map(id => this.translations[id] = res[id])
      }
      sub.unsubscribe()
    }, err => this.toast.err(err, 'Flashcards'))
  }
  resetLesson() {
    this.lessons = null
    this.selectLesson = null
  }
  resetFlashcards() {
    this.flashcards = null
    this.inArchiveCards = null
    this.archivedCards = null
    this.selectFlashcard = null
  }
  selectNext() {
    let i = this.findI()
    // if (this.inArchive[i + 1]) this.selectWord = this.inArchive[i + 1]
    if (i >= 0 && this.inArchiveCards[i + 1]) this.selectFlashcard = this.inArchiveCards[i + 1]
  }
  selectBack() {
    let i = this.findI()
    if (i >= 0 && this.inArchiveCards[i - 1]) this.selectFlashcard = this.inArchiveCards[i - 1]
  }
  findI(selectFlashcard?: Flashcard) {
    if(!this.inArchiveCards || !this.inArchiveCards.length) return -1
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
