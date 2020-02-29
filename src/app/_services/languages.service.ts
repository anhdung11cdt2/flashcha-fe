import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  url = environment.languages
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get(this.url)
  }
  create(body: {name:string, lang_code: string}) {
    return this.http.post(this.url, body)
  }
}
