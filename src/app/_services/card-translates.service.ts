import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardTranslatesService {
  url = environment.card_translations
  constructor(
    private http: HttpClient
  ) { }
  getAll() {
    return this.http.get(this.url)
  }
  getTranslations(flashcard_ids: string[]) {
    return this.http.post(this.url + '/index', { flashcard_ids })
  }
  createArrayCardTrs(body: { language_id: string, card_translates: {} }) {
    return this.http.post(this.url + '/array_create', body)
  }
}
