import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Flashcard } from '../_types/flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {
  url = environment.flash_cards
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get(this.url)
  }
  getIndex(lessons: string[]) {
    return this.http.post(this.url + '/index', {lesson_ids: lessons})
  }
  createArrayFlashCards(body: {lesson_id: string, flashcards: {}}) {
    return this.http.post(this.url + '/array_create', body)
  }
}
