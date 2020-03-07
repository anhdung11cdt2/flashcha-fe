import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  url = environment.lessons
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get(this.url)
  }
  getData(course_id: string) {
    return this.http.get(this.url+'?course_id='+course_id)
  }
  createLesson(body: {name: string, course_id: string}) {
    return this.http.post(this.url, body)
  }
}
