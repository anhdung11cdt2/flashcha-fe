import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { FlashcardLearnService } from '../services/flashcardLearn.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, public auth: AuthService, public flashcard: FlashcardLearnService) {
    this.afAuth.authState
  }

  ngOnInit() {
  }
  openSidebar(){
    document.getElementById('mySidebar').style.width = '250px';
  }
  closeSidebar(){
    document.getElementById('mySidebar').style.width = '0';
  }

}
