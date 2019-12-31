import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { FlashcardsService } from '../services/flashcards.service';
declare const snow: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, public auth: AuthService, public flashcard: FlashcardsService) {
    this.afAuth.authState
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
  openSidebar(){
    console.log('openSidebar');
    document.getElementById('mySidebar').style.width = '250px';
  }
  closeSidebar(){
    document.getElementById('mySidebar').style.width = '0';
  }

}
