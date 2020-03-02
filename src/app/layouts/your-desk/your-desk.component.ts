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
      console.log(res);
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
      // console.log("Lessons");
      // console.log(res);
      let lesson_ids = this.lessons.map(e => e.id)
      return this.flashcardSer.getIndex(lesson_ids)
    })).subscribe((res: any) => {
      this.flashcards = res
      // console.log("**FLASHCARDS**");
      // console.log(res);
    })
  }
  selectLesson(lesson: Lesson) {
    this.selectedLesson = lesson
    // this.flashcard.getData(lesson.id, 1, 50)
  }
  createCourse(name: string, level_id: string, language_id: string){
    console.log(name, level_id, language_id);
    if (name && level_id && language_id) {
      this.courseSer.createNew(name, level_id, language_id).subscribe((res: any)=> {
        console.log(res);
        this.expandCreate = false
        if (res && res.length) this.courses = res
      })
    }
  }
  deleteCourse(item: Course) {
    console.log(item);
    this.lessonSer.getData(item.id).pipe(rxo.switchMap((res: any[]) => {
      console.log(res);
      return res && res.length ? rxjs.of(false) : this.courseSer.deleteCourse(item.id)
    }))
    .subscribe((res:any) => {
      console.log(res);
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
}
