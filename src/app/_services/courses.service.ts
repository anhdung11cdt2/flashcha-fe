import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = environment.courses
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(this.url)
  }
  createNew(name: string, level_id: string, language_id: string) {
    return this.http.post(this.url, {name, level_id, language_id})
  }
}
