import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/_services/courses.service';
import { Course } from 'src/app/_types/course';
import { Lesson } from 'src/app/_types/lesson';
import { LessonsService } from 'src/app/_services/lessons.service';
import * as rxjs from "rxjs";
import * as rxo from "rxjs/operators";
import { FlashcardsService } from 'src/app/_services/flashcards.service';
import { Flashcard } from 'src/app/_types/flashcard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Language } from 'src/app/_types/language';
import { LanguagesService } from 'src/app/_services/languages.service';
import { Level } from 'src/app/_types/level';
import { LevelsService } from 'src/app/_services/levels.service';
import { ToastService } from 'src/app/_services/toast.service';
import { CreateLanguageComponent } from '../create-language/create-language.component';

@Component({
  selector: 'app-your-desk',
  templateUrl: './your-desk.component.html',
  styleUrls: ['./your-desk.component.scss']
})
export class YourDeskComponent implements OnInit {
  courses: Course[]
  lessons: Lesson[]
  flashcards: [Flashcard[]]
  
  selectedCourse: Course
  selectedLesson: Lesson
  languages: Language[]
  levels: Level[]
  expandCreate = false
  new_lesson: string
  constructor(
    public courseSer: CoursesService,
    public lessonSer: LessonsService,
    public languageSer: LanguagesService,
    public levelSer: LevelsService,
    public flashcardSer: FlashcardsService,
    public modal: NgbModal,
    public toast: ToastService,
    ) { }
  
  ngOnInit() {
    this.courseSer.getAll().subscribe((res: any) => {
      this.courses =  res
      if (this.courses[0]) this.selectCourse(this.courses[0])
    })
    this.languageSer.getAll().subscribe((res: any) => {
      this.languages = res
    })
    this.levelSer.getAll().subscribe((res: any) => {
      this.levels = res
    })
  }
  selectCourse(course: Course) {
    this.selectedCourse = course
    this.lessonSer.getData(course.id).pipe(rxo.switchMap((res: any)=> {
      this.lessons = res

      let lesson_ids = this.lessons.map(e => e.id)
      return this.flashcardSer.getIndex(lesson_ids)
    })).subscribe((res: any) => {
      this.flashcards = res
    })
  }
  selectLesson(lesson: Lesson) {
    this.selectedLesson = lesson
    // this.flashcard.getData(lesson.id, 1, 50)
  }
  createCourse(name: string, level_id: string, language_id: string){
    if (name && level_id && language_id) {
      this.courseSer.createNew(name, level_id, language_id).subscribe((res: any)=> {
        this.expandCreate = false
        if (res && res.length) this.courses = res
      })
    }
  }
  deleteCourse(item: Course) {
    this.lessonSer.getData(item.id).pipe(rxo.switchMap((res: any[]) => {
      return res && res.length ? rxjs.of(false) : this.courseSer.deleteCourse(item.id)
    }))
    .subscribe((res:any) => {
      if (res && res.length) this.courses = res
      else this.toast.err(null, 'Could not delete lessons')
    }, err => this.toast.err(err))
  }
  openCreateLanguageModal() {
    const ref = this.modal.open(CreateLanguageComponent, {size: 'sm', backdrop: true})
    ref.result.then(res => {
      if (res.id) {
        this.languages.push(res)
      }
    }, reject => {})
  }
  createLesson(new_lesson: string) {
    if (!new_lesson.length || !this.selectedCourse.id) return
    this.lessonSer.createLesson({name: new_lesson, course_id: this.selectedCourse.id}).subscribe((res: Lesson) => {
      this.lessons.push(res)
    })
  }
}
