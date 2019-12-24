import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
declare const snow: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jpp';
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('users').valueChanges();
    this.items.subscribe(e => console.log(e))
  }
  ngOnInit() {
    console.log("***APP");

    snow.count = 30;   // number of flakes
    snow.delay = 20;   // timer interval
    snow.minSpeed = 2; // minimum movement/time slice
    snow.maxSpeed = 5; // maximum movement/time slice
    snow.start();
    console.log('snow falling');

  }
}
