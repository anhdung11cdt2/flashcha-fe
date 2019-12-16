import { Injectable } from '@angular/core';
import { n1kotoba } from '../../assets/csvjson';
import { Kotoba } from '../types/kotoba';
function random(n: number){
  let arr = []
  for(let i = 0;i< n; i++) {
    arr.push(Math.round(Math.random()*49))
  }
  console.log(arr);
  return arr
}
@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {
  rawData: any[] = n1kotoba
  data: any[] = []
  constructor() {
    const words = Object.values(this.rawData[0]).slice(0,50)
    words.map((w:string,i) => {
      let a = {kanji: w, romaji: this.mapRawData(1,i), meaning: this.mapRawData(2,i), archive: false}
      this.data.push(a)
    })
    random(20).map(i => this.data[i].archive = true)
  }
  mapRawData(fieldIndex,wordIndex) {
    return Object.values(this.rawData[fieldIndex])[wordIndex]
  }
}
