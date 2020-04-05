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
  getIndex(lesson_ids: string[]) {
    return this.http.post(this.url + '/index', {lesson_ids: lesson_ids})
  }
  createArrayFlashCards(body: {lesson_id: string, flash_cards: {}}) {
    return this.http.post(this.url + '/array_create', body)
  }
}
